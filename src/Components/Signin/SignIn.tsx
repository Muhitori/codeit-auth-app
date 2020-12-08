import React from 'react';
import { Redirect } from "react-router-dom";
import { AuthService } from "../../Services/Auth.service";
import './SignIn.css'

interface State {
	emailOrLogin: string,
	password: string
	message: string,
	redirectToHome: boolean
}

export class SignIn extends React.Component<any, State> {
	authService: AuthService;
	constructor(props) {
		super(props);

		this.state = {
			emailOrLogin: "",
			password: "",
			message: "",
			redirectToHome: false,
		};

		this.authService = new AuthService();
	}

	handleChange = (event) => {
		this.setState<never>({
			[event.target.name]: event.target.value,
		});
	}

	handleSubmit = (event) => {
		event.preventDefault();

		if (this.state.emailOrLogin === ""
			&& this.state.password === "") {
			this.setMessage("You forget to enter something!");
			return;
		}

		this.authService
			.login(this.state.emailOrLogin, this.state.password)
			.then((response) => {
				if (response.status !== 200) {
					this.setMessage(response.data.message);
				} else {
					this.setState({
						redirectToHome: true,
					});
				}
			});
	}

	setMessage = (msg) => {
		this.setState({
			message: msg,
		});
	}
	render() {
		if (this.state.redirectToHome) return <Redirect push to='/home' />;

		return (
			<div>
				<form onSubmit={this.handleSubmit} className='signin-content'>
					<label htmlFor='emailOrLogin'>
						<input
							type='text'
							name='emailOrLogin'
							placeholder='Enter email or login'
							value={this.state.emailOrLogin}
							onChange={this.handleChange}
						/>
					</label>
					<label htmlFor='password'>
						<input
							type='password'
							name='password'
							placeholder='Enter password'
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</label>

					<p>{this.state.message}</p>

					<button>Sign In</button>
				</form>
			</div>
		);
	}
}