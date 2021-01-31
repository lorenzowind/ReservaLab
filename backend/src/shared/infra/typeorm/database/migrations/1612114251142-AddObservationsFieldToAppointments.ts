import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddObservationsFieldToAppointments1612114251142
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'observations',
        type: 'varchar(255)',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('appointments', 'observations');
  }
}
