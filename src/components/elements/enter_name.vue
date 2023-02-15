<template>
  <label>
    <span>Введите имя: </span>
    <input type="text" v-model.trim="name">
  </label>
</template>

<script>
  export default {
    name: 'EnterName',
    props: ['value'],
    data() {
      return {
        name: process.env.NODE_ENV != 'development'
            ? localStorage.getItem('cbl_bunker_name') || ''
            : this.value
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
