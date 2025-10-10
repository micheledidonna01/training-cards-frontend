import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { SchedeContext } from "../context/schedeContext";
const CardsTraining = () => {


    const {
        getSchede,
        schede,
        setSchede
    } = useContext(SchedeContext);

    useEffect(() => {
        getSchede();
    }, [])


    const deleteScheda = async (id) => {
        try {
            await fetch('http://127.0.0.1:3100/api/schede/' + id, {
                method: 'DELETE'
            });
            setSchede(schede.filter((scheda) => scheda.id !== id));
            getSchede();
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <>


            <div className="row flex-wrap gap-4 justify-content-center py-5">
                {schede.map((scheda, index) => (
                    <div
                        key={index}
                        className="card shadow-lg border-0 rounded-4 overflow-hidden w-50 bg-light mx-auto my-3 hover-scale"
                        style={{ transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
                    >
                        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                            <h5 className="mb-0 fw-bold">{scheda.nome}</h5>
                            <span className="badge bg-white text-primary px-3 py-2 shadow-sm">
                                {scheda.esercizi.length} esercizi
                            </span>
                        </div>

                        <Link
                            to={"/" + scheda.id}
                            className="text-decoration-none text-dark"
                            style={{ cursor: "pointer" }}
                        >
                            <div className="card-body bg-white">
                                <ul className="list-group list-group-flush">
                                    {scheda.esercizi.map((esercizio, index) => (
                                        <li
                                            key={index}
                                            className="list-group-item d-flex justify-content-between align-items-center"
                                        >
                                            <div>
                                                <p className="mb-1 fw-semibold">
                                                    🏋️‍♂️ {esercizio.nome}
                                                </p>
                                                <small className="text-muted">
                                                    Tempo: <span className="fw-bold text-primary">{esercizio.tempo}s</span>
                                                </small>
                                            </div>
                                            <span className="text-muted">#{index + 1}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Link>

                        <div className="card-footer bg-light d-flex justify-content-center gap-3 py-3">
                            <button
                                onClick={() => deleteScheda(scheda.id)}
                                className="btn btn-outline-danger px-4 rounded-pill fw-semibold"
                            >
                                🗑 Elimina
                            </button>
                        </div>
                    </div>

                ))}
            </div>

        </>
    )
}

export default CardsTraining