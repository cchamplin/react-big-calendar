'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dates = require('./utils/dates');

var _dates2 = _interopRequireDefault(_dates);

var _localizer = require('./localizer');

var _localizer2 = _interopRequireDefault(_localizer);

var _constants = require('./utils/constants');

var _ScheduleGrid = require('./ScheduleGrid');

var _ScheduleGrid2 = _interopRequireDefault(_ScheduleGrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScheduleWeek = _react2.default.createClass({
  displayName: 'ScheduleWeek',


  propTypes: _ScheduleGrid2.default.propTypes,

  getDefaultProps: function getDefaultProps() {
    return _ScheduleGrid2.default.defaultProps;
  },
  render: function render() {
    var date = this.props.date;

    var _Week$range = Week.range(date, this.props);

    var start = _Week$range.start;
    var end = _Week$range.end;


    return _react2.default.createElement(_ScheduleGrid2.default, _extends({}, this.props, { start: start, end: end, eventOffset: 15 }));
  }
});

ScheduleWeek.navigate = function (date, action) {
  switch (action) {
    case _constants.navigate.PREVIOUS:
      return _dates2.default.add(date, -1, 'week');

    case _constants.navigate.NEXT:
      return _dates2.default.add(date, 1, 'week');

    default:
      return date;
  }
};

ScheduleWeek.range = function (date, _ref) {
  var culture = _ref.culture;

  var firstOfWeek = _localizer2.default.startOfWeek(culture);
  var start = _dates2.default.startOf(date, 'week', firstOfWeek);
  var end = _dates2.default.endOf(date, 'week', firstOfWeek);

  return { start: start, end: end };
};

exports.default = ScheduleWeek;
module.exports = exports['default'];