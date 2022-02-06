import data from "../scripts/data.json";

type CalendarVal = {
  value: number;
  date: Date;
};
type CalendarData = CalendarVal[];

export const getUserContributions = (
  usernames: string[],
  week?: number
): CalendarData => {
  const userResponses = data.filter(
    ({
      data: {
        user: { login },
      },
    }) => usernames.includes(login)
  );

  const calendarMap: Record<string, number> = {};

  for (const {
    data: {
      user: {
        contributionsCollection: {
          contributionCalendar: { weeks },
        },
      },
    },
  } of userResponses) {
    const filteredWeeks = week
      ? weeks.filter((_, i) => weeks.length - i === week)
      : weeks;
    for (const { contributionDays } of filteredWeeks) {
      for (const { date: dateIso, contributionCount } of contributionDays) {
        const date = new Date(dateIso);
        const dateString = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`;

        if (calendarMap[dateString]) {
          calendarMap[dateString] += contributionCount;
        } else {
          calendarMap[dateString] = contributionCount;
        }
      }
    }
  }

  const calendarData = Object.entries(calendarMap).map(
    ([dateString, value]) => ({
      date: new Date(dateString),
      value,
    })
  );

  return calendarData;
};

export const getContributionsForWeek = (
  calendarData: CalendarData,
  weekStart: Date
): CalendarVal[] => {
  const weekData = calendarData.filter(
    ({ date }) =>
      date.getDay() <= weekStart.getDay() && weekStart.getDay() >= date.getDay()
  );

  return weekData;
};
