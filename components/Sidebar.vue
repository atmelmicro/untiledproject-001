<template>
    <div id="sidebar" :class="{extend: extend}">
        <div id="top" class="apollo">
            <p>{{a}}</p>
            <div id="sidebar-logo-div">
                <img src="inline.png" alt="logo" id="sidebar-logo" :class="{extendedLogo: extend}">
            </div>
                <div v-if="Object.keys(state.resultOfSub).length !== 0" class="place">
                    <h1 id="place-name" class="place-text">{{state.resultOfSub.matching_place_name}}</h1>
                </div>

                <div id="places" v-else-if="Object.keys(state.arr).length !== 0">
                    <div style="margin-left: 1rem; margin-right: 1rem; margin-bottom: 4rem;">
                        <h1 class="place-text">{{state.result.text_cs}}</h1>
                        <h3 id="place-address" class="place-text">{{state.result.properties.address}}</h3>
                        <h3 id="zajimave">Zajímavé místa kolem</h3>
                        <div id="spacer"></div>
                        <div v-for="(i, index) in state.arr" v-if="i.description != 'Category'">
                            <a @click="aaa"><h3 :id="i.description" class="places-name place- text">{{i.feature_name}}</h3></a>
                            <p id="places-desc" class="place-text">{{i.description}}</p>
                        </div>
                    </div>
                </div>
                    
            <div v-else>
                <div v-if="extend" id="about-div">
                    <div id="about-text">
                    <h1>Co je to PCEGuard?</h1>
                    <ul>
                        <li>PCEGuard je webová aplikace pro zvýšení bezpečnosti cyklistů a chodců po Pardubicích</li>
                    </ul>
                    <h1>Co umí?</h1>
                    <ul>
                        <li>Pomocí vyfiltrování Vám mapa ukáže historii výskytů dopravních přestupků. Pro více infa můžete přestupek rozkliknout</li>
                    </ul>
                    <p><b>Vytvořili</b> : Diego Portillo, Matouš Volf, David Menc, Matěj Tobiáš Moravec</p>
                    <p>v rámci <a href="https://www.foxconn.cz/funovation22">Funovation Hac22</a></p>
                </div>
                </div>
                <div v-else >
                    <div class="time-wrapper">
                        <h3>Od</h3>
                        <input v-if="timeStore.history" type="date" min="2021-01-01" max="2021-12-31" class="date">
                        <div class="time" :class="odErrFunc()">
                            <h1>{{od}}:</h1>
                            <h2>00</h2>
                        </div>
                    </div>
                    <input type="range" class="time-slider" @input="(e) => {od = Number(e.target.value); }" @change="getNewData()" min="0" max="24" :value="od">
                    <div class="time-wrapper">
                        <h3>Do</h3>
                        <input v-if="timeStore.history" type="date" min="2021-01-01" max="2021-12-31" class="date">
                        <div class="time" :class="odErrFunc()">
                            <h1>{{doh}}:</h1>
                            <h2>00</h2>
                        </div>
                    </div>
                    <input type="range" class="time-slider" @input="(e) => {doh = Number(e.target.value); }" @change="getNewData()" min="0" max="24" :value="doh">
                    <label class="container">Filtrovat stání
                        <input type="checkbox" :checked="timeStore.filter" @input="(e) => {timeStore.filter = !timeStore.filter}">
                        <span class="checkmark"></span>
                    </label>
                    <label class="container" >Historický režim
                        <input type="checkbox" :checked="timeStore.history" @input="(e) => {timeStore.history = !timeStore.history}">
                        <span class="checkmark"></span>
                    </label>
                </div>
            </div>
                
            </div>
            <div id="bottom">
                <button id="about" @click="bruh">
                {{
                    Object.keys(state.resultOfSub).length === 0 && Object.keys(state.arr).length === 0 ?
                    extend ? "Zavřit" : "Co to je?" :
                    "Zavřít"
                    }}
            </button>
        </div>
        </div>
  </template>
  

  <script>
    
import { state, coords, timeStore } from "../store/index"
import gql from 'graphql-tag'

