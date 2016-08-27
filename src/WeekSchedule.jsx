import React from 'react';
import dates from './utils/dates';
import localizer from './localizer';
import { navigate } from './utils/constants';

import ScheduleGrid from './ScheduleGrid';

let ScheduleWeek = React.createClass({

  propTypes: ScheduleGrid.propTypes,

  getDefaultProps() {
    return ScheduleGrid.defaultProps
  },

  render() {
    let { date } = this.props
    let { start, end } = WeekSchedule.range(date, this.props)

    return (
      <ScheduleGrid {...this.props} start={start} end={end} eventOffset={15}/>
    );
  }

});

ScheduleWeek.navigate = (date, action)=>{
  switch (action){
    case navigate.PREVIOUS:
      return dates.add(date, -1, 'week');

    case navigate.NEXT:
      return dates.add(date, 1, 'week')

    default:
      return date;
  }
}

ScheduleWeek.range = (date, { culture }) => {
  let firstOfWeek = localizer.startOfWeek(culture)
  let start = dates.startOf(date, 'week', firstOfWeek)
  let end = dates.endOf(date, 'week', firstOfWeek)

  return { start, end }
}


export default ScheduleWeek
