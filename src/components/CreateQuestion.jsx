import React, { useContext, useState } from "react";
import { QuestionContext } from "../App";
import { useNavigate } from "react-router-dom";
import { RiAddFill } from "react-icons/ri";
import { BsCalendarEvent } from "react-icons/bs";
import { MdClose, MdDelete } from "react-icons/md";

const CreateQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const { setQuestionAnswers } = useContext(QuestionContext);

  let naviage = useNavigate();

  const onAddQuestionClick = (questionType) => {
    const newQuestions = [...questions];

    newQuestions.push({
      title: "",
      type: questionType,
      choices: [],
      choicesSelected: [],
      answer: "",
    });

    setQuestions(newQuestions);
  };

  const onDeleteQuestion = (questionIndex) => {
    const newQuestions = [...questions];

    newQuestions.splice(questionIndex, 1);
    setQuestions(newQuestions);
  };

  const onAddChoiceClick = (questionIndex) => {
    const choice = {
      title: "",
    };

    const targetQuestion = questions[questionIndex];
    targetQuestion.choices.push(choice);

    const newQuestions = [...questions];
    newQuestions[questionIndex] = targetQuestion;

    setQuestions(newQuestions);
  };

  const onDeleteChoice = (questionIndex, choiceIndex) => {
    const updatedQuestions = [...questions];
    const question = updatedQuestions[questionIndex];

    question.choices.splice(choiceIndex, 1);
    setQuestions(updatedQuestions);
  };

  const onChoiceChange = (e, questionIndex, choiceIndex) => {
    const newQuestion = { ...questions[questionIndex] };
    const newChoices = [...newQuestion.choices];

    newChoices[choiceIndex] = { title: e.target.value };
    newQuestion.choices = newChoices;

    const newQuestions = [...questions];
    newQuestions[questionIndex] = newQuestion;

    setQuestions(newQuestions);
  };

  const onSubmit = () => {
    setQuestionAnswers(questions);
    naviage("/");
  };

  const renderQuestionTitleInput = (question, questionType, questionIndex) => {
    return (
      <div className="text-slate-600 px-10 mt-6">
        <div className="flex flex-col">
          <div className="flex justify-between">
            <p className="text-slate-800 font-semibold text-lg mb-3">
              {questionType.charAt(0).toUpperCase() + questionType.slice(1)}
            </p>
            <button
              onClick={() => onDeleteQuestion(questionIndex)}
              className="h-full w-12 flex items-center justify-center rounded-md ml-2"
            >
              <MdDelete className="w-7 h-7" color="red" />
            </button>
          </div>

          <div className="flex items-center h-10">
            <span>{questionIndex + 1}.</span>
            <input
              type="text"
              value={question.title}
              onChange={(e) => onQuestionTitleChange(e, questionIndex)}
              className="border border-slate-300 rounded block ml-2 h-full px-2.5 w-full"
              placeholder="Question ..."
            />

            {/* btn add choice */}
            {questionType === "radio" || questionType === "checkbox" ? (
              <button
                onClick={() => onAddChoiceClick(questionIndex)}
                className="bg-gray-500 h-full w-12 flex items-center justify-center rounded-md ml-2"
              >
                <RiAddFill className="w-7 h-7" color="white" />
              </button>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* input choice */}
        {questionType === "radio" || questionType === "checkbox" ? (
          <div className="mt-1">
            <div className="ml-7">
              {question.choices.map((choice, choiceIndex) => (
                <div className="flex items-center mt-1.5">
                  <div>
                    {questionType === "radio" ? (
                      <div className="bg-white border-2 border-gray-300 rounded-full w-4 h-4"></div>
                    ) : (
                      <div className="bg-white border-2 border-gray-300 rounded w-4 h-4"></div>
                    )}
                  </div>
                  <input
                    onChange={(e) =>
                      onChoiceChange(e, questionIndex, choiceIndex)
                    }
                    value={choice.title}
                    type="text"
                    className="border-b border-slate-300 rounded py-2 pl-2 ml-2 outline-none w-[1200px]"
                    placeholder={`Option ${choiceIndex + 1}`}
                  />
                  {/* btn delete choice */}
                  <button
                    className="flex items-center justify-center w-16 h-10"
                    onClick={() => onDeleteChoice(questionIndex, choiceIndex)}
                  >
                    <MdClose className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : questionType === "text" ? (
          <div className="text-slate-400 mt-4 border-b border-slate-300 pb-2">
            message...
          </div>
        ) : (
          <div className="flex justify-between items-center text-slate-400 mt-4 border-b border-slate-300 pb-2">
            <span>Month, Day, Year</span> <BsCalendarEvent />
          </div>
        )}
      </div>
    );
  };

  const onQuestionTitleChange = (e, questionIndex) => {
    const targetQuestion = questions[questionIndex];

    const targetQuestionAnswer = {
      ...targetQuestion,
      title: e.target.value,
    };

    const newQuestion = [...questions];
    newQuestion[questionIndex] = targetQuestionAnswer;
    setQuestions(newQuestion);
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="mt-10">
          <p className="flex justify-center font-bold text-xl">
            Create Question
          </p>
          <div className="flex justify-center mt-4">
            <div className="flex gap-x-4">
              <button
                className="bg-slate-200 hover:bg-slate-400 hover:text-white px-4 rounded-md w-fit py-3"
                onClick={() => onAddQuestionClick("radio")}
              >
                Radio
              </button>

              <button
                className="bg-slate-200 hover:bg-slate-400 hover:text-white px-4 rounded-md w-fit py-3"
                onClick={() => onAddQuestionClick("checkbox")}
              >
                Checkbox
              </button>

              <button
                onClick={() => onAddQuestionClick("text")}
                className="bg-slate-200 hover:bg-slate-400 hover:text-white px-4 rounded-md w-fit py-3"
              >
                Text
              </button>

              <button
                className="bg-slate-200 hover:bg-slate-400 hover:text-white px-4 rounded-md w-fit py-3"
                onClick={() => onAddQuestionClick("date")}
              >
                Date
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${
          questions.length > 0
            ? "mt-10 mx-10 border px-10 py-5 rounded-md text-slate-600 mb-10"
            : ""
        }`}
      >
        {questions.map((question, questionIndex) =>
          renderQuestionTitleInput(question, question.type, questionIndex)
        )}
        {questions.length > 0 && (
          <div className="mx-9 mt-10 mb-4">
            <button
              onClick={onSubmit}
              className=" bg-emerald-500 rounded px-4 py-2 text-base text-white w-full"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateQuestion;
