import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Editor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/twilight';

import Header from '../../components/Header';
import Container from '../../containers/Container';

import { addTask, resetTaskErrors } from '../../redux/actions';

class AddTaskPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			form: {
				title: '',
				description: '',
				difficulty: '',
				solution: '',
				mainURL: '',
				additionalSolution: '',
				additionalURL: '',
				codeSnippet: '',
				includeCodeSnippet: false,
				isSolutionArray: false
			}
		};
	}

	componentDidMount() {
		this.props.resetTaskErrors();
	}

	handleInputChange = e => {
		const { name, value } = e.target;

		this.setState({ form: { ...this.state.form, [name]: value } });
	};

	handleCodeSnippetChange = value => {
		this.setState({ form: { ...this.state.form, codeSnippet: value } });
	};

	handleFormSubmit(e) {
		e.preventDefault();

		let {
			title,
			description,
			difficulty,
			solution,
			mainURL,
			additionalSolution,
			additionalURL,
			codeSnippet,
			isSolutionArray
		} = this.state.form;

		if (isSolutionArray) {
			solution = solution.split(',');
			additionalSolution = additionalSolution.split(',');
		}

		this.props.addTask(
			{
				title,
				description,
				difficulty,
				solution,
				mainURL,
				additionalSolution,
				additionalURL,
				codeSnippet
			},
			this.props.history.push
		);
	}

	handleCheckboxChange = e => {
		const { checked, name } = e.target;

		if (name === 'includeCodeSnippet') {
			this.setState({
				form: { ...this.state.form, [name]: checked, codeSnippet: '' }
			});
		} else {
			this.setState({ form: { ...this.state.form, [name]: checked } });
		}
	};

	render() {
		const {
			title,
			description,
			difficulty,
			solution,
			mainURL,
			includeCodeSnippet,
			codeSnippet,
			isSolutionArray,
			additionalSolution,
			additionalURL
		} = this.state.form;

		const { errors } = this.props;

		return (
			<Fragment>
				<Header />
				<Container>
					<section className="section">
						<h2 className="section__title">Добавить задание</h2>
						<div className="addtask-form">
							<form className="form" onSubmit={e => this.handleFormSubmit(e)}>
								<div className="form__group">
									<input
										type="text"
										name="title"
										id="title"
										value={title}
										placeholder="Task title"
										className="form__input"
										onChange={this.handleInputChange}
									/>
									<label htmlFor="title" className="form__label">
										Заголовок задания
									</label>
									{errors.title && (
										<p className="form__sub-error">{errors.title}</p>
									)}
								</div>
								<div className="form__group">
									<textarea
										value={description}
										onChange={this.handleInputChange}
										className="form__textarea form__input"
										name="description"
										id="description"
									/>
									<label htmlFor="description" className="form__label">
										Описание задания
									</label>
									{errors.description && (
										<p className="form__sub-error">{errors.description}</p>
									)}
								</div>
								<div className="form__group">
									<input
										type="number"
										name="difficulty"
										id="difficulty"
										value={difficulty}
										placeholder="Task difficulty"
										className="form__input"
										onChange={this.handleInputChange}
									/>
									<label htmlFor="difficulty" className="form__label">
										Сложность задания (1-10)
									</label>
									{errors.difficulty && (
										<p className="form__sub-error">{errors.difficulty}</p>
									)}
								</div>
								<div className="form__group">
									<input
										type="text"
										name="solution"
										id="solution"
										value={solution}
										placeholder="Task solution"
										className="form__input"
										onChange={this.handleInputChange}
									/>
									<label htmlFor="solution" className="form__label">
										Решение задания
									</label>
									{errors.solution && (
										<p className="form__sub-error">{errors.solution}</p>
									)}
								</div>
								<div className="form__group mb-sm">
									<input
										type="checkbox"
										name="isSolutionArray"
										id="isSolutionArray"
										checked={isSolutionArray}
										className="form__checkbox visually-hidden"
										onChange={this.handleCheckboxChange}
									/>
									<label
										htmlFor="isSolutionArray"
										className="form__label form__checkbox-label"
									>
										Решение является массивом?
									</label>
								</div>
								<div className="form__group mt-md">
									<input
										type="text"
										name="mainURL"
										id="mainURL"
										className="form__input"
										placeholder="Ссылка для решения задания"
										value={mainURL}
										onChange={this.handleInputChange}
									/>
									<label className="form__label" htmlFor="mainURL">
										Ссылка для решения задания
									</label>
									{errors.mainURL && (
										<p className="form__sub-error">{errors.mainURL}</p>
									)}
								</div>
								<div className="form__group">
									<input
										type="text"
										name="additionalSolution"
										id="additionalSolution"
										className="form__input"
										placeholder="Дополнительное решение для проверки"
										value={additionalSolution}
										onChange={this.handleInputChange}
									/>
									<label htmlFor="additionalSolution" className="form__label">
										Дополнительное решение для проверки
									</label>
									{errors.additionalSolution && (
										<p className="form__sub-error">
											{errors.additionalSolution}
										</p>
									)}
								</div>
								<div className="form__group">
									<input
										type="text"
										name="additionalURL"
										id="additionalURL"
										className="form__input"
										placeholder="Дополнительный URL для проверки"
										value={additionalURL}
										onChange={this.handleInputChange}
									/>
									<label htmlFor="additionalURL" className="form__label">
										Дополнительный URL для проверки
									</label>
									{errors.additionalURL && (
										<p className="form__sub-error">{errors.additionalURL}</p>
									)}
								</div>
								<div className="form__group mb-sm">
									<input
										type="checkbox"
										name="includeCodeSnippet"
										id="includeCodeSnippet"
										className="form__checkbox visually-hidden"
										checked={includeCodeSnippet}
										onChange={this.handleCheckboxChange}
									/>
									<label
										htmlFor="includeCodeSnippet"
										className="form__label form__checkbox-label"
									>
										Добавить отрывок кода
									</label>
									{includeCodeSnippet && (
										<Editor
											mode="python"
											value={codeSnippet}
											onChange={this.handleCodeSnippetChange}
											theme="twilight"
											width="100%"
											height="32rem"
											fontSize="2rem"
											className="editor form__editor"
											readOnly={!includeCodeSnippet}
										/>
									)}
								</div>
								<div className="form__group">
									<input
										type="submit"
										value="Создать"
										className="form__submit-btn"
									/>
								</div>
							</form>
						</div>
					</section>
				</Container>
			</Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		errors: {
			title: state.tasks.addTaskErrors.title,
			description: state.tasks.addTaskErrors.description,
			difficulty: state.tasks.addTaskErrors.difficulty,
			solution: state.tasks.addTaskErrors.solution,
			additionalSolution: state.tasks.addTaskErrors.additionalSolution,
			additionalURL: state.tasks.addTaskErrors.additionalURL,
			mainURL: state.tasks.addTaskErrors.mainURL
		}
	};
}

export default connect(
	mapStateToProps,
	{ addTask, resetTaskErrors }
)(AddTaskPage);
