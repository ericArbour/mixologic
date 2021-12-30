import Link from 'next/link';

import { BaseResponseDto } from '@mixologic/common';

import { ButtonLink, PlusIcon, TextLink } from '.';
import { SearchInput } from './search-input';
import { convertUTCDateToLocalDate } from '../utils';
import { useState } from 'react';

type Props<T> = {
  title: string;
  columns: ColumnConfig<T>[];
  rows: T[];
  createPathname: string;
  editPathname: string;
  filterPlaceholder?: string;
};

type ColumnConfig<T> = {
  field: string & keyof T;
  displayName: string;
  valueFormatter?: (row: T) => string | JSX.Element;
};

function formatText<T>(val: T, field: string): T | string {
  if (
    typeof val === 'string' &&
    (field === 'createdDate' || field === 'updatedDate')
  )
    return convertUTCDateToLocalDate(val);

  return val;
}

export function Table<T extends BaseResponseDto>({
  title,
  columns,
  rows,
  createPathname,
  editPathname,
  filterPlaceholder,
}: Props<T>) {
  const [filterValue, setFilterValue] = useState('');

  return (
    <>
      <div className="flex flex-row mb-1 sm:mb-0 justify-between items-center w-full">
        <h2 className="text-2xl leading-tight">{title}</h2>
        <div className="text-end">
          <SearchInput
            placeholder={filterPlaceholder ?? 'name'}
            label="Filter"
            onSearch={(value) => setFilterValue(value)}
          />
        </div>
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                {columns.map((column) => {
                  return (
                    <th
                      scope="col"
                      key={column.field}
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      {column.displayName}
                    </th>
                  );
                })}
                <th
                  scope="col"
                  className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const columnsWithValues = columns.map((column) => {
                  const value = column.valueFormatter
                    ? column.valueFormatter(row)
                    : row[column.field];
                  return { ...column, value: formatText(value, column.field) };
                });

                const showRow =
                  !filterValue ||
                  columnsWithValues.find((column) => {
                    return (
                      typeof column.value === 'string' &&
                      column.value
                        .toLowerCase()
                        .includes(filterValue.toLowerCase())
                    );
                  });

                if (!showRow) return null;

                return (
                  <tr key={row.id}>
                    {columnsWithValues.map((column) => {
                      return (
                        <td
                          key={column.field}
                          className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                        >
                          <div className="flex items-center">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {column.value}
                            </p>
                          </div>
                        </td>
                      );
                    })}
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <Link href={`${editPathname}/${row.id}`} passHref>
                        <TextLink>Edit</TextLink>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Link href={createPathname} passHref>
          <ButtonLink
            label="Create"
            icon={<PlusIcon className="mr-1" />}
            color="green"
          />
        </Link>
      </div>
    </>
  );
}
