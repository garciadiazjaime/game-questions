<style>
	h1 {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	section {
		text-align: center;
	}

	#btn-start {
		display: inline-block;
		padding: 20px;
		border: 2px solid #ff3e00;
		font-size: 40px;
		text-transform: uppercase;
	}

	#timer {
		font-size: 200px;
		padding: 20px;
		text-align: center;
	}
</style>

<script>
	import { onMount } from 'svelte';

	let interval
	let seconds = ''
	let audio
	let message = 'start'

	onMount(() => {
		audio = document.getElementById("myAudio"); 
	})

	function initInterval() {
		interval = setInterval(() => {
			if (seconds > 0) {
				seconds -= 1
				if (seconds === 0) {
					audio.play()
				}
			}
			else {
				clearInterval(interval)
			}
		}, 1000)
	}

	function handleClick() {
		seconds = 5
		if (message === 'stop') {
			clearInterval(interval)
			message = 'start'
		} else {
			audio.load()
			message = 'stop'
			initInterval()
		}
	}
</script>

<svelte:head>
	<title>Menciona</title>
</svelte:head>

<h1>Menciona</h1>


<section>
	<div id="btn-start" on:click={handleClick}>{message}</div>
	<div id="timer">{seconds}</div>
</section>

<audio id="myAudio">
  <source src="finish.wav" type="audio/wav">
	<source src="finish.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>
