import { Menu } from "lucide-react";
import { Settings } from "lucide-react";
import { LogOut } from 'lucide-react';


const Sidebar = ({onClose}) => {
  return (
    <aside className="h-[calc(100vh-2rem)] w-72 bg-gray-50 border border-gray-200 rounded-2xl p-5 flex flex-col shadow-sm">
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold mb-4">Menu</h2>

        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-200"
        >
          <Menu size={20} />
        </button>
      </div>

      <p className="text-xs font-semibold text-gray-600 mb-2">TASKS</p>

      <nav className="space-y-1 mb-6">
        <button className="w-full px-3 py-2 rounded-lg font-medium hover:bg-gray-100 hover:text-black hover:font-bold text-left text-gray-700">
          Today
        </button>

        <button className="w-full px-3 py-2 rounded-lg font-medium hover:bg-gray-100 text-left text-gray-700">
          Upcoming
        </button>

        <button className="w-full px-3 py-2 rounded-lg font-medium hover:bg-gray-100 text-left text-gray-700">
          Pending Task
          
        </button>
      </nav>

      <div className="mt-auto pt-6 border-t">
        <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black">
          <Settings size={20} /> Settings
        </button>
      </div>
      <div className="mt-3 ">
        <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black">
          <LogOut size={20} /> Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
