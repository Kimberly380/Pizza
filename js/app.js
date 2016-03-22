
//define min/max random function

//create store objects:
var store = {
    storeName: Beaverton,
    location: put fake address here,
    phone: 555-555-5555,
    hours: storeHours[0] + " - " + storeHours[20]



}




//create hours array
var storeHours = ["8:00am", "9:00am", "10:00am", "11:00am", "12:00pm", "1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm", "7:00pm", "8:00pm", "9:00pm", "10:00pm", "11:00pm", "12:00am", "1:00am", "2:00am", "3:00am"]


///min max function for pizzas
function minMax (min, max) {
  return Math.floor(Math.random() * (max-min)) + min;
}








var randomNum = document.getElementById("minMax");
randomNum.textContent = minMax(0,4);
