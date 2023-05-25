
//Função que cria a nova corrida, usando o Date.now como ID da corrida, e um objeto onde serão armazenados os dados dessa corrida
function createNewRide(){
    const RIDE_ID = Date.now();
    const RIDE_RECORD = {
        data:[],
        startTime: RIDE_ID,
        stopTime: null,
    }

    //Armazenando esses dados no localStorage como string
    saveRideRecord(RIDE_ID, RIDE_RECORD);
    return RIDE_ID
}

//Adicionando a posição na minha const RIDE_RECORD
function addPosition(RIDE_ID, position){
    const RIDE_RECORD = getRideRecord(RIDE_ID, position)
    const NEW_DATA = {
        accuracy: position.coords.accuracy,
        altitude:position.coords.altitude,
        altitudeAccuracy:position.coords.altitudeAccuracy,
        heading:position.coords.heading,
        latitude:position.coords.latitude,
        longitude:position.coords.longitude,
        speed:position.coords.speed,
        timestamp: position.timestamp,
    }
    RIDE_RECORD.data.push(NEW_DATA)
    saveRideRecord(RIDE_ID, RIDE_RECORD)//Adicionando dados atualizados no localStorage
}

function getAllRides(){
    return Object.entries(localStorage)
}

function saveRideRecord(RIDE_ID, RIDE_RECORD){
    localStorage.setItem(RIDE_ID, JSON.stringify(RIDE_RECORD))//Função para atualizar dados no localStorage
}

//Pegando o valor no meu localStorage para poder adicionar na posição
function getRideRecord(RIDE_ID){
    return JSON.parse(localStorage.getItem(RIDE_ID));
}

function updateStopTime(RIDE_ID){
    const RIDE_RECORD = getRideRecord(RIDE_ID);
    RIDE_RECORD.stopTime = Date.now();
    saveRideRecord(RIDE_ID, RIDE_RECORD)
}