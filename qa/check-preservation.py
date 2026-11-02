from pathlib import Path
from html.parser import HTMLParser
import subprocess,re,hashlib
root=Path(__file__).resolve().parents[1]
class Inventory(HTMLParser):
 def __init__(self,s):
  super().__init__();self.links=[];self.media=[];self.fields=[];self.scripts=[];self.in_script=False;self.feed(s)
 def handle_starttag(self,t,a):
  d=dict(a)
  if t=='a':self.links.append(d.get('href'))
  if t in ('video','source','img'):self.media.append((t,d))
  if t in ('form','input','textarea'):self.fields.append((t,d))
  if t=='script':self.in_script=True;self.scripts.append([d,''])
 def handle_data(self,s):
  if self.in_script:self.scripts[-1][1]+=s
 def handle_endtag(self,t):
  if t=='script':self.in_script=False
before=subprocess.check_output(['git','show','1766d21f2818bc7c7743a13fe5d12b3981595155:index.html'],cwd=root,text=True)
current=(root/'index.html').read_text()
# Normalize the two explicitly reviewed accessibility changes only.
current=current.replace("const start = () => { if (video.dataset.userPaused !== 'true') video.play().catch(() => {}); };","const start = () => video.play().catch(() => {});")
current=current.replace("  document.addEventListener('focusin', event => {\n    if (!control.contains(event.target)) pause();\n  });\n","")
a,b=Inventory(before),Inventory(current)
assert a.links==b.links,'Links changed'
assert a.media==b.media,'Media changed'
assert a.fields==b.fields,'Form changed'
assert all(s in b.scripts for s in a.scripts),'Original script changed'
for path in ['video/background.mp4','video/typing-demo.mp4','stats.html']:
 old=subprocess.check_output(['git','show',f'1766d21f2818bc7c7743a13fe5d12b3981595155:{path}'],cwd=root)
 assert hashlib.sha256(old).digest()==hashlib.sha256((root/path).read_bytes()).digest(),path
print(f'PASS: {len(a.links)} links; {len(a.media)} media elements; {len(a.fields)} form elements; {len(a.scripts)} scripts preserved; videos/stats byte-identical')
