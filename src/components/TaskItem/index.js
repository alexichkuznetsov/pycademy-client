import React from 'react';
import { Link } from 'react-router-dom';
import ReactSVG from 'react-svg';

import deleteIcon from '../../assets/img/delete.svg';

function TaskItem(props) {
	const { task, isStuff, onDeleteClick } = props;

	const taskDate = new Date(task.createdAt);

	return (
		<li className="tasks-list__item">
			<div className="task">
				<Link to={`/tasks/${task._id}`} className="task__title">
					{task.title}
				</Link>
				<p className="task__difficulty">
					Сложность:&nbsp;
					<span className="task__difficulty-value">{task.difficulty}</span>
				</p>
				<p className="task__created-at">
					Создано:&nbsp;
					<span className="task__created-at-value">{`${taskDate.getDate()}/${taskDate.getMonth() +
						1}/${taskDate.getFullYear()}`}</span>
				</p>
				{isStuff && (
					<ReactSVG
						src={deleteIcon}
						svgClassName="task__delete-icon"
						onClick={onDeleteClick}
					/>
				)}
			</div>
		</li>
	);
}

export default TaskItem;
