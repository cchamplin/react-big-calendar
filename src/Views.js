import { views } from './utils/constants';
import Month from './Month';
import Day from './Day';
import Week from './Week';
import WeekSchedule from './WeekSchedule';
import Agenda from './Agenda';

const VIEWS = {
  [views.MONTH]: Month,
  [views.WEEK]: Week,
  [views.WEEK_SCHEDULE]: WeekSchedule,
  [views.DAY]: Day,
  [views.AGENDA]: Agenda
};

export default VIEWS;
