import { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

const HappinessQModal = () => {
  const user = useStoreState((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const addScore = useStoreActions(actions => actions.addScore)
  const [score, setScore] = useState(0);

  const questions = [
    { question: "I don’t feel particularly pleased with the way I am. (R) ", type: "N" },
    { question: "How likely are you to recommend us?", type: "N" },
    { question: "I am intensely interested in other people", type: "R" },
    { question: "I have very warm feelings towards almost everyone.", type: "N" },
    { question: "I rarely wake up feeling rested. (R)", type: "N" },
    { question: "I am not particularly optimistic about the future. (R) ", type: "N" },
    { question: "I find most things amusing.", type: "N" },
    { question: "I am always committed and involved.", type: "N" },
    { question: "Life is good type:",type: "N" },
    { question: "I do not think that the world is a good place. (R).", type: "N" },
    { question: "I laugh a lot", type: "N" },
    { question: "I am well satisfied about everything in my life.", type: "N" },
    { question: "I don’t think I look attractive. (R) ", type: "N" },
    { question: "There is a gap between what I would like to do and what I have done. (R) ", type: "N" },
    { question: "I am very happy", type: "N" },
    { question: "I find beauty in some things.", type: "N" },
    { question: " I always have a cheerful effect on others.", type: "N" },
    { question: "I can fit in (find time for) everything I want to.", type: "N" },
    { question: "I feel that I am not especially in control of my life. (R", type: "N" },
    { question: "I feel able to take anything on.", type: "N" },
    { question: "I feel fully mentally alert.", type: "N" },
    { question: "I often experience joy and elation.", type: "N" },
    { question: "I don{'}t find it easy to make decisions. (R)", type: "N" },
    { question: "I don’t have a particular sense of meaning and purpose in my life. (R) ", type: "N" },
    { question: "I feel I have a great deal of energy.", type: "N" },
    { question: "I usually have a good influence on events.", type: "N" },
    { question: " I don’t have fun with other people. (R)", type: "N" },
    { question: "I don’t feel particularly healthy. (R)", type: "N" },
    { question: "I don’t have particularly happy memories of the past. (R)", type: "N" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault()
    const answers = document.querySelectorAll("select");
    let happinessScore = 0;

    answers.forEach((answer) => {
      const questionIndex = parseInt(answer.name);
      // const questionType = questions[questionIndex].type;
      const answerValue = parseInt(answer.value);

      // if (answerValue > 0) {
      //   if (questionType === 'R') {
      //     totalScore += 7 - answerValue;
      //   } else {
      //     totalScore += answerValue;
      //   }
      // }

      // the above gives unexpected results

      happinessScore += answerValue;
    });

    const newScore = {
      name: user.displayName,
      happinessScore: parseInt((happinessScore / 258) * 100),
      updateType: 'happiness'
    }
    addScore(newScore)

    
    setScore(happinessScore);
    setShowModal(false);
  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowModal(true)}
      >
        Happiness Test
      </button>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-scroll">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 overflow-y-auto">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left text-white">
                    <h3 className="text-lg leading-6 font-medium text-white">
                      Questionnaire
                    </h3>
                    <div className="">
                      <p className="my-2">
                        This is the Oxford Happines Questionnaire, This is a
                        good way to get a snapshot of your current level of
                        happiness. You can even use your score to compare to
                        your happiness level at some point in the future by
                        taking the survey again.
                      </p>
                      <h5 className="font-bold text-md">Instructions</h5>
                      <p className="my-2">
                        Below are a number of statements about happiness. Please
                        indicate how much you agree or disagree with each by
                        entering a number in the blank after each statement,
                        according to the following scale:
                      </p>
                      <p className="my-2">
                        1 = strongly disagree<br />
                        2 = moderately disagree<br /> 
                        3 = slightly disagree<br /> 
                        4 = slightly agree <br />
                        5 = moderately
                        agree <br />
                        6 = strongly agree
                      </p>
                      <p className="my-2">For questions marked {"R"}<br/>
                        1 = strongly agree<br />
                        2 = moderately
                        agree<br /> 
                        3 = slightly agree <br /> 
                        4 = slightly disagree<br />
                        5 = moderately disagree <br />
                        6 = strongly disagree</p>
                      <p className="my-2">Please read the statements carefully, because some are phrased positively and others negatively. Don’t take too long over individual questions; there are no “right” or “wrong” answers (and no trick questions). The first answer that comes into your head is probably the right one for you. If you find some of the questions difficult, please give the answer that is true for you in general or for most of the time.</p>
                    </div>
                    <h4 className="font-semibold text-[1.2rem] mt-8 mb-4">Questionnaire</h4>
                    <div className="mt-2">
                      <form onSubmit={handleSubmit}>
                        {questions.map((question, index) => (
                          <div key={index} className="mb-4">
                            <h4 className="text-base font-medium text-white">
                              {question.question}
                            </h4>
                            <select
                              required
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                              <option value="">Select an option</option>
                              {[1, 2, 3, 4, 5, 6].map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        ))}
                        <button
                          type="submit"
                          className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {score !== 0 && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Your Score
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your score for the questionnaire is:
                      </p>
                      <p className="mt-2 text-3xl font-bold text-gray-900">
                      {parseInt((score / 258) * 100)}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setScore(0)
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HappinessQModal;
