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
        if (timer <= 0){
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
        <>
            <div className="d-flex justify-content-center align-items-center h-100">
                <div>
                    <h1>Esercizio {esercizio?.id}</h1>
                    <h2>{esercizio?.nome}</h2>
                    <p>{esercizio?.descrizione}</p>
                    <img src={`http://127.0.0.1:3100/gif/${esercizio?.image}`} alt="manuvir" />

                </div>
            </div>

            {timer === 0 && pauseTimer > 0 && (                
                <div className="d-flex justify-content-end">
                <p>Riposati per {pauseTimer} secondi</p>
                <div className="spinner-border" role="status">
                    {/* <span className="sr-only">Loading...</span> */}
                    <span >Loading...</span>
                </div>
            </div>
            )}

            <div className="row justify-content-end align-items-end gap-2 mt-4 px-3">
                <button className="btn btn-primary" onClick={nextExercise} disabled={pauseTimer > 0 || esercizi.length === esercizio?.id ? true : false}>
                    {timer <= 0  ? "Avanti" : timer}
                </button>

                {esercizi.length === esercizio?.id && (
                    <>
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate('/')}
                            ref={btnHomeRef}
                            style={{ display: 'none' }}
                        >
                            Home
                        </button>
                        <button
                            className="btn btn-warning"
                            onClick={() => navigate(`/${id}/esercizio/${esercizi[0].id}`)}
                            ref={btnRestartRef}
                            style={{ display: 'none' }}
                        >
                            Ricomincia
                        </button>
                    </>
                )}
            </div>
        </>
    );
};

export default Esercizio;
