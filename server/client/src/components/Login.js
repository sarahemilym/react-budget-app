import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
	componentWillUpdate(nextProps) {
		console.log('props', this.props.auth);
		if (nextProps.auth) {
			this.props.history.push('/dashboard');
		}
	}
	renderContent() {
		console.log('props2', this.props.auth);
		switch (this.props.auth) {
			case null:
				return <div />;
			case false:
				return (
					<div className="page-login">
						<h1>Login</h1>
						<div className="login-wrapper">
							<div className="login-form">
								<form>
									<label className="form-label">Email</label>
									<input id="email" type="text" />
									<label className="form-label">
										Password
									</label>
									<input
										id="password"
										type="password"
										className="validate form-input"
									/>
								</form>
							</div>
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
		console.log('props3', this.props.auth);
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
