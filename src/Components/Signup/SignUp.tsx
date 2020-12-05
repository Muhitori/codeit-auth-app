import React from "react";
import './SignUp.css'

export class SignUp extends React.Component {
	private message: string = "";

	render() {
		return (
			<div>
				<form className='signup-content'>
					<label htmlFor='email'>
						<input type='text' name='email' placeholder='Enter email' />
					</label>
					<label htmlFor='login'>
						<input type='text' name='login' placeholder='Enter login' />
					</label>
					<label htmlFor='realName'>
						<input type='text' name='name' placeholder='Enter your name' />
					</label>
					<label htmlFor='password'>
						<input type='password' name='password' placeholder='Enter password' />
					</label>
					<label htmlFor='birthDate'>
						<input type='date' name='birthDate' placeholder='Enter your birth date' />
					</label>
					<label htmlFor='countryName'>
						<input type='text' name='countryName' placeholder='Enter your country' />
					</label>
					<label htmlFor="agreement">
						<input type='checkbox' name='agreement' />
						{"Do you accept user agreement?"}
					</label>

					<p>{this.message}</p>

					<button>Sign up</button>
				</form>
			</div>
		);
	}
}
