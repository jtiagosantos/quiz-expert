export type OrderBy = {
  timesPlayed?: OrderByParam;
  timestamp?: OrderByParam;
};

type OrderByParam = {
  key: string;
  label: string;
  value: 'asc' | 'desc';
} | null;
