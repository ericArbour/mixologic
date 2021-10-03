import { AnyAaaaRecord } from 'dns';
import Link from 'next/link';

import { ButtonLink, PlusIcon } from '.';
import { FormSubscribe } from './form-subscribe';

interface HasId {
  id: number;
}

type Props<T> = {
  title: string;
  columns: ColumnConfig<T>[];
  rows: T[];
  createPathname: string;
  editPathname: string;
};

type ColumnConfig<T> = {
  field: string & keyof T;
  displayName: string;
};

export function Table<T extends Record<string, any> & HasId>({
  title,
  columns,
  rows,
  createPathname,
  editPathname,
}: Props<T>) {
  return (
    <>
      <div className="flex flex-row mb-1 sm:mb-0 justify-between items-center w-full">
        <h2 className="text-2xl leading-tight">{title}</h2>
        <div className="text-end">
          <FormSubscribe placeholder="name" label="Filter" />
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
                return (
                  <tr key={row.id}>
                    {columns.map((column) => {
                      return (
                        <td
                          key={column.field}
                          className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                        >
                          <div className="flex items-center">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {row[column.field]}
                            </p>
                          </div>
                        </td>
                      );
                    })}
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <Link href={`${editPathname}/${row.id}`}>
                        <a className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a>
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
