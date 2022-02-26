import { useState } from 'react';

import { SearchInput } from './search-input';
import { DropDownMenu } from './drop-down-menu';
import Link from 'next/link';

interface Props {
  links: HeaderLink[];
  ddmItems?: DDMItem[];
}
interface HeaderLink {
  label: string;
  pathname: string;
  isSelected?: boolean;
  desc?: string;
  icon?: JSX.Element;
}
interface DDMItem {
  icon?: JSX.Element;
  label: string;
  desc?: string;
  link?: string;
}

export function Header(props: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 border-solid shadow-sm">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <a className="shrink-0">
                  <h1 className="text-xl">Mixologic</h1>
                </a>
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {props.links.map((link) => {
                    return (
                      <Link key={link.label} href={link.pathname}>
                        <a
                          key={link.label}
                          className={`${
                            link.isSelected
                              ? 'text-gray-800 dark:text-white'
                              : 'text-gray-300'
                          } hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
                        >
                          {link.label}
                        </a>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="block">
              <div className="hidden md:block -mr-2 flex">
                <SearchInput
                  label="Search"
                  placeholder="Drinks, ingredients, etc."
                  onSearch={(value) => console.log(value)}
                />
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                {props.ddmItems && (
                  <div className="ml-3 relative">
                    <DropDownMenu
                      icon={
                        <svg
                          width="20"
                          fill="currentColor"
                          height="20"
                          className="text-gray-800"
                          viewBox="0 0 1792 1792"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z" />
                        </svg>
                      }
                      withBackground={false}
                      items={props.ddmItems.map((item) => {
                        return { label: item.label };
                      })}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none`}
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="h-8 w-8"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {props.links.map((link) => {
                return (
                  <Link key={link.label} href={link.pathname}>
                    <a
                      className={`${
                        link.isSelected
                          ? 'text-gray-800 dark:text-white'
                          : 'text-gray-300 hover:text-gray-800 dark:hover:text-white'
                      } block px-3 py-2 rounded-md text-base font-medium`}
                    >
                      {link.label}
                    </a>
                  </Link>
                );
              })}
            </div>
            <div className="p-2 flex">
              <SearchInput
                label="Search"
                placeholder="Search"
                onSearch={(value) => console.log(value)}
              />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
