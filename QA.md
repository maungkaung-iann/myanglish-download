# Experimental website QA — 2026-11-02

## Scope and safety
Started with a clean fresh checkout of latest origin/web (1766d21f2818bc7c7743a13fe5d12b3981595155).
Only experiment/premium-cinematic-web is changed. No installer, updater, binary, release asset, video, download destination, release version or production deployment setting changed.
Commit uses [CI Skip] to suppress connected Cloudflare Pages builds. No deployment command was invoked.

## Results
| Check | Result | Evidence / limitation |
|---|---|---|
| JavaScript syntax | PASS | node --check premium.js |
| Link/media/form preservation | PASS | python qa/check-preservation.py: 23 links, 6 media elements, 3 form elements |
| Existing script behavior | PASS (source comparison) | All four original scripts retained except explicit pause guard and focus accessibility additions |
| Video and stats file integrity | PASS | SHA-256 compared byte-for-byte with baseline |
| Desktop browser inspection | PASS | Actual local Chromium page opened, hero and typing section visually inspected |
| Responsive widths 1920,1440,768,390,375 | PASS (embedded viewport layout) | Same-origin iframe widths; document client/scroll widths matched: 1905,1425,753,375,360 respectively, allowing 15px scrollbar |
| Native devices / other browsers | NOT RUN | Embedded viewports are not device emulation or Safari/Firefox tests |
| Horizontal overflow | PASS | No document horizontal overflow at tested widths |
| Video autoplay | PASS | Both videos readyState 4 and paused false |
| Typing video presentation | PASS | Computed opacity 1; no filter; original source |
| Pause/resume videos | PASS | Both paused true after Pause, false after Play |
| Navigation | PASS (sampled) | Brand/home navigation clicked; all hrefs compared with baseline |
| Download binary transfer | NOT RUN | URLs preserved exactly; no installer downloaded/executed for this design task |
| Contact validation | PASS (partial) | Required empty email reports invalid; existing mailto handler retained |
| Sending contact message | NOT RUN | No message sent; external mail client delivery not exercised |
| Scroll reveals | PASS (observed/source) | IntersectionObserver and entrance motion inspected in browser; no frame-rate benchmark |
| Reduced motion | PASS (source), NOT RUN (native preference) | CSS/JS guards reviewed; browser control exposes no preference emulation |
| Console | PASS for observed site-origin errors | Only extension metadata error observed, from chrome-extension URL |
| Performance | NOT RUN benchmark | No Lighthouse/Core Web Vitals claim; no added runtime dependency, videos unchanged |
| Hallmark static review | PARTIAL | 167 FAIL/86 REFLEX baseline to 16 FAIL/23 REFLEX; retained copy and intentional glass rules remain |
| Hallmark render audit | BLOCKED | puppeteer-core unavailable; separate actual browser inspection completed |
| Fresh-context review | PASS with fixes | Focus pauses scroll, late canplay respects pause, input boundaries strengthened |

## Remaining limitations
Local testing does not verify production analytics ingestion, actual mail delivery, or every outbound destination's availability. No live deployment performed. The pre-existing automatic scroll remains for functionality parity, with pointer, wheel, touch and keyboard-focus interruption. Existing videos dominate media cost. Full native mobile/device QA, reduced-motion preference testing and performance profiling remain before adopting this experiment.

## Local preview
Requires Python 3:
```sh
git clone --single-branch --branch experiment/premium-cinematic-web https://github.com/maungkaung-iann/myanglish-download.git
cd myanglish-download
python -m http.server 8080
```
Open http://localhost:8080. Do not change production hosting settings.

Checks:
```sh
node --check premium.js
python qa/check-preservation.py
```

## Files
index.html: stylesheet extraction, media control, two accessibility guards.
premium.css: complete experimental design and responsive motion.
premium.js: section reveals and media control.
DESIGN.md: system, reference compatibility, decisions.
qa/check-preservation.py: baseline integrity checks.
QA.md: this evidence report.
