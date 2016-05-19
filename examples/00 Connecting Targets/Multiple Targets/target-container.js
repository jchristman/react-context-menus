import ContextMenu from 'react-context-menus';
import Target from './target.js';

const menu_items = [
    {
        label: 'Item 1',
        onClick: () => alert('Clicked Item 1!')
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

const options = {
    theme: {
        style: {
            color: 'black'
        }
    }
}

export default ContextMenu(menu_items, options)(Target);
