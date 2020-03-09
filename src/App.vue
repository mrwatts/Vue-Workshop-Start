<template>
  <div id="app">
    <img width="25%" src="./assets/logo.png">
    <Agenda msg="Your component goes here..."/>
  </div>
</template>

<script>
import Agenda from "./components/Agenda";

export default {
  name: "App",
  components: {
    Agenda
  }
};
</script>

<style>
body {
  background-color: #000;
  color: #FFF;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
