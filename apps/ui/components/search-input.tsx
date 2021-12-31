import { TextInput } from './text-input';

interface SearchInputProps {
  label: string;
  placeholder: string;
  onSearch: (value: string) => void;
}

export function SearchInput({
  label,
  placeholder,
  onSearch,
}: SearchInputProps) {
  return (
    <form
      className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0 justify-center"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchValue = formData.get('search-input');

        if (typeof searchValue === 'string') onSearch(searchValue);
      }}
    >
      <TextInput placeholder={placeholder} name="search-input" />
      <button
        className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
        type="submit"
      >
        {label}
      </button>
    </form>
  );
}
