import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CountryMigration20201203235635 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "Countries",
        columns: [
          {
            name: "id",
            type: "uuid",
            default: "uuid_generate_v4()",
            isPrimary: true
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
            isNullable: false
          }
        ]
      })
    );

    await queryRunner.query(
			`INSERT INTO "Countries"("id", "name") VALUES (DEFAULT, $1), (DEFAULT, $2), (DEFAULT, $3);`,
			['Ukraine', 'Russia', 'USA']
		);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("Countries");
	}
}
