// import { Entity, Column } from 'typeorm';
// import { BaseEntity } from './base';

// @Entity({ schema: 'admin', name: 'resource' })
// export class ResourceEntity extends BaseEntity {
//   @Column({
//     type: 'varchar',
//     nullable: false,
//   })
//   path: string;

//   @Column({
//     type: 'varchar',
//     nullable: false,
//   })
//   name: string;

//   @Column({
//     type: 'varchar',
//     nullable: false,
//   })
//   type: string;

//   @Column({
//     type: 'varchar',
//     nullable: true,
//   })
//   data: string;

//   @Column({
//     type: 'varchar',
//     nullable: true,
//   })
//   description: string;

//   constructor(resource?: Partial<ResourceEntity>) {
//     super();
//     Object.assign(this, resource);
//   }
// }
