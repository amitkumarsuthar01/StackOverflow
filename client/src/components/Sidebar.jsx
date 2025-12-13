import HomeIcon from "@mui/icons-material/Home";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TerrainIcon from '@mui/icons-material/Terrain';
import ChatIcon from '@mui/icons-material/Chat';
import GroupIcon from '@mui/icons-material/Group';
import AddIcon from '@mui/icons-material/Add';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import MarkChatReadOutlinedIcon from '@mui/icons-material/MarkChatReadOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Link } from "react-router-dom";


export default function Sidebar({ open }) {
  return (
    <aside
      className={`
        fixed md:static top-14 left-0 h-auto text-[13px] w-80 bg-white border-r
        overflow-y-auto transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >

      {/* 🟦 Apply container spacing here */}
      <div className="max-w-screen-2xl mx-auto pl-4 xl:pl-32 py-4">

        <ul className="mb-7 space-y-[2px] cursor-pointer">
          <li className="font-semibold p-2 rounded-md hover:bg-gray-100 flex items-center gap-2">
            <HomeIcon /> Home
          </li>
          <li className="text-black font-semibold p-2 rounded-md hover:bg-gray-100 flex items-center gap-2">
            <Link to="/" > <QuestionAnswerIcon /> Questions </Link>
          </li>
          <li className="p-2 rounded-md hover:bg-gray-100 flex items-center gap-2">
            <AutoAwesomeIcon className="bg-blue-500 text-white rounded-full border-[3px] border-gray-400" /> AI Assist
          </li>
          <li className="p-2 rounded-md hover:bg-gray-100 flex items-center gap-2">
            <LocalOfferIcon /> Tags
          </li>
        </ul>

        <ul className="mb-7 space-y-[2px] cursor-pointer">
          <li className="font-semibold p-2 rounded-md hover:bg-gray-100 flex items-center gap-2"><TerrainIcon /> Challenges</li>
          <li className="p-2 rounded-md hover:bg-gray-100 flex items-center gap-2"><ChatIcon /> Chat</li>
          <li className="p-2 rounded-md hover:bg-gray-100 flex items-center gap-2"><LibraryBooksIcon /> Articles</li>
          <li className="p-2 rounded-md hover:bg-gray-100 flex items-center gap-2"><GroupIcon /> Users</li>
        </ul>

        <ul className="mb-7 space-y-[2px] cursor-pointer">
          <li className="font-semibold p-2 rounded-md hover:bg-gray-100 flex items-center gap-2"><ApartmentIcon /> Companies</li>
        </ul>

        <ul className="mb-7 space-y-[2px]">
          <li className="font-semibold flex items-center gap-2 cursor-pointer">COLLECTIVES <AddIcon /></li>
          <li className="text-[12px] text-gray-500">Communities for your favorite technologies.</li>
          <li className="cursor-pointer font-semibold hover:text-blue-500 underline">Explore all Collectives</li>
        </ul>

        <ul className="mb-7 space-y-[2px] pr-2">
          <li className="font-semibold">STACK INTERNAL</li>
          <li className="flex gap-2">
            <DescriptionOutlinedIcon />
            <LocalOfferOutlinedIcon />
            <MarkChatReadOutlinedIcon />
            <InsertChartOutlinedIcon />
          </li>
          <li className="text-xs text-gray-500 text-justify">
            Stack Overflow for Teams is now called <b>Stack Internal</b>. Bring the best of human thought and AI automation together at your work.
          </li>
          <li>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-900">
              Try for free
            </button>
          </li>
          <li>
            <button className="w-full py-2 rounded-lg hover:bg-gray-100 border border-gray-300 mt-1">
              Learn more
            </button>
          </li>
        </ul>

      </div>
    </aside>
  );
}
