// import React from 'react'

// export default function BookCard({ book }) {
//   const title = book.title || 'Unknown Title'
//   const author = (book.author_name && book.author_name.join(', ')) || 'Unknown author'
//   const year = book.first_publish_year
//   const cover = book.cover_i
//     ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
//     : (book.edition_key && book.edition_key.length ? `https://covers.openlibrary.org/b/olid/${book.edition_key[0]}-M.jpg` : null)
//   const olLink = book.key ? `https://openlibrary.org${book.key}` : (book.edition_key && book.edition_key.length ? `https://openlibrary.org/books/${book.edition_key[0]}` : '#')

//   return (
//     <article className="p-4 bg-[#e6b3e5] rounded shadow hover:shadow-lg transition-shadow">
//       <a href={olLink} target="_blank" rel="noreferrer" className="block mb-3">
//         {cover ? (
//           <img src={cover} alt={title} className="w-full h-48 object-contain mx-auto" />
//         ) : (
//           <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">No cover</div>
//         )}
//       </a>
//       <h3 className="font-semibold text-sm">{title}</h3>
//       <p className="text-xs text-gray-600">{author}</p>
//       <div className="mt-auto pt-3 flex items-center justify-between">
//         <div className="text-xs text-gray-500">{year || '—'}</div>
//         <a href={olLink} target="_blank" rel="noreferrer" className="text-xs underline">Open</a>
//       </div>
//     </article>
//   )
// }
import React from 'react';

export default function BookCard({ book, onToggleFavorite, isFavorite }) {
  const title = book.title || 'Unknown Title';
  const author = (book.author_name && book.author_name.join(', ')) || 'Unknown author';
  const year = book.first_publish_year;
  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : (book.edition_key && book.edition_key.length ? `https://covers.openlibrary.org/b/olid/${book.edition_key[0]}-M.jpg` : null);
  const olLink = book.key
    ? `https://openlibrary.org${book.key}`
    : (book.edition_key && book.edition_key.length ? `https://openlibrary.org/books/${book.edition_key[0]}` : '#');

  return (
    <article className="relative p-4 bg-[#e6b3e5] rounded shadow hover:shadow-lg transition-shadow flex flex-col">
      
      {/* Favorite Heart */}
      <button
        onClick={() => onToggleFavorite && onToggleFavorite(book)}
        className="absolute top-2 right-2 text-2xl focus:outline-none"
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>

      <a href={olLink} target="_blank" rel="noreferrer" className="block mb-3">
        {cover ? (
          <img src={cover} alt={title} className="w-full h-48 object-contain mx-auto" />
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
            No cover
          </div>
        )}
      </a>

      <h3 className="font-semibold text-sm text-black">{title}</h3>
      <p className="text-xs text-gray-600">{author}</p>

      <div className="mt-auto pt-3 flex items-center justify-between">
        <div className="text-xs text-gray-500">{year || '—'}</div>
        <a href={olLink} target="_blank" rel="noreferrer" className="text-xs underline">
          Open
        </a>
      </div>
    </article>
  );
}
