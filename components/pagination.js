import React from 'react';
import Link from 'next/link';

const Pagination = ({ nextPage, prevPage }) => {
  return (
    <div className="flex justify-between border-t border-gray-300 pt-6 mt-12">
      <div>
        {
          prevPage &&
          <Link href={prevPage !== 1 ? '/page/[pagenum]' : '/'} as={prevPage !== 1 ? `/page/${prevPage}` : '/'}>
            <a className="text-gray-900 font-medium hover:text-gray-700">&larr; Newer Posts</a>
          </Link>
        }
      </div>
      <div>
        {
          nextPage &&
          <Link href="/page/[pagenum]" as={`/page/${nextPage}`}>
            <a className="text-gray-900 font-medium hover:text-gray-700">Older Posts &rarr;</a>
          </Link>
        }
      </div>
    </div>
  );
};

export default Pagination;
