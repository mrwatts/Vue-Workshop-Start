<template>
  <div>
    <div class="currentDate">{{ prettyDate }}</div>
    <div
      class="appointment"
      :class="{ important: appointment.important }"
      :key="appointment.id"
      v-for="appointment in appointmentsOnDate"
    >
      <div class="time">{{ prettyTime(appointment.date) }}</div>
      <input class="description" v-model="appointment.description">
      <input type="checkbox" v-model="appointment.important">
    </div>
  </div>
</template>

<script>
import { getAppointments } from "../helpers";
import moment from "moment";

export default {
  name: "Appointments",
  props: {
    date: Date
  },
  data: function() {
    return {
      appointments: getAppointments()
    };
  },
  computed: {
    prettyDate: function() {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return this.date && this.date.toLocaleDateString(undefined, options);
    },
    appointmentsOnDate: function() {
      var startOfDay = moment(this.date);
      var endOfDay = moment(this.date)
        .add(1, "days")
        .subtract(1, "milliseconds");

      return this.appointments.filter(
        item => startOfDay.isBefore(item.date) && endOfDay.isAfter(item.date)
      );
    }
  },
  methods: {
    prettyTime: function(date) {
      return moment(date).format("HH:mm");
    }
  }
};
</script>

<style scoped>
.currentDate {
  padding: 2em;
}

.appointment {
  display: flex;
  justify-content: flex-start;
}

.time {
  width: 50%;
  text-align: right;
  padding: 0.5em;
}

.important .time,
.important .description {
  color: rgb(230, 10, 65);
  font-weight: 600;
}

.description {
  padding: 0.5em;
}
</style>
