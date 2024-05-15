import { Link } from "react-router-dom";
import "./styles.scss";

function Event({title, description, id}) {
  return(<div className="event">
    <div className="title">{title}</div>
    <div>{description}</div>
    <div className="actions-wrapper">
      <Link className="link" to={`register:${id}`}>Register</Link>
      <Link className="link" to={`event:${id}`}>View</Link>
    </div>
  </div>);
}

export default Event;