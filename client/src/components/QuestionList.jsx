import { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";

/* ================= CALCULATE TOTAL VOTES ================= */
const getVoteCount = (votes) => {
  if (!Array.isArray(votes)) return Number(votes) || 0;
  return votes.reduce((sum, v) => sum + (v.value || 0), 0);
};

export default function QuestionList() {
  const filters = ["Newest", "Active", "Unanswered", "More"];

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);

  const questionsPerPage = 10;

  /* ================= FETCH QUESTIONS ================= */
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("/api/question");

        if (!res.ok) {
          const text = await res.text();
          console.error("Server error:", text);
          return;
        }

        const data = await res.json();
        setQuestions(data.questions || []);
      } catch (error) {
        console.error("Failed to fetch questions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  /* ================= SORTING ================= */
  const sortedQuestions = [...questions].sort((a, b) => {
    if (activeFilter === "Newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    if (activeFilter === "Active") {
      return (b.answers?.length || 0) - (a.answers?.length || 0);
    }

    return 0;
  });

  /* ================= FILTERING ================= */
  const filteredQuestions = sortedQuestions.filter((q) => {
    if (activeFilter === "Unanswered") {
      return (q.answers?.length || 0) === 0;
    }
    return true;
  });

  /* ================= PAGINATION ================= */
  const totalQuestions = filteredQuestions.length;
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);

  const startIndex = (currentPage - 1) * questionsPerPage;
  const paginatedQuestions = filteredQuestions.slice(
    startIndex,
    startIndex + questionsPerPage
  );

  const handlePageChange = (type) => {
    if (type === "prev" && currentPage > 1) {
      setCurrentPage((p) => p - 1);
    }
    if (type === "next" && currentPage < totalPages) {
      setCurrentPage((p) => p + 1);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return <p className="text-center py-10">Loading questions...</p>;
  }

  return (
    <div>
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold mb-5">
          {activeFilter} Questions
        </h1>
        <Link
          to="/ask-question"
          className="bg-blue-500 px-4 py-2 text-white rounded-lg hover:bg-blue-700"
        >
          Ask Question
        </Link>
      </div>

      {/* ================= COUNT + FILTERS ================= */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          {totalQuestions.toLocaleString()} questions
        </p>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 hover:bg-gray-50 ${
                  activeFilter === filter ? "bg-gray-200 font-semibold" : ""
                }`}
              >
                {filter} {filter === "More" && <ArrowDropDownIcon />}
              </button>
            ))}
          </div>

          <button className="border border-blue-500 text-blue-500 rounded-md p-1 hover:bg-blue-50">
            <FilterListIcon fontSize="small" className="pr-1" />
            Filter
          </button>
        </div>
      </div>

      {/* ================= QUESTIONS LIST ================= */}
      {paginatedQuestions.map((q) => (
        <QuestionItem
          key={q._id}
          id={q._id}
          vote={getVoteCount(q.votes)}
          answers={q.answers || []}
          view={q.views || 0}
          title={q.title}
          description={
            <span
              dangerouslySetInnerHTML={{
                __html: q.body?.slice(0, 200) + "...",
              }}
            />
          }
          tags={q.tags || []}
          author={q.author}
          date={q.createdAt}
        />
      ))}

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-6 text-sm">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange("prev")}
            className={`px-3 py-2 rounded-md border ${
              currentPage === 1
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-blue-500 border-blue-400 hover:bg-blue-50"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1
            )
            .map((page, index, array) => {
              const prev = array[index - 1];
              return (
                <span key={page} className="flex items-center">
                  {prev && page - prev > 1 && <span className="px-2">...</span>}
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-md border ${
                      currentPage === page
                        ? "bg-blue-500 text-white border-blue-500"
                        : "text-gray-600 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                </span>
              );
            })}

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange("next")}
            className={`px-3 py-2 rounded-md border ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-blue-500 border-blue-400 hover:bg-blue-50"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
