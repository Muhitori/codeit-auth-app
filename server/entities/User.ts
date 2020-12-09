import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Country } from './Country';
import * as bcrypt from "bcryptjs";

@Entity("Users")
export class User{
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
	public countryId: string;

	@CreateDateColumn({ type: "timestamp with time zone" })
	public createdAt: Date;

	@ManyToOne((type) => User, (user) => user.country)
	public country: Country;

	constructor(
		email: string,
		login: string,
		realName: string,
		password: string,
		birthDate: Date,
		countryId: string
	) {
		this.email = email;
		this.login = login;
		this.realName = realName;
		this.password = password;
		this.birthDate = birthDate;
		this.countryId = countryId;
	}

	hashPassword() {
		this.password = bcrypt.hashSync(this.password, 2);
	}

	async unecryptedPasswordIsValid(password: string) {
		return await bcrypt.compare(password, this.password);
	}
}
