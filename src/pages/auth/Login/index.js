import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';
import { loginUser, showNotification } from '../../../redux/actions';

import logo from '../logo.svg';

class LoginPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			error: '',
			email: '',
			password: ''
		};
	}

	handleInputChange(e) {
		const { name, value } = e.target;

		this.setState({ [name]: value });
	}

	handleFormSubmit(e) {
		e.preventDefault();

		const { email, password } = this.state;

		axios
			.post('/api/auth/login', { email, password })
			.then(res => {
				if (res.status === 200) {
					// Dispatch a login action
					this.props.loginUser();
					this.props.showNotification('Вы успешно авторизовались');
				}
			})
			.catch(err => {
				if (err.response.status === 400) {
					const { error } = err.response.data;

					this.setState({ error });

					if (this.clearErrorTimeout) {
						clearTimeout(this.clearErrorTimeout);
					}

					this.clearErrorTimeout = setTimeout(
						() => this.setState({ error: '' }),
						5000
					);
				}
			});
	}

	render() {
		const { error, email, password } = this.state;

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
					<h2 className="form-container__title">Авторизация</h2>
					<form className="form">
						<div className="form__group">
							<input
								type="email"
								name="email"
								id="email"
								value={email}
								placeholder="email"
								className="form__input"
								onChange={e => this.handleInputChange(e)}
							/>
							<label htmlFor="email" className="form__label">
								Адрес электронной почты
							</label>
						</div>
						<div className="form__group">
							<input
								type="password"
								name="password"
								id="password"
								placeholder="password"
								value={password}
								className="form__input"
								onChange={e => this.handleInputChange(e)}
							/>
							<label htmlFor="password" className="form__label">
								Пароль
							</label>
						</div>
						{error && <p className="form__error">{error}</p>}
						<div className="form__group">
							<p className="form__sub-text">
								Еще не зарегистрированы?{' '}
								<Link to="/register" className="form__link">
									Создать аккаунт
								</Link>
							</p>
						</div>
						<div className="form__group form__group--pull-right">
							<input type="submit" value="Войти" className="form__submit-btn" />
						</div>
					</form>
				</div>
			</section>
		);
	}
}

export default connect(
	null,
	{ loginUser, showNotification }
)(LoginPage);
