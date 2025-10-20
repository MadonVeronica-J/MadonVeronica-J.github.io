// AOS init: repeat animations on scroll (both directions)
AOS.init({
  duration: 800,
  once: false,    // do not restrict to one-time
  mirror: true    // animate elements when scrolling past in opposite direction
});

// Smooth scroll for sidebar links with active-link handling
const links = document.querySelectorAll('.sidebar a[href^="#"]');
links.forEach(link=>{
  link.addEventListener('click', (e)=>{
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const el = document.getElementById(targetId);
    if(!el) return;
    // scroll top with slight offset
    el.scrollIntoView({behavior:'smooth', block:'start'});
    // update active class (small delay so scroll can start)
    links.forEach(l=>l.classList.remove('active'));
    link.classList.add('active');
  });
});

// IntersectionObserver to update active sidebar link when section enters viewport
const sections = document.querySelectorAll('main .section, #hero');
const observerOptions = { root: null, rootMargin: '-30% 0px -30% 0px', threshold: 0 };
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    const id = entry.target.id;
    const sideLink = document.querySelector(`.sidebar a[href="#${id}"]`);
    if(entry.isIntersecting){
      // highlight
      if(sideLink){
        document.querySelectorAll('.sidebar a').forEach(a=>a.classList.remove('active'));
        sideLink.classList.add('active');
      }
    }
  });
}, observerOptions);
sections.forEach(sec => obs.observe(sec));

// Project details toggle (open/close)
document.querySelectorAll('.project .btn.small').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    const openId = btn.getAttribute('data-open');
    if(!openId) return;
    const details = document.getElementById(openId);
    if(!details) return;
    const card = btn.closest('.project');
    card.classList.toggle('open');
    // optionally scroll the project into view so details are visible
    if(card.classList.contains('open')){
      card.scrollIntoView({behavior:'smooth', block:'center'});
    }
  });
});

// Close project details when clicking outside a project (optional)
document.addEventListener('click', (e)=>{
  const isProj = e.target.closest('.project');
  if(!isProj){
    document.querySelectorAll('.project.open').forEach(p=>p.classList.remove('open'));
  }
});
