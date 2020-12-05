import React from 'react';
import './SignIn.css'


export class SignIn extends React.Component {
	private message: string = "";

	render() {
		return (
			<div>
				<form className='signin-content'>
					<label htmlFor="emailOrLogin">
						<input type='text' name="emailOrLogin" placeholder='Enter email or login' />
					</label>
					<label htmlFor="password">
						<input type='password' name="password" placeholder='Enter password' />
					</label>

					<p>{this.message}</p>

					<button>Sign In</button>
				</form>
			</div>
		);
	}
}