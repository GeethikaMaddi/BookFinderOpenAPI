

import React, { useEffect, useRef, useState } from 'react';
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import { searchBooks } from './api/openLibrary';
import FavoritesPage from './components/Favorites';
import { motion } from "framer-motion";

export default function App() {
  const [query, setQuery] = useState('harry potter');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [numFound, setNumFound] = useState(0);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [view, setView] = useState('search'); // 'search' or 'favorites'
  const limit = 20;
  const debounceRef = useRef(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const totalPages = numFound ? Math.ceil(numFound / limit) : 1;

  // Fetch books from API
  async function fetchBooks(q, p = 1) {
    if (!q || q.trim() === '') {
      setBooks([]);
      setNumFound(0);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await searchBooks(q, p, limit);
      setBooks(res.docs || []);
      setNumFound(res.numFound || 0);
    } catch (err) {
      setError(err.message || 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  }

  // Debounce query input
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPage(1);
      fetchBooks(query, 1);
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [query]);


  useEffect(() => {
  clearTimeout(debounceRef.current);
  debounceRef.current = setTimeout(() => {
    setPage(1);
    fetchBooks(query, 1);

    // update recent searches
    if (query.trim()) {
      let updated = [query, ...recentSearches.filter((q) => q !== query)];
      if (updated.length > 5) updated = updated.slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
    }
  }, 400);
  return () => clearTimeout(debounceRef.current);
}, [query]);


  // Fetch when page changes
  useEffect(() => {
    fetchBooks(query, page);
  }, [page]);

  // Toggle favorite
  function handleToggleFavorite(book) {
    setFavorites((prev) => {
      if (prev.find((b) => b.key === book.key)) {
        return prev.filter((b) => b.key !== book.key);
      } else {
        return [...prev, book];
      }
    });
  }
function clearHistory() {
  setRecentSearches([]);
  localStorage.removeItem("recentSearches");
}
useEffect(() => {
  if (darkMode) document.body.classList.add("dark");
  else document.body.classList.remove("dark");
}, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white">

 
      {/* Welcome / Header */}
      <header className="py-12 text-center">
  <h1 className="text-5xl font-bold drop-shadow-lg">📚 Book Finder</h1>

  {/* Sliding Text Animation */}
  <motion.p
    className="mt-4 text-lg max-w-2xl mx-auto"
    initial={{ x: "-100%", opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 1, ease: "easeOut" }}
  >
    Welcome to the Book Finder! <br />
    Explore an unlimited variety of books, discover authors, and fuel your love
    for reading.
  </motion.p>
<div className="absolute top-4 right-4">
 Light
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only"
      checked={darkMode}
      onChange={() => setDarkMode(!darkMode)}
    />
    <div className="w-14 h-7 bg-gray-300 dark:bg-gray-700 rounded-full peer-focus:ring-2 peer-focus:ring-indigo-500 transition-colors"></div>
    <div
      className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow transform transition-transform
        ${darkMode ? 'translate-x-7' : 'translate-x-0'}`}
    ></div>
  </label>
  Dark
</div>

</header>


      {/* Navigation Buttons */}
      

      {/* Main Section */}

       <main className="container mx-auto mt-6 flex-1   bg-white/70 dark:bg-gray-900/70 backdrop-blur-md  text-black dark:text-white rounded-2xl p-6"> 

        <button
          className={`px-4 py-2 rounded ${view === 'favorites' ? 'bg-indigo-500 text-white' : 'bg-white text-black'}`}
          onClick={() => setView('favorites')}
        >
          Favorites ❤️ ({favorites.length})
        </button>
      
        {view === 'search' && (
          <>
            {/* Search Bar */}
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search by title, author, or keywords..."
            />
           {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold">Recent Searches:</h2>
                  <button
                    className="text-red-500 hover:text-red-700 text-sm"
                    onClick={clearHistory}
                  >
                    Clear History ✖
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {recentSearches.map((term, index) => (
                    <button
                      key={index}
                      className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition"
                      onClick={() => setQuery(term)}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            <section className="mt-6">
              {error && <div>Error: {error}</div>}

              <div className="flex items-center justify-between text-sm text-black">
                <div>{numFound ? `${numFound.toLocaleString()} results` : 'No results yet'}</div>
                <div>Page {page} / {totalPages || 1}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {loading
                  ? Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="animate-pulse p-4 bg-white bg-opacity-20 rounded shadow">
                        <div className="h-48 bg-white bg-opacity-30 mb-2 rounded" />
                        <div className="h-4 bg-white bg-opacity-30 rounded w-3/4 mb-2" />
                        <div className="h-3 bg-white bg-opacity-30 rounded w-1/2" />
                      </div>
                    ))
                  : books.length === 0
                  ? <div className="col-span-full text-gray-800 mt-6">No books found.</div>
                  : books.map((book) => (
                      <BookCard
                        key={book.key + (book.cover_i || '')}
                        book={book}
                        onToggleFavorite={handleToggleFavorite}
                        isFavorite={favorites.some((b) => b.key === book.key)}
                      />
                    ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <button
                  className="px-4 py-2 rounded bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30 border border-white text-black disabled:opacity-50"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </button>

                <div className="flex items-center justify-between text-sm text-black">
                  Showing {Math.min(limit, books.length)} of {numFound.toLocaleString()}
                </div>

                <button
                  className="px-4 py-2 rounded bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30 border border-white text-black disabled:opacity-50"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                >
                  Next
                </button>
              </div>
            </section>
          </>
        )}

          {view === 'favorites' && (
    <FavoritesPage 
      favorites={favorites} 
      onToggleFavorite={handleToggleFavorite} 
      goBack={() => setView('search')} 
    />
  )}
      </main>


      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-800 dark:text-gray-200" >
        Data from{" "}
        <a className="underline" href="https://openlibrary.org" target="_blank" rel="noreferrer">
          Open Library
        </a>
      </footer>
    </div>
  );
}
