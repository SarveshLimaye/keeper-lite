import React from "react";
import HighlightIcon from '@material-ui/icons/Highlight';


function Header({handleLogout}) {
  return (
    <header>
    <h1> <HighlightIcon /> Quick Notes </h1>
    <div className="logout">
    <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
    </header>
  );
}

export default Header;
