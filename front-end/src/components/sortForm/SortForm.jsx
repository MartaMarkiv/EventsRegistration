import "./styles.scss";

function SortForm({changeSorting, changeOrder, sortValue, orderValue}) {
  return(<div className="sorting-form">
    <div className="divider">
      <span>Sort by: </span>
      <span>
        <select name="sorting" onChange={changeSorting} value={sortValue}>
          <option value="title">Title</option>
          <option value="date">Event date</option>
          <option value="organizer">Organizer</option>
        </select>
      </span>
    </div>
    <div className="divider">
      <span>Order: </span>
      <button
        className={orderValue === -1 ? "active" : ""}
        onClick={() => changeOrder(-1)}
      >
        &#8593;
      </button>
      <button
        className={orderValue === 1 ? "active" : ""}
        onClick={() => changeOrder(1)}
      >
        &#8595;
      </button>
    </div>
  </div>);
}

export default SortForm;