#!/usr/bin/env python3
"""Install this browser-backed tool locally without changing OpenCode itself."""
import argparse
import json
from pathlib import Path
import shutil

p = argparse.ArgumentParser()
p.add_argument('--python', required=True, help='Existing Python executable with Playwright installed')
p.add_argument('--cdp', default='http://localhost:9222')
args = p.parse_args()
# Preserve the venv executable path: resolving its symlink discards pyvenv.cfg.
python = Path(args.python).expanduser().absolute()
if not python.is_file():
    raise SystemExit('Python executable does not exist')
source = Path(__file__).resolve().parent
destination = Path.home() / '.config/opencode/plugins/browser-images'
destination.mkdir(parents=True, exist_ok=True)
for name in ['index.js', 'package.json', 'browser_images.py', 'README.md']:
    target = destination / name
    if target.exists() and target.read_bytes() != (source / name).read_bytes():
        shutil.copy2(target, target.with_suffix(target.suffix + '.previous'))
    shutil.copy2(source / name, target)
(destination / 'host.json').write_text(json.dumps({'python': str(python), 'cdp_url': args.cdp}, indent=2) + '\n')
print(f'Installed image tools at {destination}')
