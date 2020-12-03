import { getConnection, Repository } from 'typeorm';
import { Country } from '../entities/Country';

export class CountriesController {

  private readonly repository: Repository<Country>;
  constructor() {
    this.repository = getConnection().getRepository(Country);
  }

  public async getCountryIdByName(name: string): Promise<string> {
    try {
      let id: Promise<string> = null;
      
      id = this.repository.createQueryBuilder()
        .select("id")
        .where("name LIKE :name", { name })
        .execute();
      
      return id;
    } catch (e) {
      console.log("Country get error!");
    }
  }
}
