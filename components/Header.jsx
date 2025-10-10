import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="header-gradient position-fixed top-0 w-100 d-flex px-5 py-3 justify-content-between align-items-center shadow-sm z-3">
            <Link to="/" className="text-light text-decoration-none">
                <h3 className="fw-bold m-0">🏋️ Training <span className="text-accent">Cards</span></h3>
            </Link>

            <Link
                to="/create-training"
                className="btn btn-gradient px-4 py-2 rounded-pill fw-semibold"
            >
                ➕ Nuova Scheda
            </Link>
        </header>
    );
};

export default Header;
