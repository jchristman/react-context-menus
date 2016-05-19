Overview
========

React Context Menus is a library that aims to simplify the process of getting right click menus into your application. After searching for a long time, I was unsatisfied with the libraries that existed. The aim with this library is to simplify the API while providing control over the functionality and display of the menu to the developer. It is built on top of [Zippy UI react-menus](https://github.com/zippyui/react-menus).

Installation
============

As easy as it gets:

```bash
npm install --save react-context-menus
```

Usage
=====

This library is meant to be used as a Container. It will provide a prop to your component called ```connectContextMenu```. You can call this function with any part of your component to make it right clickable. Like so:

-------------------
```js
var React = require('react');
var ContextMenu = require('react-context-menus');

var ComponentToReceiveContextMenu = React.createClass({
    render: function() {
        return this.props.connectContextMenu(
            <div></div>
        );
    }
});

var menu_items = [
  /* ... */
];

module.exports = ContextMenu(menu_items)(ComponentToReceiveContextMenu);
```
-------------------
```js
import React from 'react';
import ContextMenu from 'react-context-menus';

class ComponentToReceiveContextMenu extends React.Component {
    render() {
        return this.props.connectContextMenu(
            <div></div>
        );
    }
});

const menu_items = [
  /* ... */
];

export default ContextMenu(menu_items)(ComponentToReceiveContextMenu);
```
-------------------
```js
import React from 'react';
import ContextMenu from 'react-context-menus';

@ContextMenu(menu_items)
export default class ComponentToReceiveContextMenu extends React.Component {
    render() {
        return this.props.connectContextMenu(
            <div></div>
        );
    }
}
```
-------------------

Arguments To ContextMenu
========================

The ContextMenu container can receive two arguments - a menu_items and an options argument. The menu_items argument must be an array or a function that receives the props of the item being wrapped and returns an array. The options argument must be an object or a function taht receives the props of the item being wrapped and returns an object.

Menu items are defined below. See [react-menus](https://github.com/zippyui/react-menus) for more info.

```js
// This can be either a static array or a function to build a dynamic menu based on the thing that is clicked.
const menu_items = (props) => {
    return [
        {
            label: 'Label 1'                // The actual text that gets displayed
            onClick: (event, props) => {}   // A function that gets called on click of menu item. It receives the props of the wrapped component.
        },
        '-',
        {
            label: 'Label 2',
            disabled: true                  // Disable the item. Defaults to false.
        }
    ];
}
```

Options are defined as such:

```js
// This can be either a static object or a function to build a dynamic object based on the thing that is clicked.
const options = (props) => {
    return {
        theme: props.theme.theme,           // The theme object is applied to items
        style: props.theme.style,           // The style object is applied to the overall menu
        at: { x: 30, y: 30 },               // The at object positions the menu (if you want to do it manually)
        show: props.show                    // The show property will determine whether to show the menu (if you want to do it manually)
    }
}
```

How It Works
============

The library works by appending a child to the wrapped component that will be the context menu container. Then, any time the "connected" DOM items are right clicked, it will calculate the position of the menu and render it to the DOM at the context menu container. The menu is added and removed in an intelligent way, such that it does not exist when it is not showing.
