import React, { Component } from 'react';

import Target from './target-container';

export default class SingleTargetApp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>
                    <b><a href='https://github.com/jchristman/react-context-menus/tree/master/examples/00%20Connecting Targets/Multiple%20Targets'>Browse the Source</a></b>
                </p>
                <p>
                    In this example, there are multiple context menu "spots" on the same component, each of which generates the same context menu.
                </p>
                <Target/>
            </div>
        );
    }
}
