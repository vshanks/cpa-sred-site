/* site.js: behaviour for every page (FAQ accordion, testimonial rail). Loaded with defer from the site-wide footer. */
function fdFaq(){document.querySelectorAll(".faq-item").forEach(function(it,n){var q=it.querySelector(".faq-q"),a=it.querySelector(".faq-a");if(!q||!a)return;a.id=a.id||"faq-a-"+n;q.setAttribute("role","button");q.setAttribute("tabindex","0");q.setAttribute("aria-controls",a.id);function set(o){it.classList.toggle("is-open",o);q.setAttribute("aria-expanded",o);a.style.maxHeight=o?a.scrollHeight+"px":"0";}set(false);q.addEventListener("click",function(){set(!it.classList.contains("is-open"));});q.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();q.click();}});});}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",fdFaq);else fdFaq();
function fdRail(){if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;document.querySelectorAll(".quote-rail").forEach(function(r){var paused=false,t;function step(){if(paused||document.hidden)return;var end=r.scrollLeft+r.clientWidth>=r.scrollWidth-4;r.scrollTo({left:end?0:r.scrollLeft+r.clientWidth*0.8,behavior:"smooth"});}function start(){clearInterval(t);t=setInterval(step,5000);}var s=r.closest("section")||r;s.addEventListener("mouseenter",function(){paused=true;});s.addEventListener("mouseleave",function(){paused=false;});s.addEventListener("focusin",function(){paused=true;});s.addEventListener("focusout",function(){paused=false;});r.addEventListener("touchstart",function(){paused=true;},{passive:true});r.addEventListener("touchend",function(){setTimeout(function(){paused=false;start();},4000);},{passive:true});s.addEventListener("click",function(e){if(e.target.closest("[data-rail]"))start();});start();});}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",fdRail);else fdRail();
document.addEventListener("click",function(e){var b=e.target.closest("[data-rail]");if(!b)return;e.preventDefault();var r=b.closest("section").querySelector(".quote-rail");if(r)r.scrollBy({left:(b.getAttribute("data-rail")==="next"?1:-1)*r.clientWidth*0.8,behavior:"smooth"});});

/* Booking check: "Do you own or run a business?" before Cal.com.
   Runs on any page that has the hidden .book-gate section (a Webflow component).
   Every link to cal.com/vipulj on that page opens the check first. Pages without
   the section are untouched, so their booking links go straight to Cal.com. */
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

/* Home: "Why one firm" venn diagram toggle and auto-play (section class why-one). Stops after a click; off for reduced motion. */
function fdVenn(){var rm=matchMedia("(prefers-reduced-motion: reduce)").matches;document.querySelectorAll(".why-one").forEach(function(s){var two=s.querySelector(".venn-btn-two"),one=s.querySelector(".venn-btn-one"),st=s.querySelector(".venn-stage"),manual=false;if(!two||!one)return;if(st){st.setAttribute("role","img");st.setAttribute("aria-label","Venn diagram. Accounting and tax, for every client: bookkeeping, payroll, HST, year-end statements, corporate tax. SR&ED, if you do R&D: technical report, claim, CRA review. Shaped by both: how you pay yourself, grants and funding, contractors versus staff, and when you file.");}s.querySelector(".venn-toggle").setAttribute("role","group");function set(m){s.classList.toggle("is-one",m);two.setAttribute("aria-pressed",m?"false":"true");one.setAttribute("aria-pressed",m?"true":"false");}[two,one].forEach(function(b){b.setAttribute("role","button");b.addEventListener("click",function(e){e.preventDefault();manual=true;set(b===one);});});set(false);if(!rm)setInterval(function(){if(!manual&&!document.hidden)set(!s.classList.contains("is-one"));},5200);});}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",fdVenn);else fdVenn();
