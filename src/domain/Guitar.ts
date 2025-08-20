// Entidade Guitar com campos diversificados
export interface Guitar {
  id: string;
  model: string;
  brandId: string;
  year: number;
  strings: number;
  notes?: string;
}
