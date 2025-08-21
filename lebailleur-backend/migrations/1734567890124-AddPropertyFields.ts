import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPropertyFields1734567890124 implements MigrationInterface {
  name = 'AddPropertyFields1734567890124';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('users');
    
    // Add property name column
    const hasPropertyNameColumn = table?.findColumnByName('property_name');
    if (!hasPropertyNameColumn) {
      await queryRunner.addColumn('users', new TableColumn({
        name: 'property_name',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }));
    }

    // Add property location column
    const hasPropertyLocationColumn = table?.findColumnByName('property_location');
    if (!hasPropertyLocationColumn) {
      await queryRunner.addColumn('users', new TableColumn({
        name: 'property_location',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }));
    }

    // Add property type column
    const hasPropertyTypeColumn = table?.findColumnByName('property_type');
    if (!hasPropertyTypeColumn) {
      await queryRunner.addColumn('users', new TableColumn({
        name: 'property_type',
        type: 'varchar',
        length: '50',
        isNullable: true,
      }));
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'property_name');
    await queryRunner.dropColumn('users', 'property_location');
    await queryRunner.dropColumn('users', 'property_type');
  }
}