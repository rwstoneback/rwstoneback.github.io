$(document).ready(onDocumentLoad());

function onDocumentLoad() {
  updateBgImage();
  updateYearsExperience();
}

//Function: updateBgImage
//  Changes the header's background image depending on the season/month
function updateBgImage() {
  const d = new Date();
  const month = d.getMonth();

  let imgPath = '';

  //Dec, Jan, Feb
  if (month === 11 || (month >= 0 && month <= 1)) {
    imgPath = 'images/winter.jpg';
  }
  //March, Apr, May
  else if (month >= 2 && month <= 4) {
    imgPath = 'images/spring.jpg';
  }
  //June, July, Aug
  else if (month >= 5 && month <= 7) {
    imgPath = 'images/summer.jpg';
  }
  //Sept, Oct, Nov
  else if (month >= 8 && month <= 10) {
    imgPath = 'images/fall.jpg';
  }

  $('header').css('background-image', `url( ${imgPath} )`)
}

//Function: updateYearsExperience
//  Dynamically updates the years of experience based on the current year
function updateYearsExperience() {
  const startYear = 2008;
  const currentYear = new Date().getFullYear();
  const years = currentYear - startYear;
  const el = document.getElementById('yearsExperience');
  if (el) {
    el.textContent = years;
  }
}
