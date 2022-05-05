// saving all the data into local storage to use it on the next html page
const Allinputs = document.querySelectorAll('.multi_form .on input')

function saveData(){
    let arrKeys = [];
    let url = 'order2.html?'
    const selectState = document.getElementById('state');
    //data encoded in query string and saved to be transfered to another page
    let chosenState = encodeURIComponent(selectState.options[selectState.selectedIndex].text);
    //saving the select data
    url = url + selectState.name + '=' + chosenState + '&';
    //creating key names based on input name
    for(const name of Allinputs){
        arrKeys.push(name.name);
    }
    // transfering the input data
    for(let i = 0; i < Allinputs.length; i++){
        url = url + encodeURIComponent(arrKeys[i]) + '=' + encodeURIComponent(Allinputs[i].value) + '&'
    }
    return url;
}

function simpleCheck(){
    let valid = true;
    for(let n = 0; n < Allinputs.length; n++){
        if(Allinputs[n].value == ''){
            Allinputs[n].className += ' err';
            valid = false;
        }
    }
    return valid;
}
localStorage.clear();
document.getElementById('btnNext').addEventListener('click', ()=>{
    if(!simpleCheck()){
        alert('you still have unfilled fields');
    }else{
    this.location.href = saveData()
    }
});