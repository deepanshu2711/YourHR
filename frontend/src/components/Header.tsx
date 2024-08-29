import { useUser } from "../providers/userProvider";

const Header = ({ username }: { username: string }) => {
  const { setUser } = useUser();
  const handleLogout = () => {
    setUser(null);
  };
  return (
    <div className="flex items-center justify-between max-w-7xl mx-auto py-5">
      <p className="text-3xl font-bold text-purple-500">YourHR</p>
      <div className="flex items-center gap-2">
        <p className="text-sm font-semibold text-gray-500">@{username}</p>
        <img src="/user.png" className="h-8 w-8" />
        <button
          onClick={handleLogout}
          className="text-sm font-semibold text-gray-500 border px-2 py-1 rounded bg-gray-50 cursor-pointer hover:bg-gray-100 border-gray-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
