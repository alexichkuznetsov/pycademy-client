import React, { Component, Fragment } from 'react';
import ReactSVG from 'react-svg';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { logoutUser, showNotification } from '../../redux/actions';

import Container from '../../containers/Container';

import logo from './logo.svg';

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			innerListVisible: 0
		};
	}

	toggleInnerList() {
		this.setState({ innerListVisible: !this.state.innerListVisible });
	}

	handleLogoutClick() {
		this.props.showNotification('Вы успешно вышли из аккаунта');
		this.props.logoutUser();
	}

	render() {
		const { innerListVisible } = this.state;
		const { authenticated } = this.props;

		const userLinks = (
			<Fragment>
				<li className="inner-list__item">
					<Link to="/profile" className="inner-list__link">
						Профиль
					</Link>
				</li>
				<li className="inner-list__item">
					<button
						className="inner-list__link inner-list__logout-btn"
						onClick={() => this.handleLogoutClick()}
					>
						Выйти
					</button>
				</li>
			</Fragment>
		);

		const guestLinks = (
			<Fragment>
				<li className="inner-list__item">
					<Link to="/login" className="inner-list__link">
						Войти
					</Link>
				</li>
				<li className="inner-list__item">
					<Link to="/register" className="inner-list__link">
						Зарегистрироваться
					</Link>
				</li>
			</Fragment>
		);

		return (
			<header className="main-header">
				<Container class_="main-header__container">
					<Link to="/" className="main-header__brand">
						<ReactSVG src={logo} svgClassName="main-header__brand-icon" />
						<span className="main-header__brand-text">PyCademy</span>
					</Link>

					<nav className="main-header__nav">
						<ul className="nav-list">
							<li className="nav-list__item">
								<Link to="/" className="nav-list__link">
									Главная
								</Link>
							</li>
							<li className="nav-list__item">
								<Link to="/tasks" className="nav-list__link">
									Задания
								</Link>
							</li>
							<li
								className="nav-list__item"
								onClick={() => this.toggleInnerList()}
							>
								<div className="nav-list__inner">
									{authenticated ? this.props.name : 'Аккаунт'}
									<ul
										className={
											innerListVisible
												? 'inner-list inner-list--visible'
												: 'inner-list'
										}
									>
										{authenticated ? userLinks : guestLinks}
									</ul>
								</div>
							</li>
						</ul>
					</nav>
				</Container>
			</header>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated,
		name: state.auth.user.name
	};
}

export default connect(
	mapStateToProps,
	{ logoutUser, showNotification }
)(Header);
