
//define min/max random function

function minMax (min, max) {
  return Math.floor(Math.random() * (max-min)) + min;
}

var randomNum = document.getElementById("minMax");
randomNum.textContent = minMax(0,4);
