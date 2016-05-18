import React, {cloneElement} from 'react';
import ReactDOM from 'react-dom';
import invariant from 'invariant';
import _ from 'underscore';
import Menu from 'react-menus';

const theme = { style: {} };

const ContextMenu = (menu_items, options = {}) => {
    // Merge themes if they exist
    if (options.theme && options.theme.style) {
        for (let attrname in options.theme.style) {
            theme.style[attrname] = options.theme.style[attrname];
        }
    }

    return (ChildComponent) => {
        const Container = class extends React.Component {
            constructor(props, context) {
                super(props, context);
                this.state = {
                    showContextMenu: false,
                    x: 0,
                    y: 0
                };

                // needed to add and remove event listeners....
                this.clickable_element = undefined;
                this.force_hide = this.force_hide.bind(this);
                this.hide = this.hide.bind(this);
                this.show = this.show.bind(this);
            }

            componentDidMount() {
                this.child = ReactDOM.findDOMNode(this);
                this.container = document.createElement('div');
                this.container.style.position = 'absolute';
                this.container.style.top = 0;
                this.container.style.left = 0;
                this.container.style.width = 0;
                this.container.style.height = 0;
                this.child.appendChild(this.container);

                // Note that we are not using .bind(this), because we need to remove
                // the listener later. The bind happens in the constructor
                if (document.addEventListener) {
                    document.addEventListener('click', this.force_hide, false);
                    document.addEventListener('contextmenu', this.hide, false);
                    this.clickable_element.addEventListener('contextmenu', this.show, false);
                } else {
                    document.attachEvent('onclick', this.force_hide);
                    document.attachEvent('oncontextmenu', this.hide);
                    this.clickable_element.attachEvent('oncontextmenu', this.show);
                }

                this._renderLayer();
            }

            componentDidUpdate() {
                this._renderLayer();
            }

            componentWillUnmount() {
                ReactDOM.unmountComponentAtNode(this.container);

                // Note that we are not using .bind(this), because we need to remove
                // the listener later. The bind happens in the constructor
                if (document.removeEventListener) {
                    document.removeEventListener('click', this.force_hide, false);
                    document.removeEventListener('contextmenu', this.hide, false);
                    this.clickable_element && this.clickable_element.removeEventListener('contextmenu', this.show, false);
                } else {
                    document.detachEvent('onclick', this.force_hide);
                    document.detachEvent('oncontextmenu', this.hide);
                    this.clickable_element && this.clickable_element.detachEvent('oncontextmenu', this.show, false);
                }
            }

            _renderLayer() {
                if (this.state.showContextMenu) {
                    // If the menu_items var is a function, let's call it with the props.
                    menu_items = typeof(menu_items) === 'function' ? menu_items(this.props) : menu_items;

                    // Then correct the items to fix their onClick methods to be useful and have the props of the clicked element
                    let wrapped_menu_items = menu_items.map((item) => {
                        // Copy the item
                        let new_item = typeof item === 'object' ? _.extend({}, item) : item;
                        if (new_item.onClick !== undefined) new_item.onClick = (event, item_props, index) => { item.onClick(event, this.props, index) };
                        return new_item;
                    });

                    // Finally, render it to the container
                    ReactDOM.render(<Menu theme={theme} items={wrapped_menu_items} at={[this.state.x, this.state.y]}/>, this.container);
                } else {
                    ReactDOM.unmountComponentAtNode(this.container);
                }
            }


            render() {
                return (
                    <ChildComponent
                        {...this.props}
                        connectContextMenu={this.connectContextMenu.bind(this)}
                    />
                );
            }

            cloneWithRef(element, newRef) {
                const previousRef = element.ref;
                invariant(typeof previousRef !== 'string',
                    'Cannot connect ContextMenu to an element with an existing string ref.');

                if (!previousRef) {
                    return cloneElement(element, { ref: newRef });
                }

                return cloneElement(element, {
                    ref: (node) => {
                        newRef(node);
                        previousRef && previousRef(node);
                    }
                });
            }

            // ----- Context Menu Methods ----- //
            connectContextMenu(react_element) {
                this.clickable_react_element = react_element;
                this.clickable_react_element = this.cloneWithRef(this.clickable_react_element, (node) => this.clickable_element = node);
                return this.clickable_react_element;
            }

            show(event) {
                event.preventDefault();
                
                let bounds = event.target.getBoundingClientRect();
                let x = event.clientX - bounds.left;
                let y = event.clientY - bounds.top;

                const state = { x, y, showContextMenu: true };
                this.setState(state);
            }

            force_hide(event) {
                this.hide(event, true);
            }

            hide(event, force) {
                if (event.target !== this.clickable_element || force) {
                    const state = { showContextMenu: false };
                    this.setState(state);
                }
            }
        }

        return Container;
    }
}

export default ContextMenu;
