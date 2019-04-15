import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Editor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/twilight';

import Loader from '../../components/Loader';

import { showNotification } from '../../redux/actions';

class TaskEditor extends Component {
	state = {
		loading: false,
		taskId: '',
		title: '',
		description: '',
		code: '',
		output: ''
	};

	async componentDidMount() {
		const { id } = this.props.match.params;

		try {
			this.setState({ loading: true });

			const res = await axios.get(`/api/tasks/${id}`);

			const { title, description, _id } = res.data;
			this.setState({
				loading: false,
				taskId: _id,
				title,
				description
			});
		} catch (err) {
			if (err.response.status === 404) {
				this.props.showNotification('Такого задания нет в системе');
			}

			if (err.response.status === 500) {
				this.props.showNotification('Произошла внутренняя ошибка сервера');
			}

			this.props.history.push('/tasks');
		}
	}

	handleEditorChange = value => this.setState({ code: value });

	handleCheckClick = async () => {
		const { code } = this.state;
		const { id } = this.props.match.params;

		this.setState({ output: '' });

		if (code.length) {
			try {
				const res = await axios.post('/api/tasks/check', { code, id });
				const { err, data, check } = res.data;

				if (err) {
					this.setState({ output: err });
				} else {
					this.setState({ output: data });
				}

				if (check) {
					this.props.showNotification('Задание успешно выполнено');
				}
			} catch (err) {
				console.log('Error from handleCheckClick()');
			}
		}
	};

	render() {
		const { loading, title, description, code, output } = this.state;

		if (loading) {
			return <Loader />;
		}

		return (
			<section className="task-editor">
				<div className="task-editor__task-info">
					<h2 className="task-editor__task-title">{title}</h2>
					<p className="task-editor__task-description">{description}</p>
				</div>
				<div className="task-editor__controls">
					<button className="task-editor__btn" onClick={this.handleCheckClick}>
						Проверить решение
					</button>
					<button
						className="task-editor__btn"
						onClick={() => this.props.history.push('/tasks')}
					>
						Вернуться
					</button>
				</div>
				<div className="task-editor__editor-container">
					<div>
						<Editor
							mode="python"
							theme="twilight"
							className="task-editor__editor"
							width="100%"
							height="70rem"
							value={code}
							onChange={this.handleEditorChange}
							wrapEnabled={true}
						/>
					</div>
					<div>
						<Editor
							mode="python"
							theme="twilight"
							className="task-editor__editor task-editor__editor--readonly"
							width="100%"
							height="70rem"
							value={output}
							wrapEnabled={true}
							highlightActiveLine={false}
							readOnly={true}
							showGutter={false}
						/>
					</div>
				</div>
			</section>
		);
	}
}

export default connect(
	null,
	{ showNotification }
)(TaskEditor);
