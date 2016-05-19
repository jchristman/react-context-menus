import './base.less';
import Constants, { APIPages, ExamplePages, Pages } from './Constants';
import HomePage from './pages/HomePage';
import APIPage from './pages/APIPage';
import ExamplePage from './pages/ExamplePage';
import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';

const APIDocs = {
    API: require('../docs/00 Documentation/Documentation.md'),
};

const Examples = {
    SINGLE_TARGET: require('../examples/00 Connecting Targets/Single Target'),
    MULTIPLE_TARGETS: require('../examples/00 Connecting Targets/Multiple Targets'),
    THEMES: require('../examples/01 Styling/Themes'),
    DYNAMIC_MENUS: require('../examples/02 Dynamic Menus/Dynamic Menus'),
    STRESS_TEST: require('../examples/02 Dynamic Menus/Stress Test')
};

export default class IndexPage extends Component {
    static getDoctype() {
        return '<!doctype html>';
    }

    static renderToString(props) {
        return IndexPage.getDoctype() +
            ReactDOMServer.renderToString(<IndexPage {...props} />);
    }

    constructor(props) {
        super(props);
        this.state = {
            renderPage: !this.props.devMode
        };
    }

    render() {
        // Dump out our current props to a global object via a script tag so
        // when initialising the browser environment we can bootstrap from the
        // same props as what each page was rendered with.
        const browserInitScriptObj = {
            __html: 'window.INITIAL_PROPS = ' + JSON.stringify(this.props) + ';\n'
        };

        return (
            <html>
            <head>
            <meta charSet="utf-8" />
            <title>React Context Menus</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
            <link rel="stylesheet" type="text/css" href={this.props.files['main.css']} />
            <base target="_blank" />
            </head>
            <body>
            {this.state.renderPage && this.renderPage()}

            <script dangerouslySetInnerHTML={browserInitScriptObj} />
            <script src={this.props.files['main.js']}></script>
            </body>
            </html>
        );
    }

    renderPage() {
        switch (this.props.location) {
            case Pages.HOME.location:
                return <HomePage />;
        }

        for (let groupIndex in APIPages) {
            const group = APIPages[groupIndex];
            const pageKeys = Object.keys(group.pages);

            for (let i = 0; i < pageKeys.length; i++) {
                const key = pageKeys[i];
                const page = group.pages[key];

                if (this.props.location === page.location) {
                    return <APIPage example={page}
                    html={APIDocs[key]} />;
                }
            }
        }

        for (let groupIndex in ExamplePages) {
            const group = ExamplePages[groupIndex];
            const pageKeys = Object.keys(group.pages);

            for (let i = 0; i < pageKeys.length; i++) {
                const key = pageKeys[i];
                const page = group.pages[key];
                const Component = Examples[key];

                if (this.props.location === page.location) {
                    return (
                        <ExamplePage example={page}>
                        <Component />
                        </ExamplePage>
                    );
                }
            }
        }

        throw new Error(
            'Page of location ' +
                JSON.stringify(this.props.location) +
                    ' not found.'
        );
    }

    componentDidMount() {
        if (!this.state.renderPage) {
            this.setState({
                renderPage: true
            });
        }
    }
}
