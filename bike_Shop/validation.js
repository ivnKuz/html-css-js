"use strict";
// DOM references
//All forms class refferences
const bikeFormData = document.getElementsByClassName('bikeForm__input')
const billingData = document.getElementsByClassName('billingForm__input');
const deliveryData = document.getElementsByClassName('deliveryForm__input')
const deliveryDateData = document.getElementsByClassName('deliveryDateForm__input')
const paymentData = document.getElementsByClassName('paymentForm__input');
//______
//submit button
const submitAll = document.getElementById('submitAllData');

//__Delivery date form__
const yearSelect = document.querySelector("#year");
const monthSelect = document.querySelector("#month");
const daySelect = document.querySelector("#day");
const months = ['January','February','March','April','May','June','July',
'August', 'September', 'October', 'November','December'];

(function populateMonths(){
  for(let i = 0; i < months.length; i++){
    const option = document.createElement('option');
    option.textContent = months[i];
    monthSelect.appendChild(option);
  }

})();

function populateDays(month){

  while(daySelect.firstChild){
    daySelect.removeChild(daySelect.firstChild);
  }
  let year = yearSelect.value;

  let dayNum;
  if(month === 'January' || month === 'March' || 
  month === 'May' || month === 'July' || month === 'August'
  || month === 'October' || month === 'December') {
    dayNum = 31;
  }else if(month === 'April' || month === 'June' || month === 'September'
  || month === 'November'){
    dayNum = 30;
  }else{
    //check for leap year
      if(new Date(year, 1, 29).getMonth() === 1){
        dayNum = 29;
      }else{
        dayNum = 28;
      }
    }

    for(let i = 1; i <= dayNum; i++){
    const option = document.createElement('option');
    option.textContent = i;
    daySelect.appendChild(option);
    }
}

//populating years 5 years forward
function populateYears(){
    let year = new Date().getFullYear();
    for(let i = 0; i <= 5; i++){
      const option = document.createElement('option');
      option.textContent = year + i;
      yearSelect.appendChild(option);
    }

}
//__END__

//Populating drop downs for bikes and regions.
//lists id's
const bikeList = document.querySelector("#listOfBikes");
const regionList = document.querySelector("#regionList");
const regionListDelivery = document.querySelector("#del_regionList");
const listOfBikes = [
  "TVS juniper",
  "TVS juniper 125",
  "TVS apache RTR 160 4V",
  "amaha MT-15",
  "Hero splender plus",
  "javascript Bike",
  "Cavaliere",
];

const listOfRegions = [
  "United States",
  "Ukraine",
  "Poland",
  "Britain",
  "France",
  "Tifa's Italy",
  "Outer Heaven",
];

function appendOptions(list, listID) {
  for (let n in list) {
    let option = document.createElement("option");
    option.text = list[n];
    option.value = list[n].toLocaleLowerCase;
    listID.appendChild(option);
  }
}

appendOptions(listOfBikes, bikeList);
appendOptions(listOfRegions, regionList);
appendOptions(listOfRegions, regionListDelivery);
//__END__

//__Same as billing adress for delivery adress__
//checkbox for delivery adress form
const sameAsBilling_Check = document.getElementById('asBilling');
function sameAsBilling(){
  if(sameAsBilling_Check.checked){
    //assigning same value to list option.
    regionListDelivery.options[regionListDelivery.selectedIndex].text =  regionList.options[regionList.selectedIndex].text
    regionListDelivery.setAttribute('disabled', null);
    //assingning same values and disabling inputs
    for(let i = 0; i < deliveryData.length; i++){
      deliveryData[i].value = billingData[i].value;
      deliveryData[i].setAttribute('disabled', null);
    } 
  }
  //removing disabled attribute and values if unchecked so user can type in.
  else if(!sameAsBilling_Check.checked){
    for(let v = 0; v < deliveryData.length; v++){
      deliveryData[v].removeAttribute('disabled');
      regionListDelivery.removeAttribute('disabled');
      deliveryData[v].value = '';
    }
  }

}
sameAsBilling_Check.addEventListener('change', sameAsBilling);
//__END__

//Set error or success for inputs
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisp = inputControl.querySelector('.error');
  errorDisp.innerText = message;
  element.classList.add('underlineRed');
}
const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisp = inputControl.querySelector('.error');
  errorDisp.innerText = '';
  element.classList.remove('underlineRed');
  element.classList.add('underlineGreen')
}
//___END

//__Payment form__
//card form inputs ids and errors
const cardNumber = document.querySelector('#cardNum');
const cardCVV = document.querySelector('#cvv');

function paymentInfoCheck(cardInfo, maxLength){
  if(cardInfo.value == ''){
    setError(cardInfo, 'Field cannot be empty');
  }else if(cardInfo.value.length < maxLength){
    setError(cardInfo,`Must have ${maxLength} digits`);
  }
  else{
    setSuccess(cardInfo);
  }
}
  

//__END__

