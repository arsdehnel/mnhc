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
                    'nav-item': true,
                    'nav-item-active': currentBasePage === "trails"
                } ) } 
                href="/trails"
            >
                <span className="nav-item-icon"><FaMapMarkedAlt /></span>
                <span className="nav-item-label">Trails</span>
            </a>
            <a 
                className={ classNames( {
                    "nav-item": true,
                    'nav-item-active': currentBasePage === "hikes"
                } ) } 
                href="/hikes"
            >
                <span className="nav-item-icon"><BsListCheck /></span>
                <span className="nav-item-label">Hiking Log</span>
            </a>
            <a 
                className={ classNames( {
                    "nav-item": true,
                    'nav-item-active': currentBasePage === "maps"
                } ) } 
                href="/maps"
            >
                <span className="nav-item-icon"><CiWifiOff /></span>
                <span className="nav-item-label">Offline Maps</span>
            </a>
            <a 
                className={ classNames( {
                    "nav-item": true,
                    'nav-item-active': currentBasePage === "profile"
                } ) } 
                href="/profile"
            >
                <span className="nav-item-icon"><IoSettingsOutline /></span>
                <span className="nav-item-label">Profile</span>
            </a>
        </nav>
    )

}