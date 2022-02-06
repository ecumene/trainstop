<script lang="ts">
  import { url } from "@roxi/routify";
  const [, team, member] = $url().match(/\/teams\/(.*)\/filter\/(.*)/);
  import TeamsIndex from "../index.svelte";
</script>

<TeamsIndex {team} {member} />
