import axios from 'axios';
import { User } from '../Models/User';

const URL = "http://localhost:9000/";
export class AuthService {
	login(emailOrLogin: string, password: string) {
		return axios
			.post(URL + "signin", {
				emailOrLogin,
				password,
			})
			.then((response) => {
				if (response.data.accessToken) {
					localStorage.setItem("user", JSON.stringify(response.data));
				}

				return response.data;
			});
	}

	register(user: User) {
		return axios
			.post(URL + "signup", {
				user,
			})
			.then((response) => {
				if (response.data.accessToken) {
					localStorage.setItem("user", JSON.stringify(response.data));
				}

				return response.data;
			});
	}

	isUniqueLogin(login: string) {
		return axios
			.get(URL + "signup/?login=" + login)
			.then((response) => {
				if (response.data.accessToken) {
					localStorage.setItem("user", JSON.stringify(response.data));
				}

				return response.data;
			});
	}

	isUniqueEmail(email: string) {
		return axios
			.get(URL + "signup/?email=" + email)
			.then((response) => {
				if (response.data.accessToken) {
					localStorage.setItem("user", JSON.stringify(response.data));
				}

				return response.data;
			});
	}

	isLoginOrEmailValid(emailOrLogin: string) {
		return axios
			.get(URL + "signup/?emailOrLogin=" + emailOrLogin)
			.then((response) => {
				if (response.data.accessToken) {
					localStorage.setItem("user", JSON.stringify(response.data));
				}

				return response.data;
			});
	}

	logout() {
		localStorage.removeItem("user");
	}

	getCurrentUser() {
		return JSON.parse(localStorage.getItem("user"));
	}
}