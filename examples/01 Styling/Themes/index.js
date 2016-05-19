import React, { Component } from 'react';

import Body from './body.js';

export default class SingleTargetApp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>
                    <b><a href='https://github.com/jchristman/react-context-menus/tree/master/examples/01%20Styling/Themes'>Browse the Source</a></b>
                </p>
                <p>
                    This example shows how you can change the style of the context menus. The menu will automatically open when you change the selection to demonstrate the colors. You can still right click around though... See the <a href="https://github.com/zippyui/react-menus#styling--advanced-usage">react-menus</a> homepage for full stying information.
                </p>
                <Body/>
            </div>
        );
    }
}
