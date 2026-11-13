/* accounting.js: Accounting & tax page only. Loaded with defer before </body> on that page. */

/* 1. Rotating hero word + pre-flight checklist */
(function(){
  var W=["business","startup","law firm","accounting & tax needs"],w=document.querySelector(".rot-word"),i=0;
  if(w&&!matchMedia("(prefers-reduced-motion: reduce)").matches){w.style.transition="opacity .2s, background-size .45s cubic-bezier(.65,0,.35,1)";setInterval(function(){w.style.opacity=0;setTimeout(function(){i=(i+1)%W.length;w.textContent=W[i]+".";w.style.transition="opacity .2s";w.style.backgroundSize="0% 14px";w.offsetWidth;w.style.transition="opacity .2s, background-size .45s cubic-bezier(.65,0,.35,1)";w.style.opacity=1;w.style.backgroundSize="100% 14px";},200);},2000);}
  var T=["Monthly close","CRA deadlines","Year-end planning","SR&ED eligibility"],items=[].slice.call(document.querySelectorAll(".pf-item")),title=document.querySelector(".pf-title"),topics=document.querySelector(".pf-topics");
  function paint(el,on){var b=el.querySelector(".pf-box");el.dataset.on=on?"1":"";el.setAttribute("aria-pressed",on);b.textContent=on?"✓":"";b.style.background=on?"#d9366f":"#ffffff";b.style.borderColor=on?"#d9366f":"#6b6572";el.style.borderColor=on?"#f5f3f1":"#dcd8dd";el.style.color=on?"#6b6572":"#1a1620";}
  function update(){var open=T.filter(function(x,n){return !items[n]||!items[n].dataset.on;}),list=open.length?open:["Reporting","Cash flow","Upcoming changes"];if(title)title.textContent=open.length?open.length+(open.length===1?" topic":" topics")+" for your first call":"Covered. Let’s look past the basics.";if(topics){topics.innerHTML="";list.forEach(function(x){var s=document.createElement("span");s.className="pf-chip";s.textContent=x;topics.appendChild(s);});}}
  items.forEach(function(el){paint(el,!!el.querySelector(".pf-box").textContent.trim());el.setAttribute("role","button");el.addEventListener("click",function(e){e.preventDefault();paint(el,!el.dataset.on);update();});});
  update();
})();

/* 2. Booking check: "Do you own or run a business?" before Cal.com */
(function(){
  var g=document.querySelector(".book-gate"); if(!g) return;
  var q=function(s){return g.querySelector(s);};
  var yes=q(".gate-yes"), no=q(".gate-no"), go=q(".gate-go"), mY=q(".gate-msg-yes"), mN=q(".gate-msg-no"), x=q(".gate-close"), last=null;
  var CAL="https://cal.com/vipulj/30min";
  g.setAttribute("role","dialog"); g.setAttribute("aria-modal","true"); g.setAttribute("aria-label","Quick check before you book");
  [yes,no].forEach(function(b){b.setAttribute("role","button");});
  if(x) x.setAttribute("aria-label","Close");
  if(mY&&mY.parentNode) mY.parentNode.setAttribute("aria-live","polite");
  function setGo(on){ if(on){go.href=CAL;go.target="_blank";go.rel="noopener";go.removeAttribute("aria-disabled");go.tabIndex=0;}else{go.removeAttribute("href");go.setAttribute("aria-disabled","true");go.tabIndex=-1;} go.style.opacity=on?"1":".4"; go.style.cursor=on?"pointer":"not-allowed"; }
  function pick(v){ [[yes,"yes"],[no,"no"]].forEach(function(p){var on=p[1]===v; p[0].setAttribute("aria-pressed",on?"true":"false"); p[0].style.background=on?"#1a1620":"#ffffff"; p[0].style.color=on?"#f5f3f1":"#1a1620"; p[0].style.borderColor=on?"#1a1620":"#b9b4bd";}); mY.style.display=v==="yes"?"flex":"none"; mN.style.display=v==="no"?"flex":"none"; setGo(v==="yes"); }
  function open(){ last=document.activeElement; pick(null); g.style.display="flex"; document.body.style.overflow="hidden"; yes.focus(); }
  function shut(){ g.style.display="none"; document.body.style.overflow=""; if(last&&last.focus) last.focus(); }
  document.addEventListener("click",function(e){ var a=e.target.closest&&e.target.closest("a[href*='cal.com/vipulj']"); if(!a||g.contains(a)) return; e.preventDefault(); e.stopPropagation(); open(); },true);
  yes.addEventListener("click",function(e){e.preventDefault();pick("yes");});
  no.addEventListener("click",function(e){e.preventDefault();pick("no");});
  [yes,no].forEach(function(b){b.addEventListener("keydown",function(e){if(e.key===" "){e.preventDefault();b.click();}});});
  go.addEventListener("click",function(e){ if(go.getAttribute("aria-disabled")==="true"){e.preventDefault();return;} setTimeout(shut,0); });
  if(x) x.addEventListener("click",function(e){e.preventDefault();shut();});
  g.addEventListener("click",function(e){ if(e.target===g) shut(); });
  document.addEventListener("keydown",function(e){ if(e.key==="Escape"&&g.style.display==="flex") shut(); });
  setGo(false);
})();
