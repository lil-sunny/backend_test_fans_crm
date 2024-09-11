import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
  })
  id: number
  
  @Column({
    type: DataType.STRING(255),
    unique: true,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(255),
    unique: true,
    allowNull: false,
  })
  last_name: string;

  @Column({
    type: DataType.STRING(255),
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password: string;
}
