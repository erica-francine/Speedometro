
//Função que cria a nova corrida, usando o Date.now como ID da corrida, e um objeto onde serão armazenados os dados dessa corrida
function createNewRide() {
    const RIDE_ID = Date.now();
    const RIDE_RECORD = {
        data: [],
        startTime: RIDE_ID,
        stopTime: null,
    }

    //Armazenando esses dados no localStorage como string
    saveRideRecord(RIDE_ID, RIDE_RECORD);
    return RIDE_ID
}

//Pegando todas as corridas, usando Object.entries para retornar um array com todos os dados do meu objeto corrida
function getAllRides() {
    const RIDES = [];

    for(let i=0; i<localStorage.length;i++){
        const RIDE_ID = localStorage.key(i);
        const RIDE_VALUE = localStorage.getItem(RIDE_ID);

        RIDES.push([RIDE_ID, RIDE_VALUE]);
    }

    RIDES.sort((a, b)=> a[0] - b[0]);

    console.log(RIDES)
    return RIDES

}

//Pegando o valor no meu localStorage para poder adicionar na posição
function getRideRecord(RIDE_ID) {
    return JSON.parse(localStorage.getItem(RIDE_ID));
}


function saveRideRecord(RIDE_ID, RIDE_RECORD) {
    localStorage.setItem(RIDE_ID, JSON.stringify(RIDE_RECORD))//Função para atualizar dados no localStorage
}
//Adicionando a posição na minha const RIDE_RECORD
function addPosition(RIDE_ID, position) {
    const RIDE_RECORD = getRideRecord(RIDE_ID)
    const NEW_DATA = {
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        heading: position.coords.heading,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        speed: position.coords.speed,
        timestamp: position.timestamp,
    }
    RIDE_RECORD.data.push(NEW_DATA)
    saveRideRecord(RIDE_ID, RIDE_RECORD)//Adicionando dados atualizados no localStorage
}

function updateStopTime(RIDE_ID) {
    const RIDE_RECORD = getRideRecord(RIDE_ID);
    RIDE_RECORD.stopTime = Date.now();
    saveRideRecord(RIDE_ID, RIDE_RECORD)
}