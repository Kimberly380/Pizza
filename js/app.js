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

//to contain objects for running create table funtion below
var tableObjects = {};


//for first pass, use the following array for the time column of the store tables, as well as the max iterations of i in the for loop of  table generation.
var hoursArrayStore = ["6:00am", "7:00am", "8:00am", "9:00am", "10:00am", "11:00am", "12:00am", "1:00am", "2:00am", "3:00am", "4:00am", "5:00am", "6:00am", "7:00am", "8:00am", "9:00am", "10:00am", "11:00am", "12:00am", "1:00am", "2:00am"];

//##############################################################################################################################333

//create store object template:
var storeObjects = [];

function Store (storeName, address, phone, openTime, closeTime, days, pData, dData) {
    this.storeName = storeName;
    this.address = address;
    this.phone = phone;
    this.storeHours = hoursArrayStore[0] + "-" + hoursArrayStore[17];

    // function (openTime,closeTime){
    //       var open = timeArray[openTime];
    //       var closed = timeArray[closeTime];
    //       return [open,closed];
    //     };
    this.days = days;
    this.pData = pData;
    this.pSum = 0
    this.pCalc = [];
    this.pMinMax = function (){ for (var i=0; i < this.pData.length ; i++){
                                    this.pCalc.push(minMax(this.pData[i][0], this.pData[i][1]));
                                      }
                                      this.pSum = this.pCalc.reduce(function (a,b){
                                                    return a+b
                                                  });
                                };
    this.pMinMax();
    this.dData = dData;
    this.dCalc = [];
    this.dminMax=    function (){
                              this.dCalc = [];
                              for (var i=0; i < this.dData.length ; i++){
                                    var minMaxCalc = minMax(this.dData[i][0], this.dData[i][1]);
                                      if(this.pCalc[i]===0){
                                      this.dCalc.push(0);
                                    }  else if (minMaxCalc < this.pCalc[i]) {
                                           this.dCalc.push(minMaxCalc);
                                         }  else {
                                              this.dCalc.push(this.pCalc[i]);
                                         }
                                     }
                                };
      this.dminMax();
      this.tableGen = function (){

                        var putTableHere = document.getElementById("putAllTablesHere");
                        var tbl = document.createElement("table");   //create table
                        var tblBody = document.createElement("tbody");
                        var headerRow = document.createElement("tr");
                        var titleRow = document.createElement("tr");
                        var footerRow = document.createElement("tr");

                      //***************TABLE TITLE*************************************

                          var tblTitle = document.createElement("th");
                          var tblTitleText = document.createTextNode(this.storeName);
                          tblTitle.appendChild(tblTitleText);
                          titleRow.appendChild(tblTitle);
                          tblBody.appendChild(titleRow);
                          tblTitle.setAttribute("colspan","4");

                      //***************START HEADER*************************************

                          function createHeader (textForHeader){
                          var tblheader = document.createElement("th");
                          var headerText = document.createTextNode(textForHeader);
                          tblheader.appendChild(headerText);
                          headerRow.appendChild(tblheader);
                          }

                        createHeader("Hours");
                        createHeader("Pizzas Sold");
                        createHeader("# Deliveries");
                        createHeader("Drivers Needed");

                          tblBody.appendChild(headerRow);

                        //***************END HEADER*************************************

                        for (var i=0; i<hoursArrayStore.length; i++) {    //NOTE: NEED TO UPDATE THIS FOR MORE DYNAMIC ARRAY LENGTH...
                        var row = document.createElement("tr");  //creates table row

                        //create rows for time slots
                            var cellTimeslots = document.createElement("td");
                            var cellTextTimeslots = document.createTextNode(hoursArrayStore[i]);
                            cellTimeslots.appendChild(cellTextTimeslots);
                            row.appendChild(cellTimeslots);

                        //create rows for pizza sales
                            var cellPizzas = document.createElement("td");
                            //var runPizzaSalesFunction = this.pMinMax();
                            var pizzaData = this.pCalc[i];
                            var cellTextPizzas = document.createTextNode(pizzaData);  //puts pizza sales into text Node
                            cellPizzas.appendChild(cellTextPizzas);
                            row.appendChild(cellPizzas);

                        //create rows for # of deliveries
                            var cellDeliveries = document.createElement("td");
                          //  var runDeliveriesFunction = this.dminMax();
                            var deliveryData = this.dCalc[i];
                            var cellTextDeliveries = document.createTextNode(deliveryData);
                            cellDeliveries.appendChild(cellTextDeliveries);
                            row.appendChild(cellDeliveries);

                        //create rows for # of drivers needed
                            var cellDrivers = document.createElement("td");
                            var driverData = Math.ceil(this.dCalc[i]/3);
                            var cellTextDrivers = document.createTextNode(driverData);
                            cellDrivers.appendChild(cellTextDrivers);
                            row.appendChild(cellDrivers);


                            tblBody.appendChild(row);
                                }  //end for loop


                        //#####################START TABLE FOOTER-SUM TOTAL########################################333

                                function createFooter (textForFooter){
                                var tblFooter = document.createElement("td");
                                var footerText = document.createTextNode(textForFooter);
                                tblFooter.appendChild(footerText);
                                footerRow.appendChild(tblFooter);
                            }

                                createFooter("Total");
                                createFooter(this.pSum);

                                tblBody.appendChild(footerRow);


                          //#####################END TABLE FOOTER####################################################


                    tbl.appendChild(tblBody);

                    if(putTableHere){
                    putTableHere.appendChild(tbl);
                        var br = document.createElement("br");
                        putTableHere.appendChild(br);
                      }   //checks for presence of tag on html page

                    tbl.setAttribute("border","2");
                    footerRow.style.background = "rgb(255,0,0)"

                  }   //end create table


      storeObjects.push(this);


    }  //end object constructor


