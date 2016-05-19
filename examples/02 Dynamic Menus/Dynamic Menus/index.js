import React, { Component } from 'react';

import Body from './body';

export default class SingleTargetApp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>
                    <b><a href='https://github.com/jchristman/react-context-menus/tree/master/examples/02%20Dynamic%20Menus/Dynamic%20Menus'>Browse the Source</a></b>
                </p>
                <p>
                    This example shows how you can use a single function to generate unique menus based on the props of the item that was right clicked.
                </p>
                <Body/>
            </div>
        );
    }
}
