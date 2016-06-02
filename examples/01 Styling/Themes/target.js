import React from 'react';

const style = {
    position: 'relative',
    width: 300,
    height: 300,
    backgroundColor: '#111',
    color: 'white',
    textAlign: 'center'
}

const textStyle = {
    pointerEvents: 'none',
    pointer: 'cursor'
}

const Target = (props) => {
    return props.connectContextMenu(
        <div style={style} id='container'>
            <div style={textStyle}>
                Right click here for a context menu
            </div>
        </div>
    );
}

export default Target;
