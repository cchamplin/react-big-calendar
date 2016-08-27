'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TimeSlot = require('./TimeSlot');

var _TimeSlot2 = _interopRequireDefault(_TimeSlot);

var _dates = require('./utils/dates.js');

var _dates2 = _interopRequireDefault(_dates);

var _localizer = require('./localizer');

var _localizer2 = _interopRequireDefault(_localizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScheduleSlotGroup = function (_Component) {
  _inherits(ScheduleSlotGroup, _Component);

  function ScheduleSlotGroup() {
    _classCallCheck(this, ScheduleSlotGroup);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  ScheduleSlotGroup.prototype.renderSlice = function renderSlice(slotNumber, content, value) {

    return _react2.default.createElement(_TimeSlot2.default, { key: slotNumber,
      showLabel: this.props.showLabels && !slotNumber,
      content: content,
      culture: this.props.culture,
      isNow: false,
      value: value });
  };

  ScheduleSlotGroup.prototype.renderSlices = function renderSlices() {
    var ret = [];
    for (var i = 0; i < this.props.slots; i++) {
      var slot = this.props.slots[i];
      ret.push(this.renderSlice(slot.key, slot.content, slot.value));
    }
    return ret;
  };

  ScheduleSlotGroup.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'rbc-timeslot-group' },
      this.renderSlices()
    );
  };

  return ScheduleSlotGroup;
}(_react.Component);

ScheduleSlotGroup.propTypes = {
  slots: _react.PropTypes.arrayOf(_react.PropTypes.object),
  showLabels: _react.PropTypes.bool,
  culture: _react.PropTypes.string
};
ScheduleSlotGroup.defaultProps = {
  showLabels: false
};
exports.default = ScheduleSlotGroup;
module.exports = exports['default'];