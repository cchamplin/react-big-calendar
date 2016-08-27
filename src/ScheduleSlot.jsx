import React, { PropTypes, Component } from 'react'
import cn from 'classnames'

export default class ScheduleSlot extends Component {
  static propTypes = {
    showLabel: PropTypes.bool,
    content: PropTypes.string,
    culture: PropTypes.string
  }

  static defaultProps = {
    showLabel: false,
    content: ''
  }

  render() {
    return (
      <div
        className={cn(
          'rbc-time-slot',
          this.props.showLabel && 'rbc-label'
        )}
      >
      {this.props.showLabel &&
        <span>{this.props.content}</span>
      }
      </div>
    )
  }
}
