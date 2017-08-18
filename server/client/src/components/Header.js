import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<li>
						<Link to="/login">Login</Link>
					</li>
				);
			default:
				return (
					<div>
						<li>
							{this.props.auth.name}
						</li>
						<li>
							<a href="/api/logout">Logout</a>
						</li>
					</div>
				);
		}
	}
	render() {
		return (
			<nav className="cyan lighten-3">
				<div className="nav-wrapper">
					<a href="/" className="brand-logo left">
						Logo
					</a>
					<ul id="nav-mobile" className="right">
						{this.renderContent()}
					</ul>
				</div>
			</nav>
		);
	}
}

function mapStateToProps(state) {
	return { auth: state.auth };
}
export default connect(mapStateToProps)(Header);
