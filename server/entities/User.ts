import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Country } from './Country';

@Entity("Users")
export class User {
	@PrimaryGeneratedColumn("uuid")
	public id: string;

	@Column()
	public email: string;

	@Column()
	public login: string;

	@Column()
	public realName: string;

	@Column()
	public password: string;

	@Column()
	public birthDate: Date;

	@Column("uuid")
	public countyId: string;

	@CreateDateColumn({ type: "timestamp with time zone" })
	public createdAt: Date;

	@ManyToOne((type) => User, (user) => user.country)
	public country: Country;
}
