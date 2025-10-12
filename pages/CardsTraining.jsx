import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { SchedeContext } from "../context/schedeContext";

const CardsTraining = () => {
    const { getSchede, schede, setSchede } = useContext(SchedeContext);

    useEffect(() => {
        getSchede();
    }, []);

    const deleteScheda = async (id) => {
        try {
            await fetch("http://127.0.0.1:3100/api/schede/" + id, {
                method: "DELETE",
            });
            setSchede(schede.filter((scheda) => scheda.id !== id));
            getSchede();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            className="min-vh-100 py-5 d-flex flex-column align-items-center"
            style={{
                background: "linear-gradient(135deg, #1e3c72, #2a5298, #6dd5ed)",
                backgroundSize: "400% 400%",
                animation: "gradientShift 15s ease infinite",
            }}
        >
            <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .card-training:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
        }
      `}</style>

            <div className="text-center text-light mb-5">
                <h1 className="fw-bold display-4">💪 Le Tue Schede di Allenamento</h1>
                <p className="fs-5 opacity-75">
                    Gestisci, modifica e inizia il tuo percorso fitness.
                </p>
            </div>

            <div className="container">
                <div className="row g-4 justify-content-center">
                    {schede.length > 0 ? (
                        schede.map((scheda, index) => (
                            <div
                                key={index}
                                className="col-12 col-sm-10 col-md-6 col-lg-4 col-xl-3"
                            >
                                <div
                                    className="card card-training shadow-lg border-0 rounded-4 overflow-hidden bg-white h-100 position-relative"
                                    style={{
                                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    }}
                                >
                                    {/* Header */}
                                    <div
                                        className="card-header bg-gradient text-white d-flex justify-content-between align-items-center"
                                        style={{
                                            background: "linear-gradient(45deg, #007bff, #00d4ff)",
                                        }}
                                    >
                                        <h5 className="mb-0 fw-bold text-dark">{scheda.nome}</h5>
                                        <span className="badge bg-white text-primary px-3 py-2 shadow-sm">
                                            {scheda.esercizi.length} esercizi
                                        </span>
                                    </div>

                                    {/* Body */}
                                        <div className="card-body">
                                    <Link
                                        to={"/" + scheda.id}
                                        className="text-decoration-none text-dark"
                                        style={{ cursor: "pointer" }}
                                    >
                                            <ul className="list-group list-group-flush">
                                                {scheda.esercizi.slice(0, 3).map((esercizio, i) => (
                                                    <li
                                                        key={i}
                                                        className="list-group-item d-flex justify-content-between align-items-center border-0"
                                                    >
                                                        <div>
                                                            <p className="mb-1 fw-semibold text-primary">
                                                                🏋️‍♂️ {esercizio.nome}
                                                            </p>
                                                            <small className="text-muted">
                                                                Tempo:{" "}
                                                                <span className="fw-bold text-dark">
                                                                    {esercizio.tempo}s
                                                                </span>
                                                            </small>
                                                        </div>
                                                        <span className="text-muted">#{i + 1}</span>
                                                    </li>
                                                ))}
                                                {scheda.esercizi.length > 3 && (
                                                    <li className="list-group-item text-center text-muted small">
                                                        + altri {scheda.esercizi.length - 3} esercizi...
                                                    </li>
                                                )}
                                            </ul>
                                    </Link>
                                        </div>

                                    {/* Footer */}
                                    <div className="card-footer bg-light d-flex justify-content-center gap-3 py-3">
                                        <button
                                            onClick={() => deleteScheda(scheda.id)}
                                            className="btn btn-outline-danger px-4 rounded-pill fw-semibold"
                                        >
                                            🗑 Elimina
                                        </button>
                                        <Link
                                            to={"/" + scheda.id}
                                            className="btn btn-primary px-4 rounded-pill fw-semibold text-white"
                                        >
                                            🚀 Apri
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-light mt-5">
                            <h3>Nessuna scheda trovata 😢</h3>
                            <p className="opacity-75">
                                Crea una nuova scheda di allenamento per iniziare!
                            </p>
                            <Link
                                to="/create-training"
                                className="btn btn-light px-5 py-3 mt-3 rounded-pill fw-bold"
                            >
                                ➕ Crea Scheda
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CardsTraining;
