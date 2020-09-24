import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class RefactorLaboratories1600903607054
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentLaboratory');

    await queryRunner.dropColumn('appointments', 'laboratory_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'laboratory_number',
        type: 'tinyint',
      }),
    );

    await queryRunner.dropTable('laboratories');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'laboratories',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar(255)',
          },
          {
            name: 'number',
            type: 'tinyint',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'current_timestamp',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'current_timestamp',
          },
        ],
      }),
    );

    await queryRunner.dropColumn('appointments', 'laboratory_number');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'laboratory_id',
        type: 'varchar(36)',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentLaboratory',
        columnNames: ['laboratory_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'laboratories',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }
}
