<template>
  <h2>Races page</h2>
    <div v-for="race in races" v-bind:key="race">
        <div class="race-div">
          <div>
            <span class="span-race">Дата вильоту</span>
            <span class="span-race">{{race.flightDate}}</span>
          </div>
          <div>
            <span class="span-race">Пункт відправлення</span>
            <span class="span-race">{{race.departurePoint}}</span>
          </div>
          <div>
            <span class="span-race">Пункт призначення</span>
            <span class="span-race">{{race.destinationPoint}}</span>
          </div>
          <button @click="showTickets(race.id)">View tickets</button>
        </div>
    </div>
    <TicketList v-if="ticketsListVisible" @close="activateModal" :raceId = racePassId />
</template>

<script>
import { onBeforeUnmount } from '@vue/runtime-core'
import TicketList from '../components/TicketList.vue'
export default {
  components:
  {
    TicketList
  },
 data()
 {
    return{
      racePassId:0,
      ticketsListVisible:false,
      races:[]
    }
 },
 methods:
 {
    getAllRaces()
    {
      let httpRequest = new XMLHttpRequest()
      httpRequest.open("GET", "https://localhost:5001/api/customeractions/races")
      httpRequest.onload = () =>
      {
        console.log("It worked!")
        console.log(httpRequest.responseText)
        this.races = JSON.parse(httpRequest.responseText)
      }
      httpRequest.send()
    },
    showTickets(id)
    {
      this.$data.racePassId = id
      console.log("Race ID:" + this.$data.racePassId)
      this.activateModal()
    },
    activateModal()
    {
      this.$data.ticketsListVisible = !this.$data.ticketsListVisible
    }
 },
 beforeMount(){
    this.getAllRaces()
 }
}
</script>

<style>
.race-div
{
  width: 400px;
  height: 200px;
  background-color: rgb(221, 214, 207);
  margin: 10px;
}
.race-section
{
  width: 100%;
  height: 50%;
  background-color: antiquewhite;
}
.span-race
{
  margin:  10px;
}
</style>