# Myanglish — cinematic monochrome experiment

Branch: experiment/premium-cinematic-web.
Baseline: origin/web at 1766d21f2818bc7c7743a13fe5d12b3981595155.
Production remains independent. This is a design experiment, not a release.

## Direction
Language emerging from glass: a typographic product stage, a floating unaltered typing film, quiet horizontal rules and generous editorial space. Apple, Linear and Vercel are references for restraint, not copied identities. All original Burmese/English copy, navigation destinations, release references and integrations remain.

## Website inventory
Sticky navigation; hero and download CTA; quick-start strip; live typing example; cinematic typing video; download card; installation steps and images; feature grid; release metadata; About and My Story long-form sections; support links; contact glass form; footer. Existing automatic page scrolling, mailto contact behavior and analytics remain. Mobile navigation now scrolls horizontally rather than hiding destinations.

## Tokens
- Canvas #101010; elevated surface #1b1b1b.
- Text #f5f5f5; secondary #bcbcbc.
- Decorative rule #454545; form control boundary #777.
- Glass rgba(32,32,32,.88); white edges at .14/.35 alpha.
- System typography: Segoe UI, Myanmar Text, Arial, sans-serif. No external font dependency.
- Main content max-width 1160px; navigation 1360px; hero 1000px.
- Section spacing 112px desktop / 72px mobile; fluid gutters 20–64px.
- Display heading 43–100px; body 16px with generous Burmese line-height.
- Glass radius 24px, inner video 16px; mobile 17px/12px.
- Black, white and neutral grays only in authored UI. Original media can retain its original colors.

## Media
Original MP4 files, source paths, loop, muted, autoplay and playsinline attributes are retained. Typing video is opacity 1 with no filter. Background video uses a neutral CSS presentation (grayscale, .13 opacity); the original file is unchanged. Pause/Play videos is added for visitor control. The existing canplay callback respects explicit user pause.

## Motion
Natural cubic-bezier(.2,.7,.2,1); hero 600ms, section reveal 550ms, stagger capped at 180ms. Transforms travel 14px; ambient entrance runs once over 900ms. Hover raises the display 4px with a 1-degree tilt. Buttons respond in 160ms. No added perpetual animation or animation library. IntersectionObserver disconnects each revealed target.
Reduced-motion CSS removes all added animation, transitions and smooth scrolling; the existing reduced-motion auto-scroll guard remains. Background is hidden. Typing-video autoplay remains as requested, with an explicit pause control. Keyboard focus now pauses automatic scrolling.

## Reference workflows and compatibility
Inspected README, usage/install instructions and MIT license metadata:
- https://github.com/VoltAgent/awesome-design-md — documentation collection; applied token and design-system documentation approach; no install required.
- https://github.com/Nutlope/hallmark — v2.0.0, reviewed at 4f6a46c6dc325d40ab268c93e25c7b96676ebccd. Read redesign, direction, craft and patterns guidance; ran its Node static audit locally and a fresh-context source review. Not globally installed. Render audit requires unavailable puppeteer-core; used supported cloud browser separately.
- https://github.com/LottieFiles/motion-design-skill — read motion-design SKILL.md and documentation. Applied premium timing, purposeful movement and reduced-motion principles. No Lottie asset/runtime added: DOM transitions are sufficient.

No third-party runtime code or visual assets from these projects are bundled. MIT-licensed guidance informs original implementation.

## Review decisions
Hallmark's opinionated copy/style rules conflict with the requirement to retain all existing content and use glass illumination. Preserve labels, metadata, arrows, and long-form story; document static findings rather than deleting content to obtain a clean score. Decorative dividers stay quiet; form boundaries use stronger contrast. See QA.md for actual evidence and limitations.
