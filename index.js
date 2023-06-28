const RIDE_ELEMENT = document.querySelector("#rides");

const ALL_RIDES = getAllRides()


//Meu getAllRides esta retornando um array com os id's, e o valor da corrida, aqui estou percorrendo esse array
ALL_RIDES.forEach(async ([id, value]) => {

    //transformando em objeto
    const RIDE = JSON.parse(value)
    RIDE.id = id

    const ITEM_ELEMENT = document.createElement("li")
    ITEM_ELEMENT.id = RIDE.id
    ITEM_ELEMENT.className = "my-3 d-flex rounded-3 shadow-sm p-3 align-items-center"
    //Inserindo minha li na ul 'rides'
    RIDE_ELEMENT.appendChild(ITEM_ELEMENT)

    //vai ser a posição 0 do meu array que se encontra no value
    const FIRST_POSITION = RIDE.data[0]
    //Aplicando a fórmula para pegar a localidade
    const FIRST_LOCATION = await getLocationData(FIRST_POSITION.latitude, FIRST_POSITION.longitude)



    const DIV_MAP = document.createElement("div")
    const MAP_ID = `map${RIDE.id}`
    DIV_MAP.id = MAP_ID
    DIV_MAP.style = "width:120px;height:120px"
    DIV_MAP.className = "me-3 rounded-3 bg-secondary"

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


    const DIV_DATA_RIDE = document.createElement("div")
    DIV_DATA_RIDE.id = "divDataRide"



    //Inserindo minha localidade, velocidade, distancia e duração na minha div DIV_DATA_RIDE
    DIV_DATA_RIDE.appendChild(CITY_DIV)
    DIV_DATA_RIDE.appendChild(MAX_SPEED)
    DIV_DATA_RIDE.appendChild(DISTANCE_DIV)
    DIV_DATA_RIDE.appendChild(DURATION_DIV)
    DIV_DATA_RIDE.appendChild(RIDE_DATE_DIV)


    //Inserindo minha div DIV_MAP dentro da li
    ITEM_ELEMENT.appendChild(DIV_MAP)
    //Inserindo minha div DIV_DATA_RIDE dentro da li
    ITEM_ELEMENT.appendChild(DIV_DATA_RIDE)

    ITEM_ELEMENT.addEventListener("click", () => {
        window.location.href = `detail.html?id=${ITEM_ELEMENT.id}`
    })


    const MAP = L.map(MAP_ID, {
        attributionControl: false,
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false,
    })

    MAP.setView([FIRST_POSITION.latitude, FIRST_POSITION.longitude], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 5,
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(MAP);
    L.marker([FIRST_POSITION.latitude, FIRST_POSITION.longitude]).addTo(MAP)

})