//##############################################################################################################################################

//INPUT STORE DATA

var beaverton = new Store("Beaverton", "some address", "555-555-5555", 8, 1, "Open 7 Days a Week", [[0,4],[0,4],[0,4],[0,7],[0,7],[0,7],[2,15],[2,15],[2,15],[15,35],[15,35],[15,35],[12,31],[12,31],[12,31],[5,20],[5,20],[5,20]],[[0,4],[0,4],[0,4],[0,4],[0,4],[0,4],[1,4],[1,4],[1,4],[3,8],[3,8],[3,8],[5,12],[5,12],[5,12],[6,11],[6,11],[6,11]]);

var hillsboro = new Store("Hillsboro", "some address", "555-555-5555", 8, 1, "Open 7 Days a Week", [[1,3],[1,3],[1,3],[5,9],[5,9],[5,9],[2,13],[2,13],[2,13],[18,32],[18,32],[18,32],[1,3],[1,3],[1,3],[8,20],[8,20],[8,20]],[[0,4],[0,4],[0,4],[0,4],[0,4],[0,4],[1,4],[1,4],[1,4],[3,8],[3,8],[3,8],[5,12],[5,12],[5,12],[6,11],[6,11],[6,11]]);

var downtown = new Store("Downtown", "some address", "555-555-5555", 8, 1, "Open 7 Days a Week", [[0,4],[0,4],[0,4],[0,7],[0,7],[0,7],[2,15],[2,15],[2,15],[15,35],[15,35],[15,35],[12,31],[12,31],[12,31],[5,20],[5,20],[5,20]],[[0,4],[0,4],[0,4],[0,4],[0,4],[0,4],[1,4],[1,4],[1,4],[3,8],[3,8],[3,8],[5,12],[5,12],[5,12],[6,11],[6,11],[6,11]]);

var northeast = new Store("Northeast", "some address", "555-555-5555", 8, 1, "Open 7 Days a Week", [[0,4],[0,4],[0,4],[0,7],[0,7],[0,7],[2,15],[2,15],[2,15],[15,35],[15,35],[15,35],[12,31],[12,31],[12,31],[5,20],[5,20],[5,20]],[[0,4],[0,4],[0,4],[0,4],[0,4],[0,4],[1,4],[1,4],[1,4],[3,8],[3,8],[3,8],[5,12],[5,12],[5,12],[6,11],[6,11],[6,11]]);

var clackamas = new Store("Clackamas", "some address", "555-555-5555", 8, 1, "Open 7 Days a Week", [[0,4],[0,4],[0,4],[0,7],[0,7],[0,7],[2,15],[2,15],[2,15],[15,35],[15,35],[15,35],[12,31],[12,31],[12,31],[5,20],[5,20],[5,20]],[[0,4],[0,4],[0,4],[0,4],[0,4],[0,4],[1,4],[1,4],[1,4],[3,8],[3,8],[3,8],[5,12],[5,12],[5,12],[6,11],[6,11],[6,11]]);

var airport = new Store("Airport", "some address", "555-555-5555", 8, 1, "Open 7 Days a Week", [[0,4],[0,4],[0,4],[0,7],[0,7],[0,7],[2,15],[2,15],[2,15],[15,35],[15,35],[15,35],[12,31],[12,31],[12,31],[5,20],[5,20],[5,20]],[[0,4],[0,4],[0,4],[0,4],[0,4],[0,4],[1,4],[1,4],[1,4],[3,8],[3,8],[3,8],[5,12],[5,12],[5,12],[6,11],[6,11],[6,11]]);


