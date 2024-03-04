const sliderWrapper = document.querySelector('.slider-wrapper'); // container

let showItem = parseInt(
  window.getComputedStyle(sliderWrapper).getPropertyValue('--show-item'),
  10
);

let itemsPerSlide = parseInt(
  window.getComputedStyle(sliderWrapper).getPropertyValue('--item-slide'),
  10
);

const slider = sliderWrapper.querySelector('.slider'); //  slide
let sliderItems = slider.querySelectorAll('li'); // slider item
let sliderItemWidth = sliderItems[0].offsetWidth; // single Item width

let movableItemWidth = sliderItemWidth * itemsPerSlide;

const nextBtn = document.querySelector('.right');
const prevBtn = document.querySelector('.left');

let currentIndex = 1;

for (let index = 0; index < showItem; index++) {
  const firstClone = sliderItems[index].cloneNode(true);
  firstClone.classList.add('clone');
  firstClone.classList.remove('active');
  slider.append(firstClone);
}

for (let index = 1; index <= showItem; index++) {
  const lastClone = sliderItems[sliderItems.length - index].cloneNode(true);
  lastClone.classList.add('clone');
  lastClone.classList.remove('active');
  slider.prepend(lastClone);
}

/*
const firstClone1 = sliderItems[0].cloneNode(true);
const firstClone2 = sliderItems[1].cloneNode(true);

const lastClone1 = sliderItems[sliderItems.length - 1].cloneNode(true);
const lastClone2 = sliderItems[sliderItems.length - 2].cloneNode(true);

firstClone1.classList.add('clone');
firstClone2.classList.add('clone');

firstClone1.classList.remove('active');
firstClone2.classList.remove('active');

lastClone1.classList.add('clone');
lastClone2.classList.add('clone');

lastClone1.classList.remove('active');
lastClone2.classList.remove('active');

slider.append(firstClone1);
slider.prepend(lastClone1);
*/
sliderItems = slider.querySelectorAll('li');

sliderItems.forEach((item, indx) => {
  if (item.classList.contains('active')) {
    currentIndex = indx;
    slider.style.transform = `translateX(-${sliderItemWidth * currentIndex}px)`;
  }
});

// Prev
prevBtn.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('btn', currentIndex);
  //if (currentIndex === 3) return;
  currentIndex -= itemsPerSlide;

  slider.classList.add('animating');
  slider.style.transform = `translateX(-${sliderItemWidth * currentIndex}px)`;
  // slider.style.transition = '.7s';
});

// Next
nextBtn.addEventListener('click', (event) => {
  event.preventDefault();
  // if (currentIndex === sliderItems.length - itemsPerSlide) return; //
  // sliderItems.forEach((item) => item.classList.remove('active'));
  currentIndex += itemsPerSlide;

  slider.classList.add('animating');
  slider.style.transform = `translateX(-${sliderItemWidth * currentIndex}px)`;
  // slider.style.transition = '.7s';
  // sliderItems[currentIndex].classList.add('active');
});

slider.addEventListener('transitionstart', (event) => {
  sliderItems.forEach((item) => {
    item.classList.remove('active');
  });
});

slider.addEventListener('transitionend', (event) => {
  slider.classList.remove('animating');

  // next...

  const visibleStartIndex = currentIndex;
  const visibleStartEnd = visibleStartIndex + itemsPerSlide;
  const possibleNextIndex = visibleStartEnd + itemsPerSlide;
  const totalItems = sliderItems.length;

  console.log('start index', visibleStartIndex, 'last index', visibleStartEnd);
  console.log('maybe', possibleNextIndex, 'total item', totalItems);

  return;

  if (currentIndex >= sliderItems.length - itemsPerSlide * 2) {
    //
    currentIndex = itemsPerSlide;
    // slider.style.transition = 'none';
    slider.style.transform = `translateX(-${sliderItemWidth * currentIndex}px)`;
  }

  console.log('end', currentIndex);

  // prev...
  if (currentIndex === 0) {
    currentIndex = sliderItems.length - 2 * itemsPerSlide;
    // slider.style.transition = 'none';
    slider.style.transform = `translateX(-${sliderItemWidth * currentIndex}px)`;
  }

  sliderItems.forEach((item, indx) => {
    if (indx === currentIndex) {
      item.classList.add('active');
    }
  });
});

/*
prevBtn.addEventListener('click', (event) => {
  event.preventDefault();

  sliderItems = slider.querySelectorAll('li');
  if (currentIndex === 0) return;
  currentIndex--;
  slider.style.transform = `translateX(${
    -sliderItemWidth * currentIndex * showItem
  }px)`;
  slider.style.transition = '.7s';
});

nextBtn.addEventListener('click', (event) => {
  event.preventDefault();

  sliderItems = slider.querySelectorAll('li');
  if (currentIndex === sliderItems.length - 1) return;
  currentIndex++;

  console.log(currentIndex);
  slider.style.transform = `translateX(${
    -sliderItemWidth * currentIndex * showItem
  }px)`;
  slider.style.transition = '.7s';
});

/*
slider.addEventListener('transitionend', (event) => {
  if (currentIndex === sliderItems.length - 1) {
    slider.style.transition = 'none';
    currentIndex = 1;
    slider.style.setProperty('--item-index', currentIndex);
  }
  if (currentIndex === 0) {
    slider.style.transition = 'none';
    currentIndex = 3;
    slider.style.setProperty('--item-index', currentIndex);
  }
});
*/
