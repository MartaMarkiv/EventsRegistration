import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import "./styles.scss";

function Registration() {
  const { eventId } = useParams();
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [source, setSource] = useState("");

  const changeName = (event) => {
    setFullName(event.target.value);
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changeBirthDate = (event) => {
    setBirthDate(event.target.value);
  };

  const submitForm = (event) => {
    event.preventDefault();
    const data = {
      eventId,
      source,
      fullName,
      birthDate,
      email
    };
    console.log(data);
  };

  const changeSource = (event) => {
    setSource(event.target.value);
  };

  return(<section>
    <Header title="Event registration" />
    <div>{eventId}</div>
    <form onSubmit={submitForm}>
      <label>
        Full name
        <input type="text" name="fullName" value={fullName} onChange={changeName} required />
      </label>
      <label>
        Email
        <input type="email" name="email" value={email} onChange={changeEmail} required />
      </label>
      <label>
        Date of birth
        <input type="date" name="birthDate" value={birthDate} onChange={changeBirthDate} required />
      </label>
      <div className="source-wrapper">
        <label>
          <input name="sourceGroup" type="radio" value="social" onChange={changeSource} required />
          Social media</label>
        <label>
          <input name="sourceGroup" type="radio" value="friends" onChange={changeSource} required />
          Friends
        </label>
        <label>
          <input name="sourceGroup" type="radio" value="found" onChange={changeSource} required />
          Found myself
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  </section>);
}

export default Registration;