import { Outlet, useMatches } from "react-router-dom";
import TopBar from "../components/TopBar";

function LayoutPage() {
  const matches = useMatches();
  const currentRoute = matches.at(-1);
  const meta = currentRoute?.handle ?? {};
  return (
    <div>
      <div className="bg-gray-100 min-h-screen">
        <TopBar {...meta} />
        <Outlet />
      </div>
    </div>
  );
}

export default LayoutPage;
