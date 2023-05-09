import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionContext } from "../App";

const QuestionPage = () => {
  let navigate = useNavigate();

  const { questionAnswers, setQuestionAnswers } = useContext(QuestionContext);

  const renderInput = (question, questionIndex) => {
    if (question.type === "text") {
      return (
        <input
          type="text"
          value={question.answer}
          onChange={(e) => onAnswerChange(e, questionIndex)}
          className="border border-slate-300 rounded py-1.5 w-full text-base px-5 outline-none"
        />
      );
    }

    if (question.type === "date") {
      return (
        <input
          type="date"
          value={question.answer}
          onChange={(e) => onAnswerChange(e, questionIndex)}
          className="py-1.5 px-5 border rounded"
        />
      );
    }

    if (question.type === "radio") {
      return (
        <div className="flex flex-col">
          {question.choices.map((choice) => (
            <div>
              <input
                value={choice.title}
                type="radio"
                checked={question.answer === choice.title}
                onChange={(e) => onAnswerChange(e, questionIndex)}
                className="mt-1.5 mr-1.5"
              />
              <label>{choice.title}</label>
            </div>
          ))}
        </div>
      );
    }

    if (question.type === "checkbox") {
      return (
        <div className="flex flex-col">
          {question.choices.map((choice) => (
            <div>
              <input
                value={choice.title}
                type="checkbox"
                checked={question.choicesSelected.some(
                  (selectedChoice) => selectedChoice.title === choice.title
                )}
                onChange={(e) => onAnswerChange(e, questionIndex)}
                className="mt-1.5 mr-1.5"
              />
              <label>{choice.title}</label>
            </div>
          ))}
        </div>
      );
    }
  };

  const onAnswerChange = (e, questionIndex) => {
    const targetQuestion = questionAnswers[questionIndex];

    // For single answer
    if (["text", "date", "radio"].includes(targetQuestion.type)) {
      const targetQuestionAnswer = {
        ...targetQuestion,
        answer: e.target.value,
      };

      const newQuestionAnswers = [...questionAnswers];
      newQuestionAnswers[questionIndex] = targetQuestionAnswer;
      setQuestionAnswers(newQuestionAnswers);
    }

    // For multiple answer
    if (["checkbox"].includes(targetQuestion.type)) {
      const newChoicesSelected = [...targetQuestion.choicesSelected];

      if (
        !newChoicesSelected.some((choice) => choice.title === e.target.value)
      ) {
        newChoicesSelected.push({ title: e.target.value });
      } else {
        const indexRemove = newChoicesSelected.findIndex(
          (choice) => choice.title === e.target.value
        );
        newChoicesSelected.splice(indexRemove, 1);
      }

      const targetQuestionAnswer = {
        ...targetQuestion,
        choicesSelected: newChoicesSelected,
      };

      const newQuestionAnswers = [...questionAnswers];
      newQuestionAnswers[questionIndex] = targetQuestionAnswer;
      setQuestionAnswers(newQuestionAnswers);
    }
  };

  return (
    <div className="mt-10 mx-10 border px-10 py-5 rounded-md text-slate-600">
      {questionAnswers.map((question, questionIndex) => (
        <div>
          <h4>
            <span className="pr-2">{`${questionIndex + 1 + "."}`}</span>
            {question.title}
          </h4>

          {/* choice */}
          <div className="my-1.5">{renderInput(question, questionIndex)}</div>
          <hr className="my-2.5" />
        </div>
      ))}

      <button
        className="bg-emerald-500  w-full mt-4 text-white px-2 py-1.5 mb-2 rounded"
        onClick={() => navigate("/answer")}
      >
        Submit
      </button>
    </div>
  );
};

export default QuestionPage;
