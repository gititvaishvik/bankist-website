'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(ele => ele.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent = 'we use cookie to improve user experince';
message.innerHTML =
  'we use cookie to improve user experince<button class="btn btn--close-cookie">got it</button>';
header.prepend(message);
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });
message.style.backgroundColor = '#ff585f';
message.style.width = '115%';

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 5 + 'px';
const btnScrollto = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollto.addEventListener('click', function (e) {
  let s1coord = section1.getBoundingClientRect();
  //console.log(window.pageYOffset);
  window.scrollTo({
    left: s1coord.left,
    top: s1coord.top + window.pageYOffset,
    behavior: 'smooth',
  });
});

const randomInt = (max, min) =>
  Math.trunc(Math.random() * (max - min + 1) + min);
const randomColor = `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(
  0,
  255
)})`;

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    let id = e.target.getAttribute('href');

    let section = document.querySelector(id);
    section.scrollIntoView({ behavior: 'smooth' });
  }
});
//document.querySelector('.nav').addEventListener('click', function () {});
const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach(ele => ele.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  // console.log(e.target.dataset.tab);
  // document.querySelector('');
  tabsContent.forEach(ele =>
    ele.classList.remove('operations__content--active')
  );
  let x = Number(clicked.dataset.tab) - 1;
  tabsContent[x].classList.add('operations__content--active');
});
//console.log(tabs[1]);

const nav = document.querySelector('.nav');

nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target.closest('.nav').querySelectorAll('.nav__link');
    link.forEach(ele => {
      if (ele !== e.target) ele.style.opacity = 0.5;
    });
  }
});

nav.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target.closest('.nav').querySelectorAll('.nav__link');
    link.forEach(ele => {
      if (ele !== e.target) ele.style.opacity = 1;
    });
  }
});

// const obs = function (entries, observer) {
//   entries.forEach(ele => {
//     console.log(ele);
//   });
//   //nav.classList.add('sticky');
// };
// const option = {
//   root: null,
//   threshold: 0.1,
// };
// const observer = new IntersectionObserver(obs, option);
// observer.observe(section1);
///const header = document.querySelector('.header');
const looknav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};
const observer = new IntersectionObserver(looknav, {
  root: null,
  threshold: 0,
});
observer.observe(header);
//reveal section
const sections = document.querySelectorAll('.section');

const showSection = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }

  //.classList.remove('section--hidden');
};

const sectionObserver = new IntersectionObserver(showSection, {
  root: null,
  threshold: 0.1,
});

sections.forEach(ele => {
  sectionObserver.observe(ele);
});

// loading images

const allImages = document.querySelectorAll('img[data-src]');
const loadimg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadimg, {
  root: null,
  threshold: 0,
});

allImages.forEach(i => imgObserver.observe(i));

//slider
const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
let currSlide = 0;
const maxSlide = slides.length - 1;
slides.forEach((ele, i) => {
  ele.style.transform = `translateX(${i * 100}%)`;
});

btnRight.addEventListener('click', function () {
  if (currSlide === maxSlide) {
    currSlide = 0;
  } else currSlide++;

  slides.forEach((ele, i) => {
    ele.style.transform = `translateX(${(i - currSlide) * 100}%)`;
  });
  activateDot(currSlide);
});

btnLeft.addEventListener('click', function () {
  if (currSlide === 0) {
    currSlide = maxSlide;
  } else currSlide--;

  slides.forEach((ele, i) => {
    ele.style.transform = `translateX(${(i - currSlide) * 100}%)`;
  });
  activateDot(currSlide);
});

const dots = document.querySelector('.dots');

const createdots = function () {
  slides.forEach((_, i) => {
    dots.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createdots();

const activateDot = function (i) {
  document.querySelectorAll('.dots__dot').forEach(ele => {
    ele.classList.remove('dots__dot--active');
  });
  document
    .querySelector(`.dots__dot[data-slide="${i}"]`)
    .classList.add('dots__dot--active');
};
const gotoSlide = function (cs) {
  slides.forEach((ele, i) => {
    ele.style.transform = `translateX(${(i - cs) * 100}%)`;
  });
};
dots.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    gotoSlide(slide);
    activateDot(slide);
  }
});