//###############################################################################################################################################/
//PUT TOTAL FOR ALL STORES ON PUBLIC HTML PAGE (CURRENTLY ON BOTH PAGES AS WORKAROUND: IF STATEMENT IS NOT WORKING).

function pSumAllStores(){
pGrandTotal = 0
for (j = 0; j < storeObjects.length; j++) {
        pGrandTotal += storeObjects[j].pSum;
      }
      return pGrandTotal + "  happy Pizza Odysseys this week!!";
    }

function printGrandTotal(){
  var printPSum = document.getElementById("pizzasSold");
      if("pizzasSold"){
        printPSum.textContent = pSumAllStores();
      }
}
pSumAllStores();
printGrandTotal();

//###########################################################################################################################################3


//function to loop through store objects and build table for each
function makeAllTables(){
      for ( var i= 0 ; i < storeObjects.length ; i++){
          storeObjects[i].tableGen();
          }
      }

makeAllTables();

//###############################################################################################
//Sum by hour in total table

function pSumByHour(){
    var totalArray = [];

      for (var k = 0; k < storeObjects[0].pCalc.length ; k++){
        tempCounter = 0
          for (var m=0;  m < storeObjects.length; m++){
              tempCounter += storeObjects[m].pCalc[k];
          }
          totalArray.push(tempCounter);
        }

    tableObjects.totalArray = totalArray;
}

pSumByHour();



//###############################################################################################

//STORE LOCATIONS AND hours


for (i=0; i < storeObjects.length; i++){

  var storeContact = document.getElementById("store"+i);

  if(storeContact){       //need if statement for other web pages that do not have this element Id.
  storeContact.textContent=storeObjects[i].storeName+" \r "+storeObjects[i].address+" \r "+storeObjects[i].phone+" \r "+storeObjects[i].storeHours+", "+storeObjects[i].days;
}
}
//ok, so that kind of worked :)  Still need to format and find out how to add carriage returns & list open time and close time separately wih a "-"


//##################################################################################################

//print out weekly totals

function weeklyTotals (){
    if("weeklyTotals"){
        printWeekTotal = document.getElementById("weeklyTotals");
          for (z = 0 ; z < storeObjects.length; z++){
                var lineItem = document.createElement("p");
                var lineItemText = document.createTextNode(storeObjects[z].storeName + " had sales of " + storeObjects[z].pSum + " last week.");
                lineItem.appendChild(lineItemText);
                printWeekTotal.appendChild(lineItem);
          }
      }
}
weeklyTotals();



// //###################################################################################################

// //min max function

function minMax (min, max) {
    return Math.round(Math.random() * (max-min))+ min;
}

//##############################################################################################################################

//GENERATE TABLE function

function createTable (hourArray, sumArray){

  var placeTable = document.getElementById("putSummaryTableHere");
  var newTable = document.createElement("table");
  var newTBody = document.createElement("tBody");
  //var newRow = document.createElement("tr");
  var newHeader = document.createElement("tr");

//**********create header rows**********************************

  function totalHeader (text){
    var tblHeader = document.createElement("th");
    var tblHeaderText = document.createTextNode(text);
    tblHeader.appendChild(tblHeaderText);
    newHeader.appendChild(tblHeader);
  }
  newTBody.appendChild(newHeader);

  totalHeader("Time");
  totalHeader("Total Sales");

//**********create body rows**********************************

  for (var i=0; i < hoursArrayStore.length; i++) {

      var newRow = document.createElement("tr");

      var rowCells = document.createElement("td");
      var cellsText = document.createTextNode(hourArray[i]);
      rowCells.appendChild(cellsText);
      newRow.appendChild(rowCells);


      var rowCells = document.createElement("td");
      var cellsText = document.createTextNode(sumArray[i]);
      rowCells.appendChild(cellsText);
      newRow.appendChild(rowCells);

      newTBody.appendChild(newRow);
  }
  newTable.appendChild(newTBody);
  placeTable.appendChild(newTable);

  newTable.setAttribute("border", "2");
}


//to run the table
createTable(hoursArrayStore,tableObjects.totalArray);

//#########################FROMS AND EVENT HANDLER CODE######################################################################

//display appropriate form depending on user response to store update radio box
var sUpdate = document.getElementsByName("storeUpdate");
var updatePrompt=document.getElementById("updatePrompt");
var updateForm = document.getElementById("updateForm");
var addStoreForm = document.getElementById("addStoreForm");
var  sCreate = document.getElementById("storeCreate");
var  sDelete = document.getElementById("storeDelete");
var formWrapper = document.getElementById("fieldSelector");

