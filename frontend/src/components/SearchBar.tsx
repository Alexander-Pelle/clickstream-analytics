import React from 'react'

const SearchBar = ({ search, setSearch, handleSearchSubmit }: { search: string, setSearch: (search: string) => void, handleSearchSubmit: (e: React.FormEvent) => void }) => {
  return (
    <div className="mb-8">
        <form onSubmit={handleSearchSubmit} className="relative">
        <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for products..."
            className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm"
        />
        <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
        </svg>
        <button
            type="submit"
            className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
            Search
        </button>
        </form>
    </div>
  )
}

export default SearchBar
