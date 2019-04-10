import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteTask } from '../../redux/actions';

import TaskItem from '../TaskItem';

class TasksList extends Component {
	deleteTask(id) {
		this.props.deleteTask(id);
	}

	render() {
		const { tasks, isStuff } = this.props;

		return (
			<ul className="tasks-list">
				{tasks.map(task => (
					<TaskItem
						onDeleteClick={this.deleteTask.bind(this, task._id)}
						isStuff={isStuff}
						key={task._id}
						task={task}
					/>
				))}
			</ul>
		);
	}
}

export default connect(
	null,
	{ deleteTask }
)(TasksList);
