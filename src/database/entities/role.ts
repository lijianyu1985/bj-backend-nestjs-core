// import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
// import { BaseEntity } from './base';
// import { ResourceEntity } from './resource';

// @Entity({ schema: 'admin', name: 'role' })
// export class RoleEntity extends BaseEntity {
//   @Column({
//     type: 'varchar',
//     nullable: false,
//   })
//   name: string;

//   @Column({
//     type: 'varchar',
//     nullable: true,
//   })
//   description: string;

//   @ManyToMany((type) => ResourceEntity, (resource) => resource.id, {
//     lazy: true,
//     cascade: true,
//   })
//   @JoinTable({
//     schema: 'admin',
//     name: 'roles_resources',
//     joinColumn: {
//       name: 'role_id',
//       referencedColumnName: 'id',
//     },
//     inverseJoinColumn: {
//       name: 'resource_id',
//       referencedColumnName: 'id',
//     },
//   })
//   resources: Promise<ResourceEntity[]>;

//   constructor(role?: Partial<RoleEntity>) {
//     super();
//     Object.assign(this, role);
//   }
// }
