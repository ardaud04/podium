"""Build clean 60fps plate frames from the CapCut export, per edl.json.

- caption segments: burned-in CapCut caption painted out with delogo (flat navy bg)
- phone segments: slate background (#12212B) graded to the room navy (#071A2A)
  outside a rounded-rect phone mask, so both shots share one background
Frames are PNG, named by output frame index, in BUILD/frames/<layer>_%05d.png
"""
import json, os, subprocess, sys
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
BUILD = sys.argv[1]
edl = json.load(open(os.path.join(HERE, 'edl.json')))
src = edl['source']
os.makedirs(os.path.join(BUILD, 'frames'), exist_ok=True)

# phone mask: white = background (to regrade), black = phone body
W, H = 1080, 1920
x0, y0, x1, y1, r = 211, 259, 867, 1665, 90
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
qx = np.abs(xx - (x0 + x1) / 2) - ((x1 - x0) / 2 - r)
qy = np.abs(yy - (y0 + y1) / 2) - ((y1 - y0) / 2 - r)
sd = np.sqrt(np.maximum(qx, 0) ** 2 + np.maximum(qy, 0) ** 2) + np.minimum(np.maximum(qx, qy), 0) - r
alpha = np.clip((sd + 1.5) / 3.0, 0, 1)                  # rounded-rect SDF, 3px feather on the edge
mask_path = os.path.join(BUILD, 'phone_mask.pgm')
with open(mask_path, 'wb') as f:
    f.write(b'P5 %d %d 255\n' % (W, H)); f.write((alpha * 255).astype(np.uint8).tobytes())

# bg grade: slate (18,33,43) -> navy (7,26,42); highlights untouched
curves = ("curves=r='0/0 0.0706/0.0275 0.35/0.35 1/1':"
          "g='0/0 0.1294/0.1020 0.35/0.35 1/1':"
          "b='0/0 0.1686/0.1647 0.35/0.35 1/1'")
TORGB = "scale=in_color_matrix=bt709:in_range=tv:flags=accurate_rnd+full_chroma_int,format=gbrp"

for s in edl['segments']:
    n, dur = s['frames'], s['frames'] / 60 + 0.1
    base = f"[0:v]trim=start={s['srcIn']}:duration={dur},setpts=PTS-STARTPTS,fps=60"
    if s['fix'] == 'caption':
        fc = f"{base},delogo=x=232:y=186:w=636:h=226,{TORGB},format=rgb24[o]"
        inputs = ['-i', src]
    else:
        fc = (f"{base},{TORGB},split[a][b];[b]{curves}[g];[1:v]format=gray,scale=1080:1920[m];"
              f"[a][g][m]maskedmerge,format=rgb24[o]")
        inputs = ['-i', src, '-loop', '1', '-i', mask_path]
    out = os.path.join(BUILD, 'frames', f"{s['layer']}_%05d.png")
    cmd = ['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *inputs, '-filter_complex', fc,
           '-map', '[o]', '-frames:v', str(n), '-start_number', str(s['outFrame']),
           '-compression_level', '1', out]
    subprocess.run(cmd, check=True)
    print('segment', s['id'], 'frames', s['outFrame'], '->', s['outFrame'] + n - 1)
