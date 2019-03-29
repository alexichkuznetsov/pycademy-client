import React from 'react';

function Container(props) {
	let className = props.class_ ? `container ${props.class_}` : 'container';

	return <div className={className}>{props.children}</div>;
}

export default Container;
