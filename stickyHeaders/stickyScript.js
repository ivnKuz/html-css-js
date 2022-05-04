window.onscroll = function()
{myFunction()};
const headers = document.querySelectorAll('.headline');
//saving all the Y offsets of each header to know when the top of the window touches specific header
let arr = []
for(let i = 0; i < headers.length; i++){
    arr.push(headers[i].offsetTop)
}
console.log(headers);
function myFunction(){
    console.log(arr);
    for(let n = 0; n < arr.length; n++){
        //adding sticky class to the header the window offset is on, and removing when its on the other one
        if(window.pageYOffset > arr[n]){
            headers[n].classList.add('sticky');
        }else {
            headers[n].classList.remove('sticky');
        }
    }

    
}
