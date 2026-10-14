
(() => {
 const menu=document.querySelector('.mobile-menu'),nav=document.querySelector('.site-nav');
 menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
 nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');}));
 const links=[...document.querySelectorAll('.site-nav a')];
 const update=()=>{let id='home';document.querySelectorAll('main section[id]').forEach(s=>{if(s.getBoundingClientRect().top<160)id=s.id;});if(innerHeight+scrollY>=document.documentElement.scrollHeight-5)id='contact';links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id));};
 addEventListener('scroll',update,{passive:true});update();
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 document.querySelectorAll('.course-domain').forEach(group=>{
  const btn=group.querySelector('.course-domain-summary'),panel=group.querySelector('.course-domain-panel');
  if(!btn||!panel)return;
  group.classList.remove('is-open');panel.style.height='0px';panel.style.opacity='0';btn.setAttribute('aria-expanded','false');
  btn.addEventListener('click',()=>{
   const open=!group.classList.contains('is-open');
   const current=panel.getBoundingClientRect().height;
   panel.style.height=current+'px';
   group.classList.toggle('is-open',open);btn.setAttribute('aria-expanded',String(open));
   if(reduced){panel.style.height=open?'auto':'0px';panel.style.opacity=open?'1':'0';return;}
   requestAnimationFrame(()=>{panel.style.height=(open?panel.scrollHeight:0)+'px';panel.style.opacity=open?'1':'0';});
  });
  panel.addEventListener('transitionend',e=>{if(e.propertyName==='height'&&group.classList.contains('is-open'))panel.style.height='auto';});
 });
 document.querySelectorAll('.expandable-project').forEach(card=>{
  const panel=card.querySelector('.project-repo-panel');if(!panel)return;
  const toggle=()=>{
   const open=!card.classList.contains('is-expanded'),height=panel.getBoundingClientRect().height;
   panel.style.height=height+'px';card.classList.toggle('is-expanded',open);
   card.setAttribute('aria-expanded',String(open));panel.setAttribute('aria-hidden',String(!open));
   if(reduced){panel.style.height=open?'auto':'0px';panel.style.opacity=open?'1':'0';return;}
   requestAnimationFrame(()=>{panel.style.height=(open?panel.scrollHeight:0)+'px';panel.style.opacity=open?'1':'0';});
  };
  card.addEventListener('click',e=>{if(e.target.closest('a,button'))return;toggle();});
  card.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target===card){e.preventDefault();toggle();}});
  panel.addEventListener('transitionend',e=>{if(e.propertyName==='height'&&card.classList.contains('is-expanded'))panel.style.height='auto';});
 });
})();
