import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddWhatsappNumber1734567890123 implements MigrationInterface {
  name = 'AddWhatsappNumber1734567890123';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if column already exists before adding
    const table = await queryRunner.getTable('users');
    const hasWhatsappColumn = table?.findColumnByName('whatsapp_number');
    
    if (!hasWhatsappColumn) {
      await queryRunner.addColumn('users', new TableColumn({
        name: 'whatsapp_number',
        type: 'varchar',
        length: '20',
        isNullable: true,
        isUnique: true,
      }));
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'whatsapp_number');
  }
}