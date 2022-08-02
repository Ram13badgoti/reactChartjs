import React, { useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";

import Chart from "chart.js/auto";
import { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [name, setName] = useState(null);
  const [data, setData] = useState([]);
  const [dis, setDisplay] = useState(false);

  const fetchApi = async (e) => {
    let api = `http://localhost:3000/data`;
    axios
      .get(api)
      .then((response) => {
        const res = response.data;

        res.map((users) => {
          if (users.Name === name) {
            setData(users);
          } else {
            console.log("data not exit");
          }
        });
      })
      .catch((err) => {});
  };
useEffect(()=>{
  fetchApi();
},[name])
  const inputEnter = (e) => {
    if (e.key === "Enter") {
      if (e.target.value === null) {
        alert("please! Enter name ");
      }
      setDisplay(true);

      setName(e.target.value);
    }
  };
 

  const state = {
    labels: [
      "Warmth",
      "Reasoning",
      "Emotional Stability",
      "Dominance",
      "Liveliness",
      "Rule Conciousness",
      "Sensitivity",
      "Vigilance",
      "Abstractedness",
      "Privateness",
      "Apprehension",
      "Openness to change",
      "Self Reliance",
      "Perfectionism",
      "Tension",
    ],

    datasets: [
      {
        backgroundColor: [
          "green",
          "red",
          "blue",
          "#FFBF00",
          "#DE3163",
          "orange",
          "#40E0D0",
          "#6495ED",
          "#CCCCFF",
          "#FCBD40",
          "#DE3163",
          "#9FE2BF",
          "#CD5C5C",
          "pink",
          "violet",
        ],
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [
          data.Warmth,
          data.Reasoning,
          data["Emotional Stability"],
          data.Dominance,
          data.Liveliness,
          data["Rule Conciousness"],
          data.Sensitivity,
          data.Vigilance,
          data.Abstractedness,
          data.Privateness,
          data.Apprehension,
          data["Openness to change"],
          data["Self Reliance"],
          data.Perfectionism,
          data.Tension,
        ],
      },
    ],
  };

  return (
    <div>
      {dis ? (
        <>
          <div className="dwrap">
            <div className="search">
              <input
                type="text"
                onKeyPress={inputEnter}
                className="searchTerm"
                placeholder="Enter Name"
                required
              />
              <button
                type="submit"
                onClick={(e) => {
                  setName(e.target.value);
                  setDisplay(true);
                  fetchApi();
                }}
                className="searchButton"
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
          <div className="chart">
            <Bar
              data={state}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                  
                },
              }}
            />
          </div>

          <div className="PieChart">
            <Doughnut
              data={state}
              options={{
                title: {
                  display: true,
                  text: "data",
                  fontSize: 10,
                  color: "red",
                },
                plugins: {
                  legend: {
                    labels: {
                      font: {
                        size: 10,
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </>
      ) : (
        <>
          <div className="wrap">
            <div className="search">
              <input
                type="text"
                onKeyPress={inputEnter}
                className="searchTerm"
                placeholder="Enter Name"
                required
              />
              <button
                type="submit"
                onClick={(e) => {
                  setName(e.target.value);
                  setDisplay(true);
                  fetchApi();
                }}
                className="searchButton"
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
