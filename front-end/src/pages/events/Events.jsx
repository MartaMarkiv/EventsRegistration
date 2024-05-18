import { useCallback, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Event from "../../components/event/Event";
import Pagination from "../../components/pagination/Pagination";
import api from "../../api/api";
import "./styles.scss";

function Events() {
  const [eventsList, setEventsList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(false);

  const changeCurrentPage = (page) => setCurrentPage(page);

  const fetchData = useCallback(async () => {
    console.log("currentPage before fetch: ", currentPage);
    await api.get("event", { params: { page: currentPage } })
      .then(resp => {
        const { list, total } = resp.data;
        setEventsList(list);
        setTotalPages(total);
      })
      // eslint-disable-next-line no-unused-vars
      .catch(err => {
        setError(true);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return(<section>
    <Header title="Events" />
    <div className="events-list-wrapper">
      {
        error ? <div>Error</div>:
        eventsList.map(item => <Event
          key={item._id}
          description={item.description}
          title={item.title}
          id={item._id}
        />)
      }
    </div>
    <Pagination current={currentPage} total={totalPages} changePage={changeCurrentPage}/>
  </section>);
}

export default Events;