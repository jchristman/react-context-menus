import React from 'react';

import Target from './target-container.js';

const items = [
    'Box 1',
    'Box 2',
    'Box 3',
    'Box 4',
    'Box 5',
    'Box 6'
];

const Body = (props) => (
    <div>
        { items.map((item, idx) => ( <div style={{position: 'relative', zIndex: item.length - idx}} key={idx}><Target text={item}>{item}</Target></div> )) }
    </div>
)

export default Body;
