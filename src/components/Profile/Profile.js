import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getProfile } from '../../redux/actions';

import Header from '../Header';
import Loader from '../Loader';

class Profile extends Component {
	renderCompletedTasks = () => {
		const {
			profile: { tasks }
		} = this.props;

		return tasks.map(task => (
			<li className="tasks-passed-list__item">
				<Link to={`/tasks/${task.id}`} className="tasks-passed-list__link">
					{task.title}
				</Link>
			</li>
		));
	};

	componentDidMount() {
		this.props.getProfile();
	}

	render() {
		if (this.props.loading || !this.props.profile) {
			return <Loader />;
		}

		return (
			<Fragment>
				<Header />
				<section className="section">
					<div className="container">
						<h2 className="section__title">Профиль</h2>
						<div className="stats">
							<div className="stats__total">
								<h3 className="stats__tasks-passed-title">Пройдено заданий</h3>
								<span className="stats__tasks-passed">
									{this.props.profile.completedTasksCount}
								</span>
								<span className="stats__tasks-overall">/8</span>
							</div>
							<div className="stats__info">
								<h3 className="stats__list-title">Прогресс</h3>
								<ul className="tasks-passed-list">
									{/* <li className="tasks-passed-list__item">
										<a className="tasks-passed-list__link" href="#">
											№1: что-то там
										</a>
									</li>
									<li className="tasks-passed-list__item">
										<a href="#" className="tasks-passed-list__link">
											№5: что-то еще
										</a>
									</li>
									<li className="tasks-passed-list__item">
										<a href="#" className="tasks-passed-list__link">
											№4: какая-то хрень
										</a>
									</li> */}
									{this.renderCompletedTasks()}
								</ul>
							</div>
						</div>
					</div>
				</section>
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	const { profile, loading, error } = state.user;

	return { profile, loading, error };
};

export default connect(
	mapStateToProps,
	{ getProfile }
)(Profile);
