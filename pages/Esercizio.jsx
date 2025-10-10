import { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SchedeContext } from "../context/schedeContext";

const Esercizio = () => {
    const { esercizi, getEsercizi } = useContext(SchedeContext);
    const { id, idEsercizio } = useParams();
    const [esercizio, setEsercizio] = useState(null);
    const [timer, setTimer] = useState(0);
    const [pauseTimer, setPauseTimer] = useState(10);

    const btnHomeRef = useRef(null);
    const btnRestartRef = useRef(null);
    const navigate = useNavigate();

    // Carica lista esercizi e esercizio singolo
    useEffect(() => {
        getEsercizi(id);
        getEsercizio();
    }, [idEsercizio]);

    // Carica esercizio specifico
    const getEsercizio = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:3100/api/schede/${id}/esercizi/${idEsercizio}`);
            const data = await res.json();

            if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

            setEsercizio(data);
        } catch (error) {
            console.error(error);
        }
    };

    // Avvia il timer e gestisce la visibilità dei bottoni
    useEffect(() => {
        if (esercizio?.tempo) {
            const tempo = parseInt(esercizio.tempo);
            setTimer(tempo);
            setPauseTimer(10);
            // Nascondi bottoni
            if (btnHomeRef.current) btnHomeRef.current.style.display = "none";
            if (btnRestartRef.current) btnRestartRef.current.style.display = "none";

            // Mostra dopo X secondi
            const timeout = setTimeout(() => {
                if (btnHomeRef.current) btnHomeRef.current.style.display = "block";
                if (btnRestartRef.current) btnRestartRef.current.style.display = "block";
            }, tempo * 1000);

            return () => clearTimeout(timeout);
        }
    }, [esercizio]);

    // Countdown timer
    useEffect(() => {
        if (timer <= 0) {
            const interval = setInterval(() => {
                setPauseTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        };

    }, [timer]);


    useEffect(() => {
        if (pauseTimer <= 0) return;

        const interval = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [pauseTimer]);

    // Passa all'esercizio successivo
    const nextExercise = () => {
        const nextId = parseInt(idEsercizio) + 1;
        const next = esercizi.find(es => es.id === nextId);

        if (!next || timer > 0) return;
        navigate(`/${id}/esercizio/${nextId}`);
    };

    // JSX
    return (
        <div className="exercise-container position-relative d-flex flex-column align-items-center justify-content-center text-center min-vh-100">

            {/* Titolo esercizio */}
            <div className="exercise-header mb-4">
                <h1 className="fw-bold text-light mb-2">
                    {esercizio?.nome}
                    <span className="text-danger ms-2">
                        {esercizio?.id}/{esercizi.length}
                    </span>
                </h1>
                <p className="text-secondary fs-5">{esercizio?.descrizione}</p>
            </div>

            {/* Immagine esercizio */}
            <div className="exercise-image mb-4">
                <img
                    src={`http://127.0.0.1:3100/gif/${esercizio?.image}`}
                    alt="esercizio"
                    className="img-fluid rounded-4 shadow-lg"
                    style={{ maxHeight: "350px", objectFit: "contain" }}
                />
            </div>

            {/* Timer centrale */}
            <div className="timer-section mt-3">
                {timer > 0 ? (
                    <div className="circle-timer border-info text-info">
                        <h2 className="fw-bold mb-0">{timer}s</h2>
                        <small className="text-uppercase">Allenati!</small>
                    </div>
                ) : pauseTimer > 0 ? (
                    <div className="circle-timer border-warning text-warning">
                        <h2 className="fw-bold mb-0">{pauseTimer}s</h2>
                        <small className="text-uppercase">Riposati</small>
                    </div>
                ) : null}
            </div>

            {/* Pulsanti */}
            <div className="button-group d-flex justify-content-center gap-3 flex-wrap mt-5 position-fixed bottom-0 pb-4">
                <button
                    className="btn btn-lg btn-outline-light px-4"
                    onClick={nextExercise}
                    disabled={pauseTimer > 0 || esercizi.length === esercizio?.id}
                >
                    {timer <= 0 ? "Avanti ▶️" : `${timer}s`}
                </button>

                {esercizi.length === esercizio?.id && (
                    <>
                        <button
                            className="btn btn-lg btn-outline-success px-4"
                            onClick={() => navigate('/')}
                            ref={btnHomeRef}
                            style={{ display: "none" }}
                        >
                            🏠 Home
                        </button>
                        <button
                            className="btn btn-lg btn-outline-warning px-4"
                            onClick={() => navigate(`/${id}/esercizio/${esercizi[0].id}`)}
                            ref={btnRestartRef}
                            style={{ display: "none" }}
                        >
                            🔁 Ricomincia
                        </button>
                    </>
                )}
            </div>

        </div>

    );
};

export default Esercizio;
