// import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
// import { BaseEntity } from './base';
// import { RoleEntity } from './role';

// @Entity({ schema: 'admin', name: 'account' })
// export class AccountEntity extends BaseEntity {
//   @Column({
//     type: 'varchar',
//     nullable: false,
//     unique: true,
//     length: 60,
//   })
//   username: string;

//   @Column({
//     type: 'varchar',
//     nullable: false,
//   })
//   hashedPassword: string;

//   @Column({
//     type: 'varchar',
//     nullable: true,
//   })
//   name: boolean;

//   @Column({
//     type: 'varchar',
//     nullable: true,
//   })
//   phone: boolean;

//   @Column({
//     type: 'integer',
//     nullable: false,
//     default: 0,
//   })
//   fingerPrint: number;

//   @ManyToMany(() => RoleEntity, (role) => role.id, {
//     lazy: true,
//     cascade: true,
//   })
//   @JoinTable({
//     name: 'users_roles',
//     joinColumn: {
//       name: 'user_id',
//       referencedColumnName: 'id',
//     },
//     inverseJoinColumn: {
//       name: 'role_id',
//       referencedColumnName: 'id',
//     },
//   })
//   roles: Promise<RoleEntity[]>;

//   constructor(account?: Partial<AccountEntity>) {
//     super();
//     Object.assign(this, account);
//   }
// }
