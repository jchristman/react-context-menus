'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _reactMenus = require('react-menus');

var _reactMenus2 = _interopRequireDefault(_reactMenus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContextMenu = function ContextMenu(menu_items) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    return function (ChildComponent) {
        var Container = function (_React$Component) {
            _inherits(Container, _React$Component);

            function Container(props, context) {
                _classCallCheck(this, Container);

                var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

                _this.options = typeof options === 'function' ? options(props) : options;

                _this.state = {
                    showContextMenu: _this.options.show !== undefined && _this.options.show,
                    x: _this.options.at !== undefined && _this.options.at.x,
                    y: _this.options.at !== undefined && _this.options.at.y
                };

                // needed to add and remove event listeners....
                _this.last_clicked_element = undefined;
                _this.clickable_elements = [];
                _this.force_hide = _this.force_hide.bind(_this);
                _this.hide = _this.hide.bind(_this);
                _this.show = _this.show.bind(_this);
                return _this;
            }

            Container.prototype.componentDidMount = function componentDidMount() {
                var _this2 = this;

                this.child = _reactDom2.default.findDOMNode(this);
                this.container = document.createElement('div');
                this.container.style.position = 'absolute';
                this.container.style.top = 0;
                this.container.style.left = 0;
                this.container.style.width = 0;
                this.container.style.height = 0;
                this.child.appendChild(this.container);

                // Note that we are not using .bind(this), because we need to remove
                // the listener later. The bind happens in the constructor
                document.addEventListener('click', this.force_hide, false);
                document.addEventListener('contextmenu', this.hide, false);
                _underscore2.default.each(this.clickable_elements, function (element) {
                    return element.addEventListener('contextmenu', _this2.show, false);
                });

                this._renderLayer();
            };

            Container.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
                if (typeof options === 'function') this.options = options(nextProps);
                if (this.options.show !== undefined) this.setState({ showContextMenu: this.options.show });
                if (this.options.at !== undefined) this.setState(_extends({}, this.options.at));
            };

            Container.prototype.componentDidUpdate = function componentDidUpdate() {
                this._renderLayer();
            };

            Container.prototype.componentWillUnmount = function componentWillUnmount() {
                var _this3 = this;

                if (this.container !== null) _reactDom2.default.unmountComponentAtNode(this.container);

                // Note that we are not using .bind(this), because we need to remove
                // the listener later. The bind happens in the constructor
                document.removeEventListener('click', this.force_hide, false);
                document.removeEventListener('contextmenu', this.hide, false);
                _underscore2.default.each(this.clickable_elements, function (element) {
                    if (element !== null) element.removeEventListener('contextmenu', _this3.show, false);
                });
            };

            Container.prototype._renderLayer = function _renderLayer() {
                var _this4 = this;

                if (this.state.showContextMenu) {
                    // If the menu_items var is a function, let's call it with the props.
                    var menu = typeof menu_items === 'function' ? menu_items(this.props) : menu_items;

                    // Then correct the items to fix their onClick methods to be useful and have the props of the clicked element
                    var wrapped_menu_items = menu.map(function (item) {
                        // Copy the item
                        var new_item = (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' ? _underscore2.default.extend({}, item) : item;
                        if (new_item.onClick !== undefined) new_item.onClick = function (event, item_props, index) {
                            item.onClick(event, _this4.props, index);
                        };
                        return new_item;
                    });

                    var theme = this.options.theme || {};
                    var style = this.options.style || {};
                    // Finally, render it to the container
                    _reactDom2.default.render(_react2.default.createElement(_reactMenus2.default, {
                        theme: theme,
                        style: style,
                        items: wrapped_menu_items,
                        at: [this.state.x, this.state.y],
                        enableScroll: false }), this.container);
                } else {
                    _reactDom2.default.unmountComponentAtNode(this.container);
                }
            };

            Container.prototype.render = function render() {
                return _react2.default.createElement(ChildComponent, _extends({}, this.props, {
                    connectContextMenu: this.connectContextMenu.bind(this)
                }));
            };

            Container.prototype.cloneWithRef = function cloneWithRef(element, newRef) {
                var previousRef = element.ref;
                (0, _invariant2.default)(typeof previousRef !== 'string', 'Cannot connect ContextMenu to an element with an existing string ref.');

                if (!previousRef) {
                    return (0, _react.cloneElement)(element, { ref: newRef });
                }

                return (0, _react.cloneElement)(element, {
                    ref: function ref(node) {
                        newRef(node);
                        previousRef && previousRef(node);
                    }
                });
            };

            // ----- Context Menu Methods ----- //


            Container.prototype.connectContextMenu = function connectContextMenu(react_element) {
                var _this5 = this;

                this.clickable_react_element = react_element;
                this.clickable_react_element = this.cloneWithRef(this.clickable_react_element, function (node) {
                    return _this5.clickable_elements.push(node);
                });
                return this.clickable_react_element;
            };

            Container.prototype.show = function show(event) {
                event.preventDefault();

                this.last_clicked_element = event.target;

                var bounds = this.child.getBoundingClientRect();
                var x = event.clientX - bounds.left;
                var y = event.clientY - bounds.top;

                var state = { x: x, y: y, showContextMenu: true };
                this.setState(state);
            };

            Container.prototype.force_hide = function force_hide(event) {
                var _this6 = this;

                var button = event.which || event.button;
                if (button === 1) setTimeout(function () {
                    return _this6.hide(event, true);
                }, 0); // We do this to allow the click to register if it hasn't yet
            };

            Container.prototype.hide = function hide(event, force) {
                if (event.target !== this.last_clicked_element || force) {
                    var state = { showContextMenu: false };
                    this.setState(state);
                }
            };

            return Container;
        }(_react2.default.Component);

        return Container;
    };
};

exports.default = ContextMenu;
module.exports = exports['default'];