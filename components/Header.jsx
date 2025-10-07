import { Link } from "react-router-dom";

const Header = () => {
    return <>
        <header className="position-fixed top-0 w-100 d-flex p-3 bg-dark justify-content-between align-items-center">
            <Link to={'/'} className="text-light text-decoration-none"><h4>Training Cards</h4></Link>
            <Link to={'/create-training'} className="text-light text-decoration-none"><h5>New Training</h5></Link>
        </header>
    </>
}

export default Header;