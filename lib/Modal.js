'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _lodash = require('lodash.assign');

var _lodash2 = _interopRequireDefault(_lodash);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var findParentNode = function findParentNode(parentClass, child) {
  var parent = child.parentNode;
  while (parent && (parent.className === undefined || parent.className.indexOf(parentClass) === -1)) {
    parent = parent.parentNode;
  }
  return parent;
};

var Modal = (0, _radium2.default)(_class = (_temp2 = _class2 = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = function () {
      document.addEventListener('keydown', _this.handleKeyDown);
      _this.handleBody();
      _this.handleParent();
    }, _this.componentWillUnmount = function () {
      document.removeEventListener('keydown', _this.handleKeyDown);
    }, _this.componentDidUpdate = function () {
      _this.handleBody();
      _this.handleParent();
    }, _this.requestHide = function () {
      var onRequestHide = _this.props.onRequestHide;

      if (onRequestHide) {
        onRequestHide();
      }
    }, _this.handleBackDropClick = function (e) {
      var backdrop = _this.props.backdrop;

      if (e.target !== e.currentTarget || !backdrop) {
        return;
      }
      _this.requestHide();
    }, _this.handleFocus = function () {
      _this.focus = true;
    }, _this.handleBlur = function () {
      _this.focus = false;
    }, _this.handleKeyDown = function (e) {
      var keyboard = _this.props.keyboard;

      var el = _reactDom2.default.findDOMNode(_this);
      var childrenOpen = el.className.indexOf('children-open') !== -1;
      if (keyboard && _this.focus && e.keyCode === 27 && !childrenOpen) {
        e.preventDefault();
        setTimeout(_this.requestHide, 0);
      }
    }, _this.handleBody = function () {
      var openModals = document.getElementsByClassName('modal-backdrop-open');
      if (openModals.length < 1) {
        document.body.className = document.body.className.replace(/ ?modal-open/, '');
      } else if (document.body.className.indexOf('modal-open') === -1) {
        document.body.className += document.body.className.length ? ' modal-open' : 'modal-open';
      }
    }, _this.handleParent = function () {
      var parentNode = findParentNode('modal-backdrop', _reactDom2.default.findDOMNode(_this));
      if (parentNode) {
        var isOpen = _this.props.isOpen;

        if (isOpen) {
          parentNode.className += parentNode.className.length ? ' children-open' : 'children-open';
          parentNode.style.overflowY = 'hidden';
        } else {
          parentNode.className = parentNode.className.replace(/ ?children-open/, '');
          parentNode.style.overflowY = 'auto';
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Modal, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          isOpen = _props.isOpen,
          backdropStyles = _props.backdropStyles,
          size = _props.size,
          dialogStyles = _props.dialogStyles,
          children = _props.children;

      var backDropClass = (0, _classnames2.default)(['modal-backdrop', className], {
        'modal-backdrop-open': isOpen
      }).trim();

      backdropStyles = (0, _lodash2.default)({
        base: {
          background: 'rgba(0, 0, 0, .7)',
          opacity: 0,
          visibility: 'hidden',
          transition: 'all 0.4s',
          overflowX: 'hidden',
          overflowY: 'auto'
        },
        open: {
          opacity: 1,
          visibility: 'visible'
        }
      }, backdropStyles);

      var dialogClass = (0, _classnames2.default)(['modal-dialog', size], {
        'modal-dialog-open': isOpen
      });

      dialogStyles = (0, _lodash2.default)({
        base: {
          top: -600,
          transition: 'top 0.4s'
        },
        open: {
          top: 0
        }
      }, dialogStyles);

      return _react2.default.createElement(
        'div',
        { className: backDropClass,
          style: [backdropStyles.base, isOpen && backdropStyles.open],
          onClick: this.handleBackDropClick },
        _react2.default.createElement(
          'div',
          { className: dialogClass,
            style: [dialogStyles.base, isOpen && dialogStyles.open],
            tabIndex: '-1',
            onFocus: this.handleFocus,
            onBlur: this.handleBlur },
          _react2.default.createElement(
            'div',
            { className: 'modal-content' },
            children
          )
        )
      );
    }
  }]);

  return Modal;
}(_react2.default.Component), _class2.propTypes = {
  className: _propTypes2.default.string,
  isOpen: _propTypes2.default.bool.isRequired,
  backdrop: _propTypes2.default.bool,
  keyboard: _propTypes2.default.bool,
  size: _propTypes2.default.oneOf(['modal-lg', 'modal-sm', '']),
  onRequestHide: _propTypes2.default.func,
  backdropStyles: _propTypes2.default.object,
  dialogStyles: _propTypes2.default.object,
  children: _propTypes2.default.node.isRequired
}, _class2.defaultProps = {
  isOpen: false,
  backdrop: true,
  keyboard: true,
  size: '',
  backdropStyles: {},
  dialogStyles: {}
}, _temp2)) || _class;

exports.default = Modal;