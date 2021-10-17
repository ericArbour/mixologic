import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { BaseResponseDto } from '@mixologic/common';

export async function fetchDtos<T extends BaseResponseDto>(
  dtoClass: ClassConstructor<T>,
  path: string
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

export async function fetchDto<T extends BaseResponseDto>(
  dtoClass: ClassConstructor<T>,
  path: string
) {
  const response = await fetch(path);
  const json = await response.json();
  if (!response.ok) throw new Error(json.error);

  const glassDto = plainToClass(dtoClass, json);
  await validateOrReject(glassDto);
  return glassDto;
}

export async function serializeForDehydration<T>(fetchFn: () => Promise<T>) {
  return JSON.parse(JSON.stringify(await fetchFn()));
}
