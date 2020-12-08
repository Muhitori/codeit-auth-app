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
		this.setState({
			email: "",
			login: ""
		});

		let user = this.authService.getCurrentUser();

		if (user) {
			this.setState({
				email: user.email,
				login: user.login
			});
		}
	}

	handleClick = event => {
		this.authService.logout();
		window.location.reload();
	}
	render() {
		let content;
		if (this.state.email !== "" && this.state.login !== "") {
			content = (
				<div>
					<h1>Your Login {this.state.login}!</h1>
					<h1>Your Email {this.state.email}!</h1>
					<button className="logout" onClick={this.handleClick}>Logout</button>
				</div>
			);
		} else {
			content = <h1>Welcome Guest!</h1>;
		}

		return <div className='home-content'>{content}</div>;
	}
}