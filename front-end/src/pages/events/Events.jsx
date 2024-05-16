import { useCallback, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Event from "../../components/event/Event";
import api from "../../api/api";
import "./styles.scss";

function Events() {
  const [eventsList, setEventsList] = useState([]);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    await api.get("event")
      .then(resp => {
        const data = resp.data["list"];
        setEventsList(data);
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
  </section>);
}

export default Events;