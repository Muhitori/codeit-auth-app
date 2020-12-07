import axios from "axios";
import authHeader from './Auth-header';

const URL = "http://localhost:9000/";

export class UserService {
  getUserContent() {
    return axios
			.post(URL + "user", { headers: authHeader() })
			.then((response) => {
				if (response.data) {
					return response.data;
				}
			});
  }

}