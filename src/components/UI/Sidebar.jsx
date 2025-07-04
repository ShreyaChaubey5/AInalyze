import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`h-screen bg-blue-600 text-white flex flex-col ${
        collapsed ? "w-16" : "w-60"
      } transition-all duration-300 shadow-lg`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4">
        <Link to="/dashboard" className="text-xl font-bold">
          {collapsed ? "🧾" : "AInalyze"}
        </Link>
        <button onClick={() => setCollapsed(!collapsed)} className="text-white">
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2 p-4">
        <Link
          to="/dashboard"
          className="hover:bg-blue-700 rounded px-2 py-2 block"
        >
          📊 {collapsed ? "" : "Dashboard"}
        </Link>
        <Link
          to="/upload"
          className="hover:bg-blue-700 rounded px-2 py-2 block"
        >
          ⬆️ {collapsed ? "" : "Upload Bill"}
        </Link>
        <Link
          to="/settings"
          className="hover:bg-blue-700 rounded px-2 py-2 block"
        >
          ⚙️ {collapsed ? "" : "Settings"}
        </Link>
      </nav>

      {/* User / Logout */}
      <div className="p-4 border-t border-blue-500">
        <button className="hover:bg-blue-700 rounded px-2 py-2 w-full text-left">
          🚪 {collapsed ? "" : "Logout"}
        </button>
      </div>
    </div>
  );
}
