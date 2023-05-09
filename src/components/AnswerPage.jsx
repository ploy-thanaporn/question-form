import React, { useContext } from "react";
import { CreateQuestionContext } from "../App";

const AnswerPage = () => {
  const { questionAnswers } = useContext(CreateQuestionContext);

  return (
    <div className="px-4 mt-5 text-slate-600">
      <h1 className="text-red-500 font-bold text-lg">Answer</h1>
      <div className="mt-2">
        {questionAnswers.map((question, index) => (
          <div className="flex">
            <span className="mr-2">{`${index + 1}.`}</span>
            {question.type === "checkbox" ? (
              question.choicesSelected.map((choice) => (
                <div className="pr-1">{choice.title}</div>
              ))
            ) : (
              <div>{question.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswerPage;
