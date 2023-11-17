import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { HttpStatus } from '@nestjs/common';
import { Connection } from 'typeorm';
import { BangRoleGroup, RoleUser } from './utils/typeorm';

async function seedData(connection: Connection) {
  const defaultQuyen = [
    {
      QuyenID: 1,
      TenQuyen: 'Quản Lý Quyền Cha',
    },
    {
      QuyenID: 2,
      QuyenIDCha: 1,
      TenQuyen: 'Quyền Con 1',
    },
    {
      QuyenID: 3,
      QuyenIDCha: 1,
      TenQuyen: 'Quyền Con 2',
    },
    {
      QuyenID: 4,
      QuyenIDCha: 1,
      TenQuyen: 'Quyền Con 3',
    },
  ];
  const idQuyen = defaultQuyen.map((item) => item.QuyenID);
  const bangRoleUserRepository = connection.getRepository(RoleUser);
  const bangRoleGroupRepository = connection.getRepository(BangRoleGroup);

  try {
    console.log('Dữ liệu đã được seed thành công.');
    console.log('Tạo quyền thành công.');
    await Promise.all(
      defaultQuyen.map(async (tr) => {
        // Kiểm tra xem dữ liệu đã tồn tại hay chưa
        const existingQuyenID = await bangRoleUserRepository.findOne(
          tr.QuyenID,
        );

        if (!existingQuyenID) {
          // Nếu chưa tồn tại, thêm dữ liệu mới
          const roleUser = bangRoleUserRepository.create(tr);
          await bangRoleUserRepository.save(roleUser);
        }
      }),
    );

    const exisRoleAdmin = await bangRoleGroupRepository
      .createQueryBuilder('roleGroup')
      .where('roleGroup.TenNhomQuyen = :name', { name: 'admin' })
      .getOne();
    if (exisRoleAdmin) {
      exisRoleAdmin.NhomQuyen = JSON.stringify(idQuyen);
      await bangRoleGroupRepository.save(exisRoleAdmin);
    } else {
      const dataNhomQuyen = {
        TenNhomQuyen: 'ADMIN',
        NhomQuyen: JSON.stringify(idQuyen),
      };
      const nhomQuyen = await bangRoleGroupRepository.create(dataNhomQuyen);
      await bangRoleGroupRepository.save(nhomQuyen);
    }
  } catch (error) {
    console.error('Lỗi khi seed dữ liệu:', error);
  }
}
async function main() {
  const app = await NestFactory.create(AppModule);

  const connection = app.get(Connection);

  // Chạy lệnh seedData để thêm dữ liệu vào bảng
  await seedData(connection);

  await app.close();
}

main();
