import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateAppointments1599362220868
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'teacher_id',
            type: 'varchar(36)',
            isNullable: true,
          },
          {
            name: 'laboratory_id',
            type: 'varchar(36)',
            isNullable: true,
          },
          {
            name: 'year',
            type: 'smallint',
          },
          {
            name: 'month',
            type: 'tinyint',
          },
          {
            name: 'day',
            type: 'tinyint',
          },
          {
            name: 'time',
            type: 'varchar(24)',
          },
          {
            name: 'subject',
            type: 'varchar(39)',
          },
          {
            name: 'classroom',
            type: 'varchar(13)',
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

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentTeacher',
        columnNames: ['teacher_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentLaboratory');

    await queryRunner.dropForeignKey('appointments', 'AppointmentTeacher');

    await queryRunner.dropTable('appointments');
  }
}
