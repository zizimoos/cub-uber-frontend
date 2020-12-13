import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import nuberLogo from "../images/cubUberLogo.svg";

export const Header: React.FC = () => {
  const { data } = useMe();

  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 py-3 px-3 text-center text-base text-white">
          <span>Please verify your email</span>
        </div>
      )}
      <header className=" py-4">
        <div className="w-full px-5 max-w-screen-xl mx-auto flex justify-between items-center">
          <Link to="/">
            <img src={nuberLogo} className="w-36" alt={"logo"}></img>
          </Link>

          <span className="text-xs">
            <Link to="/edit-profile">
              <FontAwesomeIcon
                icon={faUser}
                className="text-xl "
              ></FontAwesomeIcon>{" "}
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
