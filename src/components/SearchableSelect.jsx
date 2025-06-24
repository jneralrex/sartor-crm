import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, SearchIcon } from 'lucide-react';

const SearchableSelect = ({ options, placeholder = 'Select Employee here', onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef();

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (option) => {
    setSelected(option);
    setQuery('');
    setIsOpen(false);
    onChange && onChange(option);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex justify-between items-center text-[#484848] text-sm font-medium h-12 px-4 rounded-md focus:outline-none"
      >
        {selected || placeholder}
        <ChevronDown size={18} />
      </button>

      {isOpen && (
        <div className="absolute w-full mt-2 bg-white shadow-lg p-5 rounded-md">
          <div className='flex items-center bg-primary_grey w-full p-2 rounded-md'>
             <SearchIcon/>
          <input
            type="text"
            placeholder="Search Employee Name or email address"
            className="w-full p-3 text-sm outline-none focus:outline-none bg-transparent"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          </div>
         
          <ul className="max-h-60 overflow-y-auto mt-5">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer rounded-md"
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm text-gray-400">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
