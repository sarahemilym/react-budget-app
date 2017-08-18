import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

class LoginForm extends Component {
	renderField(field) {
		return (
			<div>
				<label className="form-label">
					{field.label}
				</label>
				<input
					className={field.className}
					id={field.id}
					type={field.type}
					{...field.input}
				/>
			</div>
		);
	}

	onSubmit(values) {
		console.log(values);
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<div className="login-form">
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<div>
						<label>Email</label>
						<Field
							name="email"
							component={this.renderField}
							id="email"
							type="text"
						/>
					</div>
					<div>
						<label>Password</label>
						<Field
							name="password"
							component={this.renderField}
							id="password"
							type="password"
							className="validate form-input"
						/>
					</div>
					<button type="submit" className="btn waves-effect">
						Submit
					</button>
				</form>
			</div>
		);
	}
}

export default reduxForm({
	form: 'login'
})(LoginForm);
