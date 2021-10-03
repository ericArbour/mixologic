import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export async function fetchDtos<T extends Record<string, unknown>>(
  path: string,
  dtoClass: ClassConstructor<T>
) {
  const response = await fetch(path);
  const json = await response.json();
  if (!response.ok) throw new Error(json.error);

  const dtos = plainToClass(dtoClass, json as unknown[]);
  for (const dto of dtos) {
    await validateOrReject(dto);
  }
  return dtos;
}

export async function serializeForDehydration<T>(
  fetchDtos: () => Promise<T[]>
) {
  const dtos = await fetchDtos();
  return JSON.parse(JSON.stringify(dtos));
}
