const Header = () => {
  return (
    <div className="flex items-center justify-between max-w-7xl mx-auto py-5">
      <p className="text-3xl font-bold text-purple-500">YourHR</p>
      <div className="flex items-center gap-2">
        <p className="text-sm font-semibold text-gray-500">@Deepanshu</p>
        <img src="/user.png" className="h-8 w-8" />
      </div>
    </div>
  );
};

export default Header;
