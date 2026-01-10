import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import RefreshIcon from "@mui/icons-material/Refresh";
import ReactQuill from "react-quill-new";
import parse from "html-react-parser";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "react-toastify";
import { getAuthToken } from "../utils/getAuthToken";

/* ================= HELPERS ================= */

const safeParse = (html) =>
  typeof html === "string" ? parse(html) : null;

const API_URL = import.meta.env.VITE_API_URL;

const getVoteCount = (votes) => {
  if (!Array.isArray(votes)) return Number(votes) || 0;
  return votes.reduce((sum, v) => sum + (v.value || 0), 0);
};

const getUserVote = (votes = [], userId) => {
  if (!userId) return 0;
  const found = votes.find(
    (v) => v.userId?.toString() === userId?.toString()
  );
  return found ? found.value : 0;
};

/* ================= COMMENT LIST ================= */

const CommentList = ({ comments = [] }) => (
  <div className="mt-2 space-y-1">
    {comments.map((c) => (
      <div
        key={c._id}
        className="text-sm text-gray-700 border-l-2 pl-3"
      >
        {safeParse(c.body)}
        <span className="ml-2 text-xs text-gray-500">
          – {c.author}
        </span>
      </div>
    ))}
  </div>
);

/* ================= MAIN COMPONENT ================= */

