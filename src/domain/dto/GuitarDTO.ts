
import 'reflect-metadata';
import { IsString, Length, Matches, IsNumber, Min, Max, IsBoolean, IsOptional } from 'class-validator';

// DTO para Guitarra com validações em português
export class GuitarDTO {
  /** Modelo da guitarra */
  @IsString({ message: 'O modelo deve ser uma string.' })
  @Length(2, 50, { message: 'O modelo deve ter entre 2 e 50 caracteres.' })
  model!: string;

  /** Identificador da marca */
  @IsString({ message: 'O brandId deve ser uma string.' })
  @Matches(/^[a-fA-F0-9]{24}$/, { message: 'O brandId deve ser um ObjectId válido.' })
  brandId!: string;

  //

  /** Ano de fabricação */
  @IsNumber({}, { message: 'O ano de fabricação deve ser um número.' })
  @Min(1900, { message: 'O ano de fabricação não pode ser menor que 1900.' })
  @Max(new Date().getFullYear(), { message: `O ano de fabricação não pode ser maior que o ano atual.` })
  year!: number;

  /** Número de cordas */
  @IsNumber({}, { message: 'O número de cordas deve ser um número.' })
  @Min(4, { message: 'O número de cordas deve ser no mínimo 4.' })
  @Max(12, { message: 'O número de cordas deve ser no máximo 12.' })
  strings!: number;

  // ...

  /** Observações */
  @IsOptional()
  @IsString({ message: 'As observações devem ser uma string.' })
  @Length(0, 200, { message: 'As observações podem ter até 200 caracteres.' })
  notes?: string;
}

export class GuitarResponseDTO extends GuitarDTO {
  readonly _id!: string;
  readonly createdAt!: string;
  readonly modifiedAt?: string | null;
}
