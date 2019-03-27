import React from 'react';
import ReactSVG from 'react-svg';
import { Link } from 'react-router-dom';

import logo from './logo.svg';

const Header = props => (
	<header className="main-header">
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
				<li className="nav-list__item">
					<div className="nav-list__inner">
						Аккаунт
						<ul className="inner-list">
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
						</ul>
					</div>
				</li>
			</ul>
		</nav>
	</header>
);

export default Header;
