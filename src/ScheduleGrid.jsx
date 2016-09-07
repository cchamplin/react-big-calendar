import React, { Component } from 'react';
import cn from 'classnames';
import { findDOMNode } from 'react-dom';
import dates from './utils/dates';
import localizer from './localizer'

import ScheduleDayColumn from './ScheduleDayColumn';
import EventRow from './EventRow';
import ScheduleColumn from './ScheduleColumn';
import BackgroundCells from './BackgroundCells';

import getWidth from 'dom-helpers/query/width';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import message from './utils/messages';

import { dateFormat} from './utils/propTypes';

import { notify } from './utils/helpers';
import { navigate } from './utils/constants';
import { accessor as get } from './utils/accessors';

import {
  inRange, eventSegments, scheduledEventSegments, endOfRange
  , eventLevels, sortEvents, segStyle } from './utils/eventLevels';

const MIN_ROWS = 1;


export default class ScheduleGrid extends Component {

  static propTypes = {
    ...ScheduleDayColumn.propTypes,
    ...ScheduleColumn.propTypes,

    step: React.PropTypes.number,
    min: React.PropTypes.instanceOf(Date),
    max: React.PropTypes.instanceOf(Date),
    scrollToTime: React.PropTypes.instanceOf(Date),
    dayFormat: dateFormat,
    rtl: React.PropTypes.bool
  }

  static defaultProps = {
    ...ScheduleDayColumn.defaultProps,
    ...ScheduleColumn.defaultProps,

    step: 30,
    min: dates.startOf(new Date(), 'day'),
    max: dates.endOf(new Date(), 'day'),
    scrollToTime: dates.startOf(new Date(), 'day'),
    /* these 2 are needed to satisfy requirements from TimeColumn required props
     * There is a strange bug in React, using ...TimeColumn.defaultProps causes weird crashes
     */
    type: 'gutter',
    now: new Date()
  }

  constructor(props) {
    super(props)
    this.state = { gutterWidth: undefined, isOverflowing: null };
    this._selectEvent = this._selectEvent.bind(this)
    this._headerClick = this._headerClick.bind(this)
  }

  componentWillMount() {
    this._gutters = [];
    this.calculateScroll();
  }

  componentDidMount() {
    this.checkOverflow();

    if (this.props.width == null) {
      this.measureGutter()
    }
    this.applyScroll();

    //this.positionTimeIndicator();
    //this.triggerTimeIndicatorUpdate();
  }

  componentWillUnmount() {
    window.clearTimeout(this._timeIndicatorTimeout);
  }

  componentDidUpdate() {
    if (this.props.width == null && !this.state.gutterWidth) {
      this.measureGutter()
    }

    this.applyScroll();
    //this.positionTimeIndicator();
    //this.checkOverflow()
  }

  componentWillReceiveProps(nextProps) {
    const { start, scrollToTime } = this.props;
    // When paginating, reset scroll
    if (!dates.eq(nextProps.start, start) || nextProps.scrollToTime !== scrollToTime) {
      this.calculateScroll();
    }
  }

  render() {
    let {
        final, start, end, width
      , startAccessor, endAccessor } = this.props;

    width = width || this.state.gutterWidth;

    let range = dates.range(start, end, 'day')

    this._slots = range.length;

    let finalSchedule = [];

    final.forEach(period => {
      if (inRange(period, start, end, this.props)) {
          finalSchedule.push(period)
      }
    })



    finalSchedule.sort((a, b) => sortEvents(a, b, this.props))

    let {first, last} = endOfRange(range);

    let segments = finalSchedule.map(evt => scheduledEventSegments(evt, first, last, this.props))

    let gutterRef = ref => this._gutters[1] = ref && findDOMNode(ref);

    return (
      <div className='rbc-time-view'>
        {
          this.renderHeader(range, segments, width)
        }
        <div ref='content' className='rbc-schedule-content'>

          {this.props.groups.map((group, i) =>
              <div key={i} className='rbc-group'>
            {group.slots.map((slot, i) =>
          <div key={i} className='rbc-row'>
            <div
              className='rbc-label rbc-schedule-gutter'
              style={{ width }}
            >
              { slot.content }
            </div>
            <div ref={'slot_' + i} className='rbc-schedule-cell'>
              <BackgroundCells
                slots={range.length}
                container={()=> this.refs['slot_' + i]}
                selectable={this.props.selectable}
              />
            <div className="rbc-slot-row" style={{ zIndex: 1, position: 'relative' }}>
                { this.renderSchedule(slot.periods) }
              </div>
            </div>
          </div>
        )}
          </div>
        )}
        </div>
      </div>
    );
  }

  renderSchedule(periods){
    let {
        start, end } = this.props;
    let schedule = [];

    periods.forEach(period => {
      if (inRange(period, start, end, this.props)) {
          schedule.push(period)
      }
    });
    if (schedule.length == 0) {
      return;
    }

    schedule.sort((a, b) => sortEvents(a, b, this.props))

    let range = dates.range(start, end, 'day')

    let {first, last} = endOfRange(range);

    let segments = schedule.map(period => scheduledEventSegments(period, first, last, this.props))

    let { levels } = eventLevels(segments);

    while (levels.length < MIN_ROWS )
      levels.push([])

    return levels.map((segs, idx) =>
      <EventRow
        eventComponent={this.props.components.event}
        titleAccessor={this.props.titleAccessor}
        colorAccessor={this.props.colorAccessor}
        startAccessor={this.props.startAccessor}
        endAccessor={this.props.endAccessor}
        allDayAccessor={this.props.allDayAccessor}
        eventPropGetter={this.props.eventPropGetter}
        onSelect={this._selectEvent}
        slots={this._slots * 24}
        key={idx}
        segments={segs}
        start={first}
        end={last}
      />
    )
  }

