import './index.css';
import logo from './logo.png';
import { MdOutlineSearch } from 'react-icons/md';
const Header = () => {
    const addshadowbg = (event) => {
        document.getElementById('searchBox').classList.add('addshadowToSearch');
    };
    const removebg = () => {
        document
            .getElementById('searchBox')
            .classList.remove('addshadowToSearch');
    };
    return (
        <div className="headerBox">
            <button className="MenuBtn" id="menuIcon">
                <div class="menu-icon">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
            </button>
            <div className="keeplogoBox">
                <img className="keeplogo" src={logo} alt="logo" />
                <p className="keeplogotxt">Apsona Keep</p>
            </div>
            <div className="searchBox" id="searchBox">
                <MdOutlineSearch className="searchele" />

                <input
                    onClick={addshadowbg}
                    onBlur={removebg}
                    className="searchInputEl"
                    type="search"
                    placeholder="Search"
                />
            </div>
        </div>
    );
};
export default Header;
