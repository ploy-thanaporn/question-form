import React, { useContext } from "react";
import { QuestionContext } from "../App";

const AnswerPage = () => {
  const { questionAnswers } = useContext(QuestionContext);

  return (
    <div className="mt-5 text-slate-800  mx-10 border px-10 py-5 rounded-md">
      <h1 className="font-bold text-lg">Answer</h1>
      <div className="mt-3 ml-2">
        {questionAnswers.map((question, index) => (
          <div className="flex">
            <span className="mr-2">{`${index + 1}.`}</span>
            <div className="flex flex-col mb-2.5">
              {question.title}
              {question.type === "checkbox" ? (
                <div className="text-slate-500">
                  {question.choicesSelected
                    .map((choice) => choice.title)
                    .join(", ")}
                </div>
              ) : (
                <div className="text-slate-500">{question.answer}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswerPage;
