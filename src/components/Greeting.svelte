<script>
	export let messages = [];

	let greeting = messages[0];

	function randomMessage() {
		return messages[Math.floor(Math.random() * messages.length)];
	}
</script>

<div>
	<h3>{greeting}! Thank you for visiting!</h3>
	<button on:click={() => greeting = randomMessage()}>
		New Greeting
	</button>
</div>
