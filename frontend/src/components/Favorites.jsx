import React from 'react';
import BookCard from './BookCard';

export default function FavoritesPage({ favorites, onToggleFavorite, goBack }) {
  return (
    <section>
     
      <h2 className="text-2xl font-bold mb-4">Your Favorites ❤️</h2>
     
      {favorites.length === 0 ? (
        <p>No favorites yet. Click the heart on a book to add it!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((book) => (
            <BookCard
              key={book.key + (book.cover_i || '')}
              book={book}
              onToggleFavorite={onToggleFavorite}
              isFavorite={true}
            />
          ))}
        </div>
      )}

           {/* Back Button */}
      <button
        onClick={goBack}
        className="mb-4 px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600"
      >
        ← Back to Search
      </button>
    </section>
  );
}
