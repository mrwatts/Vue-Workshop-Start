<template>
  <MonthView v-bind:year="2020" v-bind:month="3"/>
</template>

<script>
import MonthView from "./MonthView.vue";

export default {
  name: "Agenda",
  components: {
    MonthView
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
