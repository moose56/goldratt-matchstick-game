<script>
  import ProductLine from "./components/ProductLine.svelte";
  import {nextState, createActors} from "./engine";
  import { sleep } from "./utils";

  const TARGET = 100;
  let actors = createActors();
  let supply = 0;

  let isPlaying = false;
  let rafId;
  let frames = 0;
  let startedPlayingAt;

  function handleTogglePlay() {
    if (isPlaying) {
      stop();
      return;
    }
    isPlaying = true;
    startedPlayingAt = Date.now();
    step();
  }

  async function step() {
    ({supply, actors} = nextState(supply, actors));

    //await sleep(1000);

    // if (supply >= TARGET) {
    //   stop();
    // }

    if (isPlaying) {
      frames++;
      rafId = requestAnimationFrame(step);
    }
  }

  function stop() {
    cancelAnimationFrame(rafId);
    isPlaying = false;
    frames = 0;
    startedPlayingAt = undefined;
  }
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
</svelte:head>

<main>
  <div class="canvas">
    <ProductLine
        actors="{actors}"
        supply="{supply}"
    />
  </div>
  <div>
    <button on:click={handleTogglePlay}>{isPlaying ? 'Pause': 'Play'}</button>
  </div>
</main>

<style>
  main {
    height: 100%;
    background: #ebebeb;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .canvas {
    background: white;
    border: 1px solid #c7c7c7;
    height: 40%;
    width: 60%;
    padding: 20px;
    border-radius: 3px;
    min-width: 620px;
    min-height: 125px;
  }
</style>
