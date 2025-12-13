import CloseIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/Create";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import { collectives } from "./Collectivedata"; // <-- make sure path is correct

export default function RightPanel({ open }) {
  return (
    <aside
      className={`
        fixed lg:static right-0 h-full w-72 bg-white overflow-y-auto
        transition-transform duration-300 hidden md:block text-xs
        ${open ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
      `}
    >
      <div>
        {/* ORIGINAL SECTION */}
        <div className="bg-yellow-50 border-yellow-400 border-[1px] rounded-lg">
          <div className="p-3">
            <h3 className="text-base font-bold mb-3">The Overflow Blog</h3>
            <ul className="space-y-2 list-none p-0">
              <li className="flex items-start gap-2">
                <CreateIcon className="mt-1" fontSize="small" />
                <span>Treating your agents like microservices</span>
              </li>
              <li className="flex items-start gap-2">
                <CreateIcon className="mt-1" fontSize="small" />
                <span>
                  The shift in enterprise AI—what we learned on the floor at
                  Microsoft Ignite
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-400 h-[1px]"></div>

          <div className="p-3">
            <h3 className="text-base font-bold mb-3">Featured on Meta</h3>
            <ul className="space-y-2 list-disc">
              <li className="flex items-start gap-2">
                <ModeCommentOutlinedIcon
                  className="mt-1 text-blue-500"
                  fontSize="small"
                />
                <span>AI Assist is now available on Stack Overflow</span>
              </li>
              <li className="flex items-start gap-2">
                <ModeCommentOutlinedIcon
                  className="mt-1 text-blue-500"
                  fontSize="small"
                />
                <span>Native Ads coming soon to Stack Overflow & Stack Exchange</span>
              </li>
              <li className="flex items-start gap-2">
                <ModeCommentOutlinedIcon
                  className="mt-1 text-blue-500"
                  fontSize="small"
                />
                <span>Policy: Generative AI (e.g., ChatGPT) is banned</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 🔥 NEW COLLECTIVES SECTION */}
        <div className="border rounded-lg mt-3">
          <div className="flex justify-between px-3 pt-3">
            <h3 className="text-base font-bold ">Collectives</h3>
            {/* See All Button */}
          <button className="text-blue-800 text-xs hover:underline">
            See all
          </button>
          </div>

          {collectives.slice(0, 3).map((item) => (
            <div key={item.id} className="border-b">
              <div className="flex flex-col p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 flex items-center justify-center rounded font-bold text-white"
                  style={{ backgroundColor: item.logoBg }}
                >
                  {item.logoText}
                </div>
                <div>
                  <p className="text-base font-semibold cursor-pointer">{item.name}</p>
                  <p className="text-gray-500 text-xs">{item.members}</p>
                </div>
                </div>
                  <button className="text-blue-600 border-[1px] border-blue-600 rounded-lg p-2 text-xs hover:bg-blue-100">
                    Join
                  </button>
              </div>
              <div className="pt-1">
                <p className="text-xs text-gray-500">{item.description.split(" ").slice(0, 10).join(" ") + "..."}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
