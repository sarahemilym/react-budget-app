import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Login from './Login';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Signup from './Signup';

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}
	render() {
		return (
			<div>
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path="/" component={Landing} />
						<Route path="/login" component={Login} />
						<Route path="/signup" component={Signup} />
						<Route path="/dashboard" component={Dashboard} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default connect(null, actions)(App);
