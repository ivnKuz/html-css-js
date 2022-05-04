"use strict";
const carouselSlide = document.querySelector(".carousel-slide");
const carouselImages = document.querySelectorAll(".carousel-slide img");
//Buttons
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

//position in the container, beginning with 0
let counter = 0;
//taking the width of the first img, they all have width of 750px
const size = carouselImages[0].clientWidth;

// carousel buttons
nextBtn.addEventListener("click", () => {
  //if it gets to the last image and button next pressed, it goes back to first
  if (carouselImages.length - 1 <= counter) counter = -1;
  counter++;
  //moving imgaes on axis X mulitpying by counter
  carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
});
prevBtn.addEventListener("click", () => {
  //if pressed on previous on a first image, it goes to last image.
  if (counter <= 0) counter = carouselImages.length;
  counter--;
  carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
});

//creating a sleep function that will set a timer
const sleep = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });
};
//recursive async function that every 3 seconds sliding images forward
async function myFunc() {
  await sleep(3000);
  if (carouselImages.length - 1 <= counter) counter = -1;
  counter++;
  carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  myFunc();
}

myFunc();

//implementing the enlargment functionality
//getting modal elements
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const content = document.querySelector(".modal-content img");
//looping through all the images, assigning onclick function
for (let x = 0; x < carouselImages.length; x++) {
  carouselImages[x].addEventListener("click", () => {
    //making model appear and show enlarged image
    modal.style.display = "block";
    content.src = carouselImages[x].src;
  });
}
//close modal button
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
