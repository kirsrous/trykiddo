import React from "react";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Application from "./Application";

function App() {
  const [candidates, setCandidates] = useState([]);
  const [applications, setApplications] = useState([]);
  const [questions, setQuestions] = useState([]);

  const getCandidates = () => {
    axios
      .get("http://localhost:3010/candidates")
      .then((response) => setCandidates(response.data));
  };
  const getApplications = () => {
    axios
      .get("http://localhost:3010/applications")
      .then((response) => setApplications(response.data));
  };
  const getQuestions = () => {
    axios
      .get("http://localhost:3010/questions")
      .then((response) => setQuestions(response.data));
  };
  useEffect(() => {
    getCandidates();
    getApplications();
    getQuestions();
  }, []);

  return (
    <div className="app">
      {candidates?.map((candidate) => {
        return (
          <Application
            key={candidate.id}
            id={
              candidate.applicationId ? candidate.applicationId : candidate.id
            }
            applications={applications}
            questions={questions}
            name={candidate.name}
          />
        );
      })}
    </div>
  );
}

export default App;
