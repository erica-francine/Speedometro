const RIDE_ELEMENT = document.querySelector("#rides");

const ALL_RIDES = getAllRides()


ALL_RIDES.forEach(([id,value])=>{

    const RIDE = JSON.parse(value)
    RIDE.id = id
    const ITEM_ELEMENT = document.createElement("li")
    ITEM_ELEMENT.id = RIDE.id
    ITEM_ELEMENT.innerText = RIDE.id
    RIDE_ELEMENT.appendChild(ITEM_ELEMENT)

    console.log(RIDE)
})