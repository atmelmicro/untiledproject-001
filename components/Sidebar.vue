<!-- Please remove this file from your project -->
<template>
    <div id="sidebar" :class="{extend: extend}">
        <div id="top">
            <h2 id="name">untitled project 001</h2>
            <audio id="audio" src="helicopter.mp3"></audio>
        </div>
        <div id="bottom">
            <button id="about" @click="bruh">
                Co to kurva je?
            </button>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Sidebar',
    data () {
        return {
            extend: false
        } 
    },
    methods: {
        bruh() {
            this.extend = !this.extend// let myAudio = document.querySelector('#audio'); myAudio.play()
        }
    }
  }
  </script>
  
  <style>
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
      transition: width 0.4s;
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
    }

  </style>