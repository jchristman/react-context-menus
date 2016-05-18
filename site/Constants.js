export const Pages = {
    HOME: {
        location: 'index.html',
        title: 'Home'
    }
};

export const APIPages = [{
    title: 'Quick Start',
    pages: {
        OVERVIEW: {
            location: 'docs-overview.html',
            title: 'Overview'
        },
        TUTORIAL: {
            location: 'docs-tutorial.html',
            title: 'Tutorial'
        },
        TESTING: {
            location: 'docs-testing.html',
            title: 'Testing'
        },
        FAQ: {
            location: 'docs-faq.html',
            title: 'FAQ'
        },
        TROUBLESHOOTING: {
            location: 'docs-troubleshooting.html',
            title: 'Troubleshooting'
        }
    }
}/*, {
    title: 'Top-Level API',
    pages: {
        CONTEXT_MENU: {
            location: 'context-menu.html',
            title: 'ContextMenu'
        }
    }
}*/
];

export const ExamplePages = [
{
    title: 'Connecting Targets',
    pages: {
        SINGLE_TARGET: {
            location: 'examples-single-target.html',
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
        DYNAMIC: {
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

export const DOCS_DEFAULT = APIPages[0].pages.OVERVIEW;
export const EXAMPLES_DEFAULT = ExamplePages[0].pages.SINGLE_TARGET;
