function goToStepTwo(){
    const tabs = document.getElementsByClassName('tab');
    const steps = document.getElementsByClassName('step');
    addRemove(tabs,'on');
    addRemove(steps,'active');
}
function addRemove(arr, className){
    arr[0].classList.remove(className);
    arr[1].classList.add(className);
}

document.getElementById('btnNext').addEventListener('click', ()=>{
    goToStepTwo()
});