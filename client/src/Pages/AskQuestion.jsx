import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { TagsInput } from "react-tag-input-component";
import AskQuestionAccordian from "../components/AskQuestionAccordian";
import { Link, useNavigate } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { auth } from "../firebase";

const AskQuestion = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");

  const [body, setBody] = useState("");

  const [tags, setTags] = useState([]);

  const [postLocation, setPostLocation] = useState("staging");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "indent",
    "link",
    "image",
    "code-block",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user) {
      toast.error("Please login to ask a question");
      navigate("/login");
      return;
    }

    // Basic validation
    if(title.trim().length < 15) {
      toast.error("Title must be at least 15 characters");
      return;
    }

    if(body.replace(/<[^>]*>/g, "").length < 50) {
      toast.error("Question body is too short");
      return;
    }

    if(tags.length === 0) {
      toast.error("Please add at least one tag");
      return;
    }

    setLoading(true);

    try {
      // 🔑 Get Firebase ID Token
      const token = await auth.currentUser.getIdToken();

      const response = await fetch("/api/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ REQUIRED
        },
        body: JSON.stringify({
          title,
          body,
          tags,
          postLocation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message ||"Failed to add question");
        return;
      }

      toast.success("Question added successfully!");

      setTitle("");
      setBody("");
      setTags([]);
      setPostLocation("staging");

      // Redirect to question page
      if (data?.question?._id) {
        navigate(`/view-question/${data.question._id}`);
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error("Network error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col-reverse lg:flex-row min-h-screen">
      {/* Left Main Box */}

      <div className="bg-white p-6 lg:w-[70%] overflow-y-auto px-4 lg:pl-32">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-1">Ask question</h1>
          <p className="text-sm text-gray-600">
            Required fields <span className="text-red-500">*</span>
          </p>
        </div>

        {/* Title */}
        <label className="font-semibold">
          Title <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-500 mb-1">
          Be specific and imagine you're asking a person. Min 15 characters.
        </p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. How do I center a div in CSS?"
          className="border rounded-md p-2 w-full mb-6 focus:outline-blue-500"
        />

        {/* Body */}
        <label className="font-semibold">
          Body <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-500 mb-1">
          Include all necessary details. Min 220 characters.
        </p>
        <div className="mb-6">
          <ReactQuill
            value={body}
            onChange={setBody}
            modules={modules}
            formats={formats}
          />
        </div>

        {/* Tags */}
        <label className="font-semibold">
          Tags <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-500 mb-1">
          Add up to 5 tags to describe your question.
        </p>

        <div className="mb-6">
          <TagsInput
            value={tags}
            onChange={setTags}
            name="tags"
            placeHolder="Add tags"
          />
        </div>

        {/* Radio Options */}
        <h2 className="text-lg font-semibold">
          Select where your question should be posted.
          <span className="text-red-500">*</span>
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          You can get feedback before posting publicly.
        </p>

        <div className="space-y-4 flex justify-between items-baseline">
          {/* Option 1 */}
          <label className="flex items-start gap-3 p-4 border rounded-md cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="post-location"
              value="staging"
              checked={postLocation === "staging"}
              onChange={(e) => setPostLocation(e.target.value)}
            />

            <div>
              <h3 className="font-semibold">
                Get private feedback in Staging Ground
              </h3>
              <ul className="list-disc ml-5 text-sm text-gray-600">
                <li>I want experienced members to review.</li>
                <li>I want to improve my question.</li>
                <li>I can wait for answers.</li>
              </ul>
            </div>
          </label>

          {/* Option 2 */}
          <label className="flex items-start gap-3 p-4 border rounded-md cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="post-location"
              value="public"
              checked={postLocation === "public"}
              onChange={(e) => setPostLocation(e.target.value)}
            />

            <div>
              <h3 className="font-semibold">
                Post question on Stack Overflow now
              </h3>
              <ul className="list-disc ml-5 text-sm text-gray-600">
                <li>I'm confident it follows all guidelines.</li>
                <li>I don't need private feedback.</li>
                <li>I need answers immediately.</li>
              </ul>
            </div>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded-md mt-6 hover:bg-blue-700 disabled:opacity-60"
        >
          {loading
            ? "Adding question..."
            : postLocation === "staging"
            ? "Submit to Staging Ground"
            : "Post your question"}
        </button>
      </div>

      {/* Right Sidebar */}
      <div className="bg-gray-50 p-4 lg:pr-32 lg:w-[30%] overflow-y-auto space-y-3">
        {/* Headings */}
        <h2 className="lg:pt-16 pt-5 text-base font-semibold">
          Draft your question
        </h2>
        <p className="text-gray-600 text-xs">
          The community is here to help you with specific coding, algorithm, or
          language problems.
        </p>
        <AskQuestionAccordian />

        {/* Helpful links */}
        <h2 className="text-lg font-semibold">Helpful links</h2>

        <p className="text-gray-700 text-xs">
          Find more information about{" "}
          <Link to="#" className="text-blue-600 underline">
            how to ask a good question here
          </Link>
          .
        </p>

        <p className="text-gray-700 text-xs">
          Visit the{" "}
          <Link to="#" className="text-blue-600 underline">
            help center
          </Link>
          .
        </p>

        <p className="text-gray-700 text-xs">
          Ask questions about the site on{" "}
          <Link to="#" className="text-blue-600 underline">
            meta
          </Link>
          .
        </p>

        {/* Feedback link */}
        <div className="flex items-center justify-between border-[1px] border-gray-300 rounded-md p-2 gap-2 text-gray-700 text-xs">
          <p>
            Help us improve how to ask a question by{" "}
            <Link to="#" className="text-blue-600 underline">
              providing feedback or reporting a bug
            </Link>
          </p>
          <LaunchIcon sx={{ fontSize: 16 }} />
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;
