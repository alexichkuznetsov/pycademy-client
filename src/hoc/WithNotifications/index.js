import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactSVG from 'react-svg';

import {
	showNotification,
	hideNotification,
	setAnimation
} from '../../redux/actions';

import closeIcon from './close.svg';

class WithNotifications extends Component {
	handleCloseClick = () => {
		this.props.hideNotification();
	};

	render() {
		const { children, message, shown, animation } = this.props;

		let notification;

		if (shown) {
			if (animation === 'sliding-in') {
				notification = (
					<div className="notification notification--slide-in">
						{message}
						<ReactSVG
							onClick={this.handleCloseClick}
							src={closeIcon}
							svgClassName="notification__close-icon"
						/>
					</div>
				);
			} else if (animation === 'sliding-out') {
				notification = (
					<div className="notification notification--slide-out">
						{message}
						<ReactSVG
							onClick={this.handleCloseClick}
							src={closeIcon}
							svgClassName="notification__close-icon"
						/>
					</div>
				);
			} else {
				notification = (
					<div className="notification">
						{message}
						<ReactSVG
							onClick={this.handleCloseClick}
							src={closeIcon}
							svgClassName="notification__close-icon"
						/>
					</div>
				);
			}
		}

		return (
			<Fragment>
				{children}
				{shown && notification}
			</Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		shown: state.notify.shown,
		message: state.notify.message,
		animation: state.notify.animation
	};
}

export default connect(
	mapStateToProps,
	{ showNotification, hideNotification, setAnimation }
)(WithNotifications);