export default function ViewQuestion() {
  const { id } = useParams();
  const { user, authChecked } = useSelector((state) => state.auth);

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  const [answerText, setAnswerText] = useState("");
  const [commentText, setCommentText] = useState("");
  const [activeCommentBox, setActiveCommentBox] = useState(null);
  const navigate = useNavigate();
  // { type: "Question" | "Answer", id }

  /* ================= FETCH QUESTION ================= */

useEffect(() => {
  // ⏳ Wait until Firebase auth state is checked
  if (!authChecked) return;

  // 🚫 Not logged in → redirect
  if (!user) {
    navigate("/login", { replace: true });
    return;
  }

  const fetchQuestion = async () => {
    try {
      const token = await getAuthToken();
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      const res = await fetch(`${API_URL}/api/question/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setQuestion(data.question);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchQuestion();
}, [id, authChecked, user, navigate]);


  /* ================= VOTE ================= */

  const handleVote = async (targetType, targetId, value) => {
    if (!user) return toast.error("Login required");

    try {
      const token = await getAuthToken();

      const res = await fetch(`${API_URL}/api/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ targetType, targetId, value }),
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      setQuestion((prev) => {
        if (targetType === "Question") {
          return { ...prev, votes: data.votes };
        }

        return {
          ...prev,
          answers: prev.answers.map((a) =>
            a._id === targetId ? { ...a, votes: data.votes } : a
          ),
        };
      });
    } catch (err) {
      console.error("Vote failed", err);
      toast.error("Vote failed");
    }
  };

  /* ================= ADD COMMENT ================= */

  const submitComment = async (parentType, parentId) => {
    if (!user) return toast.error("Login required");
    if (commentText.trim().length < 5)
      return toast.error("Comment too short");

    try {
      const token = await getAuthToken();

      const res = await fetch(`${API_URL}/api/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          body: commentText,
          parentType,
          parentId,
          questionId: question._id,
        }),
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      setQuestion((prev) => {
        if (parentType === "Question") {
          return {
            ...prev,
            comments: [...(prev.comments || []), data.comment],
          };
        }

        return {
          ...prev,
          answers: prev.answers.map((a) =>
            a._id === parentId
              ? {
                  ...a,
                  comments: [...(a.comments || []), data.comment],
                }
              : a
          ),
        };
      });

      setCommentText("");
      setActiveCommentBox(null);
    } catch (err) {
      console.error("Failed to add comment", err);
      toast.error("Failed to add comment");
    }
  };

  /* ================= ADD ANSWER ================= */

  const submitAnswer = async () => {
    if (!user) return toast.error("Login required");
    if (!answerText.trim()) return toast.error("Answer cannot be empty");

    try {
      const token = await getAuthToken();

      const res = await fetch(`${API_URL}/api/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          body: answerText,
          questionId: question._id,
        }),
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      setQuestion((prev) => ({
        ...prev,
        answers: [data.answer, ...(prev.answers || [])],
      }));

      setAnswerText("");
      toast.success("Answer posted");
    } catch (err) {
      console.error("Failed to post answer", err);
      toast.error("Failed to post answer");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!question) return <p className="text-center mt-10">Not found</p>;

  const questionUserVote = getUserVote(question.votes, user?._id);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* TITLE */}
      <div className="flex justify-between mb-6 border-b pb-4">
        <h2 className="text-2xl font-semibold">{question.title}</h2>
        <Link
          to="/ask-question"
          className="bg-blue-600 w-32 h-12 text-nowrap text-white px-3 py-2 rounded"
        >
          Ask Question
        </Link>
      </div>

      {/* QUESTION */}
      <div className="flex gap-6 mb-10">
        {/* VOTES */}
        <div className="flex flex-col items-center">
          <ArrowDropUpIcon
            onClick={() =>
              handleVote("Question", question._id, 1)
            }
            className={`cursor-pointer ${
              questionUserVote === 1
                ? "text-orange-500"
                : "text-gray-500"
            }`}
          />
          <p className="font-semibold">
            {getVoteCount(question.votes)}
          </p>
          <ArrowDropDownIcon
            onClick={() =>
              handleVote("Question", question._id, -1)
            }
            className={`cursor-pointer ${
              questionUserVote === -1
                ? "text-blue-500"
                : "text-gray-500"
            }`}
          />
          <BookmarkBorderIcon className="mt-2 text-gray-400" />
          <RefreshIcon className="text-gray-400" />
        </div>

        {/* BODY + COMMENTS */}
        <div className="flex-1">
          {safeParse(question.body)}

          <CommentList comments={question.comments} />

          {activeCommentBox?.type === "Question" &&
            activeCommentBox.id === question._id && (
              <div className="mt-2">
                <textarea
                  value={commentText}
                  onChange={(e) =>
                    setCommentText(e.target.value)
                  }
                  className="w-full border p-2 text-sm rounded"
                  placeholder="Add a comment..."
                />
                <button
                  onClick={() =>
                    submitComment("Question", question._id)
                  }
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded mt-1"
                >
                  Add Comment
                </button>
              </div>
            )}

          <button
            onClick={() =>
              setActiveCommentBox({
                type: "Question",
                id: question._id,
              })
            }
            className="text-sm text-blue-600 mt-2"
          >
            Add a comment
          </button>
        </div>
      </div>

      {/* ANSWERS */}
      <h2 className="text-xl font-semibold mb-4">
        {question.answers.length} Answers
      </h2>

      {question.answers.map((ans) => {
        const ansUserVote = getUserVote(ans.votes, user?._id);

        return (
          <div key={ans._id} className="flex gap-6 border-b py-6">
            <div className="flex flex-col items-center">
              <ArrowDropUpIcon
                onClick={() =>
                  handleVote("Answer", ans._id, 1)
                }
                className={`cursor-pointer ${
                  ansUserVote === 1
                    ? "text-orange-500"
                    : "text-gray-500"
                }`}
              />
              <p className="font-semibold">
                {getVoteCount(ans.votes)}
              </p>
              <ArrowDropDownIcon
                onClick={() =>
                  handleVote("Answer", ans._id, -1)
                }
                className={`cursor-pointer ${
                  ansUserVote === -1
                    ? "text-blue-500"
                    : "text-gray-500"
                }`}
              />
              {ans.isAccepted && (
                <CheckCircleIcon sx={{ color: "green" }} />
              )}
            </div>

            <div className="flex-1">
              {safeParse(ans.body)}

              <CommentList comments={ans.comments} />

              {activeCommentBox?.type === "Answer" &&
                activeCommentBox.id === ans._id && (
                  <div className="mt-2">
                    <textarea
                      value={commentText}
                      onChange={(e) =>
                        setCommentText(e.target.value)
                      }
                      className="w-full border p-2 text-sm rounded"
                      placeholder="Add a comment..."
                    />
                    <button
                      onClick={() =>
                        submitComment("Answer", ans._id)
                      }
                      className="text-sm bg-blue-600 text-white px-3 py-1 rounded mt-1"
                    >
                      Add Comment
                    </button>
                  </div>
                )}

              <button
                onClick={() =>
                  setActiveCommentBox({
                    type: "Answer",
                    id: ans._id,
                  })
                }
                className="text-sm text-blue-600 mt-2"
              >
                Add a comment
              </button>
            </div>
          </div>
        );
      })}

      {/* ADD ANSWER */}
      <h2 className="text-lg font-semibold mt-10 mb-2">
        Your Answer
      </h2>

      <ReactQuill value={answerText} onChange={setAnswerText} />

      <button
        onClick={submitAnswer}
        className="bg-blue-600 text-white px-6 py-2 rounded mt-4"
      >
        Post Your Answer
      </button>
    </div>
  );
}
