import axios from "axios";

const URL = "http://localhost:9000/";

export class CountryService {
	getCountries() {
		return axios.get(URL + "countries").then((response) => {
			if (response.data) {
				return response.data;
			}
		});
	}
}