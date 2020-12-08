import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './Layout.css';
import { SignIn } from '../Signin/SignIn';
import { SignUp } from '../Signup/SignUp';
import { Home } from '../Home/Home';

export class Layout extends React.Component {
  
  render() {
    return (
			<div className='general'>
				<ul>
					<li>
						<a href='/signin'>Lest sign in!</a>
					</li>
					<li>
						<a href='/signup'>Lest sign up!</a>
					</li>
				</ul>
				<BrowserRouter>
					<Switch>
						<Route path='/signin' component={SignIn} />
						<Route path='/signup' component={SignUp} />
						<Route exact path={'/home'} component={Home} />
					</Switch>
				</BrowserRouter>
			</div>
		);
  }
}