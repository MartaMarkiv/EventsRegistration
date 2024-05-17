import "./styles.scss";

function ParticipantItem({ fullName, email }) {
  return (<div className="participant-item">
    <div className="name">{fullName}</div>
    <div className="email">{email}</div>
  </div>);
}

export default ParticipantItem;