<template>
  <div>
    <div class="header">{{ monthName }} {{ year }}</div>
    <div class="month">
      <div class="day-header">Mon.</div>
      <div class="day-header">Tue.</div>
      <div class="day-header">Wed.</div>
      <div class="day-header">Thu.</div>
      <div class="day-header">Fri.</div>
      <div class="day-header">Sat.</div>
      <div class="day-header">Sun.</div>
      <div
        v-for="day in days"
        :key="day.date.toISOString()"
        class="day"
        :class="{ 
          valid: day.isInReqMonth,
          selected: day.date === selectedDate
        }"
        v-on:click="onDayClick(day)"
      >{{ day.date.date() }}</div>
    </div>
  </div>
</template>

<script>
import { getFullMonthName, getItemsPerMonth } from "../helpers";

export default {
  name: "MonthView",
  props: {
    year: Number,
    month: Number
  },
  data: function() {
    return {
      selectedDate: null
    };
  },
  computed: {
    days: function() {
      return getItemsPerMonth(this.year, this.month);
    },

    monthName: function() {
      return getFullMonthName(this.month);
    }
  },
  methods: {
    onDayClick: function(day) {
      if (day.isInReqMonth) {
        this.selectedDate = day.date;
        this.$emit("selecteddatechanged", day.date.toDate());
      }
    }
  }
};
</script>

<style scoped>
.header {
  margin: 2em;
}

.month {
  display: flex;
  flex-wrap: wrap;
}

.day-header {
  width: 14%;
  font-weight: 600;
  padding: 0.3em;
  box-sizing: border-box;
}

.day {
  width: 14%;
  height: 2em;
  line-height: 2em;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid rgba(2, 21, 49, 0.95);
  background-color: rgba(255, 255, 255, 0.05);
}

.day.valid {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.2);
}

.day.selected {
  cursor: pointer;
  background-color: rgb(230, 10, 65);
}
</style>
