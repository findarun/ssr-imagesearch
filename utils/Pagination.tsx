// pagination.tsx

import React, { useState } from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const [pageInput, setPageInput] = useState('');

  const goToPage = (pageNum) => {
    const pageNumber = Number(pageNum);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
      setPageInput(''); // Clear input after navigating to the page
    }
  };

  return (
    <div className="pagination">
      Page {currentPage} of {totalPages}
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1}>←</button>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages}>→</button>
      <input
        type="number"
        placeholder="Go to page"
        value={pageInput}
        onChange={(e) => setPageInput(e.target.value)}
      />
      <button onClick={() => goToPage(pageInput)}>&gt;</button>
    </div>
  );
}

export default Pagination;
