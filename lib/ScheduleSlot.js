'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScheduleSlot = function (_Component) {
  _inherits(ScheduleSlot, _Component);

  function ScheduleSlot() {
    _classCallCheck(this, ScheduleSlot);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  ScheduleSlot.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)('rbc-time-slot', this.props.showLabel && 'rbc-label')
      },
      this.props.showLabel && _react2.default.createElement(
        'span',
        null,
        this.props.content
      )
    );
  };

  return ScheduleSlot;
}(_react.Component);

ScheduleSlot.propTypes = {
  showLabel: _react.PropTypes.bool,
  content: _react.PropTypes.string,
  culture: _react.PropTypes.string
};
ScheduleSlot.defaultProps = {
  showLabel: false,
  content: ''
};
exports.default = ScheduleSlot;
module.exports = exports['default'];