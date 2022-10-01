import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="flex justify-between content-center px-5 py-2 bg-gray-600 text-white">
      <h1 className="text-xl">Github Search</h1>
      <span>
        <Link to={"/"} className="mr-4">
          Home
        </Link>
        <Link to={"/favourites"}>Favourites</Link>
      </span>
    </nav>
  );
};

export default Navigation;
