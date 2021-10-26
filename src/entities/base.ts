// import {
//   CreateDateColumn,
//   UpdateDateColumn,
//   PrimaryGeneratedColumn,
//   Column,
// } from 'typeorm';

// export abstract class BaseEntity {
//   @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
//   id: number;

//   @CreateDateColumn({
//     name: 'created_at',
//     type: 'timestamp with time zone',
//     default: 'now()',
//     update: false,
//     nullable: false,
//   })
//   createdAt: Date;

//   @UpdateDateColumn({
//     name: 'updated_at',
//     type: 'timestamp with time zone',
//     default: 'now()',
//     onUpdate: 'now()',
//     nullable: false,
//   })
//   updatedAt: Date;

//   @Column({
//     type: 'boolean',
//     nullable: false,
//     default: false,
//   })
//   archived: boolean;
// }
