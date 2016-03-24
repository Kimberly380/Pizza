

//establish console log points, to check work.  this enables/disables the console log requests.
var checkYourWork = false;


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



//for first pass, use the following array for the time column of the store tables, as well as the max iterations of i in the for loop of  table generation.
var hoursArrayStore = ["8:00", "9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "1:00"];

// // //###################################################################################333
// //
//create store object template:

function Store (storeName, address, phone, openTime, closeTime, days, pizzaSalesRawData, deliveryRawData) {
    this.storeName = storeName;
    this.address = address;
    this.phone = phone;
    this.storeHours = function (openTime,closeTime){
          var open = timeArray[openTime];
          var closed = timeArray[closeTime];
          return [open,closed];
        };
    this.days = days;
    this.pizzaSalesRawData = pizzaSalesRawData;
    this.pizzaSalesCalculated = [];
    this.pizzaSalesMinMax = function (){
                                //this.pizzaSalesCalculated = [];
                                for (i=0; i < this.pizzaSalesRawData.length ; i++){
                                this.pizzaSalesCalculated.push(minMax(this.pizzaSalesRawData[i][0], this.pizzaSalesRawData[i][1]));
                                  }
                                };
    this.pizzaSalesMinMax();
    this.pizzaSalesSumTotal = this.pizzaSalesCalculated.reduce(function(a,b){
                                return a+b;
                              });
    this.deliveryRawData = deliveryRawData;
    this.deliveriesCalculated = [];
    this.deliveryMinMax=    function (){
                              this.deliveriesCalculated = [];
                              for (i=0; i < this.deliveryRawData.length ; i++){
                                    if(minMax(this.pizzaSalesRawData[i][0], this.pizzaSalesRawData[i][1])===0){
                                      this.deliveriesCalculated.push(0);   //this is not working!
                                    }   else if(minMax(this.deliveryRawData[i][0], this.deliveryRawData[i][1]) < minMax(this.pizzaSalesRawData[i][0], this.pizzaSalesRawData[i][1]))
                                     { this.deliveriesCalculated.push( minMax(this.deliveryRawData[i][0], this.deliveryRawData[i][1]));                                                         }  else {this.deliveriesCalculated.push(minMax(this.pizzaSalesRawData[i][0], this.pizzaSalesRawData[i][1]))};
                                     }
                                };

    //this.deliverySalesSumTotal = this.deliveriesCalculated.reduce(function(a,b){
                              //   return a+b;
                              // });

    this.tableGen = function (){
                        var putTableHere = document.getElementById("putSummaryTableHere");
                        var tbl = document.createElement("table");   //create table
                        var tblBody = document.createElement("tbody");
                        for (var i=0; i<hoursArrayStore.length; i++) {    //NOTE: NEED TO UPDATE THIS FOR MORE DYNAMIC ARRAY LENGTH...
                        var row = document.createElement("tr");  //creates table row

                        //create rows for time slots
                        //NOTE: STILL NEED TO WORK OUT KINKS FOR MIDNIGHT CROSSOVER...

                            var cellTimeslots = document.createElement("td");
                            var cellTextTimeslots = document.createTextNode(hoursArrayStore[i]);
                            cellTimeslots.appendChild(cellTextTimeslots);
                            row.appendChild(cellTimeslots);

                        //create rows for pizza sales
                            var cellPizzas = document.createElement("td");
                            var runPizzaSalesFunction = this.pizzaSalesMinMax();
                            var pizzaData = this.pizzaSalesCalculated[i];
                            var cellTextPizzas = document.createTextNode(pizzaData);  //puts pizza sales into text Node
                            cellPizzas.appendChild(cellTextPizzas);
                            row.appendChild(cellPizzas);

                            //create rows for # of deliveries
                                var cellDeliveries = document.createElement("td");
                                var runDeliveriesFunction = this.deliveryMinMax();
                                var deliveryData = this.deliveriesCalculated[i];
                                var cellTextDeliveries = document.createTextNode(deliveryData);
                                cellDeliveries.appendChild(cellTextDeliveries);
                                row.appendChild(cellDeliveries);

                            tblBody.appendChild(row);
                                }  //end for loop
                            tbl.appendChild(tblBody);

                            if(putTableHere){
                            putTableHere.appendChild(tbl);
                            }

                            tbl.setAttribute("border","2");
                            }


}








//##############################################################################################################################################

//INPUT STORE DATA

var beaverton = new Store("Beaverton", "some address", "555-555-5555", 8, 1, "Open 7 Days a Week", [[0,4],[0,4],[0,4],[0,7],[0,7],[0,7],[2,15],[2,15],[2,15],[15,35],[15,35],[15,35],[12,31],[12,31],[12,31],[5,20],[5,20],[5,20]],[[0,4],[0,4],[0,4],[0,4],[0,4],[0,4],[1,4],[1,4],[1,4],[3,8],[3,8],[3,8],[5,12],[5,12],[5,12],[6,11],[6,11],[6,11]]);

var hillsboro = new Store("Hillsboro", "some address", "555-555-5555", 8, 1, "Open 7 Days a Week", [[1,3],[1,3],[1,3],[5,9],[5,9],[5,9],[2,13],[2,13],[2,13],[18,32],[18,32],[18,32],[1,3],[1,3],[1,3],[8,20],[8,20],[8,20]],[[0,4],[0,4],[0,4],[0,4],[0,4],[0,4],[1,4],[1,4],[1,4],[3,8],[3,8],[3,8],[5,12],[5,12],[5,12],[6,11],[6,11],[6,11]]);

var downtown = new Store("Beaverton", "some address", "555-555-5555", 8, 1, "Open 7 Days a Week", [[0,4],[0,4],[0,4],[0,7],[0,7],[0,7],[2,15],[2,15],[2,15],[15,35],[15,35],[15,35],[12,31],[12,31],[12,31],[5,20],[5,20],[5,20]],[[0,4],[0,4],[0,4],[0,4],[0,4],[0,4],[1,4],[1,4],[1,4],[3,8],[3,8],[3,8],[5,12],[5,12],[5,12],[6,11],[6,11],[6,11]]);

var northeast = new Store("Beaverton", "some address", "555-555-5555", 8, 1, "Open 7 Days a Week", [[0,4],[0,4],[0,4],[0,7],[0,7],[0,7],[2,15],[2,15],[2,15],[15,35],[15,35],[15,35],[12,31],[12,31],[12,31],[5,20],[5,20],[5,20]],[[0,4],[0,4],[0,4],[0,4],[0,4],[0,4],[1,4],[1,4],[1,4],[3,8],[3,8],[3,8],[5,12],[5,12],[5,12],[6,11],[6,11],[6,11]]);

var clackamas = new Store("Beaverton", "some address", "555-555-5555", 8, 1, "Open 7 Days a Week", [[0,4],[0,4],[0,4],[0,7],[0,7],[0,7],[2,15],[2,15],[2,15],[15,35],[15,35],[15,35],[12,31],[12,31],[12,31],[5,20],[5,20],[5,20]],[[0,4],[0,4],[0,4],[0,4],[0,4],[0,4],[1,4],[1,4],[1,4],[3,8],[3,8],[3,8],[5,12],[5,12],[5,12],[6,11],[6,11],[6,11]]);

var airport = new Store("Beaverton", "some address", "555-555-5555", 8, 1, "Open 7 Days a Week", [[0,4],[0,4],[0,4],[0,7],[0,7],[0,7],[2,15],[2,15],[2,15],[15,35],[15,35],[15,35],[12,31],[12,31],[12,31],[5,20],[5,20],[5,20]],[[0,4],[0,4],[0,4],[0,4],[0,4],[0,4],[1,4],[1,4],[1,4],[3,8],[3,8],[3,8],[5,12],[5,12],[5,12],[6,11],[6,11],[6,11]]);


//HERE ARE SOME CHECKS
if(checkYourWork){
console.log(beaverton.pizzaSalesRawData);
console.log(beaverton.pizzaSalesSumTotal);
console.log(beaverton.deliverySalesSumTotal);

};

beaverton.pizzaSalesMinMax();
beaverton.tableGen();


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
//ok, so that kind of worked :)  Still need to format and find out how to add carriage returns & list open time and close time separately wih a "-"

//
// //##################################################################################################
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

function minMax (min, max) {
       return Math.round(Math.random() * (max-min))+ min;
             }
//
//
//
// // //############################################################################
//
//CREATE TABLE(S)


// function generate_table(storeName){
//
// var putTableHere = document.getElementById("putSummaryTableHere");
// var tbl = document.createElement("table");   //create table
// var tblBody = document.createElement("tbody");  //create body of table
//
//
// //create table header for store name (fingers crossed??  YAY!!!!! IT F-ING WORKED!!!! (can I say that in homework?)
// var headerRow = document.createElement("tr");  //creates table row for heder
//
// var tblheader = document.createElement("TH");
// var headerText = document.createTextNode("SUMMARY ALL STORES");   //stores[j].storeName NOTE: NEED TO ADD LOOP HERE POSSIBLY..THINK IT THROUGH...
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
// for (var i=0; i<hoursArrayStore.length; i++) {    //NOTE: NEED TO UPDATE THIS FOR MORE DYNAMIC ARRAY LENGTH...
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
//     var runPizzaSalesFunction = storeName.pizzaSalesMinMax();
//     var pizzaData = storeName.pizzaSalesCalculated[i];
//     var cellTextPizzas = document.createTextNode(pizzaData);  //puts pizza sales into text Node
//     cellPizzas.appendChild(cellTextPizzas);
//     row.appendChild(cellPizzas);
//
// //create rows for # of deliveries
//     var cellDeliveries = document.createElement("td");
//     var runDeliveriesFunction = storeName.deliveryMinMax();
//     var deliveryData = storeName.deliveriesCalculated[i];
//     var cellTextDeliveries = document.createTextNode(deliveryData);
//     cellDeliveries.appendChild(cellTextDeliveries);
//     row.appendChild(cellDeliveries);
//
// // // //create rows for drivers needed
// // //     var cellDrivers = document.createElement("td");
// // //     var driverData = Math.ceil(deliveryData/3);
// // //     var cellTextDrivers = document.createTextNode(driverData);
// // //     cellDrivers.appendChild(cellTextDrivers);
// // //     row.appendChild(cellDrivers);
// //
// //
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
// //
// //
// // //function to loop through store objects and build table for each
// // //function makeAllTables(beaverton);
// // // {
// // //       for ( j= 0 ; j < beaverton.length ; j++){
//          generate_table(beaverton);
// // //     }
// // //       }
// //
// // //makeAllTables(stores);
