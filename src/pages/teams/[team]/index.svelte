<script lang="ts">
  export let team;
  export let member;

  let showMonths = false;

  import config from "../../../../config.toml";
  import data, { User } from "../../../../scripts/data.json";
  import TeamMemberCard from "../../../components/TeamMemberCard.svelte";
  import { getUserContributions } from "../../../utils";
  import { mapEmptyColor, mapColors } from "../../../consts";

  import SvelteHeatmap from "svelte-heatmap";
  import { goto, url } from "@roxi/routify";

  const stop = config.stop.find((stop) => stop.slug === team);

  const onNavigateToUser = (user: User) => {
    member = user.login;
    $goto(`/teams/${stop.slug}/filter/${user.login}`);
  };

  let calendarData;
  let filteredUsers;

  $: {
    filteredUsers = data.filter(
      ({
        data: {
          user: { login },
        },
      }) => stop.usernames.includes(login)
    );
    let usernames;
    if (member !== undefined) {
      usernames = [member];
    } else {
      usernames = stop.usernames;
    }
    calendarData = getUserContributions(usernames);
  }
</script>

<main>
  <div class="flex gap-4 items-center">
    <h1 class="font-display font-black text-3xl">{stop.name}</h1>
    <a href={$url("/")}>&lt;-- See all teams</a>
  </div>
  <div class="flex gap-3 mt-4 mb-2">
    <button
      class="bg-amber-100 hover:bg-amber-500 font-bold py-1 px-2 rounded"
      on:click={() => {
        showMonths = false;
      }}>Yearly</button
    >
    <button
      class="bg-amber-100 hover:bg-amber-500 font-bold py-1 px-2 rounded"
      on:click={() => {
        showMonths = true;
      }}>Monthly</button
    >
    {#if member !== undefined}
      <button
        class="hover:bg-amber-500 font-bold py-1 px-2 rounded"
        on:click={() => {
          member = undefined;
          $goto(`/teams/${stop.slug}`);
        }}>Remove Filters</button
      >
    {/if}
  </div>
  <div class="my-5">
    <SvelteHeatmap
      colors={mapColors}
      data={calendarData}
      emptyColor={mapEmptyColor}
      endDate={new Date(new Date().getFullYear(), 11, 31)}
      startDate={new Date(new Date().getFullYear(), 0, 1)}
      view={showMonths ? "monthly" : "year"}
    />
  </div>
  <div class="flex pt-4 gap-4 flex-col">
    {#each filteredUsers as userResponse}
      <TeamMemberCard user={userResponse.data.user} {onNavigateToUser} />
    {/each}
  </div>
</main>
