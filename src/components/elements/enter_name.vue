<template>
  <label>Введите имя: <input type="text" v-model="name"></label>
</template>

<script>
  export default {
    name: 'EnterName',
    data() {
      return {
        name: process.env.NODE_ENV != 'development'
            ? localStorage.getItem('cbl_bunker_name') || ''
            : ''
      }
    },
    watch: {
      name(val) {
        if (process.env.NODE_ENV != 'development')
          localStorage.setItem('cbl_bunker_name', val);

        this.$emit('changed-name', val);
      }
    },
  }
</script>
