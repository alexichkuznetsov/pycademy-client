import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getTasks } from '../../redux/actions';

import Header from '../../components/Header';
import Container from '../../containers/Container';
import TasksList from '../../components/TasksList';

class TasksPage extends Component {
	componentDidMount() {
		this.props.getTasks();
	}

	render() {
		const { userStatus, tasks } = this.props;
		const isStuff = userStatus === 'stuff';

		const stuffNavigation = (
			<ul className="stuff-navigation">
				<li className="stuff-navigation__item">
					<Link to="/tasks/add" className="stuff-navigation__link">
						Новое задание
					</Link>
				</li>
			</ul>
		);

		return (
			<Fragment>
				<Header />
				<section className="section">
					<Container>
						{isStuff && stuffNavigation}
						<h2 className="section__title">Задания</h2>
						<TasksList isStuff={isStuff} tasks={tasks} />
					</Container>
				</section>
			</Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		tasks: state.tasks.tasks,
		error: state.tasks.error,
		loading: state.tasks.loading,
		userStatus: state.auth.user.status
	};
}

export default connect(
	mapStateToProps,
	{ getTasks }
)(TasksPage);
