import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import "./styles.scss";
import api from "../../api/api";
import Input from "../../components/input/Input";

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

function Registration() {
  const { eventId } = useParams();
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [source, setSource] = useState("social");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");

  const changeName = (event) => {
    setFullName(event.target.value);
    setNameError(event.target.value.length < 5 ? "Full name should be at least 5 symbols long." : "");
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
    setEmailError(emailPattern.test(event.target.value) ? "" : "Please, enter a valid email.");
  };

  const changeBirthDate = (event) => {
    const selectedDate = (new Date(event.target.value));
    const selectedYear = selectedDate.getFullYear();
    const selectedTime = selectedDate.getTime();

    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    const currentYear = currentDate.getFullYear();

    if(selectedTime > currentTime) return;

    setBirthDate(event.target.value);

    setBirthDateError(selectedYear > currentYear - 18 ? "You should be 18 years old" : "");

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

  const disableTrigger = submitting || emailError || nameError || birthDateError || !email || !fullName || !birthDate;

  return(<section>
    <Header title="Event registration" />
    <form onSubmit={submitForm} className="registration-form" autoComplete="off">
      <Input
        inputType="text"
        inputName="fullName"
        inputValue={fullName}
        changeValue={changeName}
        labelText="Full name"
        errorValidation={nameError}
      />
      <Input
        inputType="email"
        inputName="email"
        inputValue={email}
        changeValue={changeEmail}
        labelText="Email"
        errorValidation={emailError}
      />
      <Input
        inputType="date"
        inputName="birthDate"
        inputValue={birthDate}
        changeValue={changeBirthDate}
        labelText="Date of birth"
        errorValidation={birthDateError}
      />
      <span className="source-title">Whre did you hear about this event?</span>
      <div className="source-options">
        <Input
          inputType="radio"
          inputName="sourceGroup"
          inputValue="social"
          changeValue={changeSource}
          labelText="Social media"
        />
        <Input
          inputType="radio"
          inputName="sourceGroup"
          inputValue="friends"
          changeValue={changeSource}
          labelText="Friends"
        />
        <Input
          inputType="radio"
          inputName="sourceGroup"
          inputValue="found"
          changeValue={changeSource}
          labelText="Found myself"
        />
      </div>
      <button
        type="submit"
        disabled={disableTrigger}
      >
        Submit
      </button>
      {
        submitMessage && <div className={submitError ? "submit-result error" : "submit-result success"}>
          {submitMessage}
        </div>
      }
    </form>
  </section>);
}

export default Registration;