import { access } from 'fs';
import React from 'react';
import { AuthService } from '../../Services/Auth.service';
import './Home.css'

interface State {
	email: string,
	login: string
}
export class Home extends React.Component<any, State> {
	authService: AuthService;
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			login: "",
		};

		this.authService = new AuthService();
	}

	componentDidMount = () => {
		let user = this.authService.getCurrentUser();
		if (user.accessToken) {
			this.setState({
				email: user.email,
				login: user.login
			});
		}
	}
	render() {
		let content;
		if (localStorage.accessToken) {
			content = (
				<div>
					<h1>Your Login {this.state.login}!</h1>
					<h1>Your Email {this.state.email}!</h1>
				</div>
			);
		} else {
			content = <h1>Welcome Guest!</h1>;
		}

		return <div className='home-content'>{content}</div>;
	}
}