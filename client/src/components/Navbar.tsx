import { Link } from "react-router-dom"

const Navbar = () => {
  return (
<div className="navbar bg-secondary mx-auto mt-2 mb-8 rounded-lg text-white
    xl:max-w-7xl lg:max-w-4xl md:max-w-2xl sm:max-w-lg max-w-sm
">
  <div className="flex-1">
    <Link to="/">
      <p className="btn btn-ghost text-xl font-bold">QuestionsIO</p>
    </Link>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <Link to="/create-question">
        <li className="font-bold"><a>Put a question</a></li>
      </Link>
      <Link to="/questions">
        <li className="font-bold"><a>See questions</a></li>
      </Link>
    </ul>
  </div>
</div>
)
}

export default Navbar