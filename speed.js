const SPEED_ELEMENT = document.querySelector("#speed");
const START_BTN = document.querySelector("#start");
const STOP_BTN = document.querySelector("#stop");

let watchID = null;
let currentRide = null;

START_BTN.addEventListener("click", ()=>{
    if (watchID)
        return

    function handleSuccess(position){
        addPosition(currentRide, position); //Adicionando a posição na minha currentRide
        SPEED_ELEMENT.innerText = position.coords.speed ? (position.coords.speed *3.6).toFixed(1) : 0
    }
    function handleError(error){
        console.log(error.msg)
    }
    
    const OPTIONS = {enableHighAccuracy:true}
    currentRide = createNewRide() //Criando nova corrida quando ao apertar o start e me retornando o ID da corrida
    watchID = navigator.geolocation.watchPosition(handleSuccess, handleError, OPTIONS);
           
    START_BTN.classList.add("d-none")
    STOP_BTN.classList.remove("d-none")

});


STOP_BTN.addEventListener("click", ()=>{
    if (!watchID)
        return
    

    navigator.geolocation.clearWatch(watchID);
    watchID = null;
    updateStopTime(currentRide);//Atualizando tempo de parada
    currentRide = null;
    START_BTN.classList.remove("d-none")
    STOP_BTN.classList.add("d-none")
});

