// import { Entity, Column } from 'typeorm';
// import { BaseEntity } from './base';

// @Entity({ schema: 'admin', name: 'client' })
// export class ClientEntity extends BaseEntity {
//   @Column({
//     type: 'varchar',
//     nullable: true,
//   })
//   wxOpenId: string;
//   @Column({
//     type: 'varchar',
//     nullable: true,
//   })
//   wxNickName: string;
//   @Column({
//     type: 'varchar',
//     nullable: true,
//   })
//   wxAvatarUrl: string;
//   @Column({
//     type: 'varchar',
//     nullable: true,
//   })
//   wxSessionKey: string;
//   @Column({
//     type: 'varchar',
//     nullable: true,
//   })
//   qqUsername: string;
//   @Column({
//     type: 'varchar',
//     nullable: true,
//   })
//   qqToken: string;
//   @Column({
//     type: 'varchar',
//     nullable: true,
//   })
//   aliUsername: string;
//   @Column({
//     type: 'varchar',
//     nullable: true,
//   })
//   aliToken: string;
//   @Column({
//     type: 'varchar',
//     nullable: true,
//   })
//   name: string;

//   constructor(client?: Partial<ClientEntity>) {
//     super();
//     Object.assign(this, client);
//   }
// }
