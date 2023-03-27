import React, { useContext, useState } from 'react';
import { Web3Context } from '../utils/contexts/Contract';
import logo from "../imgs/logo.png";
import NavLink from "./NavLink";
import SearchOwners from "./modals/SeachOwners";
import SearchLand from "./modals/SearchLand";
import { useParams } from "react-router-dom";

const NavBar = () => {

    const { account } = useContext(Web3Context);
    const { address } = useParams();
    const [hideOwnerSearch, setHideOwnerSearch] = useState(true);
    const [hideLandSearch, setHideLandSearch] = useState(true);
    const [searchAddress, setSearchAddress] = useState(address ? address : "");


    return (
        <nav className="fixed top-0 left-0 w-full bg-white">
            <div className='container flex justify-between h-16 p-3'>
                <img src={logo} className="w-10 h-10 rounded-md" alt="" />

                <div className='flex items-center gap-1'>
                    <NavLink to="/" >
                        Home
                    </NavLink>

                    <NavLink to="/available" >
                        Available Lands
                    </NavLink>

                    <NavLink className='nav' to={`/land/${searchAddress}`} onClick={(e) => { setHideLandSearch(false); e.preventDefault() }} >Search Land</NavLink>
                    <SearchLand setAddr={setSearchAddress} setHide={setHideLandSearch} hide={hideLandSearch}></SearchLand>

                    <NavLink className='nav' to={`/owner/${searchAddress}`} onClick={(e) => { setHideOwnerSearch(false); e.preventDefault() }} >Search Owner</NavLink>
                    <SearchOwners setAddr={setSearchAddress} setHide={setHideOwnerSearch} hide={hideOwnerSearch}></SearchOwners>
                </div>
            </div>
            <div className="border-t ">
                <div className="container flex items-center p-2">
                    <span className="inline-block w-2 h-2 mr-1 bg-green-700 rounded-full"></span>
                    <span className="pr-2 font-semibold">Connected: </span>
                    <span>{account}</span>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
