import ContextMenu from 'react-context-menus';
import Target from './target.js';

const menu_items = [
    {
        label: 'Item 1',
        onClick: (event, props, item) => alert('Clicked Item 1!')
    },
    {
        label: 'Item 2',
        onClick: () => alert('Clicked Item 2!')
    },
    '-',
    {
        label: 'Item 3',
        onClick: () => alert('Clicked Item 3 below the divider!')
    }
];

const options = (props) => {
    return {
        theme: props.theme.theme,
        style: props.theme.style,
        at: { x: 30, y: 30 },
        show: props.show
    }
}

export default ContextMenu(menu_items, options)(Target);
