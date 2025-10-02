import { Link } from "react-router-dom";

const Header = () => {
    return <>
        <div className="position-fixed top-0 w-100 d-flex bg-dark p-3">
            <Link to={'/'} className="text-light text-decoration-none"><h4>Training Cards</h4></Link>
        </div>
    </>
}

export default Header;