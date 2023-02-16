import Select from "./Select";
function Homepage({
  setStart,
  preferences,
  setPreferences,
  setQuestions,
  starred,
  setStarredFlag,
}) {
  let { difficulty, category, noOfQues } = preferences;

  function handleChange(e) {
    let stateToChange = e.currentTarget.id;
    let value = e.currentTarget.value;
    setPreferences((prevState) => ({
      ...prevState,
      [stateToChange]: value,
    }));
  }

  return (
    <>
      <div className="landing-page">
        <h1>Quizzical</h1>
        <h3>Unleash Your Inner Nerd!</h3>
        <div style={{ display: "flex", gap: "5px" }}>
          <label htmlFor="noOfQues">Questions number: {noOfQues}</label>

          <input
            type="range"
            id="noOfQues"
            onChange={handleChange}
            min={1}
            max={25}
            step={1}
            value={noOfQues}
          />
        </div>
        <Select
          label="Difficulty level: "
          stateToChange="difficulty"
          options={[
            { label: "Easy", value: "easy" },
            { label: "Medium", value: "medium" },
            { label: "Hard", value: "hard" },
          ]}
          handleChange={handleChange}
          currentVal={difficulty}
        />
        <Select
          label="Questions category: "
          stateToChange="category"
          options={[
            {
              label: "Any Category 🤷‍♂️",
              value: "any",
            },
            {
              label: "General Knowledge 💡",
              value: "9",
            },
            {
              label: "Entertainment: Books 📚",
              value: "10",
            },
            {
              label: "Entertainment: Film 🎥",
              value: "11",
            },
            {
              label: "Entertainment: Music 🎵",
              value: "12",
            },
            {
              label: "Entertainment: Musicals & Theatres 🎭",
              value: "13",
            },
            {
              label: "Entertainment: Television 📺",
              value: "14",
            },
            {
              label: "Entertainment: Video Games 🎮",
              value: "15",
            },
            {
              label: "Entertainment: Board Games 🎲",
              value: "16",
            },
            {
              label: "Science & Nature 🌿",
              value: "17",
            },
            {
              label: "Science: Computers 💻",
              value: "18",
            },
            {
              label: "Science: Mathematics ➗",
              value: "19",
            },
            {
              label: "Mythology 🐉",
              value: "20",
            },
            {
              label: "Sports ⚽",
              value: "21",
            },
            {
              label: "Geography 🌎",
              value: "22",
            },
            {
              label: "History 📜",
              value: "23",
            },
            {
              label: "Politics 🏛️",
              value: "24",
            },
            {
              label: "Art 🎨",
              value: "25",
            },
            {
              label: "Celebrities 🌟",
              value: "26",
            },
            {
              label: "Animals 🐾",
              value: "27",
            },
            {
              label: "Vehicles 🚗",
              value: "28",
            },
            {
              label: "Entertainment: Comics 🦸",
              value: "29",
            },
            {
              label: "Science: Gadgets 📱",
              value: "30",
            },
            {
              label: "Entertainment: Japanese Anime & Manga 🎌",
              value: "31",
            },
            {
              label: "Entertainment: Cartoon & Animations 🐰",
              value: "32",
            },
          ]}
          handleChange={handleChange}
          currentVal={category}
        />
        <div style={{ display: "flex", gap: "5px" }}>
          <button
            onClick={() => {
              setStart(true), setStarredFlag(false);
            }}
          >
            Start a new quiz
          </button>
          {starred.length > 0 && (
            <button
              onClick={() => {
                setStart(true);
                setStarredFlag(true);
                setQuestions([...starred]);
              }}
            >
              Quiz with starred questions
            </button>
          )}
        </div>
        <footer>
          <span>
            Made with❤️ by{" "}
            <a href="https://twitter.com/ahmadghoniem_" target="_blank">
              @ahmadghoniem_
            </a>
          </span>
        </footer>
      </div>
    </>
  );
}
export default Homepage;
