import classNames from "classnames";
import { CiWifiOff } from "react-icons/ci";
import { FaMapMarkedAlt } from "react-icons/fa";
import { BsListCheck } from "react-icons/bs";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";

export function Menu( { currentBasePage }: { currentBasePage: string | undefined }) {

    return (
        <nav className="main-nav">
            <a
                className={ classNames( {
                    "nav-item": true,
                    'nav-item-active': currentBasePage === "home"
                } ) } 
                href="/"
            >
                <IoHomeOutline className="nav-item-icon" />
                <span className="nav-item-label">Home</span>
            </a>
            <a 
                className={ classNames( {
                    'nav-item': true,
                    'nav-item-active': currentBasePage === "trails"
                } ) } 
                href="/trails"
            >
                <FaMapMarkedAlt className="nav-item-icon" />
                <span className="nav-item-label">Trails</span>
            </a>
            <a 
                className={ classNames( {
                    "nav-item": true,
                    'nav-item-active': currentBasePage === "hikes"
                } ) } 
                href="/hikes"
            >
                <BsListCheck className="nav-item-icon" />
                <span className="nav-item-label">Hiking Log</span>
            </a>
            <a 
                className={ classNames( {
                    "nav-item": true,
                    'nav-item-active': currentBasePage === "maps"
                } ) } 
                href="/maps"
            >
                <CiWifiOff className="nav-item-icon" />
                <span className="nav-item-label">Offline Maps</span>
            </a>
            <a 
                className={ classNames( {
                    "nav-item": true,
                    'nav-item-active': currentBasePage === "profile"
                } ) } 
                href="/profile"
            >
                <IoSettingsOutline className="nav-item-icon" />
                <span className="nav-item-label">Profile</span>
            </a>
        </nav>
    )

}