import React from "react";
import './SignUp.css';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

interface State {
		email: string,
		login: string,
		realName: string,
		password: string,
		birthDate: Date,
		countryName: string,
		agreement: boolean,
		message: string
}

interface Props {
	userPostFetch: any
}

export class SignUp extends React.Component<Props, State> {


	constructor(props: Props) {
		super(props);

		this.state = {
			email: "",
			login: "",
			realName: "",
			password: "",
			birthDate: new Date(),
			countryName: "",
			agreement: false,
			message: ""
		};
	}

	handleDate = (date: Date) => {
		this.setState({
			birthDate: date
		});
	}

	handleChange = event => {
		if (event.target.name === "assignment") {
			this.setState<never>({
				[event.target.name]: !!event.target.checked,
			});
			return;
		}
		this.setState<never>({
			[event.target.name]: event.target.value
		});
	}

	handleSubmit = event => {
		event.preventDefault();

		if (!this.state.agreement) {
			this.setState({
				message: "Accept user agreement!"
			});
			return;
		}
		console.log(this.state);
		//this.props.userPostFetch(this.state);
	}
	
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit} className='signup-content'>
					<label htmlFor='email'>
						<input
							type='text'
							name='email'
							placeholder='Enter email'
							value={this.state.email}
							onChange={this.handleChange}
						/>
					</label>
					<label htmlFor='login'>
						<input
							type='text'
							name='login'
							placeholder='Enter login'
							value={this.state.login}
							onChange={this.handleChange}
						/>
					</label>
					<label htmlFor='realName'>
						<input
							type='text'
							name='realName'
							placeholder='Enter your name'
							value={this.state.realName}
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
					<label htmlFor='birthDate'>
						<DatePicker
							dateFormat='dd-mm-yyyy'
							name='birthDate'
							onChange={this.handleDate}
							selected={this.state.birthDate}
						/>
					</label>
					<label htmlFor='countryName'>
						<input
							type='text'
							name='countryName'
							placeholder='Enter your country'
							value={this.state.countryName}
							onChange={this.handleChange}
						/>
					</label>
					<label htmlFor='agreement'>
						<input
							type='checkbox'
							name='agreement'
							checked={this.state.agreement}
							onChange={this.handleChange}
						/>
						{"Do you accept user agreement?"}
					</label>

					<p>{this.state.message}</p>

					<button>Sign up</button>
				</form>
			</div>
		);
	}

//	public mapDispatchToProps = dispatch => ({
//		userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
//	});
}
