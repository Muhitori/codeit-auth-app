//@ts-nocheck
import React from "react";
import { User } from '../../Models/User';
import { Country } from "../../Models/Country";
import { CountryService } from '../../Services/Country.service';
import { AuthService } from "../../Services/Auth.service";

import moment from 'moment';
import DatePicker from 'react-datepicker';
import { Redirect } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import "./SignUp.css";

interface State {
	user: User;
	countries: Country[],
	agreement: boolean;
	message: string;
	redirectToHome: boolean;
}

export class SignUp extends React.Component<any, State> {
	private countryService: CountryService;
	private authService: AuthService;

	constructor(props) {
		super(props);

		this.state = {
			user: {
				email: "",
				login: "",
				realName: "",
				password: "",
				birthDate: new Date(),
				countryName: "",
			},
			countries: [],
			agreement: false,
			message: "",
			redirectToHome: false,
		};

		this.countryService = new CountryService();
		this.authService = new AuthService();
	}

	async componentDidMount() {
		this.setState({
			countries: await this.countryService.getCountries(),
		});
		this.setState({
			user: {
				...this.state.user,
				countryName: this.state.countries[0].name,
			},
		});
	}

	handleEmail = (event) => {
		this.setMessage("");
		let email = event.target.value;
		let re = /\S+@\S+\.\S+/;

		this.setState({
			user: {
				...this.state.user,
				email: email,
			},
		});

		if (!re.test(email)) {
			this.setMessage("Email is not valid!");
		}
	}

	handleDate = (date: Date) => {
		if (date > new Date()) {
			this.setMessage("You are to young!");
		}

		this.setState({
			user: {
				...this.state.user,
				birthDate: date,
			},
		});
	};

	handleCountry = (event) => {
		this.setState({
			user: {
				...this.state.user,
				countryName: event.target.selected,
			},
		});
	};
	handleAgreement = (event) => {
		this.setState<never>({
			agreement: event.target.checked,
		});
	};

	handleChange = (event) => {
		if (event.target.value === "") {
			this.setMessage("Enter something in the field " + event.target.name);
		}
		this.setState<never>({
			user: {
				...this.state.user,
				[event.target.name]: event.target.value,
			},
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();

		this.authService.isUniqueLogin(this.state.user.login).catch((data) => {
			this.setMessage("Login is already taken!");
		});

		
		this.authService.isUniqueEmail(this.state.user.email).catch((data) => {
			this.setMessage("Email is already taken!");
		});

		if (!this.state.agreement) {
			this.setMessage("Accept user agreement!");
			return;
		}

		this.authService.register(this.state.user).then((data) => {
			this.setState({
				redirectToHome: true,
			});
		});
	};

	setMessage = (msg) => {
		this.setState({
			message: msg,
		});
	};

	render() {
		if (this.state.redirectToHome) return <Redirect push to='/home' />;

		let options = [];
		this.state.countries.forEach((country, index) => {
			options.push(
				<option key={index} value={country.name}>
					{country.name}
				</option>
			);
		});

		return (
			<div>
				<form onSubmit={this.handleSubmit} className='signup-content'>
					<label htmlFor='email'>
						<input
							type='text'
							name='email'
							placeholder='Enter email'
							value={this.state.user.email}
							onChange={this.handleEmail}
						/>
					</label>
					<label htmlFor='login'>
						<input
							type='text'
							name='login'
							placeholder='Enter login'
							value={this.state.user.login}
							onChange={this.handleChange}
						/>
					</label>
					<label htmlFor='realName'>
						<input
							type='text'
							name='realName'
							placeholder='Enter your name'
							value={this.state.user.realName}
							onChange={this.handleChange}
						/>
					</label>
					<label htmlFor='password'>
						<input
							type='password'
							name='password'
							placeholder='Enter password'
							value={this.state.user.password}
							onChange={this.handleChange}
						/>
					</label>
					<label htmlFor='birthDate'>
						{"Enter your birth date: "}
						<DatePicker
							dateFormat={moment(this.state.user.birthDate).format(
								"DD/MM/YYYY"
							)}
							name='birthDate'
							selected={this.state.user.birthDate}
							onChange={this.handleDate}
						/>
					</label>
					<label htmlFor='countryName'>
						Pick your country:{" "}
						<select
							name='countryName'
							value={this.state.user.countryName}
							onChange={this.handleChange}>
							{options}
						</select>
					</label>
					<label htmlFor='agreement'>
						<input
							type='checkbox'
							name='agreement'
							checked={this.state.agreement}
							onChange={this.handleAgreement}
						/>
						{"Do you accept user agreement?"}
					</label>

					<p>{this.state.message}</p>

					<button>Sign up</button>
				</form>
			</div>
		);
	}
}
