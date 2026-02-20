import { useAuth } from "./src/context/AuthContext";

const Header = ({ title = "Today", count = 0 }) => {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold">{title}</h1>
        <span className="px-3 py-1 rounded-lg bg-gray-200 text-sm font-medium">
          {count}
        </span>
      </div>

      <p className="text-sm text-gray-500">
        Welcome, <span className="font-semibold">{user?.name}</span>
      </p>
    </header>
  );
};

export default Header;
