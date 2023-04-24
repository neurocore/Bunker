<template>
  <label>
    <span>Введите имя: </span>
    <input type="text" v-model.trim="name">
  </label>
</template>

<script>
  import * as storage from '../../service/storage.js';

  export default {
    name: 'EnterName',
    props: ['value'],
    data() {
      return {
        name: storage.get_global('name', '')
      }
    },
    watch: {
      name: {
        immediate: true,
        handler(val)
        {
          storage.set_global('name', val);
          this.$emit('changed-name', val);
        }
      }
    },
  }
</script>
