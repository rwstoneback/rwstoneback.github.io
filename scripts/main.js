$(document).ready( onDocumentLoad() );

function onDocumentLoad()
{
  updateBgImage();
}

//Function: updateBgImage
//  Changes the header's background image depending on the season/month
function updateBgImage()
{
  const d = new Date();
  const month = d.getMonth();

  let imgPath = '';

  //Dec, Jan, Feb
  if(month === 11 || (month >= 0 && month <= 1))
  {
    imgPath = 'images/winter.jpg';
  }
  //March, Apr, May
  else if(month >= 2 && month <= 4)
  {
    imgPath = 'images/spring.jpg';
  }
  //June, July, Aug
  else if(month >= 5 && month <= 7)
  {
    imgPath = 'images/summer.jpg';
  }
  //Sept, Oct, Nov
  else if(month >= 8 && month <= 10)
  {
    imgPath = 'images/fall.jpg';
  }

  $('header').css('background-image', `url( ${imgPath} )`)
}
