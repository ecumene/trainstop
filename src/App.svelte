<script lang="ts">
  import MitchBux from "./components/MitchBux.svelte";
  import { Router } from "@roxi/routify";
  import { routes } from "../.routify/routes";
</script>

<svelte:head>
  <title>TrainStop</title>
  <meta name="robots" content="noindex nofollow" />
  <html lang="en" />
</svelte:head>

<main>
  <div class="container mx-auto flex flex-col">
    <div class="flex items-center">
      <div class="shrink-0">
        <img
          src="assets/logo.png"
          alt="a pixel art train entering the station"
          class="h-20 rounded-lg"
        />
      </div>
      <div class="mx-4">
        <h1 class="font-display font-black text-3xl my-4">Trainstop</h1>
      </div>
    </div>
    <div class="flex my-4 text-sm">
      Compete with friends on Github for <MitchBux />
    </div>

    <Router {routes} />
  </div>
  <!-- {`config.toml: ${JSON.stringify(config)}`} -->
</main>

<style global lang="postcss">
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap");

  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  body {
    font-family: "Inter", sans-serif;
  }
</style>
