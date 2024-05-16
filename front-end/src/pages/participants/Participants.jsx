import { useLoaderData } from "react-router-dom";
import Header from "../../components/header/Header";

function Participants({eventName}) {
  const participantsList = useLoaderData();
  console.log(participantsList);
  return(<section>
    <Header title={`"${eventName}" participants`} />
    <div>
      {
        participantsList?.map(item => {
          return(<div key={item._id}>{item.fullName}</div>);
        })
      }
    </div>
  </section>);
}

export default Participants;