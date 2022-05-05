const allInputs = document.querySelectorAll('.multi_form .hidden input')
const allergies = document.getElementById('allergies');
console.log(allInputs);
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

function fillHiddenFields(){
    const state = document.getElementById('state');
    state.value = params['State'];
    for(let i = 0; i < allInputs.length; i++){
    //assigning the value to hidden fields by key in the params object 
    allInputs[i].value = params[allInputs[i].name];
     console.log(allInputs[i].name);   
    }
}
fillHiddenFields();


for(const n of allInputs)
{
    console.log(n.value);
}
document.querySelector('.multi_form').addEventListener('submit', (e) => {
    // e.preventDefault();
    fillHiddenFields();
    logToConsole();
    console.log();
});     
console.log(params);
//loging out the entered data
(function(){
    let queryString = decodeURIComponent(window.location.search);
    console.log("You've entered following data:");
    console.log(queryString.replaceAll('&', '\n').slice(1));
})()
