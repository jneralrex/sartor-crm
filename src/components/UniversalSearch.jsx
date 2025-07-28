import { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      if (auto) onResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await instance.post('/search', {
        collection,
        searchvalue: query,
      });

      const results = res.data?.data || [];
      onResults(results);
    } catch (err) {
      console.error(`Search error in ${collection}:`, err);
      setError('An error occurred while searching.');
    } finally {
      setLoading(false);
    }
  };

  // Debounced search for auto mode
  useEffect(() => {
    if (!auto) return;

    const timeout = setTimeout(() => {
      handleSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleManualSearch = () => {
    if (!auto) handleSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onResults([]);
  };

  return (
    <div className={`flex items-center gap-2 border border-primary_grey px-3 py-2 bg-primary_white rounded-md w-full max-w-[300px] ${className}`}>
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

      {searchTerm && (
        <button
          onClick={handleClear}
          className="text-xs text-gray-400 hover:text-black"
          title="Clear"
        >
          ×
        </button>
      )}

      {!auto && (
        <button
          onClick={handleManualSearch}
          className="text-sm text-primary_blue"
        >
          Search
        </button>
      )}

      {loading && <span className="text-xs text-gray-500">Searching...</span>}
      {error && <span className="text-xs text-red-500 ml-2">{error}</span>}
    </div>
  );
};

export default UniversalSearch;
