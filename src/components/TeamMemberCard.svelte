<script lang="ts">
  import type { User } from "../../scripts/data.json";

  export let user: User;
  export let onNavigateToUser: (user: User) => void;

  import SvelteHeatmap from "svelte-heatmap";
  import { getUserContributions } from "../utils";
  import { mapEmptyColor, mapColors } from "../consts";
  import MitchBux from "./MitchBux.svelte";
  import coins from "../../scripts/coins.json";

  const calendarData = getUserContributions([user.login]);
  const date = new Date();
  const lastWeek = getUserContributions([user.login], 2);

  const maxValue = Math.max(...lastWeek.map((x) => x.value));
  const weekDisplay = lastWeek.map(({ date, value }) => {
    const maxColor = mapColors.length - 1;
    let color = mapColors[Math.round((value / maxValue) * maxColor)];
    if (value == 0) {
      color = mapEmptyColor;
    }
    return {
      readableNameDay: date.toLocaleDateString("en-US", { weekday: "long" }),
      color,
      value,
    };
  });
</script>

<div role="button" on:click={() => onNavigateToUser(user)} class="flex">
  <div class="flex px-5 py-5 flex-1 gap-4 items-center">
    <div class="w-24">
      <SvelteHeatmap
        colors={mapColors}
        data={calendarData}
        emptyColor={mapEmptyColor}
        endDate={new Date(date.getFullYear(), date.getMonth() + 1, 0)}
        startDate={new Date(date.getFullYear(), date.getMonth(), 1)}
      />
    </div>
    <div class="flex flex-col px-2 items-center align-middle">
      <img
        alt={`${user.name ? user.name : user.login} avatar`}
        src={user.avatarUrl}
        class="w-20 h-20 rounded-full mr-4"
      />
      <span class="flex my-4 text-sm">
        Total
        <MitchBux
          ><span class="font-bold mr-2">{coins[user.login]}</span></MitchBux
        >
      </span>
    </div>
    <div class="hidden md:block text-inherit">
      <div class="text-xl font-semibold">
        {user.name ? user.name : user.login}
      </div>
      <span class="flex my-4 text-sm"> Last Week's Contributions </span>
      <div class="flex mt-3 gap-4">
        {#each weekDisplay as { readableNameDay, color, value }}
          <div class="text-xs text-gray-600">
            {readableNameDay}
            <div
              style="background-color: {color};"
              class="border {value !== 0
                ? 'border-yellow-200 shadow-md shadow-yellow-300/100'
                : 'border-white'} border-4 border-solid p-2 w-14 h-14 text-xs font-semibold text-grey-600"
            >
              {value}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
