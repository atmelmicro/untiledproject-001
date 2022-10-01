import { reactive } from "vue"

export let state = reactive({
    result: {},
    arr: [],
    arrOfPoints: [],
    resultOfSub: {}
})

export let coords = reactive({
    coord: []
})

export let timeStore = reactive({
    od: 0,
    do: 24,
    filter: false,
    history: false,
    odDate: new Date(),
    doDate: new Date()
})