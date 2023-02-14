<template>
  <router-view />
</template>

<script>
  // import * as Ably from 'ably';

  export default {
    name: 'App',
    components: {
    },
    mounted: function()
    {
      // let client = new Ably.Rest('XoGRTg.guovuQ:pJCW4Obj4aC1VfSporT1q7KOkGG7AnTYn80qmOGxqG0');
      // let channel = client.channels.get('getting-started');
      // channel.publish({
      //   'name': 'greet',
      //   'data': 'Hello World!',
      // });

      // console.log('client', client);
      // console.log('channel', channel);
    },
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }

  html, body {
    padding: 0;
    margin: 0;
    height: 100%;
    background: aliceblue;
    display: flex;
    flex-direction: column;
  }

  body {
    height: 100%;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #333;
    font-size: 18px;
    flex: 1 0;
  }

  .screen {
    padding: 10px 10px;
    padding-top: 50px;
  }

  .block {
    margin-bottom: 15px;
  }

  .container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .caption {
    font-size: 25px;
    margin-bottom: 10px;
  }

  .caption.big {
    font-size: 30px;
    margin-bottom: 20px;
  }

  .btn {
    background: #eee;
    border-radius: 5px;
    border: 1px solid rgba(0,0,0,.1);
    display: inline-block;
    padding: 0 12px;
    height: 35px;
    font-size: 16px;
    margin-bottom: 10px;
    cursor: pointer;
    box-shadow: 2px 2px 6px rgba(0,0,0,.1);
    -webkit-touch-callout: none;
      -webkit-user-select: none;
       -khtml-user-select: none;
         -moz-user-select: none;
          -ms-user-select: none;
              user-select: none;  
  }

  .btn:active {
    box-shadow: 2px 2px 6px rgba(0,0,0,.1) inset;
  }

  .btn-okay {
    background: #e1f8ff;
  }

  input {
    display: inline-block;
    padding: 0 12px;
    font-size: 16px;
    line-height: 16px;
    height: 35px;
    border-radius: 5px;
    border: 1px solid rgba(0,0,0,.2);
    box-shadow: 2px 2px 6px rgba(0,0,0,.15) inset;
  }

  input:focus {
    outline: none;
    border-color: rgba(0,0,0,.4);
  }
</style>
