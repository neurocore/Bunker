<template>
  <div :class="['card', type]"
       data-code="{{ code }}">
    <div class="title">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'card',
    props: {
      type: String,
      code: String,
    },
    computed: {
      img() {
        return this.image || this.code + '.jpg';
      }
    }
  }
</script>

<style scoped>
  .card {
    padding: 20px 30px;
    background: #f6c687;
    width: 150px;
    height: 250px;
    border-radius: 10px;
    box-shadow: 3px 3px 8px rgba(0,0,0,.1);
    border: 1px solid rgba(0,0,0,.2);
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .card.type {
    background: lightblue;
  }
</style>
