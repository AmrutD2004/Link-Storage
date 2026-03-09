import { LayoutDashboard, LinkIcon, List, Settings } from "lucide-react";
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const { userData } = useContext(AuthContext)

  const menu = [
    { title: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
    { title: "All Links", icon: <LinkIcon size={18} />, path: "/links" },
    { title: "Categories", icon: <List size={18} />, path: "/categories" },
  ];

  const accountMenu = [
    { title: "Settings", icon: <Settings size={18} />, path: "/profile" },
  ];

  return (
    <aside className="w-64 border-r min-h-screen border-neutral-200 bg-white flex flex-col space-y-5">

      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="w-full flex items-center px-6 py-6 gap-2">
          <span className="bg-[#0B3A66] text-white p-2 rounded-lg">
            <LinkIcon size={18} />
          </span>
          <Link
            to="/dashboard"
            className="text-[#0B3A66] text-2xl font-semibold tracking-tight"
          >
            Curato
          </Link>
        </div>

        {/* Main Menu */}
        <div className="flex flex-col gap-3">
          <span className="px-6 uppercase text-xs text-neutral-400 tracking-wider">
            Menu
          </span>

          <div className="flex flex-col w-full">
            {menu.map((item, idx) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={idx}
                  to={item.path}
                  className={`flex items-center gap-3 px-6 py-2 text-sm transition-all
                  ${isActive
                      ? "bg-[#EBF5FF] text-[#0B3A66] font-medium"
                      : "text-neutral-600 hover:bg-[#F5F9FF]"
                    }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Account Section */}
      <div className="flex-1 flex-col gap-3 pb-6">
        <span className="px-6 uppercase text-xs text-neutral-400 tracking-wider">
          Account
        </span>

        {accountMenu.map((item, idx) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={idx}
              to={item.path}
              className={`flex items-center gap-3 px-6 py-2 text-sm transition-all
              ${isActive
                  ? "bg-[#EBF5FF] text-[#0B3A66] font-medium"
                  : "text-neutral-600 hover:bg-[#F5F9FF]"
                }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-2 w-full border-t border-neutral-300 px-5 py-5">
        <span className='bg-[#EBF5FF] px-4 py-2 text-base text-[#0B3A66] uppercase' style={{
          clipPath: "circle(50% at 50% 50%)"
        }}>{userData?.username?.[0]}</span>
        <div className="flex flex-col items-start justify-start w-full ">
            <h1 className="text-sm tracking-tight text-[#0B3A66] font-medium">{userData?.username}</h1>
            <span className="leading-tight text-xs text-neutral-500">{userData?.email}</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;