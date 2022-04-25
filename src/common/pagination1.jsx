import React from "react";

const Pagination1 = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          {totalItems.map((page) => (
            <li key={page} class="page-item">
              <a class="page-link" href="#">
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
    // <nav>
    //   <ul className="pagination justify-content-center">
    //     {pageNumbers.map((page) => (
    //       <li key={page} className="page-item">
    //         <a onClick={() => paginate(page)} className="page-link" href="#">
    //           {page}
    //         </a>
    //       </li>
    //     ))}
    //   </ul>
    // </nav>
  );
};

export default Pagination1;
