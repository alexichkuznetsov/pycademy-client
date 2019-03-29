import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';
import { showNotification } from '../../../redux/actions';

import logo from '../../../assets/img/logo.svg';

class RegisterPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			form: {
				name: '',
				email: '',
				password: '',
				confirmPassword: ''
			},

			errors: {
				name: '',
				email: '',
				password: '',
				confirmPassword: ''
			}
		};
	}

	handleInputChange(e) {
		const { name, value } = e.target;

		this.setState({ form: { ...this.state.form, [name]: value } });
	}

	handleFormSubmit(e) {
		e.preventDefault();

		const { name, email, password, confirmPassword } = this.state.form;

		axios
			.post('/api/auth/register', { name, email, password, confirmPassword })
			.then(res => {
				if (res.status === 201) {
					this.props.showNotification('Вы успешно зарегистрировались');
					this.props.history.push('/login');
				}
			})
			.catch(err => {
				if (err.response.status === 400) {
					const { name, email, password, confirmPassword } = err.response.data;

					this.setState({ errors: { name, email, password, confirmPassword } });
				} else if (err.response.status === 500) {
					this.props.showNotification('Произошла ошибка на стороне сервера');
				}
			});
	}

	render() {
		const { errors } = this.state;
		const { name, email, password, confirmPassword } = this.state.form;
		const { authenticated } = this.props;

		if (authenticated) {
			return <Redirect to="/" />;
		}

		return (
			<section
				className="section-auth"
				onSubmit={e => this.handleFormSubmit(e)}
			>
				<div className="form-container">
					<Link to="/" className="form-container__logo-box">
						<ReactSVG src={logo} svgClassName="form-container__logo-icon" />
						<span className="form-container__logo-text">PyCademy</span>
					</Link>
					<h2 className="form-container__title">Регистрация</h2>
					<form className="form">
						<div className="form__group">
							<input
								type="text"
								name="name"
								id="name"
								value={name}
								placeholder="Имя"
								className="form__input"
								onChange={e => this.handleInputChange(e)}
							/>
							<label htmlFor="name" className="form__label">
								Имя
							</label>
							{errors.name && <p className="form__sub-error">{errors.name}</p>}
						</div>
						<div className="form__group">
							<input
								type="email"
								name="email"
								id="email"
								value={email}
								placeholder="Адрес электронной почты"
								className="form__input"
								onChange={e => this.handleInputChange(e)}
							/>
							<label htmlFor="email" className="form__label">
								Адрес электронной почты
							</label>
							{errors.email && (
								<p className="form__sub-error">{errors.email}</p>
							)}
						</div>
						<div className="form__group">
							<input
								type="password"
								name="password"
								id="password"
								value={password}
								placeholder="Пароль"
								className="form__input"
								onChange={e => this.handleInputChange(e)}
							/>
							<label htmlFor="password" className="form__label">
								Пароль
							</label>
							{errors.password && (
								<p className="form__sub-error">{errors.password}</p>
							)}
						</div>
						<div className="form__group">
							<input
								type="password"
								name="confirmPassword"
								id="confirmPassword"
								value={confirmPassword}
								placeholder="Подтверждение пароля"
								className="form__input"
								onChange={e => this.handleInputChange(e)}
							/>
							<label htmlFor="confirmPassword" className="form__label">
								Подтверждение пароля
							</label>
							{errors.confirmPassword && (
								<p className="form__sub-error">{errors.confirmPassword}</p>
							)}
						</div>
						<div className="form__group">
							<p className="form__sub-text">
								Уже есть аккаунт?
								<Link to="/login" className="form__link">
									Войти
								</Link>
							</p>
						</div>
						<div className="form__group form__group--pull-right">
							<input
								type="submit"
								value="Создать"
								className="form__submit-btn"
							/>
						</div>
					</form>
				</div>
			</section>
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
	{ showNotification }
)(RegisterPage);
