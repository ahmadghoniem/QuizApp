function Opening() {
  return (
    <>
      <div className="landing-page">
        <h1>Quizzical</h1>
        <h3>fixed category for now Entertainment: Film</h3>
        <button
          onClick={() => {
            setStart(true);
          }}
        >
          Start quiz
        </button>
      </div>
    </>
  );
}
export default Opening;
