import React from "react";
import useAccueil from "./useAccueil";

export default function Pagination() {
  const { filtre, nbrPages, updatePage } = useAccueil();

  if (nbrPages === 1) return <></>;

  return (
    <nav>
      <ul className="pagination pagination-lg col-12 justify-content-end">
        {[...Array(nbrPages)].map((x, i) => (
          <li
            className={`page-item me-3 ${filtre.page === i ? "active" : ""}`}
            key={i}
          >
            <button className="btn page-link" onClick={() => updatePage(i - 1)}>
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
