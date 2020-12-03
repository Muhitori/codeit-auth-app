import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { Country } from '../entities/Country';

export class UserMigration20201203235636 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
			new Table({
				name: "Users",
				columns: [
					{
						name: "id",
						type: "uuid",
						default: "uuid_generate_v4()",
						isPrimary: true,
					},
					{
						name: "email",
						type: "varchar",
						length: "255",
						isUnique: true,
						isNullable: false,
					},
					{
						name: "login",
						type: "varchar",
						length: "255",
						isUnique: true,
						isNullable: false,
					},
					{
						name: "realName",
						type: "varchar",
						length: "255",
						isNullable: false,
					},
					{
						name: "password",
						type: "varchar",
						length: "255",
						isNullable: false,
					},
					{
						name: "birthDate",
						type: "timestamptz",
						isNullable: false,
					},
					{
						name: "countryId",
						type: "uuid",
            isNullable: false,
					},
					{
						name: "createdAt",
						type: "timestamptz",
						default: "now()",
						isNullable: false,
					},
				],
			})
    );
    
    await queryRunner.createForeignKey(
			"Users",
			new TableForeignKey({
				columnNames: ["countryId"],
				referencedColumnNames: ["id"],
				referencedTableName: "Countries",
				onDelete: "CASCADE",
			})
    );

		const [country]: Country[] = await queryRunner.query(`SELECT * FROM "Countries" WHERE name = $1`, ['Ukraine']);
    
    await queryRunner.query(
			`INSERT INTO "Users" ("email", "login", "realName", "password", "birthDate", "countryId") 
      VALUES ($1, $2, $3, $4, $5, $6);`,
			[
				'admin@ad.min',
				'admin',
				'admin',
				'admin',
				new Date(),
				country.id,
			]
		);
  }
  

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("Users");
  }
}