  renderFinalSchedule(range, levels){
    let { first, last } = endOfRange(range);

    while (levels.length < MIN_ROWS )
      levels.push([])

    return levels.map((segs, idx) =>
      <EventRow
        eventComponent={this.props.components.event}
        titleAccessor={this.props.titleAccessor}
        colorAccessor={this.props.colorAccessor}
        startAccessor={this.props.startAccessor}
        endAccessor={this.props.endAccessor}
        allDayAccessor={this.props.allDayAccessor}
        eventPropGetter={this.props.eventPropGetter}
        onSelect={this._selectEvent}
        slots={this._slots * 24}
        key={idx}
        segments={segs}
        start={first}
        end={last}
      />
    )
  }

  renderHeader(range, segments, width) {
    let { messages, rtl } = this.props;
    let { isOverflowing } = this.state || {};

    let { levels } = eventLevels(segments);
    let style = {};

    if (isOverflowing)
      style[rtl ? 'marginLeft' : 'marginRight'] = scrollbarSize() + 'px';

    return (
      <div
        ref='headerCell'
        className={cn(
          'rbc-time-header',
          isOverflowing && 'rbc-overflowing'
        )}
        style={style}
      >
        <div className='rbc-row'>
          <div
            className='rbc-label rbc-header-gutter'
            style={{ width }}
          />
          { this.renderHeaderCells(range) }
        </div>
        <div className='rbc-row'>
          <div
            ref={ref => this._gutters[0] = ref}
            className='rbc-label rbc-header-gutter'
            style={{ width }}
          >
            { message(messages).finalSchedule }
          </div>
          <div ref='finalSchedule' className='rbc-final-cell'>
            <BackgroundCells
              slots={range.length}
              container={()=> this.refs.finalSchedule}
              selectable={this.props.selectable}
            />
            <div style={{ zIndex: 1, position: 'relative' }}>
              { this.renderFinalSchedule(range, levels) }
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderHeaderCells(range){
    let { dayFormat, culture } = this.props;

    return range.map((date, i) =>
      <div
        key={i}
        className='rbc-header'
        style={segStyle(1, this._slots)}
      >
        <a href='#' onClick={this._headerClick.bind(null, date)}>
          { localizer.format(date, dayFormat, culture) }
        </a>
      </div>
    )
  }

  _headerClick(date, e){
    e.preventDefault()
    notify(this.props.onNavigate, [navigate.DATE, date])
  }

  _selectEvent(...args){
    notify(this.props.onSelectEvent, args)
  }

  measureGutter() {
    let width = this.state.gutterWidth;
    let gutterCells = this._gutters;

    if (!width) {
      width = Math.max(...gutterCells.map(getWidth));

      if (width) {
        this.setState({ gutterWidth: width })
      }
    }
  }

  applyScroll() {
    if (this._scrollRatio) {
      const { content } = this.refs;
      content.scrollTop = content.scrollHeight * this._scrollRatio;
      // Only do this once
      this._scrollRatio = null;
    }
  }

  calculateScroll() {
    const { min, max, scrollToTime } = this.props;

    const diffMillis = scrollToTime - dates.startOf(scrollToTime, 'day');
    const totalMillis = dates.diff(max, min);

    this._scrollRatio = diffMillis / totalMillis;
  }

  checkOverflow() {
    if (this._updatingOverflow) return;

    let isOverflowing = this.refs.content.scrollHeight > this.refs.content.clientHeight;

    if (this.state.isOverflowing !== isOverflowing) {
      this._updatingOverflow = true;
      this.setState({ isOverflowing }, () => {
        this._updatingOverflow = false;
      })
    }
  }

  /*positionTimeIndicator() {
    const {min, max} = this.props
    const now = new Date();

    const secondsGrid = dates.diff(max, min, 'seconds');
    const secondsPassed = dates.diff(now, min, 'seconds');

    const timeIndicator = this.refs.timeIndicator;
    const factor = secondsPassed / secondsGrid;
    const timeGutter = this._gutters[this._gutters.length - 1];

    if (timeGutter && now >= min && now <= max) {
      const pixelHeight = timeGutter.offsetHeight;
      const offset = Math.floor(factor * pixelHeight);

      timeIndicator.style.display = 'block';
      timeIndicator.style.left = timeGutter.offsetWidth + 'px';
      timeIndicator.style.top = offset + 'px';
    } else {
      timeIndicator.style.display = 'none';
    }
  }

  triggerTimeIndicatorUpdate() {
    // Update the position of the time indicator every minute
    this._timeIndicatorTimeout = window.setTimeout(() => {
      this.positionTimeIndicator();

      this.triggerTimeIndicatorUpdate();
    }, 60000)
  }*/


}
