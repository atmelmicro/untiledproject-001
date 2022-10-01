<template>
    <div>{{ thing }}</div>
  </template>
  
  <script>
  import gql from 'graphql-tag'
  
  export default {
    data () {
        return {
            data: {},
            thing: []
        }
    },
    apollo: {
      // Simple query that will update the 'hello' vue property
        thing: {
            query () {
                return gql`
      {
        GetHistoricalDataByTime(timeStart: 1631782500, timeEnd: 1664603372) {
            type
            geometry {
            type
            coordinates
            }
            properties {
            events {
             type
            startTime
      }
    }
  }
}
      
      `
            }, update: data => data.GetHistoricalDataByTime
        }
    },
  }
  </script>
  