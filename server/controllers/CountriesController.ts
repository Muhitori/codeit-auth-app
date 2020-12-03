import { getConnection } from 'typeorm';
import { Country } from '../entities/Country';

export class CountriesController {

  constructor() {
    getConnection().getRepository(Country);
  }
}
