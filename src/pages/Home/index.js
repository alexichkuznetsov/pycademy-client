import React, { Fragment } from 'react';

import Header from '../../components/Header';
import Container from '../../containers/Container';

const HomePage = props => (
	<Fragment>
		<Header />
		<Container>
			<section className="section">
				<h2 className="section__title">Главная страница</h2>
				<p className="section__paragraph">Всем здарова!</p>
			</section>
		</Container>
	</Fragment>
);

export default HomePage;
