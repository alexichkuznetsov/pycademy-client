import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Styles
import './main.scss';

// Components
import Header from './components/Header';
import HomePage from './pages/Home';
import TasksPage from './pages/Tasks';
import LoginPage from './pages/auth/Login';

class App extends Component {
	render() {
		return (
			<Router>
				<Fragment>
					<Header />

					<div className="container">
						<Switch>
							<Route path="/login" component={LoginPage} />
							<Route path="/tasks" component={TasksPage} />
							<Route path="/" component={HomePage} />
						</Switch>
					</div>
				</Fragment>
			</Router>
		);
	}
}

export default App;
