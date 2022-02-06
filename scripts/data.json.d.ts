type ContributionsCalendarDay = {
  color: string;
  contributionCount: number;
  date: string;
  weekday: string;
};

export type ContributionsCalendarWeek = {
  firstDay: string;
  contributionDays: ContributionsCalendarDay[];
};

type ContributionsCalendar = {
  colors: string[];
  totalContributions: number;
  weeks: ContributionsCalendarWeek[];
};

type ContributionsCollection = {
  contributionCalendar: ContributionsCalendar;
};

export type User = {
  name: string;
  login: string;
  avatarUrl: string;
  contributionsCollection: ContributionsCollection;
};

type GqlResponse = {
  data: {
    user: User;
  };
};

declare const exports: GqlResponse[];
export default exports;
