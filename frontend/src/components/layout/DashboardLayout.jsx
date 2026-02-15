import { useState } from "react";
import Sidebar from "../layout/SideBar";
import { Menu } from "lucide-react";

const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex p-4 gap-4 relative">

      {open && <Sidebar onClose={() => setOpen(false)} />}

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-6 left-6 z-50 p-2 bg-white border rounded-xl shadow-sm hover:bg-gray-50"
        >
          <Menu size={20} />
        </button>
      )}
      <main className="flex-1 bg-white rounded-2xl p-6 shadow-sm">
        {children}
      </main>

    </div>
  );
};

export default DashboardLayout;
