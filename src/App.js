import { Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";
import QuestionPage from "./components/QuestionPage";
import AnswerPage from "./components/AnswerPage";
import CreateQuestion from "./components/CreateQuestion";
import Navbar from "./components/Navbar";

export const CreateQuestionContext = createContext();

function App() {
  const defaultState = [
    {
      title: "What is your name ",
      type: "text",
      choices: [],
      choicesSelected: [],
      answer: "",
    },
    {
      title: "What is your birthday ",
      type: "date",
      choices: [],
      choicesSelected: [],
      answer: "",
    },
    {
      title: "What is the most richest country? ",
      type: "radio",
      choices: [
        {
          title: "England",
        },
        {
          title: "USA",
        },
        {
          title: "UAE",
        },
      ],
      choicesSelected: [],
      answer: "",
    },
    {
      title: "Pick your favourite foods? ",
      type: "checkbox",
      choices: [
        {
          title: "Pizza",
        },
        {
          title: "Hamburger",
        },
        {
          title: "Apple",
        },
      ],
      choicesSelected: [],
      answer: "",
    },
  ];

  const [questionAnswers, setQuestionAnswers] = useState(defaultState);

  return (
    <div>
      <Navbar>
        <CreateQuestionContext.Provider
          value={{
            questionAnswers,
            setQuestionAnswers,
          }}
        >
          <Routes>
            <Route path="/" element={<QuestionPage />} />
            <Route path="/create-question" element={<CreateQuestion />} />
            <Route path="/answer" element={<AnswerPage />} />
          </Routes>
        </CreateQuestionContext.Provider>
      </Navbar>
    </div>
  );
}

export default App;
