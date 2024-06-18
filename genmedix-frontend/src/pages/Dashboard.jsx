import { useStoreActions, useStoreState } from "easy-peasy";
import HappinessQBtn from "../components/HappinessQBtn.jsx";
import LineChart from "../components/LineChart.jsx";
import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import GeneralQBtn from "../components/GeneralQBtn.jsx";

const Dashboard = () => {
  const user = useStoreState((state) => state.user);
  const name = user.displayName
  const [showTestBtn, setShowTestBtn] = useState(false);
  const [selectedChart, setSelectedChart] = useState(1);
  const isOpen = useStoreState(state => state.isOpen)

  const dataScores = useStoreState(state => state.dataScores)
  const fetchScores = useStoreActions(actions => actions.fetchScores)

  useEffect(() => {
    if (name) {
      fetchScores(name);
    }

  }, [fetchScores, name]);

  const dataSets = dataScores ? {
    1: {
      dataPoints: dataScores.Happiness.length == 0 ? ['N'] : dataScores.Happiness,
      title: "Happiness",
    },
    2: {
      dataPoints: dataScores.General_well_being.length == 0 ? ['N'] : dataScores.General_well_being,
      title: "General Well-being",
    }
  } : '';

  const showTestBox = () => {
    setShowTestBtn(!showTestBtn);
  };

  const datasetKeys = [1, 2];

  return (
    <>
      <div className="bg-gray-800 h-screen leading-7 text-white w-screen overflow-auto">
        <Header />
        <section className={`h-[92%] pb-8 w-[85%] md:w-[80%] mx-auto overflow-auto transition-all duration-500 ease-in-out ${isOpen && 'md:ml-60'}`}>
          <div className="mt-8">
            <h1>Dashboard</h1>
            <h2>View your stats and progress</h2>
            <div className="block sm:flex border border-blue-400 border-2 sm:justify-around text-center p-4 sm:p-8 mb-8 rounded-md">
              {dataScores ?
                datasetKeys.map((key) => {
                  const { dataPoints } = dataSets[key];
                  const lastScore = dataPoints[dataPoints.length - 1];
                  return (
                    <div key={key} className="m-4">
                      {
                        lastScore !== 'N' ?
                        <button className="p-8 rounded-full border border-blue-600 border-[0.5rem] text-md sm:text-2xl">
                        {lastScore}
                      </button>
                      :
                      <h2></h2>
                      }
                    </div>
                  );
                })
                : "You don't have any statistics yet! Take the assessment to see your progress."
              }
            </div>

            <div className="flex justify-around my-4">
              <button
                className={`chart_button rounded-md ${selectedChart === 1 ? "chart_button_active" : ""
                  }`}
                onClick={() => setSelectedChart(1)}
              >
                Happiness
              </button>
              <button
                className={`chart_button rounded-md ${selectedChart === 2 ? "chart_button_active" : ""
                  }`}
                onClick={() => setSelectedChart(2)}
              >
                Well-being
              </button>
              {/* <button
                className={`chart_button rounded-md ${selectedChart === 3 ? "chart_button_active" : ""
                  }`}
                onClick={() => setSelectedChart(3)}
              >
                Show Chart 3
              </button> */}
            </div>

            {
              dataScores &&
              <LineChart
              dataPoints={dataSets[selectedChart].dataPoints}
              title={dataSets[selectedChart].title}
            />

            }
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded"
              onClick={showTestBox}
            >
              Take Assessment
            </button>
            {showTestBtn && (
              <>
                <div className="block sm:flex my-4 sm:justify-around md:w-3/4">
                  <HappinessQBtn />
                  <GeneralQBtn/>
                  
                  {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Some Stuff
                  </button> */}
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
