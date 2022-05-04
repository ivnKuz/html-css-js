"use strict"
//___Create account_____
const _userName = document.getElementById('userName');
const _password = document.getElementById('password');
const _confirmPass = document.getElementById('confirmPass');
const _email = document.getElementById('email');
const createAccBtn = document.getElementById('createAccBtn');
const profileForm = document.querySelector('.profileForm');
profileForm.classList.add('invisible');
//saving the data into somewhat JSON looking thingy, can stringify to JSON and be a valid JSON.
let dataObj = [{
    "userName":'',
    "userEmail":'',
    "userPassword": '',
    'userPreffered': []
}]
//checking & matching part
const checkForNoSymbols = function (username) 
{
    //Check for anything other than a letter, digit or underscore.
    let detectSymbol = username.match(/\W+/);
    return detectSymbol !== null ? true : false;
}
const propereMail = function (email)
{
    //check if email string contains any word a-z A-Z 0-9 followed by \.- with optional words after it, followed by @ followed by any word followed by \.- with optional any word
    //followed by optional . with any word from 2 to 3 words
    let validMail = email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    return validMail !== null ? true : false;
}
const properPassword = function(password)
{
    //password must contain at least one upperCase and lowerCase and at least 1 digit and not less than 8 chars
    let mustHave = password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    return mustHave != null ? true : false;
}

//validation works on input
_userName.addEventListener('input', userNameValidation);
_email.addEventListener('input', emailVaidation);
_password.addEventListener('input', correctPassword)
createAccBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    if(confirmPass() && userNameValidation() && emailVaidation() && correctPassword())
    {
        saveUserProperly(_userName.value);
        saveMailProperly(_email.value)
        saveLongings();
        userAndEmailFill(profileUsername,dataObj[0].userName);
        userAndEmailFill(profileEmail, dataObj[0].userEmail);
        fillTheLongings(profilePrefLongingsList, dataObj[0].userPreffered)
        profileForm.classList.remove('invisible');
        refreshAll()
        console.log(dataObj[0]);
        console.log(showLongings()); 
    }else alert('Something went wrong there');
});
//validation part
function saveLongings()
{
    let selectedCheckBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
dataObj[0].userPreffered = saveCheckedLodgings(selectedCheckBoxes);

}
function showLongings()
{
    let orderedLongings = [];
    for(let i = 0; i < dataObj[0].userPreffered.length; i++)
    {
        orderedLongings.push(i+1 + ')' + dataObj[0].userPreffered[i]+'.');
    }

    return orderedLongings.join('\n');
}
//making sure if the user types his name badly, its still looks properly
function saveUserProperly(input)
{
    let toLower = input.toLowerCase();
    let properName = toLower[0].toUpperCase() + toLower.slice(1)
    dataObj[0].userName = properName;
}   
//if user types his email with some UpperCase or lowerCase stuff and spaces, the mail can still be valid, so I make it look noice
function saveMailProperly(input)
{
 let properMail = input.trim().toLowerCase();
 dataObj[0].userEmail = properMail;
}

function confirmPass()
{
    if(_password.value === _confirmPass.value && _password.value != ''
     && _confirmPass.value ){ 
         dataObj[0].userPassword = _password.value;
        return true;
    }
    else return false;
}
function correctPassword()
{
    let correctPass = properPassword(_password.value);
    correctPass ? document.getElementById('passwordError').textContent = '' :
     document.getElementById('passwordError').textContent = 'Password should have at least one UpperCase, LowerCase, digit and not less than 8 characters.'
     //returns true or false for validation, true if password is ok
     return correctPass;
}

function emailVaidation()
{
    let emailCheck = propereMail(_email.value);
    emailCheck ? document.getElementById('emailError').textContent = '' : 
    document.getElementById('emailError').textContent = 'Not a valid Email';
    //true if email is ok
    return emailCheck;
}

function userNameValidation()
{
    let symbolCheck = checkForNoSymbols(_userName.value);
    symbolCheck ? document.getElementById('userNameError').textContent = 'Username cannot contain symbols & white spaces' :
    document.getElementById('userNameError').textContent = '';
    return !symbolCheck;
}
function refreshAll()
{
    _userName.value = '';
    _password.value = '';
    _confirmPass.value = '';
    _email.value = '';
}

//_____

//____Create account END____


//_____Preffered Lodgings____
//saving checked values of pref lodgings selected by the user
function saveCheckedLodgings(checked)
{
    let favouriteLodgings = [];
    for(let i = 0; i < checked.length; i++)
    {
        favouriteLodgings.push(checked[i].value);
    }
    //console.log(favouriteLodgings);
    return favouriteLodgings;
}

//_____END____

//profile filling part
const profileUsername = document.getElementById('profileUsername');
const profileEmail = document.getElementById('profileEmail');
const profilePrefLongingsList = document.querySelector('#profilePrefLongings ul');

function userAndEmailFill(id, target)
{
    //if there's previous elements delete em
    while (id.firstChild) {
        id.removeChild(id.firstChild);
    }
    let newSpan = document.createElement('span');
    newSpan.textContent = target;
    id.appendChild(newSpan);
}

function fillTheLongings(list, target)
{
    //if there's previous elements delete em
    let element = document.getElementById("ulList");
    while (element.firstChild) {
    element.removeChild(element.firstChild);
}
    for(let i = 0; i < target.length; i++)
    {
        let li = document.createElement('li');
        li.textContent = target[i];
        list.appendChild(li);
    }
}
//____END___