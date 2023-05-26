const RIDE_ELEMENT = document.querySelector("#rides");

const ALL_RIDES = getAllRides()


ALL_RIDES.forEach(async ([id,value])=>{

    const RIDE = JSON.parse(value)
    RIDE.id = id

    const ITEM_ELEMENT = document.createElement("li")
    ITEM_ELEMENT.id = RIDE.id
    

    const FIRST_POSITION = RIDE.data[0]
    const FIRST_LOCATION = await getLocationData(FIRST_POSITION.latitude, FIRST_POSITION.longitude)

    const CITY_DIV = document.createElement("div")
    CITY_DIV.innerText = `${FIRST_LOCATION.locality} - ${FIRST_LOCATION.countryCode}`
    


    ITEM_ELEMENT.appendChild(CITY_DIV)
    
    RIDE_ELEMENT.appendChild(ITEM_ELEMENT)
    

})

async function getLocationData(latitude,longitude){
    const URL = `https://api-bdc.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=bdc_5f4e41cf9f774dd7a3bd9fc308a8150c`

    const RESPONSE = await fetch(URL)
    return await RESPONSE.json()
}