//billing form input id's
const _first_Name = document.getElementById('firstName');
const _last_Name = document.getElementById('lastName');
const _street_adress = document.getElementById('streetAdress');
const _zip_code = document.getElementById('zip-code');
const _phone_number = document.getElementById('phoneNum');
//delivery form input id's
const _del_first_Name = document.getElementById('del_firstName');
const _del_last_Name = document.getElementById('del_lastName');
const _del_street_adress = document.getElementById('del_streetAdress');
const _del_zip_code = document.getElementById('del_zip-code');
const _del_phone_number = document.getElementById('del_phoneNum');
//__


//__Check if forms valid
//checking if inputs being properly filled, takes id of every input
function formsCheck(fName, lName, stAdress, zip, phone){
  if(fName.value === '') setError(fName, 'this field cannot be empty');
  else if(fName.value.length < 2) setError(fName, 'too short');
  else setSuccess(fName);

  if(lName.value === '') setError(lName, 'this field cannot be empty');
  else if(lName.value.length < 2) setError(lName, 'too short');
  else setSuccess(lName);
  
  if(stAdress.value === '') setError(stAdress, 'this field cannot be empty'); 
  else if(stAdress.value.length < 3) setError(stAdress, 'street adress has to have 3 or more characters.');
  else setSuccess(stAdress);
  
  if(zip.value === '') setError(zip, 'this field cannot be empty');
  else if(zip.value.length < 6) setError(zip, 'Zip code has to have at least 6 numbers.');
  else setSuccess(zip);

  if(phone.value === '') setError(phone, 'this field cannot be empty');
  else if(phone.value.length < 8) setError(phone, 'Phone number must be 8 digits or more');
  else setSuccess(phone);
  }
//___END

//Create user check 
//create account form input id's
const _user_name = document.getElementById('userName');
const _password = document.getElementById('userPass');
const _password_confirm = document.getElementById('userConfirm');
const _submit_create_userBtn = document.getElementById('createUserBtn');

function checkSighnUp(user_name, password, confirm){
  if(user_name.value === '') setError(user_name, 'User name cannot be empty.');
  else if(user_name.value.length < 8) setError(user_name, 'user name should have 8 or more characters.');
  else setSuccess(user_name);
  if(password.value === '') setError(password, 'Password field cannot be empty.');
  else if(password.value.length < 8) setError(password, 'Password should have 8 characters or more.');
  if(confirm.value === '') setError(confirm, 'Field cannot be empty.');
  else if (confirm.value != password.value){
    setError(password, '');
    setError(confirm, 'Passwords don\'t match.');
  }else{
    localStorage.setItem('user_name',user_name.value);
    setSuccess(password);
    setSuccess(confirm);
  }
}
_submit_create_userBtn.addEventListener('click', (e) =>{
e.preventDefault();
checkSighnUp(_user_name,_password,_password_confirm);
});
//___END 

//__Save the data__

function getDataFromInputs(inputs){
  let CurrentData = [];
  for(let i = 0; i < inputs.length; i++){
    if(inputs[i].value !== '') CurrentData.push(inputs[i].value);
  }
  if(CurrentData.length > 0) return CurrentData;
  else console.log('nothing to return');;
  }

function getDataFromSelects(select){
  var text = select.options[select.selectedIndex].text;
  console.log(text);
  return text;
}

//__END

//validation check
//check if valid function
const inputCheck = document.getElementsByTagName('input');
function validationCheck(inputs){
for(const input of inputs){
  if(input.classList.contains('underlineRed')){
    return false;
  }
}
return true;
}

submitAll.addEventListener('click', (e) => {
  e.preventDefault();
  //checking all the data.
  paymentInfoCheck(cardNumber, 16)
  paymentInfoCheck(cardCVV, 3)
  formsCheck(_del_first_Name,_del_last_Name,_del_street_adress,_del_zip_code,_del_phone_number);
  formsCheck(_first_Name,_last_Name,_street_adress,_zip_code,_phone_number)
  checkSighnUp(_user_name,_password,_password_confirm);
  //check if returns true, then save if not alert to fill the fields and do nothing.
  if(validationCheck(inputCheck)){
  localStorage.setItem('billingData',getDataFromInputs(billingData));
  localStorage.setItem('comment', getDataFromInputs(bikeFormData));
  localStorage.setItem('deliveryData', getDataFromInputs(deliveryData));
  localStorage.setItem('deliveryDateData', getDataFromInputs(deliveryDateData));
  localStorage.setItem('paymentData', getDataFromInputs(paymentData));
  localStorage.setItem('bikeList', getDataFromSelects(bikeList));
  localStorage.setItem('regionList', getDataFromSelects(regionList));
  localStorage.setItem('regionListDelivery', getDataFromSelects(regionListDelivery));
  window.open(
  'results.html',
);
  } 
  else alert('You still have unfilled fields.');
});
//__END__


//__delivery date form update onchange__
populateDays(monthSelect.value);
populateYears();

yearSelect.onchange = function(){
  populateDays(monthSelect.value);
}
monthSelect.onchange = function(){
  populateDays(monthSelect.value);
}
//__END__