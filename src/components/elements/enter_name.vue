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
      const pre = process.env.VUE_APP_PRE;
      const name = process.env.NODE_ENV == 'development'
                 ? sessionStorage.getItem(`${pre}_name`)
                 : localStorage.getItem(`${pre}_name`);
      return {
        name: name || ''
      }
    },
    watch: {
      name: {
        immediate: true,
        handler(val)
        {
          const pre = process.env.VUE_APP_PRE;
          if (process.env.NODE_ENV == 'development')
            sessionStorage.setItem(`${pre}_name`, val);
          else
            localStorage.setItem(`${pre}_name`, val);

          console.log('changed-name', val);
          this.$emit('changed-name', val);
        }
      }
    },
  }
</script>
