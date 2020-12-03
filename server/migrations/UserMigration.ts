import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { Country } from '../entities/Country';

export class UserMigration implements MigrationInterface {
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
						type: "timestamptz",
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
				onDelete: "SET NULL",
			})
    );

    const country: Country = await queryRunner.query(`SELECT * FROM "Countries" WHERE name = ''Ukraine`);
    
    await queryRunner.query(
      `INSERT INTO "Users" (email, login, realName, password, birthDate, countryId) 
      VALUES ('admin@ad.min', 'admin', 'admin', 'admin', $1);`, [country.id]
    );
  }
  

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("Users");
  }
}
