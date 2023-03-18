<script setup lang="ts">
import axios from 'axios'
import {ref, onMounted} from 'vue';
import {ElTable} from 'element-plus'
import 'element-plus/es/components/message/style/css'

let hotels: Hotel[] = ref(null);

onMounted(() => {
  axios
      .get('http://localhost/api/hotels')
      .then((response) => {
        hotels.value = response.data.data
      })
});

interface Hotel {
  name: string
  price: number
  bedrooms: number
  bathrooms: number
  storeys: number
  garages: number
}

const tableRowClassName = ({row, rowIndex,}: {
  row: Hotel
  rowIndex: number
}) => {
  if (isOdd(rowIndex)) {
    return 'warning-row'
  } else if (!isOdd(rowIndex)) {
    return 'success-row'
  }
  return ''
}

function isOdd(numb) {
  let number = numb;
  if (Math.floor(number / 2) == number / 2) {
    return false;
  } else {
    return true;
  }
}

</script>

<template>

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
</style>