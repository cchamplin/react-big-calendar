'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _dates = require('./utils/dates');

var _dates2 = _interopRequireDefault(_dates);

var _ScheduleSlotGroup = require('./ScheduleSlotGroup');

var _ScheduleSlotGroup2 = _interopRequireDefault(_ScheduleSlotGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScheduleColumn = function (_Component) {
  _inherits(ScheduleColumn, _Component);

  function ScheduleColumn() {
    _classCallCheck(this, ScheduleColumn);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  ScheduleColumn.prototype.renderSlotGroup = function renderSlotGroup(key, slots) {
    return _react2.default.createElement(_ScheduleSlotGroup2.default, {
      key: key,
      slots: slots,
      showLabels: this.props.showLabels
    });
  };

  ScheduleColumn.prototype.render = function render() {
    var timeslots = [];

    for (var i = 0; i < this.props.groups.length; i++) {
      timeslots.push(this.renderSlotGroup(this.props.groups[i].key, this.props.groups[i].slots));
    }

    return _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)(this.props.className, 'rbc-time-column'),
        style: this.props.style
      },
      timeslots,
      this.props.children
    );
  };

  return ScheduleColumn;
}(_react.Component);

ScheduleColumn.propTypes = {
  groups: _react.PropTypes.arrayOf(_react.PropTypes.object),
  now: _react.PropTypes.instanceOf(Date).isRequired,
  showLabels: _react.PropTypes.bool,
  timeGutterFormat: _react.PropTypes.string,
  type: _react.PropTypes.string.isRequired,
  className: _react.PropTypes.string
};
ScheduleColumn.defaultProps = {
  showLabels: false,
  type: 'day',
  className: ''
};
exports.default = ScheduleColumn;
module.exports = exports['default'];