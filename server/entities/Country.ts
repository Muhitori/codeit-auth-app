import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Countries")
export class Country {
	@PrimaryGeneratedColumn("uuid")
	public id: string;

	@Column()
	public name: string;
}

