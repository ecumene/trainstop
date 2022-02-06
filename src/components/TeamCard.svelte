<script lang="ts">
  import type { Stop } from "../../config.toml";
  export let stop: Stop;
</script>

<a
  class="rounded-lg cursor-pointer border-solid border-2 border-slate-900 p-4"
  href={`/teams/${stop.slug}`}
>
  <h1 class="font-bold text-xl mb-2">{stop.name}</h1>
  <div class="text-sky-500">View</div>
</a>
