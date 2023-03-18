<script setup>
import axios from 'axios'
import {ref, onMounted} from 'vue';

let hotels = ref(null);

onMounted(() => {
  axios
      .get('http://localhost/api/hotels')
      .then((response) => {
        hotels.value = response.data.data
      })
});
</script>

<template>
  <div v-for="hotel in hotels">
    <p>{{ hotel.name }}</p>
    <p>{{ hotel.price }}</p>
    <p>{{ hotel.bedrooms }}</p>
    <p>{{ hotel.bathrooms }}</p>
    <p>{{ hotel.storeys }}</p>
    <p>{{ hotel.garages }}</p>
  </div>
</template>
