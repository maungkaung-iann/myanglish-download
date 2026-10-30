(() => {
  'use strict';
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const targets = document.querySelectorAll('.section-title, .feature, .download-card, .release-card, .myanglish-message-glass');
  let observer;
  function configure() {
    if (observer) observer.disconnect();
    targets.forEach(el => el.classList.remove('fx-arrive'));
    if (motion.matches || !('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('fx-arrive');
        observer.unobserve(entry.target);
      });
    }, { threshold: .08 });
    targets.forEach(el => observer.observe(el));
  }
  configure();
  motion.addEventListener?.('change', configure);
  const nav = document.querySelector('nav');
  let pending = false;
  function updateNav() {
    nav?.classList.toggle('fx-scrolled', window.scrollY > 24);
    pending = false;
  }
  window.addEventListener('scroll', () => {
    if (!pending) { pending = true; requestAnimationFrame(updateNav); }
  }, { passive: true });
  updateNav();
})();

/* Small electric corona and a bounded, time-based trail. No tracking data stored. */
(() => {
 'use strict';
 const eligible = matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
 const contrast = matchMedia('(forced-colors:active)');
 const canvas = document.createElement('canvas');
 canvas.className = 'electric-cursor';
 canvas.setAttribute('aria-hidden','true');
 const ctx = canvas.getContext('2d');
 if (!ctx) return;
 document.body.appendChild(canvas);
 let points=[], frame=0, active=false, x=0, y=0, lastMove=0, dpr=1;
 const allowed=()=>eligible.matches && !contrast.matches && !document.hidden;
 function resize() {
   dpr=Math.min(devicePixelRatio||1,2);
   canvas.width=Math.round(innerWidth*dpr); canvas.height=Math.round(innerHeight*dpr);
   ctx.setTransform(dpr,0,0,dpr,0,0);
   stop();
 }
 function stop() {
   cancelAnimationFrame(frame); frame=0; active=false; points=[];
   ctx.clearRect(0,0,innerWidth,innerHeight);
 }
 function draw(now) {
   frame=0;
   if (!allowed() || !active) { stop(); return; }
   ctx.clearRect(0,0,innerWidth,innerHeight);
   points=points.filter(p=>now-p.t<320);
   for(let i=1;i<points.length;i++) {
     const p=points[i], prev=points[i-1];
     const alpha=Math.max(0,1-(now-p.t)/320);
     ctx.beginPath(); ctx.moveTo(prev.x,prev.y); ctx.lineTo(p.x,p.y);
     ctx.strokeStyle='rgba(0,165,255,'+(alpha*.5)+')';
     ctx.lineWidth=1.5; ctx.shadowBlur=8; ctx.shadowColor='#008cff'; ctx.stroke();
   }
   ctx.shadowBlur=0;
   const glow=ctx.createRadialGradient(x,y,1,x,y,23);
   glow.addColorStop(0,'rgba(185,250,255,.7)');
   glow.addColorStop(.28,'rgba(0,190,255,.3)');
   glow.addColorStop(1,'rgba(0,95,255,0)');
   ctx.fillStyle=glow; ctx.fillRect(x-23,y-23,46,46);
   // Stable branching rays: no flashing or random per-frame flicker.
   ctx.strokeStyle='rgba(30,165,255,.75)'; ctx.lineWidth=.8;
   ctx.shadowColor='#00baff'; ctx.shadowBlur=5;
   for(let i=0;i<9;i++) {
     const a=i*Math.PI*2/9;
     const radius=12+(i%3)*3;
     ctx.beginPath(); ctx.moveTo(x+Math.cos(a)*4,y+Math.sin(a)*4);
     ctx.lineTo(x+Math.cos(a+.16)*8,y+Math.sin(a+.16)*8);
     ctx.lineTo(x+Math.cos(a-.1)*radius,y+Math.sin(a-.1)*radius); ctx.stroke();
   }
   ctx.shadowBlur=0;
   if(now-lastMove<360) frame=requestAnimationFrame(draw);
 }
 addEventListener('pointermove',e=>{
   if(e.pointerType!=='mouse' || !allowed()) { stop(); return; }
   // Keep text fields visually clear and preserve native interaction cursors.
   if(e.target instanceof Element && e.target.closest('input,textarea,[contenteditable="true"]')) { stop(); return; }
   x=e.clientX; y=e.clientY; active=true; lastMove=performance.now();
   points.push({x,y,t:lastMove}); if(points.length>24) points.shift();
   if(!frame) frame=requestAnimationFrame(draw);
 },{passive:true});
 document.documentElement.addEventListener('pointerleave',stop);
 addEventListener('blur',stop);
 addEventListener('scroll',stop,{passive:true});
 document.addEventListener('visibilitychange',stop);
 eligible.addEventListener('change',stop); contrast.addEventListener('change',stop);
 addEventListener('resize',resize,{passive:true}); resize();
})();
