import React, { PropTypes, Component } from 'react'
import TimeSlot from './TimeSlot'
import date from './utils/dates.js'
import localizer from './localizer'

export default class ScheduleSlotGroup extends Component {
  static propTypes = {
    slots: PropTypes.arrayOf(PropTypes.object),
    showLabels: PropTypes.bool,
    culture: PropTypes.string
  }
  static defaultProps = {
    showLabels: false
  }

  renderSlice(slotNumber, content, value) {

    return <TimeSlot key={slotNumber}
                     showLabel={this.props.showLabels && !slotNumber}
                     content={content}
                     culture={this.props.culture}
                     isNow={false}
                     value={value} />
  }

  renderSlices() {
    const ret = []
    for (let i = 0; i < this.props.slots; i++) {
      let slot = this.props.slots[i]
      ret.push(this.renderSlice(slot.key, slot.content, slot.value))
    }
    return ret
  }
  render() {
    return (
      <div className="rbc-timeslot-group">
        {this.renderSlices()}
      </div>
    )
  }
}
