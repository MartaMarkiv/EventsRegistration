import { Link } from "react-router-dom";
import "./styles.scss";
import { REGISTRATION_ROUTE, PARTICIPANTS_ROUTE } from "../../routes/routes";

function Event({title, description, id, organizer, date}) {
  return(<div className="event">
    <div>
      <div className="title">{title}</div>
      <div className="organizer">
        <span>Organizer:</span>
        <span>{organizer}</span>
      </div>
      <div>{description}</div>
      <div className="date"><span>When: </span><span>{date}</span></div>
    </div>
    <div className="actions-wrapper">
      <Link className="link" to={`${REGISTRATION_ROUTE}/${id}`}>Register</Link>
      <Link className="link" to={`${PARTICIPANTS_ROUTE}/${id}`} state={{ title }} >
        View
      </Link>
    </div>
  </div>);
}

export default Event;