const RIDE_ELEMENT = document.querySelector("#rides");

const ALL_RIDES = getAllRides()

//Meu getAllRides esta retornando um array com os id's, e o valor da corrida, aqui estou percorrendo esse array
ALL_RIDES.forEach(async ([id, value]) => {

    //transformando em objeto
    const RIDE = JSON.parse(value)
    RIDE.id = id

    const ITEM_ELEMENT = document.createElement("li")
    ITEM_ELEMENT.id = RIDE.id

    //vai ser a posição 0 do meu array que se encontra no value
    const FIRST_POSITION = RIDE.data[0]
    //Aplicando a fórmula para pegar a localidade
    const FIRST_LOCATION = await getLocationData(FIRST_POSITION.latitude, FIRST_POSITION.longitude)

    const CITY_DIV = document.createElement("div")
    //Inserindo na div o texto com a cidade e código do país
    CITY_DIV.innerText = `${FIRST_LOCATION.locality} - ${FIRST_LOCATION.countryCode}`


    const MAX_SPEED = document.createElement("div")
    MAX_SPEED.innerText = getMaxSpeed(RIDE.data)



    //Inserindo minha div da localidade dentro da li
    ITEM_ELEMENT.appendChild(CITY_DIV)
    //Inserindo minha div da velocidade máxima dentro da li
    ITEM_ELEMENT.appendChild(MAX_SPEED)
    //Inserindo minha li na ul 'rides'
    RIDE_ELEMENT.appendChild(ITEM_ELEMENT)


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

    for (let i = 0; i < positions.length; i++) {
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

        const a = Math.sin(DELTA_LATITUDE/2) * Math.sin(DELTA_LATITUDE/2) + 
                  Math.sin(DELTA_LONGITUDE/2)* Math.sin(DELTA_LONGITUDE/2)




    }


    function toRad(degree) {
        return degree * Math.PI / 180
    }

}

