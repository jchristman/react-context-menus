import ContextMenu from 'react-context-menus';
import Target from './target.js';

const menu_items = (props) => {
    return [
        {
            label: 'Item 1, ' + props.text,
            onClick: (event, props, item) => alert('Clicked Item 1, ' + props.text + '!')
        },
        {
            label: 'Item 2, ' + props.text + '',
            onClick: () => alert('Clicked Item 2, ' + props.text + '!')
        },
        '-',
        {
            label: 'Item 3, ' + props.text + '',
            onClick: () => alert('Clicked Item 3, ' + props.text + ' below the divider!')
        }
    ];
}

const options = {
    theme: {
        style: {
            color: 'black'
        }
    }
}

export default ContextMenu(menu_items, options)(Target);
