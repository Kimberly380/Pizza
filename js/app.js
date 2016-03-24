

//hours array (placeholders: 6=0, 1am = 19)
// var hoursArrayAll = [6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5]
//
// function hoursList (startTime, endTime){
//     var hoursArrayStore=[];
//         for (i = startTime; i <= endTime ; i++){
//         hoursArrayStore.push(hoursArrayAll[i]+":00");
//           }
//           return hoursArrayStore
// }
//   console.log(hoursList(2,19));
//

//establish array for time selection
  var timeArray=[];
  var openHours=[];
    for (i=0; i <25 ; i++){
        if (i >12) {
          timeArray.push((i-12) +":00pm");
        }else {
          timeArray.push(i+":00am");
          }
        }


//establish global variables
var pizzaSalesCalculated = [0];
var deliveriesCalculated = [0];



//for first pass, use the following array for the time column of the store tables, as well as the max iterations of i in the for loop of  table generation.
var hoursArrayStore = ["8:00", "9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "1:00"];

// // //###################################################################################333
// //
//create store object template:

function Store (storeName, location, phone, openTime, closeTime, days, pizzaSalesRawData, deliveryRawData) {
    this.storeName = storeName;
    this.location = location;
    this.phone = phone;
    this.storeHours = function (openTime,closeTime){
          var open = timeArray[openTime];
          var closed = timeArray[closeTime];
          return [open,closed];
        };
    this.days = days;
    this.pizzaSalesRawData = pizzaSalesRawData;
    this.pizzaSalesMinMax = function (){
                                pizzaSalesCalculated = [];
                                for (i=0; i < this.pizzaSalesRawData.length ; i++){
                                pizzaSalesCalculated.push(minMax(this.pizzaSalesRawData[i][0], this.pizzaSalesRawData[i][1]));
                                  }
                                };
    this.pizzaSalesSumTotal = pizzaSalesCalculated.reduce(function(a,b){
                                return a+b;
                              });
    this.deliveryRawData = deliveryRawData;
    this.deliveryMinMax=    function (){
                              deliveriesCalculated = [];
                              for (i=0; i < this.deliveryRawData.length ; i++){
                                deliveriesCalculated.push(minMax(this.deliveryRawData[i][0], this.deliveryRawData[i][1]));
                                }
                              };
    this.deliverySalesSumTotal = deliveriesCalculated.reduce(function(a,b){
                                return a+b;
                              });
}


//##############################################################################################################################################

//INPUT STORE DATA

var beaverton = new Store("Beaverton", "some address", "555-555-5555", 8, 1, "Open 7 Days a Week", [[0,4],[0,4],[0,4],[0,7],[0,7],[0,7],[2,15],[2,15],[2,15],[15,35],[15,35],[15,35],[12,31],[12,31],[12,31],[5,20],[5,20],[5,20]],[[0,4],[0,4],[0,4],[0,4],[0,4],[0,4],[1,4],[1,4],[1,4],[3,8],[3,8],[3,8],[5,12],[5,12],[5,12],[6,11],[6,11],[6,11]]);

console.log(beaverton.pizzaSalesMinMax());

//###############################################################################################

//STORE LOCATIONS AND hours


// for (i=0; i < stores.length; i++){
//
//   var storeContact = document.getElementById("store"+i);
//
//   if(storeContact){       //need if statement for other web pages that do not have this element Id.
//   storeContact.textContent=stores[i].storeName+" \r "+stores[i].location+" \r "+stores[i].phone+" \r "+stores[i].storeHours+", "+stores[i].days;
// }
// }
// //ok, so that kind of worked :)  Still need to format and find out how to add carriage returns & list open time and close time separately wih a "-"
//
//
// //##################################################################################################
//
// //total number of pizzas sold (pizza Odysseys)
// //hmmmm, what's this reduce thing I'm reading about...let's see if it works....
//
// var totalOdysseysSetup = []  //establish array for summing using reduce
//
// //functioin to loop through pizza sales using min/max, loops through all array items in pizzaSales for each store. store loop defined below.
//   function calculateTotal (something) {
//   for (i=0; i < stores[j].pizzaSales.length ; i++) {
//       totalOdysseysSetup.push(minMax(stores[j].pizzaSales[i][0], stores[j].pizzaSales[i][1]));
//   }
// }
//
// //loop through all stores.
//   for (j=0; j < stores.length ; j++){
//           calculateTotal(stores[j]);
//   }
//
// //here's the reduce to add all items in the array
// var totalOdysseysSum = totalOdysseysSetup.reduce(function(a,b){
//     return a+b;
//   });
//
//   console.log(totalOdysseysSetup);
//   console.log(totalOdysseysSum);  //whoa...it worked!
//
// //final push to webpage
//
// var totalOdesseyPush = document.getElementById("happyOdysseys");
//
// if(totalOdesseyPush){                        //need if statement so this will not affect other pages that do not have this reference.
// totalOdesseyPush.textContent = totalOdysseysSum + " happy Pizza Odysseys this week!";  //would like to number format this...
// }
//
// //###################################################################################################
//
//
// //min max function
//
//
//
// // //############################################################################
//
// //CREATE TABLE
//
//
// function generate_table(obj){
//
// var putTableHere = document.getElementById("putTableHere");
// var tbl = document.createElement("table");   //create table
// var tblBody = document.createElement("tbody");  //create body of table
//
//
// //create table header for store name (fingers crossed??  YAY!!!!! IT F-ING WORKED!!!! (can I say that in homework?)
// var headerRow = document.createElement("tr");  //creates table row for heder
//
// var tblheader = document.createElement("TH");
// var headerText = document.createTextNode(stores[j].storeName);
// tblheader.appendChild(headerText);
// headerRow.appendChild(tblheader);
// tblBody.appendChild(headerRow);
//
//
// //ok now that I figured out the store name header, the column headers should be easier...
// var headerRow = document.createElement("tr");  //creates table row for heder
//
// //column one header
// var tblheader = document.createElement("TH");
// var headerText = document.createTextNode("Hour");
// tblheader.appendChild(headerText);
// headerRow.appendChild(tblheader);
// tblBody.appendChild(headerRow);
//
// //column two header
// var tblheader = document.createElement("TH");
// var headerText = document.createTextNode("Pizzas Sold");
// tblheader.appendChild(headerText);
// headerRow.appendChild(tblheader);
// tblBody.appendChild(headerRow);
//
// //column three header
// var tblheader = document.createElement("TH");
// var headerText = document.createTextNode("Deliveries");
// tblheader.appendChild(headerText);
// headerRow.appendChild(tblheader);
// tblBody.appendChild(headerRow);
//
// //column four header
// var tblheader = document.createElement("TH");
// var headerText = document.createTextNode("Drivers Needed");
// tblheader.appendChild(headerText);
// headerRow.appendChild(tblheader);
// tblBody.appendChild(headerRow);
//
//
// //start of hourly store table creation
// for (var i=0; i<hoursArrayStore.length; i++) {
//
// var row = document.createElement("tr");  //creates table row
//
//
// //create rows for time slots
// //NOTE: STILL NEED TO WORK OUT KINKS FOR MIDNIGHT CROSSOVER...
//
//     var cellTimeslots = document.createElement("td");
//     var cellTextTimeslots = document.createTextNode(hoursArrayStore[i]);
//     cellTimeslots.appendChild(cellTextTimeslots);
//     row.appendChild(cellTimeslots);
//
// //create rows for pizza sales
//
//     var cellPizzas = document.createElement("td");
//     var pizzaData = minMax(stores[j].pizzaSales[i][0], stores[j].pizzaSales[i][1]); //determins random number based on pizzaSales array.
//     var cellTextPizzas = document.createTextNode(pizzaData);  //puts random number into text node for table.
//     cellPizzas.appendChild(cellTextPizzas);
//     row.appendChild(cellPizzas);
//
// //create rows for # of deliveries
//     var cellDeliveries = document.createElement("td");
//     var deliveryData;
//         if ( minMax(stores[j].delivery[i][0], stores[j].delivery[i][1]) > pizzaData ){
//                 deliveryData = pizzaData;
//             } else {
//                 deliveryData = minMax(stores[j].delivery[i][0], stores[j].delivery[i][1])
//             }
//     var cellTextDeliveries = document.createTextNode(deliveryData);
//     cellDeliveries.appendChild(cellTextDeliveries);
//     row.appendChild(cellDeliveries);
//
// //create rows for drivers needed
//     var cellDrivers = document.createElement("td");
//     var driverData = Math.ceil(deliveryData/3);
//     var cellTextDrivers = document.createTextNode(driverData);
//     cellDrivers.appendChild(cellTextDrivers);
//     row.appendChild(cellDrivers);
//
//
// tblBody.appendChild(row);
//
// }
//
// tbl.appendChild(tblBody);
//
// if(putTableHere){
// putTableHere.appendChild(tbl);
// }
//
// tbl.setAttribute("border","2");
// }
//
//
//
// //function to loop through store objects and build table for each
// function makeAllTables(stores){
//       for ( j= 0 ; j < stores.length ; j++){
//         generate_table(stores[j]);
//     }
//       }
//
// makeAllTables(stores);
