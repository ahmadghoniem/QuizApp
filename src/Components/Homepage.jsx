import Select from "./Select";
function Homepage({
  setStart,
  setDifficulty,
  setCategory,
  setnoOfQues,
  difficulty,
  noOfQues,
  category,
}) {
  function handleChange(e) {
    let stateToChange = e.currentTarget.id;
    let value = e.currentTarget.value;

    switch (stateToChange) {
      case "difficulty":
        setDifficulty(value);
        break;
      case "noOfQues":
        setnoOfQues(value);
        break;
      case "category":
        setCategory(value);
        break;
    }
  }

  return (
    <>
      <div className="landing-page">
        <h1>Quizzical</h1>
        <h3>
          Quick and easy to play: Pick your categories and get quizzed about
          them
        </h3>
        <div>
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
            label="Number of Questions: "
            stateToChange="noOfQues"
            options={[
              {
                label: 1,
                value: 1,
              },
              {
                label: 2,
                value: 2,
              },
              {
                label: 3,
                value: 3,
              },
              {
                label: 4,
                value: 4,
              },
              {
                label: 5,
                value: 5,
              },
              {
                label: 6,
                value: 6,
              },
              {
                label: 7,
                value: 7,
              },
              {
                label: 8,
                value: 8,
              },
              {
                label: 9,
                value: 9,
              },
              {
                label: 10,
                value: 10,
              },
            ]} // [...Array(qUES+1).keys()].slice(1)
            handleChange={handleChange}
            currentVal={noOfQues}
          />
        </div>
        <Select
          label="Questions category: "
          stateToChange="category"
          options={[
            {
              label: "Any Category",
              value: "any",
            },
            {
              label: "General Knowledge",
              value: "9",
            },
            {
              label: "Entertainment: Books",
              value: "10",
            },
            {
              label: "Entertainment: Film",
              value: "11",
            },
            {
              label: "Entertainment: Music",
              value: "12",
            },
            {
              label: "Entertainment: Musicals & Theatres",
              value: "13",
            },
            {
              label: "Entertainment: Television",
              value: "14",
            },
            {
              label: "Entertainment: Video Games",
              value: "15",
            },
            {
              label: "Entertainment: Board Games",
              value: "16",
            },
            {
              label: "Science & Nature",
              value: "17",
            },
            {
              label: "Science: Computers",
              value: "18",
            },
            {
              label: "Science: Mathematics",
              value: "19",
            },
            {
              label: "Mythology",
              value: "20",
            },
            {
              label: "Sports",
              value: "21",
            },
            {
              label: "Geography",
              value: "22",
            },
            {
              label: "History",
              value: "23",
            },
            {
              label: "Politics",
              value: "24",
            },
            {
              label: "Art",
              value: "25",
            },
            {
              label: "Celebrities",
              value: "26",
            },
            {
              label: "Animals",
              value: "27",
            },
            {
              label: "Vehicles",
              value: "28",
            },
            {
              label: "Entertainment: Comics",
              value: "29",
            },
            {
              label: "Science: Gadgets",
              value: "30",
            },
            {
              label: "Entertainment: Japanese Anime & Manga",
              value: "31",
            },
            {
              label: "Entertainment: Cartoon & Animations",
              value: "32",
            },
          ]}
          handleChange={handleChange}
          currentVal={category}
        />

        <button onClick={() => setStart(true)}>Start quiz</button>
      </div>
    </>
  );
}
export default Homepage;
