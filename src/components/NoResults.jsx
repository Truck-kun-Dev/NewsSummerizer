import React from 'react';
import '../styles/NoResults.css';

export default function NoResults({ query }) {
  return (
    <div className="no-results">
      <h3>No articles found for <span className="query">{query || 'your search'}</span>.</h3>
      <p>Try changing the keyword or check your spelling.</p>
    </div>
  );
}
