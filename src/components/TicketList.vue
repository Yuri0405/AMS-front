<template>
  <div class="modal-background">
    <div class="modal-body">
        <button @click="closeModal" style="float:right;margin-right:0px">X</button><br>
        <div style="overflow:scroll">
            <div class="ticket-div" v-for="ticket in tickets" v-bind:key="ticket">
                <span>Ticket Number - {{ticket.ticketNumber}}</span><br>
                <span>Seat Number - {{ticket.seatNumber}}</span><br>
                <span>Flight Date - {{ticket.flightDate}}</span><br>
                <span>Departure Point - {{ticket.departurePoint}}</span><br>
                <span>Destination Point - {{ticket.destinationPoint}}</span><br>
                <span>Plane Number - {{ticket.planeNumber}}</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {

 emits:['close'],
 props:['raceId'],
 created()
 {
    this.getTickets()
 },
 data()
 {
    return{
        tickets:[]
    }
 },
 methods:
 {
    closeModal()
    {
        this.$emit('close')
    },
    getTickets()
    {
        let httpRequest = new XMLHttpRequest();
        httpRequest.open("GET","https://localhost:5001/api/customeractions/tickets/" + this.raceId)
        httpRequest.onload = () =>
        {
            this.tickets = JSON.parse(httpRequest.responseText)
        }
        httpRequest.send()
      console.log("Props RaceId is: " + this.raceId)
    }
 }


}
</script>

<style>
.modal-background{
    position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-body{
    background-color: azure;
    width: 800px;
    height: 650px;
}

.ticket-div{
    background-color: bisque;
    height:125px;
    width:500px;
    margin-top: 10px;
    margin-left:10px
}
</style>