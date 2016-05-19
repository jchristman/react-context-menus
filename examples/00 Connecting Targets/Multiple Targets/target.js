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

const context_menu_styles = [
    {
        position: 'absolute',
        width: 50,
        heigh: 50,
        top: 40,
        left: 20,
        backgroundColor: 'red',
    },
    {
        position: 'absolute',
        width: 50,
        heigh: 50,
        top: 120,
        right: 40,
        backgroundColor: 'blue'
    },
    {
        position: 'absolute',
        width: 50,
        heigh: 50,
        bottom: 60,
        left: 140,
        backgroundColor: 'green'
    }
];

const Target = (props) => {
    return (
        <div style={style}>
            {
                context_menu_styles.map((box, idx) => {
                    return props.connectContextMenu(
                        <div style={box} key={idx}>
                            <div style={textStyle}>Right click here</div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Target;
