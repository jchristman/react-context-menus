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
                    <b><a href='https://github.com/jchristman/react-context-menus/tree/master/examples/00%20Connecting Targets/Single%20Target'>Browse the Source</a></b>
                </p>
                <p>
                    This is a simplest example that exists. Right click in the box below to get a context menu.
                </p>
                <Target/>
            </div>
        );
    }
}
