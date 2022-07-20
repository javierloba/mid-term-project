// Modificar el color de los links del menú en función de la URL
let highlightCurrent = () => {
    const curPage = document.URL;
    const links = document.querySelectorAll('nav ul li a');
    for (let link of links) {
      if (link.href == curPage) {
        link.classList.add("md:text-blue-aqua", "text-blue-aqua");
      }
    }
  }

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    highlightCurrent()
  }
};

// Lógica menú burger

const menuBtn = document.querySelector('.menu-btn');
const menuNav = document.querySelector('.nav-small');
const body = document.querySelector('body')
let menuOpen = false;

window.addEventListener('resize', function() {
	let viewport_width = window.innerWidth;
  if (viewport_width >= 768) {
    menuNav.classList.remove('nav-open')
  } else if (viewport_width <= 768) {
    menuNav.classList.add('nav-open')
  }
});

menuBtn.addEventListener('click', () => {
  if (!menuOpen) {
    menuBtn.classList.add('open');
    menuNav.classList.remove('hidden')
    menuNav.classList.add('nav-open')
    body.classList.add('overflow-y-hidden')
    menuOpen = true;
  } else {
    menuBtn.classList.remove('open');
    menuNav.classList.add('hidden')
    menuNav.classList.remove('nav-open')
    body.classList.remove('overflow-y-hidden')
    menuOpen = false;
  }
})