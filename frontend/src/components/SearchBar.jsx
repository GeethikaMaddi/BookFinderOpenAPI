
import React from 'react';

export default function SearchBar({ value, onChange, placeholder = 'Search...', onSearch }) {
  return (
    <div className="relative flex items-center w-full max-w-xl gap-2 mx-auto">

      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
          />
        </svg>
      </div>

      {/* Input */}
      <input
        aria-label="Search books"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 pl-10 p-3 rounded border bg-white shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Search Button */}
      <button
        className="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600 transition"
        onClick={() => onSearch && onSearch(value)}
      >
        Search
      </button>

      {/* Clear Button */}
      <button
        className="px-4 py-2 rounded bg-white border text-black hover:bg-gray-100 transition"
        onClick={() => onChange('')}
      >
        Clear
      </button>
 
    </div>
  );
}
