import { useState } from 'react';
import searchIcon from '../assets/images/search.png'; 
import instance from '../utils/axiosInstance';


const UniversalSearch = ({
  collection,
  onResults,
  placeholder = "Search...",
  auto = true,
  className = '',
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (query) => {
    if (!query.trim()) {
      if (auto) onResults([]); // return empty if auto=true
      return;
    }

    try {
      const res = await instance.post('/search', {
        collection,
        keyword: query,
      });
      const results = res.data?.data || [];
      onResults(results);
    } catch (error) {
      console.error(`Search error in ${collection}:`, error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (auto) handleSearch(value);
  };

  const handleManualSearch = () => {
    if (!auto) handleSearch(searchTerm);
  };

  return (
    <div className={`flex items-center gap-2 border-primary_grey px-3 py-2 bg-primary_white rounded-md w-full max-w-[300px] ${className}`}>
      <img src={searchIcon} alt="search" className="w-4 h-4" />
      <input
        type="text"
        placeholder={placeholder}
        className="bg-transparent rounded text-sm outline-none w-full"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !auto) handleManualSearch();
        }}
      />
      {!auto && (
        <button onClick={handleManualSearch} className="text-sm text-primary_blue">Search</button>
      )}
    </div>
  );
};

export default UniversalSearch;
