import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { setUser } from '../redux/actions';

// Styles
import '../assets/main.scss';

// Components
import HomePage from '../pages/Home';
import TasksPage from '../pages/Tasks';
import RegisterPage from '../pages/auth/Register';
import LoginPage from '../pages/auth/Login';
import Loader from './Loader';
import AddTaskPage from '../pages/AddTask';
import TaskPage from '../pages/TaskPage';
import TaskEditor from '../pages/TaskEditor/TaskEditor';
import Profile from '../components/Profile/Profile';

// Hoc
import protectedRoute from '../hoc/protectedRoute';
import unauthorizedRoute from '../hoc/unauthorizedRoute';
import stuffRoute from '../hoc/stuffRoute';
import WithNotifications from '../hoc/WithNotifications';

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
		const { loading } = this.state;

		if (loading) {
			return <Loader />;
		}

		return (
			<WithNotifications>
				<Router>
					<Switch>
						<Route exact path="/" component={unauthorizedRoute(HomePage)} />
						<Route
							exact
							path="/login"
							component={unauthorizedRoute(LoginPage)}
						/>
						<Route
							path="/register"
							component={unauthorizedRoute(RegisterPage)}
						/>
						<Route
							exact
							path="/tasks/add"
							component={stuffRoute(AddTaskPage)}
						/>
						<Route
							path="/tasks/:id/editor"
							component={protectedRoute(TaskEditor)}
						/>
						<Route path="/tasks/:id" component={protectedRoute(TaskPage)} />
						<Route exact path="/tasks" component={protectedRoute(TasksPage)} />
						<Route exact path="/profile" component={protectedRoute(Profile)} />
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
