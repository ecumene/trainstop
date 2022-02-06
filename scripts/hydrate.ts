import type { Config } from "../config.toml.d.ts";
import { config as dotenvConfig } from "https://deno.land/x/dotenv/mod.ts";
import { parse } from "https://deno.land/std@0.123.0/encoding/toml.ts";

import GqlResponse from "./data.json.d.ts";

const dotenv = dotenvConfig();

const configSrc = await Deno.readTextFile("../config.toml");
const config = parse(configSrc) as Config;

const startingWeek = new Date(new Date().getFullYear(), 0, 1).toISOString();

const getContributions = async (
  token: string,
  username: string,
  firstDay: string,
  lastDay: string
) => {
  const headers = {
    Authorization: `bearer ${token}`,
  };
  const body = {
    variables: { username, firstDay, lastDay },
    query: `query($username: String!, $firstDay: DateTime!, $lastDay: DateTime!) {
      user(login: $username) {
        name
        login
        avatarUrl
        contributionsCollection(
          from: $firstDay,
          to: $lastDay,
        ) {
          contributionCalendar {
            colors
            totalContributions
            weeks {
              contributionDays {
                color
                contributionCount
                date
                weekday
              }
              firstDay
            }
          }
        }
      }
    }`,
  };
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers,
  });
  const data = await response.json();
  console.log(data);

  return data;
};

const allUsernames = [
  ...new Set(config.stop.map(({ usernames }) => usernames).flat()),
];
const allContributions: typeof GqlResponse = await Promise.all(
  allUsernames.map((username) =>
    getContributions(
      Deno.env.get("GITHUB_TOKEN") ?? dotenv.GITHUB_TOKEN,
      username,
      startingWeek,
      new Date().toISOString()
    )
  )
);

await Deno.writeTextFile("./data.json", JSON.stringify(allContributions));

const coinsPerUser = allContributions.map((response) => {
  const {
    user: {
      contributionsCollection: {
        contributionCalendar: { weeks },
      },
    },
  } = response.data;
  const days = weeks.flatMap((week) => week.contributionDays);
  let coins = 0;
  let counter = 0;
  for (const day of days) {
    if (counter === 7) {
      counter = 0;
      coins += 1;
    }
    if (day.contributionCount > 0) {
      counter += 1;
    } else {
      counter = 0;
    }
  }
  let deducted = 0;
  if (config.buy) {
    deducted = config.buy
      .filter(({ username }) => username === response.data.user.login)
      .reduce((prev, { deducted }) => prev + deducted, 0);
  }
  return [response.data.user.login, coins - deducted];
});

await Deno.writeTextFile(
  "./coins.json",
  JSON.stringify(Object.fromEntries(coinsPerUser))
);
