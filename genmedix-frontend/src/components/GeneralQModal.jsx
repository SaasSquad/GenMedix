import { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

const GeneralQModal = () => {
  const user = useStoreState((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const addScore = useStoreActions((actions) => actions.addScore);
  const [score, setScore] = useState(0);

  const questions = [
    {
      question:
        "to teach younger family members what life was like when I was young and living in a different time.",
    },
    { question: "to help me 'put my house in order' before I die." },
    {
      question:
        "because it fills the gap when I find time 'heavy on my hands'.",
    },
    { question: "to help me plan for the future." },
    { question: "to keep alive the memory of a dead loved one." },
    {
      question:
        "because it brings me closer to newer friends and acquaintances.",
    },
    { question: "because it promotes fellowship and a sense of belonging." },
    {
      question:
        "because it helps me contrast the ways I’ve changed with the ways I’ve stayed the same.",
    },
    {
      question:
        "because it gives me a sense of personal completion or wholeness as I approach the end of life.",
    },
    { question: "to see how my past fits in with my journey through life." },
    { question: "to pass the time during idle or restless hours." },
    { question: "to help solve some current difficulty." },
    { question: "to keep painful memories alive." },
    {
      question:
        "out of loyalty to keep alive the memory of someone close to me who has died.",
    },
    { question: "to rehash lost opportunities." },
    { question: "to reduce boredom." },
    {
      question:
        "to remember an earlier time when I was treated unfairly by others.",
    },
    {
      question:
        "to remind me that I have the skills to cope with present problems.",
    },
    { question: "to relieve depression." },
    { question: "to transmit knowledge that I’ve acquired to someone else." },
    { question: "for lack of any better mental stimulation." },
    { question: "to create a common bond between old and new friends." },
    { question: "in order to teach younger persons about cultural values." },
    { question: "because it gives me a sense of self-identity." },
    { question: "to remember someone who has passed away." },
    { question: "because remembering my past helps me define who I am now." },
    { question: "as a way of bridging the 'generation gap'." },
    { question: "as a 'social lubricant' to get people talking." },
    { question: "because it helps me prepare for my own death." },
    { question: "in order to leave a legacy of family history." },
    { question: "to put current problems in perspective." },
    { question: "to try to understand myself better." },
    {
      question:
        "because I feel less fearful of death after I finish reminiscing.",
    },
    { question: "to create ease of conversation." },
    {
      question:
        "because it helps me see that I’ve lived a full life and can therefore accept death more calmly.",
    },
    { question: "as a means of self-exploration and growth." },
    { question: "for something to do." },
    { question: "because it helps me cope with thoughts of my own mortality." },
    {
      question: "to see how my strengths can help me solve a current problem.",
    },
    { question: "to rekindle bitter memories." },
    {
      question:
        "to remember people I was close to but who are no longer a part of my life.",
    },
    { question: "to avoid repeating past mistakes at some later date." },
    { question: "to keep memories of old hurts fresh in my mind." },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const answers = document.querySelectorAll("select");
    let wellBeingScore = 0;

    answers.forEach((answer) => {
      const questionIndex = parseInt(answer.name);
      const answerValue = parseInt(answer.value);

      wellBeingScore += answerValue;
    });

    const newScore = {
      name: user.displayName,
      totalScore: parseInt((wellBeingScore / 258) * 100),
      updateType: 'wellBeing'
    };
    addScore(newScore);

    setScore(wellBeingScore);
    setShowModal(false);
  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowModal(true)}
      >
        General Well-being
      </button>
      {/* url for the questionnaire https://www.apa.org/depression-guideline/reminiscence-functions-scale.pdf */}
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
                      General Mental Well-being Test
                    </h3>
                    <div className="">
                      <p className="my-2">
                        This questionnaire was created by the American
                        Psychology Association. It concerns the why, or
                        functions, of reminiscence. That is, what purpose does
                        reminiscence fulfill, or, what goal does retrieving
                        certain memories help you accomplish?
                      </p>
                      <h5 className="font-bold text-md">Instructions</h5>
                      <p className="my-2">
                        Below are listed 43 statements which other people have
                        identified as possible uses or functions of
                        reminiscence. You are to carefully read each statement
                        and then rate each statement on the scale describing how
                        frequently you reminisce with that particular purpose in
                        mind. Note that we are not asking you how frequently you
                        reminisce in general, but rather, WHEN YOU DO REMINISCE,
                        how frequently is it for a particular purpose.{" "}
                      </p>

                      <p className="my-2">
                        If you have NEVER used reminiscence for that purpose,
                        rate that statement as 1, RARELY is rated as 2, SELDOM
                        as 3, OCCASIONALLY is rated as 4, OFTEN is rated as 5,
                        and if you VERY FREQUENTLY reminisce for the stated
                        purpose, then rate the statement as 6.
                      </p>

                      <p className="my-2">
                        1 = Never
                        <br />
                        2 = Rarely
                        <br />
                        3 = Seldom
                        <br />
                        4 = Occasionally <br />
                        5 = Often
                        <br />6 = Very often
                      </p>
                    </div>
                    <h4 className="font-semibold text-[1.2rem] mt-8 mb-4">
                      Questionnaire
                    </h4>
                    <p>When I reminisce it is:</p>
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
                      <p className="text-sm text-gray-500">This is how often you reminisce over problems</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setScore(0);
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

export default GeneralQModal;
