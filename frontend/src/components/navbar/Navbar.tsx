import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className='navbar bg-base-100'>
      <div className='navbar-start'>
        <Link to='/' className='btn btn-ghost text-xl'>
          daisyUI
        </Link>
      </div>
      <div className='navbar-center hidden lg:flex'></div>
      <div className='navbar-end'>
        <Link to='/add/user'>ADD USER</Link>
      </div>
    </div>
  );
}

export default Navbar;
