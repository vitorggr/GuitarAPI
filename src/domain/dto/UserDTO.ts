import 'reflect-metadata';
import { IsString, Length } from 'class-validator';

export class UserDTO {
  @IsString({ message: 'O nome de usuário deve ser uma string.' })
  @Length(3, 30, { message: 'O nome de usuário deve ter entre 3 e 30 caracteres.' })
  username!: string;

  @IsString({ message: 'A senha deve ser uma string.' })
  @Length(4, 100, { message: 'A senha deve ter no mínimo 4 caracteres.' })
  password!: string;
}

export class UserResponseDTO extends UserDTO {
  readonly _id!: string;
  readonly createdAt!: string;
  readonly modifiedAt?: string | null;
}
