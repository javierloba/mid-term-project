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

// Title focus

const title = document.title;
const blurMessage = "Hey, come back!";

window.addEventListener("blur", function() {
  document.title = blurMessage
});

window.addEventListener("focus", function() {
  document.title = title;
})

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

// API fetch

async function mergeData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const resPhotos = await fetch('https://jsonplaceholder.typicode.com/photos');
  const posts = await response.json();
  const images = await resPhotos.json();

  images.forEach(img => {
    delete img.albumId
    delete img.thumbnailUrl
    delete img.title
  })

  let data = posts.map((item, i) => Object.assign({}, item, images[i]))

  return data
}

async function buildPosts() {
  let posts = await mergeData();
  const imagenes = document.querySelectorAll('.image');
  const titles = document.querySelectorAll('.title')
  const subtitles = document.querySelectorAll('.subtitle')

  imagenes[0].src = posts[0].url
  imagenes[1].src = posts[1].url
  imagenes[2].src = posts[2].url

  titles[0].innerHTML = posts[0].title.slice(0,15)
  titles[1].innerHTML = posts[1].title.slice(0,15)
  titles[2].innerHTML = posts[2].title.slice(0,12)

  subtitles[0].innerHTML = posts[0].body
  subtitles[1].innerHTML = posts[1].body
  subtitles[2].innerHTML = posts[2].body
    
}

window.addEventListener('load', buildPosts)


// Contact

const question = document.querySelector('#question');
