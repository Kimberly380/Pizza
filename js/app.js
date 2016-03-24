

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
//
//   console.log(hoursList(2,19));
//
// //establish array for time selection
//   var timeArray=[];
//   var openHours=[];
//     for (i=0; i <25 ; i++){
//         if (i >12) {
//           timeArray.push((i-12) +":00pm");
//         }else {
//           timeArray.push(i+":00am");
//           }
//         }
//
// //function to select openning and closing hours;  Enter military time...
//
//     function storeHours (openTime,closeTime){
//           var open = timeArray[openTime];
//           var closed = timeArray[closeTime];
//           return [open,closed];
//         }
//         console.log(storeHours(8,1));

var hoursArrayStore = ["8:00", "9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "1:00"];

// // //###################################################################################333
// //
//create store objects:
var stores = [ {
    storeName: "Beaverton",
    location: "put fake address here",
    phone: "555-555-5555",
    storeHours: storeHours(8,1),
    hoursArray: hoursList(2,19),
    days: "Tuesday - Sunday, closed Mondays",
    pizzaSales: [[0,4],[0,7],[2,15],[15,35],[12,31],[5,20]],
    delivery: [[0,4],[0,4],[1,4],[3,8],[5,12],[6,11]],
},
  { storeName: "Hillsboro",
    location: "put fake address here",
    phone: "555-555-5555",
    storeHours: storeHours(8,1),
    hoursArray: hoursList(2,19),
    days: "Tuesday - Sunday, closed Mondays",
    pizzaSales: [[0,4],[0,7],[2,15],[15,35],[12,31],[5,20]],
    delivery: [[0,4],[0,4],[1,4],[3,8],[5,12],[6,11]],
}
];


//#########################################################################################

//CREATE DATA


//min max function
function minMax (min, max) {
       return Math.round(Math.random() * (max-min))+ min;
             }


// //############################################################################

function generate_table(obj){

var putTableHere = document.getElementById("putTableHere");
var tbl = document.createElement("table");   //create table
var tblBody = document.createElement("tbody")  //create body of table


for (var i=0; i<hoursArrayStore.length; i++) {   //creates all rows

var row = document.createElement("tr");  //creates table row


//create rows for time slots
//NOTE: STILL NEED TO WORK OUT KINKS FOR MIDNIGHT CROSSOVER...

    var cellTimeslots = document.createElement("td");
    var cellTextTimeslots = document.createTextNode(hoursArrayStore[i]);
    cellTimeslots.appendChild(cellTextTimeslots);
    row.appendChild(cellTimeslots);

//create rows for pizza sales

    var cellPizzas = document.createElement("td");
    var pizzaData = minMax(stores[0].pizzaSales[i][0], stores[0].pizzaSales[i][1]); //determins random number based on pizzaSales array.
    var cellTextPizzas = document.createTextNode(pizzaData);  //puts random number into text node for table.
    cellPizzas.appendChild(cellTextPizzas);
    row.appendChild(cellPizzas);

//create rows for # of deliveries
    var cellDeliveries = document.createElement("td");
    var deliveryData;
        if ( minMax(store[0].delivery[i][0], store[0].delivery[i][1]) > pizzaData ){
                deliveryData = pizzaData;
            } else {
                deliveryData = minMax(store.delivery[i][0], store.delivery[i][1])
            }
    var cellTextDeliveries = document.createTextNode(deliveryData);
    cellDeliveries.appendChild(cellTextDeliveries);
    row.appendChild(cellDeliveries);

//create rows for drivers needed
    var cellDrivers = document.createElement("td");
    var driverData = Math.ceil(deliveryData/3);
    var cellTextDrivers = document.createTextNode(driverData);
    cellDrivers.appendChild(cellTextDrivers);
    row.appendChild(cellDrivers);


tblBody.appendChild(row);

}

tbl.appendChild(tblBody);

if(putTableHere){
putTableHere.appendChild(tbl);
}

tbl.setAttribute("border","2");
}

generate_table(stores[0]);

// function makeAllTables(storeArray){
//     for ( j= 0 ; j < storeArray.length ; j++){
//         generate_table(storeArray[j]);
//     }
//
// }




// function printAllTimes(arr){
//     for (j = 0 ; j < stores[0].hoursArray.length ; i++){
//         return (stores[0].hoursArray[i]);
//     }
//
// }
