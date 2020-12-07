import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Country } from '../entities/Country';
export class CountriesController {

	public async getCountryNames(request: Request, response: Response) {
		const countries: Country[] = await getRepository(Country)
			.find({
				select: ['name']
			})
		return response.status(200).json(countries);
	}

	public async getCountryIdByName(name: string): Promise<string> {
		let repository = getRepository(Country);
		return repository
			.findOne({
				where: {
					name
				},
			})
			.then((country: Country) => {
				return country.id
			});
	}
}
