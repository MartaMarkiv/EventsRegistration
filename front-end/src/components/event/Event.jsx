import { Link } from "react-router-dom";
import "./styles.scss";
import { REGISTRATION_ROUTE, PARTICIPANTS_ROUTE } from "../../routes/routes";

function Event({title, description, id}) {
  return(<div className="event">
    <div className="title">{title}</div>
    <div>{description}</div>
    <div className="actions-wrapper">
      <Link className="link" to={`${REGISTRATION_ROUTE}/${id}`}>Register</Link>
      <Link className="link" to={`${PARTICIPANTS_ROUTE}/${id}`}>View</Link>
    </div>
  </div>);
}

export default Event;