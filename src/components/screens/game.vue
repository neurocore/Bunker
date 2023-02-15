<template>
	<div class="block">
		<div>Game with id = {{ game_id }}</div>
	</div>
	
	<div class="container">
    <Card code="code" type="none">Просто</Card>
    <Card code="code" type="type">Я карта</Card>
    <Card code="code" type="type">Я карта</Card>
  </div>
</template>

<script>
  import Card from '../elements/card.vue';

	export default {
		name: 'Game',
		components: {
			Card
		},
		props: ['game_id'],
	}
</script>
