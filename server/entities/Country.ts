import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from './User';

@Entity("Countries")
export class Country {
	@PrimaryGeneratedColumn("uuid")
	public id: string;

	@Column()
	public name: string;

	@OneToMany((type) => Country, country => country.users)
	public users: User[];
}

