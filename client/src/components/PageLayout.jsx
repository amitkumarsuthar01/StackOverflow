import Sidebar from "./Sidebar";
import RightPanel from "./RightPanel";
import { Outlet } from "react-router-dom";

export default function PageLayout({ leftOpen, setLeftOpen }) {
  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar open={leftOpen} setOpen={setLeftOpen} />

      <main className="grid grid-cols-1 lg:flex lg:flex-1 lg:justify-between overflow-y-auto max-w-screen-2xl mx-auto px-4 xl:pr-20 pt-4 bg-white gap-6">
        {/* Dynamic center content */}
        <div className="flex-1">
          <Outlet />
        </div>

        {/* Right Panel */}
        <div className="w-80 shrink-0">
          <RightPanel />
        </div>
      </main>
    </div>
  );
}
