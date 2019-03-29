import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function UnauthorizedRoute({ authenticated, path, component, ...rest }) {
	return authenticated ? (
		<Redirect to="/" />
	) : (
		<Route path={path} component={component} {...rest} />
	);
}

export default UnauthorizedRoute;
