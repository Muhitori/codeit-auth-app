import axios from "axios";

const URL = "/api/";

export class CountryService {
	getCountries() {
		return axios.get(URL + "countries").then((response) => {
			if (response.data) {
				return response.data;
			}
		});
	}
}