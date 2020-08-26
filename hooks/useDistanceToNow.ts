import {
  differenceInMinutes,
  formatDistanceStrict,
  formatDistanceToNowStrict,
  parseISO,
} from 'date-fns';
import enGB from 'date-fns/locale/en-GB';
import useSWR from 'swr';

export default function useDistanceToNow(isoDateString?: string) {
  const { data } = useSWR([isoDateString, formatDistanceToNowStrict], {
    fetcher(key) {
      const now = new Date();
      const date = parseISO(key);
      if (differenceInMinutes(now, date) < 1) {
        return 'live';
      }
      return formatDistanceStrict(date, now, {
        locale: enGB,
        addSuffix: true,
      });
    },
    refreshInterval: 1000,
  });

  return data;
}
