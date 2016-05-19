import React from 'react';
import _ from 'underscore';
import Target from './target-container.js';

import * as _Themes from './themes.js';
const Themes = _.omit(_Themes, '__esModule'); // Because it gets added by default

class Body extends React.Component {
    constructor() {
        super();
        this.state = {
            selected: Object.keys(Themes)[0]
        }
    }

    handleChange(event) {
        this.setState({ selected: event.target.value });
    }
    
    render() {
        return (
            <div>
                <select
                    value={this.state.selected}
                    onChange={this.handleChange.bind(this)}>
                        {
                            _.map(Themes, (theme, key) => (   
                                <option key={key} value={key}>{theme.name}</option>
                            ))
                        }
                </select>

                <Target theme={Themes[this.state.selected]} show={true}/>
            </div>
        );
    }
}

export default Body;
