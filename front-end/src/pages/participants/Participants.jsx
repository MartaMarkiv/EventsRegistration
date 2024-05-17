import { useLoaderData, useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import ParticipantItem from "../../components/participantItem/ParticipantItem";
import "./styles.scss";

function Participants() {
  const participantsList = useLoaderData();
  console.log(participantsList);
  const { state } = useLocation();
  const eventName = "";
  console.log("TITLE: ", state);
  return(<section>
    <Header title={`"${eventName}" participants`} />
    <div className="participants-wrapper">
      {
        participantsList?.map(item => <ParticipantItem
            key={item._id}
            fullName={item.fullName}
            email={item.email}
          />)
      }
      {
        !participantsList.length && <div>There are no registered participants.</div>
      }
    </div>
  </section>);
}

export default Participants;