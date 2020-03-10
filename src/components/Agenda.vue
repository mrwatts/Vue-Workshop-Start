<template>
  <div>
    <MonthView :year="2020" :month="3" v-on:selecteddatechanged="selectedDate = $event"/>
    <Appointments :date="selectedDate"/>
  </div>
</template>

<script>
import MonthView from "./MonthView.vue";
import Appointments from "./Appointments.vue";

export default {
  name: "Agenda",
  components: {
    MonthView,
    Appointments
  },
  data: function() {
    return {
      selectedDate: null
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
