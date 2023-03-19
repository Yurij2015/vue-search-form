<script setup>
import axios from 'axios'
import {ref, onMounted} from 'vue';
import {ElTable, ElInput, ElButton} from 'element-plus'

let hotels = ref(null);
onMounted(() => {
  axios
      .get('http://localhost/api/hotels')
      .then((response) => {
        hotels.value = response.data.data
      })
});

function searchForm() {
  axios
      .get('http://localhost/api/hotel-search', {
        params: {
          'name': name.value ? name.value : null,
          'price_from': price_from.value ? price_from.value : null,
          'price_to': price_to.value ? price_to.value : null,
          'bedrooms': bedrooms.value ? bedrooms.value : null,
          'bathrooms': bathrooms.value ? bathrooms.value : null,
          'storeys': storeys.value ? storeys.value : null,
          'garages': garages.value ? garages.value : null,
        }
      })
      .then((response) => {
        hotels.value = response.data
      })
}

const name = ref('')
const price_from = ref('')
const price_to = ref('')
const bedrooms = ref('')
const bathrooms = ref('')
const storeys = ref('')
const garages = ref('')

const tableRowClassName = ({row, rowIndex}) => {
  if (isOdd(rowIndex)) {
    return 'warning-row'
  } else if (!isOdd(rowIndex)) {
    return 'success-row'
  }
  return ''
}

function isOdd(numb) {
  let number = numb;
  return Math.floor(number / 2) !== number / 2;
}

</script>

<template>
  <el-input class="input-m" v-model="name" placeholder="Please input name"/>
  <el-input class="input-m" v-model="price_from" placeholder="Please input min price"/>
  <el-input class="input-m" v-model="price_to" placeholder="Please input max price"/>
  <el-input class="input-m" type="number" v-model="bedrooms" placeholder="Please input number of bedrooms"/>
  <el-input class="input-m" type="number" v-model="bathrooms" placeholder="Please input number of bathrooms"/>
  <el-input class="input-m" type="number" v-model="storeys" placeholder="Please input number of storeys"/>
  <el-input class="input-m" type="number" v-model="garages" placeholder="Please input number of garages"/>
  <el-button type="primary" class="mt-15" @click="searchForm()">Search</el-button>
  <hr class="mtb-10-15">
  <el-table
      :data="hotels"
      style="width: 100%"
      :row-class-name="tableRowClassName"
  >
    <el-table-column prop="name" label="Name"/>
    <el-table-column prop="price" label="Price"/>
    <el-table-column prop="bedrooms" label="Bedrooms"/>
    <el-table-column prop="bathrooms" label="Bathrooms"/>
    <el-table-column prop="storeys" label="Storeys"/>
    <el-table-column prop="garages" label="Garages"/>
  </el-table>
</template>
<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}

.mtb-10-15 {
  margin-top: 10px;
  margin-bottom: 15px;
}

.mt-15 {
  margin-top: 10px;
  margin-bottom: 15px;
}

.input-m {
  margin-bottom: 2px;
}
</style>