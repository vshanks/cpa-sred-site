/* accounting.js: Accounting & tax page only (rotating hero word, pre-flight checklist). Loaded with defer before </body> on that page. */

(function(){
  var W=["business","startup","law firm","accounting & tax needs"],w=document.querySelector(".rot-word"),i=0;
  if(w&&!matchMedia("(prefers-reduced-motion: reduce)").matches){w.style.transition="opacity .2s, background-size .45s cubic-bezier(.65,0,.35,1)";setInterval(function(){w.style.opacity=0;setTimeout(function(){i=(i+1)%W.length;w.textContent=W[i]+".";w.style.transition="opacity .2s";w.style.backgroundSize="0% 14px";w.offsetWidth;w.style.transition="opacity .2s, background-size .45s cubic-bezier(.65,0,.35,1)";w.style.opacity=1;w.style.backgroundSize="100% 14px";},200);},2000);}
  var T=["Monthly close","CRA deadlines","Year-end planning","SR&ED eligibility"],items=[].slice.call(document.querySelectorAll(".pf-item")),title=document.querySelector(".pf-title"),topics=document.querySelector(".pf-topics");
  function paint(el,on){var b=el.querySelector(".pf-box");el.dataset.on=on?"1":"";el.setAttribute("aria-pressed",on);b.textContent=on?"✓":"";b.style.background=on?"#d9366f":"#ffffff";b.style.borderColor=on?"#d9366f":"#6b6572";el.style.borderColor=on?"#f5f3f1":"#dcd8dd";el.style.color=on?"#6b6572":"#1a1620";}
  function update(){var open=T.filter(function(x,n){return !items[n]||!items[n].dataset.on;}),list=open.length?open:["Reporting","Cash flow","Upcoming changes"];if(title)title.textContent=open.length?open.length+(open.length===1?" topic":" topics")+" for your first call":"Covered. Let’s look past the basics.";if(topics){topics.innerHTML="";list.forEach(function(x){var s=document.createElement("span");s.className="pf-chip";s.textContent=x;topics.appendChild(s);});}}
  items.forEach(function(el){paint(el,!!el.querySelector(".pf-box").textContent.trim());el.setAttribute("role","button");el.addEventListener("click",function(e){e.preventDefault();paint(el,!el.dataset.on);update();});});
  update();
})();
