import React, { useState } from 'react';

const SearchableSelect = ({ options, placeholder = 'Select an option', onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (option) => {
    setSelected(option);
    onChange && onChange(option);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="relative w-full max-w-xs"
     onClick={(e) => e.stopPropagation()}>
      {/* Selected button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border border-gray-300 bg-white rounded-md px-4 py-2 text-left text-sm text-gray-800 shadow-sm focus:outline-none"
      >
        {selected || placeholder}
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {/* Search Input */}
          <input
            type="text"
            className="w-full px-3 py-2 text-sm border-b border-gray-200 focus:outline-none"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* Options */}
          <ul className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, idx) => (
                <li
                  key={idx}
                //   onClick={() => handleSelect(option)}
                  onClick={(e) => {
          e.preventDefault();
          handleSelect(option);
        }} 
                  className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm text-gray-500">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
