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
  if(month === 12 || (month >= 1 && month <= 2))
  {
    imgPath = 'images/winter.jpg';
  }
  //March, Apr, May
  else if(month >= 3 && month <= 5)
  {
    imgPath = 'images/spring.jpg';
  }
  //June, July, Aug
  else if(month >= 6 && month <= 8)
  {
    imgPath = 'images/summer.jpg';
  }
  //Sept, Oct, Nov
  else if(month >= 9 && month <= 11)
  {
    imgPath = 'images/fall.jpg';
  }

  $('header').css('background-image', `url( ${imgPath} )`)
}
