import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signupUser } from '../actions';
import formFields from './signupFields';
import SignupField from './SignupField';

const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Signup extends Component {
	componentWillUpdate(nextProps) {
		if (nextProps.auth) {
			this.props.history.push('/dashboard');
		}
	}

	renderFields(field) {
		return formFields.map(({ label, name, type }) => {
			return (
				<Field
					label={label}
					name={name}
					type={type}
					component={SignupField}
					key={name}
				/>
			);
		});
	}

	onSubmit({ name, email, password }) {
		this.props.signupUser(name, email, password);
	}
	render() {
		const { handleSubmit } = this.props;
		return (
			<div className="signup-form">
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					{this.renderFields()}
					<button type="submit" className="btn waves-effect">
						Submit
					</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	if (values.password !== values.passwordConfirmation) {
		errors.passwordConfirmation = 'Passwords do not match';
	}

	if (re.test(values.email) === false) {
		errors.email = 'Please enter a valid email';
	}

	formFields.forEach(({ name }) => {
		if (!values[name]) {
			errors[name] = 'You must provide a value';
		}
	});

	return errors;
}

function mapStateToProps({ auth }) {
	return { auth };
}

const mapDispatchToProps = function(dispatch) {
	return bindActionCreators({ signupUser }, dispatch);
};

const form = reduxForm({ form: 'signup', validate });

export default connect(mapStateToProps, mapDispatchToProps)(form(Signup));
