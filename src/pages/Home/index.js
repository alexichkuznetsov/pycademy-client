import React, { Fragment } from 'react';
import ReactSVG from 'react-svg';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Container from '../../containers/Container';

import logo from '../../assets/img/logo.svg';
import userLogo from '../../assets/img/user.svg';
import tasksLogo from '../../assets/img/tasks.svg';
import statsLogo from '../../assets/img/stats.svg';
import devicesLogo from '../../assets/img/devices.svg';

function HomePage(props) {
	return (
		<Fragment>
			<Header />
			<section className="section-home">
				<div className="cta">
					<div className="cta__logo-container">
						<ReactSVG src={logo} svgClassName="cta__logo-icon" />
						<p className="cta__logo-text">PyCademy</p>
					</div>
					<p className="cta__text">
						PyCademy - обучение программированию на языке{' '}
						<span className="cta__accent-text">Python</span> и библиотекам{' '}
						<span className="cta__accent-text">BeautifulSoup</span> и{' '}
						<span className="cta__accent-text">Scrapy</span>
					</p>
					<div className="cta__btn-container">
						<Link to="/register" className="cta__btn">
							Зарегистрироваться
						</Link>
					</div>
				</div>
				<Container>
					<ul className="features-list">
						<li className="features-list__item">
							<div className="feature-item">
								<div className="feature-item__left-side">
									<ReactSVG src={userLogo} svgClassName="feature-item__icon" />
								</div>
								<div className="feature-item__right-side">
									<h3 className="feature-item__title">Регистрируйтесь</h3>
									<p className="feature-item__text">
										Перейдите на страницу регистрации и создайте свой аккаунт
									</p>
								</div>
							</div>
						</li>
						<li className="features-list__item">
							<div className="feature-item">
								<div className="feature-item__left-side">
									<ReactSVG src={tasksLogo} svgClassName="feature-item__icon" />
								</div>
								<div className="feature-item__right-side">
									<h3 className="feature-item__title">Проходите задания</h3>
									<p className="feature-item__text">
										На странице заданий находятся самые разнообразные задачи
									</p>
								</div>
							</div>
						</li>
						<li className="features-list__item">
							<div className="feature-item">
								<div className="feature-item__left-side">
									<ReactSVG src={statsLogo} svgClassName="feature-item__icon" />
								</div>
								<div className="feature-item__right-side">
									<h3 className="feature-item__title">
										Следите за статистикой
									</h3>
									<p className="feature-item__text">
										В своем профиле вы можете увидеть пройденные задания
									</p>
								</div>
							</div>
						</li>
						<li className="features-list__item">
							<div className="feature-item">
								<div className="feature-item__left-side">
									<ReactSVG
										src={devicesLogo}
										svgClassName="feature-item__icon"
									/>
								</div>
								<div className="feature-item__right-side">
									<h3 className="feature-item__title">Кроссплатформенность</h3>
									<p className="feature-item__text">
										Хотите решить еще одну задачу пока едете в метро? Нет
										проблем!
									</p>
								</div>
							</div>
						</li>
					</ul>
				</Container>
			</section>
			<Footer />
		</Fragment>
	);
}

export default HomePage;
