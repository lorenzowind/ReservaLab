import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddRaFieldToUsers1602188718216
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'ra',
        type: 'varchar(12)',
        isUnique: true,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('users', 'ra');
  }
}
