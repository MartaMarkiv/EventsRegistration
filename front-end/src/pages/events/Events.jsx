/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Event from "../../components/event/Event";
import Pagination from "../../components/pagination/Pagination";
import SortForm from "../../components/sortForm/SortForm";
import api from "../../api/api";
import "./styles.scss";

function Events() {
  const [eventsList, setEventsList] = useState([]);
  const [error, setError] = useState(false);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [sortingOrder, setSortingOrder] = useState(1);
  const [sortingParam, setSortingParam] = useState("title");

  const changeCurrentPage = (page) => setCurrentPage(page);

  const changeSortingOrder = (index) => {
    setSortingOrder(index);
  };

  const changeSortingParametr = (event) => {
    setSortingParam(event.target.value);
  };

  const fetchData = useCallback(async () => {
    await api.get("event", {
      params: {
        page: currentPage,
        sort: {
          sortKey: sortingParam,
          sortValue: sortingOrder
        }
      }})
      .then(resp => {
        const { list, total } = resp.data;
        setEventsList(list);
        setTotalPages(total);
      })
      // eslint-disable-next-line no-unused-vars
      .catch(err => {
        setError(true);
      });
  }, [currentPage, sortingParam, sortingOrder]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return(<section>
    <Header title="Events" />
    { error ? <div>Error</div>:
      <>
        <SortForm
        changeOrder={changeSortingOrder}
        changeSorting={changeSortingParametr}
        sortValue={sortingParam}
      />
      <div className="events-list-wrapper">
        {
          eventsList.map(item => <Event
            key={item._id}
            description={item.description}
            title={item.title}
            id={item._id}
            organizer={item.organizer}
          />)
        }
      </div>
      <Pagination current={currentPage} total={totalPages} changePage={changeCurrentPage}/></>
    }
    
  </section>);
}

export default Events;