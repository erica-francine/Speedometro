const SPEED_ELEMENT = document.querySelector("#speed");
const START_BTN = document.querySelector("#start");
const STOP_BTN = document.querySelector("#stop");

let watchID = null;

START_BTN.addEventListener("click", ()=>{
    const OPTIONS = {enableHighAccuracy:true}

    function handleSuccess(position){
        SPEED_ELEMENT.innerText = position.coords.speed ? (position.coords.speed *3.6).toFixed(1) : 0
    }
    function handleError(error){
        console.log(error.msg)
    }

    watchID = navigator.geolocation.watchPosition(handleSuccess, handleError, OPTIONS);
    
    
    
    START_BTN.classList.add("d-none")
    STOP_BTN.classList.remove("d-none")

});


STOP_BTN.addEventListener("click", ()=>{
    START_BTN.classList.remove("d-none")
    STOP_BTN.classList.add("d-none")

    navigator.geolocation.clearWatch(watchID);
    watchID = null;
});

