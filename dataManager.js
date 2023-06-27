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

