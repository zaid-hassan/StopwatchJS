const display = document.querySelector("#display");
const start = document.querySelector("#start");
const reset = document.querySelector("#reset");
const stop = document.querySelector("#stop");

let initialTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalID;
let hrs = 0;
let mins = 0;
let secs = 0;
let milisecs = 0;

start.addEventListener("click", () => {
    if(paused){
        paused = false;
        initialTime = Date.now() - elapsedTime;
        intervalID = setInterval(updatetime, 75);
    }
});
reset.addEventListener ("click", () => {
    paused = true;
    clearInterval(intervalID);
    initialTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    hrs = 0;
    mins = 0;
    secs = 0;
    milisecs = 0;
    display.textContent = "00:00:00:00"
    
});
stop.addEventListener("click", () => {
    if(!paused){
        paused = true;
        elapsedTime =  Date.now() - initialTime;
        clearInterval(intervalID);
    }
});

function updatetime(){
    elapsedTime = Date.now() - initialTime;

    milisecs = Math.floor((elapsedTime % 1000) / 10);
    secs = Math.floor((elapsedTime / 1000) % 60);
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

    hrs = pad(hrs);
    mins = pad(mins);
    secs = pad(secs);
    milisecs = pad(milisecs);
    
    display.textContent = `${hrs}:${mins}:${secs}:${milisecs}`;

    function pad(unit){
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }
}