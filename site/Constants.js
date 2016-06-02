export const APIPages = [{
    title: 'Documentation',
    pages: {
        API: {
            location: 'docs-api.html',
            title: 'API'
        }
    }
}
];

export const ExamplePages = [
{
    title: 'Connecting Targets',
    pages: {
        SINGLE_TARGET: {
            location: 'index.html',
            title: 'Single Target'
        },
        MULTIPLE_TARGETS: {
            location: 'examples-multiple-targets.html',
            title: 'Multiple Targets'
        }
    }
}, {
    title: 'Styling',
    pages: {
        THEMES: {
            location: 'examples-themes.html',
            title: 'Themes'
        }
    }
}, {
    title: 'Dynamic Menus',
    pages: {
        DYNAMIC_MENUS: {
            location: 'examples-dynamic-menus.html',
            title: 'Dynamic Menus'
        },
        STRESS_TEST: {
            location: 'examples-stress-test.html',
            title: 'Stress Test'
        }
    }
}
];

export const DOCS_DEFAULT = APIPages[0].pages.API;
export const EXAMPLES_DEFAULT = ExamplePages[0].pages.SINGLE_TARGET;
