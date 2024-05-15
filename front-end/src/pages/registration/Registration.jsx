import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import "./styles.scss";
import api from "../../api";

function Registration() {
  const { eventId } = useParams();
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [source, setSource] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

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

    setSubmitting(true);
    const data = {
      eventId,
      source,
      fullName,
      birthDate,
      email
    };
    api.post("participant", data)
      .then(resp => {
        clearForm();
        setSubmitMessage(resp["data"].message);
      })
      // eslint-disable-next-line no-unused-vars
      .catch(err => {
        setSubmitError(true);
        setSubmitMessage("Error happened, please try again later.");
      })
      .finally(() => {
        setSubmitting(false);
        setTimeout(() => {
          setSubmitMessage("");
          setSubmitError(false);
        }, 4000);
      });
  };

  const changeSource = (event) => {
    setSource(event.target.value);
  };

  const clearForm = () => {
    setEmail("");
    setFullName("");
    setBirthDate("");
    setSource("");
  };

  return(<section>
    <Header title="Event registration" />
    <form onSubmit={submitForm} className="registration-form" autoComplete="off">
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
      <span className="source-title">Whre did you hear about this event?</span>
      <div className="source-options">
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
      <button type="submit" disabled={submitting}>Submit</button>
      {
        submitMessage && <div className={submitError ? "submit-result error" : "submit-result success"}>
          {submitMessage}
        </div>
      }
    </form>
  </section>);
}

export default Registration;