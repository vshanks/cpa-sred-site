/* accounting.js: Accounting & tax page only (rotating hero word, call-planning checklist). Loaded with defer before </body> on that page. */

(function(){
  var W=["business","startup","law firm","accounting & tax needs"],w=document.querySelector(".rot-word"),i=0;
  if(w&&!matchMedia("(prefers-reduced-motion: reduce)").matches){w.style.transition="opacity .2s, background-size .45s cubic-bezier(.65,0,.35,1)";setInterval(function(){w.style.opacity=0;setTimeout(function(){i=(i+1)%W.length;w.textContent=W[i];w.style.transition="opacity .2s";w.style.backgroundSize="0% 14px";w.offsetWidth;w.style.transition="opacity .2s, background-size .45s cubic-bezier(.65,0,.35,1)";w.style.opacity=1;w.style.backgroundSize="100% 14px";},200);},2000);}

  /* Checklist: each .pf-item is a topic. Ticked = already handled. The .pf-line sentence lists what the free call would start with. */
  var T=["monthly close","CRA deadlines","year-end planning","salary vs. dividends","long-term tax strategy"],items=[].slice.call(document.querySelectorAll(".pf-item")),line=document.querySelector(".pf-line");
  function paint(el,on){var b=el.querySelector(".pf-box");el.dataset.on=on?"1":"";el.setAttribute("aria-pressed",on);b.textContent=on?"✓":"";b.style.background=on?"#d9366f":"#ffffff";b.style.borderColor=on?"#d9366f":"#6b6572";el.style.borderColor=on?"#ebe8e9":"#b9b4bd";el.style.color=on?"#6b6572":"#1a1620";}
  function join(a){return a.length<2?a.join(""):a.slice(0,-1).join(", ")+" and "+a[a.length-1];}
  function update(){var open=T.filter(function(x,n){return items[n]&&!items[n].dataset.on;});if(line)line.textContent=open.length?"We’d start with "+join(open)+".":"You’re in good shape. We’d look for what’s next.";}
  items.forEach(function(el){paint(el,!!el.querySelector(".pf-box").textContent.trim());el.setAttribute("role","button");el.addEventListener("click",function(e){e.preventDefault();paint(el,!el.dataset.on);update();});});
  update();
})();
