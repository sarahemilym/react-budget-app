import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { test } from '../actions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

class Login extends Component {
	componentWillUpdate(nextProps) {
		if (nextProps.auth) {
			this.props.history.push('/dashboard');
		}
	}
	renderContent() {
		console.log('this.props', this.props);
		switch (this.props.auth) {
			case true:
				return <div />;
			case null:
				return;
			default:
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
								{/* <button onClick={this.props.test} /> */}
							</div>
						</div>
					</div>
				);
		}
	}
	render() {
		return (
			<div>
				{this.renderContent()}
				<p>
					Not already registered? <Link to="/signup">Sign up</Link>{' '}
					here.
				</p>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ test }, dispatch);
};

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
