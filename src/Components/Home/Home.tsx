//@ts-nocheck
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
			name: "",
		};

		this.authService = new AuthService();
	}

	componentDidMount = () => {
		this.setState({
			email: "",
			name: ""
		});

		let user = this.authService.getCurrentUser();

		if (user) {
			this.setState({
				email: user.email,
				name: user.name
			});
		}
	}

	handleClick = event => {
		this.authService.logout();
		window.location.reload();
	}
	render() {
		let content;
		if (this.state.email !== "" && this.state.name !== "") {
			content = (
				<div>
					<h1>Your Email {this.state.email}!</h1>
					<h1>Your Name {this.state.name}!</h1>
					<button className='logout' onClick={this.handleClick}>
						Logout
					</button>
				</div>
			);
		} else {
			content = <h1>Welcome Guest!</h1>;
		}

		return <div className='home-content'>{content}</div>;
	}
}