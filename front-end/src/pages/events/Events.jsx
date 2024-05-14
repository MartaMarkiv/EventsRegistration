import { useCallback, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import api from "../../api";

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

  return(<>
    <Header title="Events" />
    <div>
      {
        error ? <div>Error</div>:
        eventsList.map(item => <div key={item._id}>{item.title}</div>)
      }
    </div>
  </>);
}

export default Events;