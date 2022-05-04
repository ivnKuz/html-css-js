"use strict";
//Inputs data references
const first_name = document.getElementById('first_name'); 
const last_name = document.getElementById('last_name');
const checkboX = document.getElementById('discount');
const paymentMethod = document.getElementsByName('payment');
const calendar = document.getElementById('calendar')
const btnSubmit = document.getElementById('btnSubmit');
//hardcoded discount amount
let discountAmount = 5;
//price after calcualtion if there were a discount or not, stored here
let price = 0;
//picked string from the payment label is stored in here
let storePickedPayment = '';
//creating user data object
var customerData = {
    firstName:'',
    lastName:'',
}
//all the data object, takes everything
var allData = {
    nameAndLast: Object,
    price: 0,
    date: 'ddmmyy',
    paymentMethod: 0,
}
//some product object with a price that has funciton to calculate a discount if there is one
const someProduct = 
{
    price: 50,
    hasDiscount: function (discount){
        return this.price - (discount / 100) *  this.price;
    }
}

//loops through every label of radio button and takes the text value from label that is checked
for(const x of paymentMethod) {
    x.addEventListener('click', () =>{
        if(document.getElementById(x.id).checked){
            var selector = 'label[for=' + x.id + ']';
            var label = document.querySelector(selector);
            var text = label.innerHTML;
            storePickedPayment = text;
            } 
    })
}

//Button to save all date in objects and print it in the console
btnSubmit.addEventListener('click', (e)=>{
    e.preventDefault();
    showAllData();
});

//saves all filled data to objects
function showAllData(){
    //check if there's a discount
    if(checkboX.checked) price = someProduct.hasDiscount(discountAmount);
    else if(!checkboX.checked) ({price} = someProduct);
    //proceed saving
    customerData.firstName = first_name.value;
    customerData.lastName = last_name.value;
    allData.nameAndLast = customerData;
    allData.price = price;
    allData.paymentMethod = storePickedPayment;
    allData.date = calendar.value;
    console.log(allData);
}