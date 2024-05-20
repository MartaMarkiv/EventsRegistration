import { useLoaderData, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/header/Header";
import ParticipantItem from "../../components/participantItem/ParticipantItem";
import SearchForm from "../../components/searchForm/SearchForm";
import "./styles.scss";
import { fetchParticipants } from "../../api/requests";

function Participants() {

  const participantsList = useLoaderData();
  const { state: { title } } = useLocation();
  const { eventId } = useParams();

  const [usersList, setUsersList] = useState(participantsList);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const changeFullName = (event) => {
    setFullName(event.target.value);
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const findData = async(event) => {
    event.preventDefault();
    await fetchParticipants(eventId, fullName, email)
      .then(data => {
        setUsersList(data);
      })
      .catch(err => {
        throw new Error(err);
    });
  };

  return(<section>
    <Header title={`"${title}" participants`} />
    {
      !participantsList?.length ?
        <div>There are no registered participants.</div> :
        <>
          <SearchForm
            changeEmail={changeEmail}
            changeName={changeFullName}
            nameValue={fullName}
            emailValue={email}
            searchData={findData}
          />
          <div className="participants-wrapper">
            {
              usersList?.map(item => <ParticipantItem
                  key={item._id}
                  fullName={item.fullName}
                  email={item.email}
                />)
            }
          </div>
          {
            !usersList.length && <div>Sorry, but nothing matched your search terms.</div>
          }
        </>
    }
  </section>);
}

export default Participants;