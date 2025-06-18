function Navbar({handleInputChange})
{
    return (
        <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Simple task list</a>
  </div>
  <div className="flex gap-2">
    <input onChange={handleInputChange} type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    <div className="dropdown dropdown-end">
    </div>
  </div>
</div>
    )
}
export default Navbar;