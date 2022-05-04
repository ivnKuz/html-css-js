"use strict";
//
const billing_data = document.getElementById('billingData');
const delivery_data = document.getElementById('deliveryData');
const delivery_date = document.getElementById('deliveryDateData');
const card_info = document.getElementById('cardInfo');


function populateList(data, ul){
    let convertedToArray = data.split(',');
    for(let i = 0; i < convertedToArray.length; i++){
        const li = document.createElement('li');
        li.textContent = convertedToArray[i];
        ul.appendChild(li);
    }
}


function fillingSeparateElements(){
const comment = document.getElementById('comment');
const chosenBike = document.getElementById('chosenBike')
const billingRegion = document.getElementById('billingRegion')
const deliveryRegion = document.getElementById('deliveryRegion')
const user_name = document.getElementById('userName');
    if(localStorage.getItem('comment') != 'undefined') comment.innerText = localStorage.getItem('comment');
    if(localStorage.getItem('user_name') && localStorage.getItem('user_name') != 'undefined') user_name.innerText = 'Welcome ' + localStorage.getItem('user_name')+'.';
    chosenBike.innerText = localStorage.getItem('bikeList');
    billingRegion.innerText = localStorage.getItem('regionList');
    deliveryRegion.innerText = localStorage.getItem('regionListDelivery');
}



//hide payment info
function paymentList(data, ul){
    let convertedToArray = data.split(',')
    let replacedString;
    for(let i = 0; i < convertedToArray.length; i++){
        if(convertedToArray[i].length > 10) replacedString = 'XXXXXXXXXXXX' + convertedToArray[i].substring(12);
        else if(convertedToArray[i].length == 3) replacedString = 'XX' + convertedToArray[i].substring(2);
        else replacedString = convertedToArray[i];
        const li = document.createElement('li');
        li.textContent = replacedString;
        ul.appendChild(li)
    }

}

populateList(localStorage.getItem('billingData'), billing_data);
populateList(localStorage.getItem('deliveryData'), delivery_data);
populateList(localStorage.getItem('deliveryDateData'), delivery_date);
paymentList(localStorage.getItem('paymentData'), card_info);
fillingSeparateElements();