const zeroPad = (num) => {
        if(num < 10 ) {
            return String(num).padStart(2, '0')
        } else {
            return num
        }
    }
  export default {
    name: 'Sidebar',
    data () {
        return {
            extend: false,
            doErr: false,
            odErr: false,
            od: 0,
            doh: 24,
            place: true,
            state,
            coords,
            timeStore
        } 
    },
    methods: {
        bruh() {
            if(Object.keys(state.resultOfSub).length === 0 && Object.keys(state.arr).length === 0) {
                this.extend = !this.extend// let myAudio = document.querySelector('#audio'); myAudio.play()
                return
            } else if (Object.keys(state.resultOfSub).length !== 0) {
                state.resultOfSub = {}
                coords.coord = []
            } else {
                state.result = {}
                state.arr = []
                console.log("e")
                let butt = document.getElementsByClassName("mapboxgl-ctrl-geocoder--button")[0]
                butt.click()
            }
        },
        getNewData() {
            timeStore.do = this.doh
            timeStore.od = this.od
            console.log(timeStore)
        },
        set(e) {
            this.time = e.target.value
        },
        odErrFunc() {
            return this.od > this.doh ? "orange" : ""
        },
        getDate() {
            let date = new Date
            date.setFullYear(2021)
            console.log(`${date.getFullYear}-${date.getMonth}-${date.getDay}`)
            return `${date.getFullYear}-${date.getMonth}-${date.getDay}`
        },
        aaa(e) {
            let adresa = e.target.parentElement.parentElement.childNodes[2].innerHTML
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adresa)}.json?country=cz&bbox=15.74339523320742%2C-50.01445573223078%2C50.01445573223078%2C50.05970182805093&types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrNnJ6bDdzdzA5cnAza3F4aTVwcWxqdWEifQ.RFF7CVFKrUsZVrJsFzhRvQ`)
                .then(async (e) => {
                    let json = await e.json()
                    console.log(json.features[0].geometry.coordinates)
                    coords.coord = json.features[0].geometry.coordinates
                    console.log(json.features[0])
                    state.resultOfSub = json.features[0]
                })
        } 
    }
  }
  </script>
  
  <style>
#about-text p {
    text-align: center;
    
}
    .extendedLogo {
        width: 55% !important;
    }

    #sidebar-logo-div {
        margin-top: 1.5rem;
        display: flex;
        justify-content: center;
    }
    #sidebar-logo {
        width: 70%;
        transition: width 0ms;
        margin-bottom: 1rem;
    }
    #place-name {
        font-size: 2rem;
    }
    #spacer {
        width: 100%;

        background-color: #4b4b4b;
        height: 0.2rem;
    }

    #zajimave {
        font-weight: 500;
    }
    .places-name {
        margin-top: 1rem !important;
        font-weight: 500 !important;
    }

    #places-desc {
        margin-top: 0;
        margin-bottom: 1rem;
    }

    #places {
        overflow-y: auto;
    }

    .place-text {
        font-weight: 400;
        margin: 0 0 0 0;
    }

    .place {
        padding-left: 1rem;
    }

    #place-address {
        padding-bottom: 1rem;
    }
    #place-safety {
        padding-top: 1rem;
    }
    .date {
        background-color: rgba(0, 0, 0, 0);
        outline: none;
        color: white;
        width: 9rem;
        border: none;
        font-family: 'Montserrat', sans-serif;
        padding-left: 1rem;
        font-size: 1rem;
        font-weight: 500;
    }
    .orange {
        color: orange;
    }
    .time-wrapper {
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
    }
    .time-wrapper h3 {
        margin: 0 0 0 0;
        margin-left: 1rem;
        color: rgba(255, 255, 255, 0.449);
    }
    #normal-sidebar {
        flex-direction: column;
        margin-left: 1rem;
    }
    #about-div {
        margin-left: 1rem;
        overflow: hidden;
    }
    .time-slider {
        appearance: none;
        width: 100%;
        height: 10px;
        background: rgba(0, 0, 0, 0.28);
        outline: none;
        margin: 0 0 0 0;
        margin-left: 0 !important;
    }
    .time-slider::-webkit-slider-thumb {
        -webkit-appearance: none; /* Override default look */
        appearance: none;
        width: 25px; /* Set a specific slider handle width */
        height: 10px; /* Slider handle height */
        background: white; /* Green background */
        cursor: pointer; /* Cursor on hover */
    }

    .time {
        display: flex;
        flex-direction: row;
        margin-left: 1rem;
        align-items: flex-end;
    }
    .time h2 {
        margin-bottom: 0.1rem;
        margin-top: 0;
    }
    .time h1 {
        margin-bottom: 0rem;
        margin-top: 0;
    }
    #sidebar {
      width: 20%;
      height: 100vh;
      display: flex;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.383);
      backdrop-filter: blur(10px);
      right: 0;
      z-index: 100;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      transition-timing-function: ease-in-out;
      transition: width 150ms, margin 150ms;
    }
    #top {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }
    #hide {
        width: 100%;
        height: 2rem;
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 80;
    }
    #name {
        text-align: center;
    }
    #bottom {
        width: 100%;
        position: absolute;
        bottom: 0;
        right: 0;
    }
    #about {
        transition: width 0.6s, rotate 8s;
        transition-timing-function: ease-in-out;
        width: 100%;
        height: 3rem;
        background-color: #0d0d0d;
        outline: none;
        border: none;
        color: white;
        font-size: 2rem;
        font-family: 'Montserrat', sans-serif;
        /*rotate: 1deg;  trollface */
    }
    .extend {
        width: 60% !important;
        padding-right: 1rem;
    }
    a {
        color: white;
        text-decoration: none;
        cursor: pointer;
    }
    a:hover {
        text-decoration: underline;
    } 
    .container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-top: 1rem;
  margin-left: 1rem;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: rgb(65, 65, 65);
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: rgb(65, 65, 65);
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #0020c3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

  </style>