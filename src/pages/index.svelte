<script lang="ts">
  import { url } from "@roxi/routify";

  import config from "../../config.toml";
  import MitchBux from "../components/MitchBux.svelte";
  import Teams from "../components/Teams.svelte";
</script>

<a href={$url("./shop")} class="flex">
  Spend <MitchBux /> ...
</a>
<Teams stop={config.stop} />
