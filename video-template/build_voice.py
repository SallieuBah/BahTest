import json, re, subprocess, sys
SRC, OUT_DIR = sys.argv[1], sys.argv[2]
scenes = [
 [(3.42,5.52,"Hi, I'm Mohamed,"),(6.00,7.64,"an energy audit engineer"),(8.55,11.22,"and an *electrical & electronics* engineer.")],
 [(12.14,14.34,"Why *high-efficiency* motors?"),(15.48,17.84,"Why do *high-efficiency* motors matter?"),(18.84,22.45,"Pumps, fans, compressors and conveyors"),(23.03,25.28,"are all driven by electric motors."),(26.43,29.26,"Together, they use about *two thirds*"),(29.69,32.30,"of all industrial electricity."),(33.58,37.99,"Over a motor's life, the purchase price is small."),(38.36,42.58,"*Energy* is more than *90%* of the total cost.")],
 [(44.04,45.28,"So where does the energy go?"),(46.52,51.17,"Every motor loses power in its *copper* windings,"),(51.85,56.78,"its *iron* core, through *friction*, and as stray losses."),(58.81,63.67,"In a standard motor, all of that turns into *heat*."),(65.06,68.88,"High-efficiency designs use more copper,"),(69.40,73.71,"thinner low-loss steel and a better fan,"),(74.10,77.30,"cutting losses by a *third* or more.")],
 [(78.44,79.80,"Efficiency classes"),(81.53,86.12,"Motors are graded on one international scale,"),(86.85,91.37,"from *IE1*, standard, up to *IE4*,"),(92.17,93.43,"*super premium*."),(94.87,99.89,"In Europe, *IE3* has been the *minimum*"),(100.48,103.69,"for most motors since 2021,"),(104.43,111.28,"and *IE4* is now required from 75 to 200 kW.")],
 [(116.71,117.82,"The savings math"),(119.02,121.32,"So how much can you actually save?"),(123.12,126.81,"Divide the shaft power by each motor's efficiency."),(127.41,130.19,"The difference is the power you *stop wasting*."),(131.36,135.88,"Multiply it by your *running hours* and your *energy price*."),(137.19,139.18,"A 75 kW motor"),(139.95,144.28,"at 75% load, running 6,000 hours a year,"),(144.89,148.82,"upgraded from IE1 to IE4,"),(149.62,153.15,"saves about *11,300 kWh*."),(154.16,159.61,"At €0.15 per kWh, that is around"),(160.35,162.99,"*€1,700* every year.")],
 [(167.11,172.12,"To get the most out of it, size the motor correctly,"),(173.06,176.84,"and add a *variable speed drive* on pumps and fans."),(177.83,180.56,"Cutting their speed by just 20%"),(181.25,183.76,"can cut power by nearly *half*."),(185.56,191.27,"Pair it with efficient belts or direct drive, and good maintenance."),(191.89,197.37,"The result: payback often within *1 to 3 years*,"),(198.19,201.14,"cooler motors that last longer,"),(202.09,203.71,"and *lower emissions*.")],
]
PRE, POST, GAP, SCENE_GAP, LEAD, TAIL = 0.12, 0.18, 0.30, 0.75, 0.6, 2.0
parts, t, timings = [], 0.0, {"scenes": []}
def sil(d): parts.append(f"aevalsrc=0:d={d:.3f}:s=48000")
for si, sc in enumerate(scenes):
    S = {"start": t, "captions": []}
    sil(LEAD); t += LEAD
    for i, (a, b, txt) in enumerate(sc):
        a0, b0 = a - PRE, b + POST
        parts.append((a0, b0))
        words = txt.split()
        S["captions"].append({"start": round(t + PRE, 3), "end": round(t + (b0 - a0), 3), "text": txt.replace("*", ""), "hl": [w.replace("*", "") for w in re.findall(r"\*[^*]+\*", txt) for w in w.split()]})
        t += b0 - a0
        g = GAP if i < len(sc) - 1 else (SCENE_GAP if si < len(scenes) - 1 else TAIL)
        sil(g); t += g
    S["end"] = round(t, 3); timings["scenes"].append(S)
# Build one ffmpeg filtergraph: trims + silences concatenated, then voice cleanup
fl, labels, k = [], [], 0
for p in parts:
    if isinstance(p, tuple):
        fl.append(f"[0:a]atrim={p[0]:.3f}:{p[1]:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.04,afade=t=out:st={p[1]-p[0]-0.06:.3f}:d=0.06[p{k}]")
    else:
        fl.append(f"{p}[p{k}]")
    labels.append(f"[p{k}]"); k += 1
fl.append("".join(labels) + f"concat=n={k}:v=0:a=1,highpass=f=90,afftdn=nf=-28,equalizer=f=250:t=q:w=1:g=-2,equalizer=f=3500:t=q:w=1.2:g=3,acompressor=threshold=-22dB:ratio=3:attack=10:release=150,loudnorm=I=-16:TP=-1.5:LRA=9[out]")
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", SRC, "-filter_complex", ";".join(fl), "-map", "[out]", "-ac", "1", "-ar", "48000", f"{OUT_DIR}/motors-myvoice.voice.wav"], check=True)
open(f"{OUT_DIR}/motors-myvoice.timings.js", "w").write("window.TIMINGS = " + json.dumps(timings, ensure_ascii=False, indent=1) + ";\n")
print(f"total {t:.1f}s")
