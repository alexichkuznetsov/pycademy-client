import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { setUser } from './redux/actions';

// Styles
import './assets/main.scss';

// Components
import HomePage from './pages/Home';
import TasksPage from './pages/Tasks';
import RegisterPage from './pages/auth/Register';
import LoginPage from './pages/auth/Login';
import ProtectedRoute from './hoc/ProtectedRoute';
import UnauthorizedRoute from './hoc/UnauthorizedRoute';
import Loader from './components/Loader';
import WithNotifications from './hoc/WithNotifications';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true
		};
	}

	componentDidMount() {
		axios
			.get('/api/auth/current')
			.then(res => {
				if (res.status === 200) {
					// Token verified
					const { name, email, status, completedTasks } = res.data;

					this.props.setUser({ name, email, status, completedTasks });
					this.clearLoadingScreen();
				}
			})
			.catch(err => {
				console.log('Token invalid/expired');
				this.clearLoadingScreen();
			});
	}

	clearLoadingScreen() {
		if (this.clearLoadingTimeout) {
			clearTimeout(this.clearLoadingTimeout);
		}

		const timeOut = Math.random() * (1500 - 500) + 500;

		this.clearLoadingTimeout = setTimeout(
			() => this.setState({ loading: false }),
			timeOut
		);
	}

	render() {
		const { authenticated } = this.props;
		const { loading } = this.state;

		if (loading) {
			return <Loader />;
		}

		return (
			<WithNotifications>
				<Router>
					<Switch>
						<Route exact path="/" component={HomePage} />
						<UnauthorizedRoute
							path="/register"
							authenticated={authenticated}
							component={RegisterPage}
						/>
						<UnauthorizedRoute
							path="/login"
							authenticated={authenticated}
							component={LoginPage}
						/>
						<Route path="/tasks" component={TasksPage} />
					</Switch>
				</Router>
			</WithNotifications>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated
	};
}

export default connect(
	mapStateToProps,
	{ setUser }
)(App);
