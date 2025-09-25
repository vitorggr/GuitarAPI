
import 'reflect-metadata';
import { IsString, Length, IsOptional, IsBoolean, IsDateString } from 'class-validator';

// DTO para Marca (Brand) com validações em português
export class BrandDTO {
  /** Nome da marca */
  @IsString({ message: 'O nome deve ser uma string.' })
  @Length(2, 50, { message: 'O nome deve ter entre 2 e 50 caracteres.' })
  name!: string;

  /** País de origem */
  @IsString({ message: 'O país deve ser uma string.' })
  @Length(2, 50, { message: 'O país deve ter entre 2 e 50 caracteres.' })
  country!: string;

  /** Ano de fundação */
  @IsString({ message: 'O ano de fundação deve ser uma string (ex: 1946).' })
  @Length(4, 4, { message: 'O ano de fundação deve ter 4 dígitos.' })
  foundedYear!: string;

  /** Marca ativa? */
  @IsBoolean({ message: 'O campo ativo deve ser booleano.' })
  isActive!: boolean;
}

export class BrandResponseDTO extends BrandDTO {
  readonly _id!: string;
  readonly createdAt!: string;
  readonly modifiedAt?: string | null;
}
