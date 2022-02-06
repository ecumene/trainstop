<script>
  import { url } from "@roxi/routify";

  export let id;
  import config from "../../../../config.toml";
  const item = config.item.find(({ id: itemId }) => itemId === id);
</script>

{#if item === undefined}
  Couldn't find that item. Sorry!
{:else}
  <div>
    <div class="flex gap-4 items-center">
      <h1 class="font-display font-bold text-3xl my-4">{item.name}</h1>
      <a href={$url("/shop")}>&lt;-- See all items</a>
    </div>
    <div
      class="my-4 text-sm rounded-lg border-solid border-2 border-green-900 bg-blue-100 px-2 py-4"
    >
      💬 To purchase this, add this snippet to the end of the &nbsp;<a
        class="text-sky-600"
        href="url">config.toml here</a
      >
    </div>
    <b>config.toml</b>
    <pre class="bg-gray-200 p-4 rounded-sm">
[[buy]]
username = "urgithubusername"
deducted = {item.price}
for = "{item.id}"
    </pre>
  </div>
{/if}
