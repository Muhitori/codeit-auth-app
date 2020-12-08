import axios from "axios";

const URL =
	process.env.NODE_ENV === "production"
		? "ec2-54-75-248-49.eu-west-1.compute.amazonaws.com:9000/"
		: "http://localhost:9000/";

export class CountryService {
	getCountries() {
		return axios.get(URL + "countries").then((response) => {
			if (response.data) {
				return response.data;
			}
		});
	}
}