<script lang="ts">
  import { url } from "@roxi/routify";
  import config from "../../../config.toml";
  import MitchBux from "../../components/MitchBux.svelte";
  const items = config.item;
</script>

<div class="flex flex-col">
  <div class="flex gap-4 items-center">
    <h1 class="font-display font-bold text-3xl my-4">🛍 MitchShop</h1>
    <a href="/">&lt;-- See all teams</a>
  </div>
  <div
    class="flex my-4 text-sm rounded-lg border-solid border-2 border-green-900 bg-blue-100 px-2 py-4"
  >
    💬 Find ways to spend your <MitchBux /> &nbsp; here
  </div>
  {#each items as item}
    <a
      href={$url(`./item/${item.id}`)}
      class="my-4 gap-3 rounded-lg flex flex-col p-4 border-solid border-2 border-green-900"
    >
      <div>
        id: <code class="bg-gray-200 py-1 px-2 rounded-sm">{item.id}</code>
      </div>
      <h1 class="font-display font-bold text-3xl">{item.name}</h1>
      <div class="flex">
        Price:&nbsp;<MitchBux
          ><span class="font-bold mr-1">{item.price}</span></MitchBux
        >
      </div>
    </a>
  {/each}
</div>
