<template>
  <div>
    {{checkedCities1}}
    <el-checkbox-group v-model="checkedCities1">
      <el-checkbox v-for="city in cities" :label="city.value" :key="city.id" @change="demo"></el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkedCities1: [],
      cities: [
        {
          value: '上海',
          id: 1
        },
        {
          value: '北京',
          id: 2
        },
        {
          value: '广州',
          id: 3
        },
        {
          value: '深圳',
          id: 4
        }
      ]
    }
  },
  methods: {
    demo() {
      console.log(this.checkedCities1)
    }
  }
}
</script>

