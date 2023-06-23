const RIDE_ELEMENT = document.querySelector("#rides");

const ALL_RIDES = getAllRides()

console.log(ALL_RIDES)
//Meu getAllRides esta retornando um array com os id's, e o valor da corrida, aqui estou percorrendo esse array
ALL_RIDES.forEach(async ([id, value]) => {

    //transformando em objeto
    const RIDE = JSON.parse(value)
    RIDE.id = id

    const ITEM_ELEMENT = document.createElement("li")
    ITEM_ELEMENT.id = RIDE.id
    ITEM_ELEMENT.className = "my-3 d-flex rounded-3 shadow-sm p-3 align-items-center"
    RIDE_ELEMENT.appendChild(ITEM_ELEMENT)

    //vai ser a posição 0 do meu array que se encontra no value
    const FIRST_POSITION = RIDE.data[0]
    //Aplicando a fórmula para pegar a localidade
    const FIRST_LOCATION = await getLocationData(FIRST_POSITION.latitude, FIRST_POSITION.longitude)

    const CITY_DIV = document.createElement("div")
    //Inserindo na div o texto com a cidade e código do país
    CITY_DIV.innerText = `${FIRST_LOCATION.locality} - ${FIRST_LOCATION.countryCode}`
    CITY_DIV.className = "text-primary fw-bold"



    const MAX_SPEED = document.createElement("div")
    MAX_SPEED.innerText = `Max: ${getMaxSpeed(RIDE.data)} km/h`
    MAX_SPEED.className = "fw-bold fs-5 my-1"


    const DISTANCE_DIV = document.createElement("div")
    DISTANCE_DIV.innerText = `Distância: ${getDistance(RIDE.data)} km`

    const DURATION_DIV = document.createElement("div")
    DURATION_DIV.innerText = `Duração: ${getDuration(RIDE)}`;
    DURATION_DIV.classList.add("mb-1")

    const RIDE_DATE_DIV = document.createElement("div")
    RIDE_DATE_DIV.innerText = `${getRideDate(RIDE)}`
    RIDE_DATE_DIV.className = "mb-1 text-secondary fw-bold"

    const DIV_MAP = document.createElement("div")
    DIV_MAP.id = `map${RIDE.id}`
    DIV_MAP.style = "width:120px;height:120px"
    DIV_MAP.className = "me-3 rounded-3 bg-secondary"

    const DIV_DATA_RIDE = document.createElement("div")
    DIV_DATA_RIDE.id = "divDataRide"


    //Inserindo minha localidade, velocidade, distancia e duração na minha div DIV_DATA_RIDE
    DIV_DATA_RIDE.appendChild(CITY_DIV)
    DIV_DATA_RIDE.appendChild(MAX_SPEED)
    DIV_DATA_RIDE.appendChild(DISTANCE_DIV)
    DIV_DATA_RIDE.appendChild(DURATION_DIV)
    DIV_DATA_RIDE.appendChild(RIDE_DATE_DIV)



    ITEM_ELEMENT.appendChild(DIV_MAP)
    //Inserindo minha div DIV_DATA_RIDE dentro da li
    ITEM_ELEMENT.appendChild(DIV_DATA_RIDE)

    //Inserindo minha li na ul 'rides'


})

//Função que retorna dados da minha localidade com base na minha latitude e longitude
async function getLocationData(latitude, longitude) {
    const URL = `https://api-bdc.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=bdc_5f4e41cf9f774dd7a3bd9fc308a8150c`

    const RESPONSE = await fetch(URL)
    return await RESPONSE.json()
}

function getMaxSpeed(positions) {
    let maxSpeed = 0

    positions.forEach((position) => {
        if (position.speed != null && position.speed > maxSpeed) {
            maxSpeed = position.speed
        }
    })

    return (maxSpeed * 3.6).toFixed(1)
}

function getDistance(positions) {
    const EARTH_RADIUS = 6371
    let totalDistance = 0;

    for (let i = 0; i < positions.length - 1; i++) {
        const P1 = {
            latitude: positions[i].latitude,
            longitude: positions[i].longitude
        }

        const P2 = {
            latitude: positions[i + 1].latitude,
            longitude: positions[i + 1].longitude
        }

        const DELTA_LATITUDE = toRad(P2.latitude - P1.latitude)
        const DELTA_LONGITUDE = toRad(P2.longitude - P1.longitude)

        const A = Math.sin(DELTA_LATITUDE / 2) * Math.sin(DELTA_LATITUDE / 2) +
            Math.sin(DELTA_LONGITUDE / 2) * Math.sin(DELTA_LONGITUDE / 2) *
            Math.cos(toRad(P1.latitude)) * Math.cos(toRad(P2.latitude))

        const C = 2 * Math.atan2(Math.sqrt(A), Math.sqrt(1 - A))


        const DISTANCE = EARTH_RADIUS * C

        totalDistance += DISTANCE
    }


    function toRad(degree) {
        return degree * Math.PI / 180
    }

    return totalDistance.toFixed(2)

}

function getDuration(ride) {
    const START_TIME = ride.startTime
    const STOP_TIME = ride.stopTime
    const DURATION = (STOP_TIME - START_TIME)


    let seconds = Math.floor(DURATION / 1000)
    let hours = Math.floor(seconds / 3600)
    seconds %= 3600
    let minutes = Math.floor(seconds / 60)
    seconds %= 60


    const DURATION_FORMATTED = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    return DURATION_FORMATTED
}

function getRideDate(ride){
    const RIDE_DATE = ride.startTime
    const DATE = new Date(RIDE_DATE)

    const DAY = DATE.toLocaleString("en-US", {day: "numeric"})
    const MONTH = DATE.toLocaleString("en-US", {month : "long"})
    const YEAR = DATE.toLocaleString("en-US", {year: "numeric"})
    const HOUR = DATE.toLocaleString("pt-BR", {hour: "2-digit"})
    const MINUTES = DATE.toLocaleString("pt-BR", {minute: "2-digit"})

    return `${HOUR}:${MINUTES} - ${MONTH} ${DAY}, ${YEAR}`
}