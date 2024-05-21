/* eslint-disable no-unused-vars */
import { useLoaderData, useLocation, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Header from "../../components/header/Header";
import ParticipantItem from "../../components/participantItem/ParticipantItem";
import SearchForm from "../../components/searchForm/SearchForm";
import "./styles.scss";
import { fetchParticipants, fetchStatistic } from "../../api/requests";

import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function Participants() {

  const participantsList = useLoaderData();
  const { state: { title } } = useLocation();
  const { eventId } = useParams();

  const [usersList, setUsersList] = useState(participantsList);
  const [statistics, setStatistics] = useState([]);

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

  const findStatsData = useCallback(async() => {
    await fetchStatistic(eventId)
      .then(data => {
        setStatistics(data);
      })
      .catch(err => {
        throw new Error(err);
    });
  }, []);

  useEffect(() => {
    findStatsData();
  }, []);

  return(<section className="participants-page">
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
          {
            statistics?.length &&
            <div className="statistics">
              <div className="title">Count registrations of patrticipants per day</div>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={statistics}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="createdAt" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="count"
                    fill="#095271"
                    activeBar={
                      <Rectangle fill="#0093cd" />
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          }
        </>
    }
  </section>);
}

export default Participants;