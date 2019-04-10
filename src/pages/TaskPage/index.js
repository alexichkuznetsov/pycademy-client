import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Editor from 'react-ace';

import Header from '../../components/Header';
import Container from '../../containers/Container';
import Loader from '../../components/Loader';

import { showNotification } from '../../redux/actions';

const Paragraph = ({ text }) => <p className="task-view__paragraph">{text}</p>;

class TaskPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,

			task: {
				title: '',
				description: '',
				codeSnippet: '',
				difficulty: null,
				createdAt: null
			}
		};
	}

	componentDidMount() {
		const { id } = this.props.match.params;

		axios
			.get(`/api/tasks/${id}`)
			.then(res => {
				let {
					title,
					description,
					difficulty,
					createdAt,
					codeSnippet
				} = res.data;

				description = description.split('\n');

				this.setState({
					loading: false,
					task: { title, description, difficulty, createdAt, codeSnippet }
				});
			})
			.catch(err => {
				if (err.response.status === 404) {
					this.props.showNotification('Такого задания нет в системе');
				} else if (err.response.status === 500) {
					this.props.showNotification('Произошла внутренняя ошибка сервера');
				}

				this.props.history.push('/tasks');
			});
	}

	render() {
		const { loading } = this.state;

		if (loading) return <Loader />;

		const {
			title,
			description,
			difficulty,
			createdAt,
			codeSnippet
		} = this.state.task;
		const taskDate = new Date(createdAt);

		return (
			<Fragment>
				<Header />
				<Container>
					<section className="section">
						<h2 className="section__title">Просмотр задания</h2>
						<div className="task-view">
							<div className="task-view__info">
								<h3 className="task-view__title">{title}</h3>
								<div className="task-view__desc-container">
									{description.map((paragraph, index) => (
										<Paragraph key={index} text={paragraph} />
									))}
								</div>
								{codeSnippet && (
									<div className="task-view__editor-container">
										<Editor
											mode="python"
											value={codeSnippet}
											theme="twilight"
											width="100%"
											height="32rem"
											fontSize="2rem"
											className="editor"
											showGutter={false}
											highlightActiveLine={false}
											readOnly={true}
											wrapEnabled={true}
										/>
									</div>
								)}
							</div>
							<div className="task-view__meta">
								<p className="task-view__created-at">
									Дата создания:&nbsp;
									<span className="task-view__created-at-value">
										{`${taskDate.getDate()}/${taskDate.getMonth() +
											1}/${taskDate.getFullYear()}`}
									</span>
								</p>
								<p className="task-view__difficulty">
									Сложность:&nbsp;
									<span className="task-view__difficulty-value">
										{difficulty}
									</span>
								</p>
							</div>
						</div>
					</section>
				</Container>
			</Fragment>
		);
	}
}

export default connect(
	null,
	{ showNotification }
)(TaskPage);
