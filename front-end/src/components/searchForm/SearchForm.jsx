import "./styles.scss";

function SearchForm({
  searchData,
  nameValue,
  changeName,
  emailValue,
  changeEmail
}) {
  return(<div className="search-form" onSubmit={searchData}>
    <div className="title">Search by name and email</div>
    <form className="inputs-wrapper">
      <input
        type="text"
        placeholder="Full name"
        value={nameValue}
        onChange={changeName}
      />
      <input
        type="text"
        placeholder="Email"
        value={emailValue}
        onChange={changeEmail}
      />
      <button type="submit">Find</button>
    </form>
  </div>);
}

export default SearchForm;