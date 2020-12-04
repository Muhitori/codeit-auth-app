import { Request, Response } from 'express';
import { getConnection, Repository } from 'typeorm';
import { Country } from '../entities/Country';

export class CountriesController {
  private repository: Repository<Country>;
  
  getRepository() {
    this.repository = getConnection().getRepository(Country);
  }

  public async getCountries(request: Request, response: Response) {
    this.getRepository();
		const countries: Country[] = await this.repository.find();
		return response.status(200).json(countries);
	}

  public async getCountryIdByName(name: string): Promise<string> {
    this.getRepository();
		try {
			return this.repository
				.findOne({
					where: {
						name,
					},
				})
				.then((country: Country) => country.id);
		} catch (e) {
			console.log("Country get error!");
		}
	}
}
