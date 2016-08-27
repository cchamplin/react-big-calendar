import React, { Component, PropTypes } from 'react'
import cn from 'classnames';

import dates from './utils/dates';

import TimeSlotGroup from './ScheduleSlotGroup'

export default class ScheduleColumn extends Component {
  static propTypes = {
    groups: PropTypes.arrayOf(PropTypes.object),
    now: PropTypes.instanceOf(Date).isRequired,
    showLabels: PropTypes.bool,
    timeGutterFormat: PropTypes.string,
    type: PropTypes.string.isRequired,
    className: PropTypes.string
  }
  static defaultProps = {
    showLabels: false,
    type: 'day',
    className: ''
  }

  renderSlotGroup(key, slots) {
    return (
      <ScheduleSlotGroup
        key={key}
        slots={slots}
        showLabels={this.props.showLabels}
      />
    )
  }

  render() {
    const timeslots = []

    for (var i = 0; i < this.props.groups.length; i++) {
      timeslots.push(this.renderSlotGroup(this.props.groups[i].key, this.props.groups[i].slots))
    }

    return (
      <div
        className={cn(this.props.className, 'rbc-time-column')}
        style={this.props.style}
      >
        {timeslots}
        {this.props.children}
      </div>
    )
  }
}
