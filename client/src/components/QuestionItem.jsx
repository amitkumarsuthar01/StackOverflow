import { Link } from "react-router-dom";
import { formatTimeAgo } from "../utils/FormateTime";

export default function QuestionItem({
  id,
  vote,
  answers,
  view,
  title,
  description,
  tags,
  author,
  asked,
  date,
}) {
  return (
    <div className="flex border-b py-5 gap-4 text-sm text-gray-700">
      {/* Votes / Answers / Views */}
      <div className="w-20 text-right space-y-1 text-gray-600">
        <p>{vote} votes</p>
        <p>{answers.length} answers</p>
        <p>{view.toLocaleString()} views</p>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Link to={`/view-question/${id}`}><h2 className="text-blue-600 font-medium hover:text-blue-800 cursor-pointer">{title}</h2></Link>


        <p className="text-gray-600 mt-1 mb-3">{description}</p>

        {/* Tags and Footer Time Row */}
        <div className="flex justify-between items-center w-full">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-gray-200 px-2 py-1 rounded-md cursor-pointer hover:bg-blue-100 hover:text-blue-600"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Author + Time */}
          <div
            className="text-xs text-gray-500 whitespace-nowrap"
            title={new Date(date).toLocaleString()} // tooltip full timestamp
          >
            <span className="font-medium">{author}</span> {asked} asked{" "}
            {formatTimeAgo(date)}
          </div>
        </div>
      </div>
    </div>
  );
}
