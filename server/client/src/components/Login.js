import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';

class Login extends Component {
	componentWillUpdate(nextProps) {
		if (nextProps.auth) {
			this.props.history.push('/dashboard');
		}
	}

	renderContent() {
		switch (this.props.auth) {
			case null:
				return <div />;
			case false:
				return (
					<div className="page-login">
						<h1>Login</h1>
						<div className="login-wrapper">
							<LoginForm />
							<div className="social-logins">
								<a
									href="/auth/google"
									className="google"
									onClick={this.handleClick}
								>
									Sign in with Google
								</a>
								<a href="/auth/facebook" className="facebook">
									Sign in with Facebook
								</a>
							</div>
						</div>
					</div>
				);
			default:
				return;
		}
	}
	render() {
		return (
			<div>
				{this.renderContent()}
			</div>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Login);
