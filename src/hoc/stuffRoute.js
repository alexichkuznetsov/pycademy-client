import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {
	class ComposedComponent extends Component {
		componentDidMount() {
			this.navigateAway();
		}

		componentDidUpdate() {
			this.navigateAway();
		}

		navigateAway() {
			if (!this.props.authenticated) {
				this.props.history.push('/login');
			}

			if (this.props.userStatus !== 'stuff') {
				this.props.history.push('/tasks');
			}
		}

		render() {
			return <ChildComponent {...this.props} />;
		}
	}

	function mapStateToProps(state) {
		return {
			authenticated: state.auth.authenticated,
			userStatus: state.auth.user.status
		};
	}

	return connect(mapStateToProps)(ComposedComponent);
};
