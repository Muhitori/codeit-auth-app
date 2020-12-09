import axios from 'axios';
import { User } from '../Models/User';

const URL = "/api/auth";
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

				return response;
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
			.post(URL + "login", { login })
			.then((response) => {
				return response.data;
			});
	}

	isUniqueEmail(email: string) {
		return axios
			.post(URL + "email", { email })
			.then((response) => {
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