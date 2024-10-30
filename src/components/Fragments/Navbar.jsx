import React from "react";
import { useNavigate } from "react-router-dom";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HomeIcon from "@mui/icons-material/Home";

const Navbar = () => {
  const navigate = useNavigate();

  const navigateToSave = () => {
    navigate("/save");
  };

  const navigateToHome = () => {
    navigate("/");
  };
  return (
    <>
      {" "}
      <nav className="flex justify-between items-center px-8 py-3 bg-black text-white">
        <img
          src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=48,h=48,fit=crop,f=png/YX41e9wK07ikx6kP/icon-satugroup-mv04oPqZoLtlZXp2.png"
          alt=""
        />
        <div className="flex items-center gap-6 justify-center">
          <h1 className="cursor-pointer flex gap-2" onClick={navigateToHome}>
            <HomeIcon />
            Home
          </h1>
          <h1 onClick={navigateToSave} className="cursor-pointer flex gap-2">
            <BookmarkIcon />
            Read History
          </h1>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
