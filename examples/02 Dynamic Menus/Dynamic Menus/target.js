import React from 'react';

const style = {
    position: 'relative',
    width: 200,
    height: 40,
    backgroundColor: '#111',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5
}

const textStyle = {
    pointerEvents: 'none',
    pointer: 'cursor'
}

const Target = (props) => {
    return props.connectContextMenu(
        <div style={style}>
            <div style={textStyle}>
                { props.children }
            </div>
        </div>
    );
}

export default Target;
