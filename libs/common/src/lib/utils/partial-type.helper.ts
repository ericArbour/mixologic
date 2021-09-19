/* eslint @typescript-eslint/triple-slash-reference: 0 */
/// <reference path="./class-transformer-storage.d.ts"/>

/* eslint @typescript-eslint/ban-types: 0 */
/* eslint no-empty: 0 */

import * as classValidator from 'class-validator';
import { defaultMetadataStorage } from 'class-transformer/cjs/storage';
import 'reflect-metadata';

export function applyIsOptionalDecorator(
  targetClass: Function,
  propertyKey: string
) {
  const decoratorFactory = classValidator.IsOptional();
  decoratorFactory(targetClass.prototype, propertyKey);
}

export function inheritValidationMetadata(
  parentClass: Type<any>,
  targetClass: Function,
  isPropertyInherited?: (key: string) => boolean
) {
  try {
    const metadataStorage: import('class-validator').MetadataStorage = (
      classValidator as any
    ).getMetadataStorage
      ? (classValidator as any).getMetadataStorage()
      : classValidator.getFromContainer(classValidator.MetadataStorage);

    const getTargetValidationMetadatasArgs = [parentClass, null!, false, false];
    const targetMetadata: ReturnType<
      typeof metadataStorage.getTargetValidationMetadatas
    > = (metadataStorage.getTargetValidationMetadatas as Function)(
      ...getTargetValidationMetadatasArgs
    );
    return targetMetadata
      .filter(
        ({ propertyName }) =>
          !isPropertyInherited || isPropertyInherited(propertyName)
      )
      .map((value) => {
        const originalType = Reflect.getMetadata(
          'design:type',
          parentClass.prototype,
          value.propertyName
        );
        if (originalType) {
          Reflect.defineMetadata(
            'design:type',
            originalType,
            targetClass.prototype,
            value.propertyName
          );
        }

        metadataStorage.addValidationMetadata({
          ...value,
          target: targetClass,
        });
        return value.propertyName;
      });
  } catch (err) {
    console.error(
      `Validation ("class-validator") metadata cannot be inherited for "${parentClass.name}" class.`
    );
    console.error(err);
  }
}

type TransformMetadataKey =
  | '_excludeMetadatas'
  | '_exposeMetadatas'
  | '_typeMetadatas'
  | '_transformMetadatas';

export function inheritTransformationMetadata(
  parentClass: Type<any>,
  targetClass: Function,
  isPropertyInherited?: (key: string) => boolean
) {
  try {
    const transformMetadataKeys: TransformMetadataKey[] = [
      '_excludeMetadatas',
      '_exposeMetadatas',
      '_transformMetadatas',
      '_typeMetadatas',
    ];
    transformMetadataKeys.forEach((key) =>
      inheritTransformerMetadata(
        key,
        parentClass,
        targetClass,
        isPropertyInherited
      )
    );
  } catch (err) {
    console.error(
      `Transformer ("class-transformer") metadata cannot be inherited for "${parentClass.name}" class.`
    );
    console.error(err);
  }
}

function inheritTransformerMetadata(
  key: TransformMetadataKey,
  parentClass: Type<any>,
  targetClass: Function,
  isPropertyInherited?: (key: string) => boolean
) {
  const metadataStorage /*: typeof import('class-transformer/types/storage').defaultMetadataStorage */ =
    defaultMetadataStorage;

  while (parentClass && parentClass !== Object) {
    if (metadataStorage[key].has(parentClass)) {
      const metadataMap = metadataStorage[key] as Map<
        Function,
        Map<string, any>
      >;
      const parentMetadata = metadataMap.get(parentClass);

      const targetMetadataEntries: Iterable<[string, any]> = Array.from(
        parentMetadata!.entries()
      )
        .filter(([key]) => !isPropertyInherited || isPropertyInherited(key))
        .map(([key, metadata]) => {
          if (Array.isArray(metadata)) {
            // "_transformMetadatas" is an array of elements
            const targetMetadata = metadata.map((item) => ({
              ...item,
              target: targetClass,
            }));
            return [key, targetMetadata];
          }
          return [key, { ...metadata, target: targetClass }];
        });

      if (metadataMap.has(targetClass)) {
        const existingRules = metadataMap.get(targetClass)!.entries();
        metadataMap.set(
          targetClass,
          new Map([...existingRules, ...targetMetadataEntries])
        );
      } else {
        metadataMap.set(targetClass, new Map(targetMetadataEntries));
      }
    }
    parentClass = Object.getPrototypeOf(parentClass);
  }
}

export function inheritPropertyInitializers(
  target: Record<string, any>,
  sourceClass: Type<any>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isPropertyInherited = (key: string) => true
) {
  try {
    const tempInstance = new sourceClass();
    const propertyNames = Object.getOwnPropertyNames(tempInstance);

    propertyNames
      .filter(
        (propertyName) =>
          typeof tempInstance[propertyName] !== 'undefined' &&
          typeof target[propertyName] === 'undefined'
      )
      .filter((propertyName) => isPropertyInherited(propertyName))
      .forEach((propertyName) => {
        target[propertyName] = tempInstance[propertyName];
      });
  } catch {}
}

interface Type<T = unknown> extends Function {
  new (...args: unknown[]): T;
}

interface MappedType<T> extends Type<T> {
  new (): T;
}

export function PartialType<T>(classRef: Type<T>): MappedType<Partial<T>> {
  abstract class PartialClassType {
    constructor() {
      inheritPropertyInitializers(this, classRef);
    }
  }

  const propertyKeys = inheritValidationMetadata(classRef, PartialClassType);
  inheritTransformationMetadata(classRef, PartialClassType);

  if (propertyKeys) {
    propertyKeys.forEach((key) => {
      applyIsOptionalDecorator(PartialClassType, key);
    });
  }

  Object.defineProperty(PartialClassType, 'name', {
    value: `Partial${classRef.name}`,
  });
  return PartialClassType as MappedType<Partial<T>>;
}