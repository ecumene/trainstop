<script lang="ts">
  import type { Stop } from "../../config.toml";
  import TeamCard from "./TeamCard.svelte";
  export let stop: Stop[];
</script>

<div class="flex flex-col">
  <h1 class="font-display font-bold text-3xl my-4">🧑‍🤝‍🧑Teams</h1>
  <div
    class="flex my-4 text-sm rounded-lg border-solid border-2 border-green-900 bg-blue-100 px-2 py-4"
  >
    💬 Add yourself to a team here to be tracked in Trainstop.
  </div>
  <div class="flex flex-col gap-4">
    {#each stop as team}
      <TeamCard stop={team} />
    {/each}
  </div>
</div>
