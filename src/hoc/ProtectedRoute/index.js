import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ authenticated, path, component, ...rest }) {
	if (authenticated) {
		return <Route path={path} component={component} {...rest} />;
	} else {
		return <Redirect to="/login" />;
	}
}

export default ProtectedRoute;