function displayForm () {
    if (sUpdate[0].checked) {
        updatePrompt.textContent = "Which store would you like to UPDATE?";
        updateForm.style.display = "block";
        addStoreForm.style.display = "none";
        formWrapper.style.display = "block";
        updateButton.style.display = "block";
        deleteButton.style.display="none";
      } else if (sUpdate[1].checked){
        addStoreForm.style.display = "block";
        updateForm.style.display = "none";
        formWrapper.style.display = "block";
      } else if (sUpdate[2].checked) {
        updatePrompt.textContent = "Which store would you like to DELETE?";
        updateForm.style.display = "block";
        addStoreForm.style.display = "none";
        formWrapper.style.display = "block";
        updateButton.style.display = "none";
        deleteButton.style.display="block";
      } else {
        updateForm.style.display = "none";
        addStoreForm.style.display = "none";
        formWrapper.style.display = "none";
    }
}
  for(var r = 0; r<sUpdate.length; r++){
   sUpdate[r].addEventListener('change', displayForm, false);
}

//############### EVERYTHING IN BELOW SECTION IS FOR ADDING A NEW STORE ####################

var txtBxNameNew = document.getElementById("newStoreName");
var txtBxAddyNew = document.getElementById("newStoreAddress");
var txtBxPhoneNew = document.getElementById("newStorePhone");
var txtBxDaysNew = document.getElementById("newStoreDays");
var addButton= document.getElementById("addButton");

var addNewStore;

function addNewStore (){
      var a = txtBxNameNew.value;
      var b = txtBxAddyNew.value;
      var c = txtBxPhoneNew.value;
      var d = openTime.value;
      var e = closeTime.value;
      var f = txtBxDaysNew.value;

      var verify = confirm ("Are you sure you want to add the following store?\nStore Name:  " +a +
                              "\nStore Address:  "+b + " \nStore Phone:  "+c + "\n Store opens at:  "
                            + d + "\nStore closes at:  "+e+ "\n Days store is Open:  " + f);

  if(verify) {
      allStoreData.push(addNewStore = new Store(a,b,c,d,e,f,[[0,4],[0,4],[0,4],[0,7],[0,7],[0,7],[2,15],[2,15],[2,15],[15,35],[15,35],[15,35],[12,31],[12,31],[12,31],[5,20],[5,20],[5,20]],[[0,4],[0,6]],[[0,4],[0,4],[0,4],[0,4],[0,4],[0,4],[1,4],[1,4],[1,4],[3,8],[3,8],[3,8],[5,12],[5,12],[5,12],[6,11],[6,11],[6,11]]));

      console.log(storeObjects[storeObjects.length -1]);
    }

}
    addButton.addEventListener("click", addNewStore, false);


//############### EVERYTHING IN THIS SECTION IS FOR UPDATING AN EXISTING STORE ####################

//Populating dropdown with all existing stores.
if("selectStore"){
    var selectStore = document.getElementById("selectStore");

      for (var s = 0; s < storeObjects.length; s++){
          var createEl = document.createElement("option");
          var createNode = document.createTextNode(storeObjects[s].storeName)
          createEl.appendChild(createNode);
          selectStore.appendChild(createEl);
      }
    }

//add placeholders to textboxes depending on user store selection

    var txtBxName = document.getElementById("storename");
    var txtBxAddy = document.getElementById("storeaddress");
    var txtBxPhone = document.getElementById("storephone");
    var updateButton= document.getElementById("updateButton");
    var deleteButton = document.getElementById("deleteButton");

    function addHint () {
        var b = this.options[this.selectedIndex].index;
          txtBxName.placeholder = storeObjects[b-1].storeName;
          txtBxAddy.placeholder= storeObjects[b-1].address;
          txtBxPhone.placeholder= storeObjects[b-1].phone;
          openTime.placeholder = storeObjects[b-1].openTime;    //TODO: set default values for open/close dropdowns.
    }

    selectStore.addEventListener('change', addHint, false);

//populate hours open and closed drop downs for user selection
if("openTime"|| "closeTime"){
    var openTime = document.getElementById("openTime");
    var closeTime = document.getElementById("closeTime");

    for (var h = 0; h < hoursArrayStore.length; h++){
          var optOpen = document.createElement("option");
          var optClose = document.createElement("option");
          var optOpenTxt = document.createTextNode(hoursArrayStore[h]);
          var optCloseTxt = document.createTextNode(hoursArrayStore[h]);
          optOpen.appendChild(optOpenTxt);
          optClose.appendChild(optCloseTxt);
          openTime.appendChild(optOpen);
          closeTime.appendChild(optClose);
      }
    }

//---------------------------------------------------------------

//get confirmation from user to post updates


function updateObj () {
  confirm("Your store will be updated as follows:\nStore Name: "  +
        txtBxName.value + "\nAddress:   " + txtBxAddy.value + "\nPhone: "+
        txtBxPhone.value
      );
}

updateButton.addEventListener("click", updateObj, false);
