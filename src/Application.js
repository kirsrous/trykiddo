import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuestions,
  addResponses,
  selectCandidate,
  addId,
} from "./features/counter/candidateSlice";
import { v4 as uuidv4 } from "uuid";

const Application = ({ name, id, applications, questions }) => {
  const candidateList = useSelector(selectCandidate);
  const [commentData, setCommentData] = useState("");
  const [opening, setOpening] = useState(false);
  const dispatch = useDispatch();
  const commentRef = useRef("");
  const video = candidateList.response;
  const quests = candidateList.questions;
  const candId = candidateList.id;

  const open = (id) => {
    console.log("dd", id);
    dispatch(addResponses([]));
    if (candId === id) {
      dispatch(addId(null));
    } else {
      dispatch(addId(id));
      const apps = applications.filter((app) => app.id === id);
      if (apps.length !== 0) {
        const appsIds = apps[0].videos.map((video) => video.questionId);
        const question = questions.filter((question) =>
          appsIds.includes(question.id)
        );
        dispatch(addResponses(apps[0].videos));
        dispatch(addQuestions(question));

        axios
          .get(`http://localhost:3010/applications/${id}`)
          .then((response) => setCommentData(response.data))
          .catch((error) => console.log(error));
      }
    }
    console.log("c", candId);
    console.log(id);
  };

  const saveComment = async (id, videoId) => {
    console.log(commentData);
    if (commentData) {
      commentData.videos.map((video) => {
        if (video.questionId === videoId) {
          video.comments = [...video.comments, commentRef.current.value];
        }
      });
      axios
        .put(`http://localhost:3010/applications/${id}`, {
          id: id,
          videos: commentData.videos,
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }
    commentRef.current.value = "";
  };
  return (
    <div className="flex flex-col w-full p-6 items-center">
      <h1
        className="px-6 py-3 ml-10 mr-5 border cursor-pointer border-gray-200 rounded-full flex-grow shadow-lg max-w-3xl"
        onClick={() => open(id)}
      >
        {name}
      </h1>

      {candId === id ? (
        video.length !== 0 ? (
          video?.map((vid) => {
            const que = quests.filter((que) => que.id === vid.questionId)[0];

            return (
              <div
                className="flex flex-col  text-gray-700 space-x-2 items-center justify-around text-sm lg:text-base lg:justify-between lg:space-x-4"
                key={vid.questionId}
              >
                <h1 className="space-x-1 my-3  border-b-4 border-transparent hover:text-blue-500 hover:border-blue-500 pb-3">
                  {que.question}
                </h1>
                <video
                  controls
                  src={vid.src}
                  height={150}
                  width={150}
                  type="video/mp4"
                ></video>
                <p>Comments:</p>
                <div
                  className={
                    vid.comments
                      ? `px-5 py-2 ml-10 mr-5 my-5 border flex-grow shadow-md max-w-3xl`
                      : ""
                  }
                >
                  {vid.comments ? (
                    vid.comments.map((comment) => (
                      <p
                        className="text-gray-600 text-md mb-5 mt-3"
                        key={uuidv4()}
                      >
                        {comment}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-600"></p>
                  )}
                </div>
                <input
                  className="rounded-full h-12 my-3 bg-gray-100 flex-grow px-5 focus:outline-none"
                  type="text"
                  ref={commentRef}
                />
                <button
                  className="px-5 py-2 bg-blue-300 text-gray-600 rounded-lg"
                  onClick={() => saveComment(id, vid.questionId)}
                >
                  Save
                </button>
              </div>
            );
          })
        ) : (
          <h1 className="px-5 pt-4 text-xl text-blue-500 font-medium group-hover:underline">
            No applications found
          </h1>
        )
      ) : (
        <> </>
      )}
    </div>
  );
};

export default Application;
