
//function for sum of two numbers: PROBLEM 1.

function sumTwo (num1, num2) {
  console.log("The sum of " + num1 + " and " + num2 + " is " + (num1 + num2));
  return num1 + num2;
  }

exports.sumTwo = sumTwo;


//function for multiplying two numbers: PROBLEM 2.

function multTwo (a, b) {
  console.log("The product of " + a + " and " + b + " is "+ (a * b));
  return a * b;
}

exports.multTwo = multTwo;


//function for summing and multiplying three numbers: PROBLEM 3.

function sumAndMult (a, b, c) {
  console.log( a + " and " + b + " and " + c + " sum to "+(a+b+c));
  console.log("The numbers " + a + " and " + b + " and " + c + " have a product of " + (a*b*c));

  sumAll = sumTwo(a,b) + c;
  multAll = multTwo(a,b) *c;

  return [sumTwo, multTwo];
}

exports.sumAndMult = sumAndMult;


//function for adding three items in an array. PROBLEM 4.

function sumArray(myArray) {
    var sumResults = 0;
    for (var i=0; i<myArray.length; i++){

      sumResults = sumResults + myArray[i];

      //console.table(myArray);
      // console.log(myArray[0]+", "+myArray[1]+ ", " + myArray[2] + " was passed in as an array of numbers, and " + sumResults + " is their sum.");
      }
      return sumResults;
  }

exports.sumArray = sumArray;


//function for multiplying three numbers in an array.  PROBLEM 5.

function multArray(myArray2) {
  var multReturn = 1;
  for(var i =0; i < 3; i++ ) {
      multReturn = multReturn * myArray2[i];
  }
  return multReturn;
  }
  exports.multArray = multArray;
