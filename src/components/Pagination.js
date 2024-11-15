import React from 'react';
import './Pagination.css';

const Pagination = ({ totalPages, currentPage, onPageChange }) => (
    <div className="paginationControls">
        {Array.from({ length: totalPages }, (_, index) => (
            <button
                key={index}
                className={`pageButton ${currentPage === index + 1 ? 'active' : ''}`}
                disabled={currentPage === index + 1}
                onClick={() => onPageChange(index + 1)}
            >
                {index + 1}
            </button>
        ))}
    </div>
);

export default Pagination;
