<template>
  <div>{{ monthName }} {{ year }}</div>
</template>

<script>
import { getFullMonthName } from "../helpers";

export default {
  name: "MonthView",
  props: {
    year: Number,
    month: Number
  },
  computed: {
    monthName: function() {
      return getFullMonthName(this.year, this.month);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
