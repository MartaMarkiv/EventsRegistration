import "./styles.scss";

function Pagination({total, current, changePage}) {

  const paginationMarkers = total <= 5 ?
    [...new Array(total)].map((item, index)=> index) :
    [...new Array(3)].map((item, index)=> index);
  if (total > 5) { paginationMarkers.push("...", total - 1); }

  const changeCurrent = (index) => {
    changePage(current + index);
  };

  const goToPage = page => {
    changePage(page);
  };

  return(<div className="pagination-wrapper">
    <button
      onClick={()=>changeCurrent(-1)}
      disabled={current === 0}
    >
      &larr;
    </button>
    <ul>
      {
        paginationMarkers.map(item =>
          <li
            className={item === current ? "marker active-page" : "marker"}
            key={`marker-${item}`}
            onClick={()=>goToPage(item)}
          >
            {item !== "..." ? item + 1 : item}
          </li>
        )
      }
    </ul>
    <button
      onClick={()=>changeCurrent(1)}
      disabled={current === paginationMarkers[paginationMarkers.length - 1]}
    >
      &rarr;
    </button>
  </div>);
}

export default Pagination;