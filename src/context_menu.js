import React, {cloneElement} from 'react';
import ReactDOM from 'react-dom';
import invariant from 'invariant';
import _ from 'underscore';
import Menu from 'react-menus';

const ContextMenu = (menu_items, options = {}) => {
    return (ChildComponent) => {
        const Container = class extends React.Component {
            constructor(props, context) {
                super(props, context);

                this.options = typeof options === 'function' ? options(props) : options;

                this.state = {
                    showContextMenu: this.options.show !== undefined && this.options.show,
                    x: this.options.at !== undefined && this.options.at.x,
                    y: this.options.at !== undefined && this.options.at.y
                };

                // needed to add and remove event listeners....
                this.last_clicked_element = undefined;
                this.clickable_elements = [];
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
                document.addEventListener('click', this.force_hide, false);
                document.addEventListener('contextmenu', this.hide, false);
                _.each(this.clickable_elements, (element) => element.addEventListener('contextmenu', this.show, false));

                this._renderLayer();
            }

            componentWillReceiveProps(nextProps) {
                if (typeof options === 'function') this.options = options(nextProps);
                if (this.options.show !== undefined) this.setState({ showContextMenu: this.options.show })
                if (this.options.at !== undefined) this.setState({ ...this.options.at })
            }

            componentDidUpdate() {
                this._renderLayer();
            }

            componentWillUnmount() {
                if (this.container !== null)
                    ReactDOM.unmountComponentAtNode(this.container);

                // Note that we are not using .bind(this), because we need to remove
                // the listener later. The bind happens in the constructor
                document.removeEventListener('click', this.force_hide, false);
                document.removeEventListener('contextmenu', this.hide, false);
                _.each(this.clickable_elements, (element) => {
                       if (element !== null) element.removeEventListener('contextmenu', this.show, false)
                });
            }

            _renderLayer() {
                if (this.state.showContextMenu) {
                    // If the menu_items var is a function, let's call it with the props.
                    const menu = typeof menu_items === 'function' ? menu_items(this.props) : menu_items;

                    // Then correct the items to fix their onClick methods to be useful and have the props of the clicked element
                    let wrapped_menu_items = menu.map((item) => {
                        // Copy the item
                        let new_item = typeof item === 'object' ? _.extend({}, item) : item;
                        if (new_item.onClick !== undefined) new_item.onClick = (event, item_props, index) => { item.onClick(event, this.props, index) };
                        return new_item;
                    });

                    const theme = this.options.theme || {};
                    const style = this.options.style || {};
                    // Finally, render it to the container
                    ReactDOM.render(<Menu 
                                        theme={theme}
                                        style={style}
                                        items={wrapped_menu_items}
                                        at={[this.state.x, this.state.y]}
                                        enableScroll={false}/>,
                                    this.container);
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
                this.clickable_react_element = this.cloneWithRef(this.clickable_react_element, (node) => this.clickable_elements.push(node));
                return this.clickable_react_element;
            }

            show(event) {
                event.preventDefault();
                
                this.last_clicked_element = event.target;

                let bounds = this.child.getBoundingClientRect();
                let x = event.clientX - bounds.left;
                let y = event.clientY - bounds.top;

                const state = { x, y, showContextMenu: true };
                this.setState(state);
            }

            force_hide(event) {
                let button = event.which || event.button;
                if (button === 1)
                    setTimeout(() => this.hide(event, true), 0); // We do this to allow the click to register if it hasn't yet
            }

            hide(event, force) {
                if (event.target !== this.last_clicked_element || force) {
                    const state = { showContextMenu: false };
                    this.setState(state);
                }
            }
        }

        return Container;
    }
}

export default ContextMenu;
