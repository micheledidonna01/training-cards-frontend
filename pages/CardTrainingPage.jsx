import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SchedeContext } from "../context/schedeContext";
import Modal from "../components/Modal";

const CardTrainingPage = () => {
    const [modify, setModify] = useState(false);
    const { id } = useParams();
    const [scheda, setScheda] = useState();
    const [numeroEs, setNumeroEs] = useState([]);
    const [images, setImages] = useState([]);
    const [deletedExercises, setDeletedExercises] = useState([]);
    const [modifyForm, setModifyForm] = useState({
        id: parseInt(id),
        nome: "",
        esercizi: numeroEs?.map((es, index) => ({
            id: index + 1,
            nome: "",
            tempo: 0,
            image: "",
            descrizione: "",
        })),
    });

    const navigate = useNavigate();

    const { setSchede, getSchede, schede } = useContext(SchedeContext);

    const getScheda = async () => {
        try {
            const promise = await fetch("http://127.0.0.1:3100/api/schede/" + id);
            const data = await promise.json();
            if (!promise.ok) {
                throw new Error(promise.status + " " + promise.statusText);
            }
            setScheda(data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    useEffect(() => {
        getScheda();
        getAllEserciziImages();
    }, []);

    useEffect(() => {
        if (scheda?.esercizi?.length) {
            const arr = Array.from(
                { length: scheda.esercizi.length },
                (_, index) => index
            );
            setNumeroEs(arr);
        }
    }, [scheda]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        for (const idEsercizio of deletedExercises) {
            await deleteEsercizio(idEsercizio);
        }

        const finalScheda = {
            id: id,
            nome:
                modifyForm.nome.trim() !== "" ? modifyForm.nome.trim() : scheda?.nome,
            esercizi: numeroEs.map((es, index) => ({
                id: scheda?.esercizi[index]?.id ?? index + 1,
                nome:
                    modifyForm.esercizi[index]?.nome?.trim() ||
                    scheda?.esercizi[index]?.nome,
                tempo:
                    parseInt(modifyForm.esercizi[index]?.tempo) ||
                    scheda?.esercizi[index]?.tempo,
                image:
                    modifyForm.esercizi[index]?.image?.trim() ||
                    scheda?.esercizi[index]?.image,
                descrizione:
                    modifyForm.esercizi[index]?.descrizione?.trim() ||
                    scheda?.esercizi[index]?.descrizione,
            })),
        };

        modifyScheda(finalScheda);
    };

    const modifyScheda = async (finalScheda) => {
        // prendo solo i nuovi esercizi
        const oldIds = new Set(scheda?.esercizi?.map((e) => e.id));
        const nuoviEsercizi = finalScheda.esercizi.filter(
            (es) => !oldIds.has(es.id)
        );

        // controllo che i nuovi esercizi abbiano tutti i campi compilati
        if (
            nuoviEsercizi.some(
                (es) => !es.nome || !es.tempo || !es.image || !es.descrizione
            )
        ) {
            alert("Completa tutti i campi prima di salvare la scheda.");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:3100/api/schede/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(finalScheda),
            });

            if (!response.ok) throw new Error(response.status + " " + response.statusText);

            const data = await response.json();

            setSchede((prev) =>
                prev.map((prevScheda) =>
                    prevScheda.id === scheda.id ? data : prevScheda
                )
            );

            navigate("/");
            setDeletedExercises([]);
            return data;
        } catch (error) {
            console.error("Errore durante la modifica:", error);
            setDeletedExercises([]);
            return null;
        }

        
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "name") {
            setModifyForm((prev) => ({
                ...prev,
                nome: value,
            }));
            return;
        }

        const match = name.match(/esercizio(\d+)-(.*)/);
        if (match) {
            const index = parseInt(match[1]) - 1;
            const field = match[2];

            setModifyForm((prev) => {
                const updatedEsercizi = [...prev.esercizi];
                updatedEsercizi[index] = {
                    ...updatedEsercizi[index],
                    [field]: value,
                };

                return {
                    ...prev,
                    esercizi: updatedEsercizi,
                };
            });
        }
    };

    const handleCancel = () => {
        if (!scheda) return;

        // Ripristina la lista esercizi
        const arr = Array.from(
            { length: scheda.esercizi.length },
            (_, index) => index
        );
        setNumeroEs(arr);

        // Ripristina i dati del form
        setModifyForm({
            id: parseInt(id),
            nome: scheda.nome || "",
            esercizi: scheda.esercizi.map((es) => ({
                id: es.id,
                nome: es.nome,
                tempo: es.tempo,
                image: es.image || es.immagine || "",
                descrizione: es.descrizione || "",
            })),
        });

        // Svuota eventuali eliminazioni temporanee
        setDeletedExercises([]);

        // Chiudi il modal
        setModify(false);
    };


    const deleteScheda = async (id) => {
        try {
            await fetch("http://127.0.0.1:3100/api/schede/" + id, {
                method: "DELETE",
            });
            setSchede(schede.filter((scheda) => scheda.id !== id));
            getSchede();
            navigate("/");
            
        } catch (error) {
            console.error(error);
        }
    };

    const getAllEserciziImages = async () => {
        try {
            const res = await fetch("http://127.0.0.1:3100/api/schede");
            if (!res.ok) throw new Error(`Errore ${res.status}: ${res.statusText}`);

            const schede = await res.json();

            const allImages = schede.flatMap((scheda) =>
                scheda.esercizi.map(
                    (esercizio) => esercizio.image || esercizio.immagine
                )
            );

            const immaginiPulite = allImages.filter(
                (img) => !!img && img.trim() !== ""
            );

            setImages(immaginiPulite);
            return immaginiPulite;
        } catch (error) {
            console.error("Errore nel recupero delle immagini:", error);
            return [];
        }
    };

    const deleteEsercizio = async (idEsercizio) => {

        try {
            const promise = await fetch(`http://127.0.0.1:3100/api/schede/${id}/esercizi/${idEsercizio}`, {
                method: "DELETE",
            });
            getScheda();
            if (!promise.ok) {
                throw new Error(promise.status + " " + promise.statusText);
            }
            const data = await promise.json();
            setNumeroEs(prev => prev.filter(es => es.id !== idEsercizio));
            return data; 
        } catch (error) {
            console.error(error);
            return null;
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
      `}</style>

            <div className="container py-5">
                {/* Titolo scheda */}
                <div className="text-center mb-5 text-light">
                    <h1 className="fw-bold display-5">{scheda?.nome}</h1>
                    <p className="fs-5 opacity-75">
                        💪 Preparati a completare {scheda?.esercizi?.length || 0} esercizi
                    </p>
                </div>

                {/* Lista esercizi */}
                <div className="row justify-content-center g-4">
                    {scheda?.esercizi.map((esercizio) => (
                        <div
                            key={esercizio.id}
                            className="col-md-5 col-lg-4"
                            style={{ minWidth: "280px" }}
                        >
                            <div className="card border-0 shadow-lg rounded-4 overflow-hidden h-100">
                                <div className="card-body text-center p-4 bg-white">
                                    <h4 className="fw-bold text-primary mb-3">
                                        {esercizio.nome}
                                    </h4>
                                    <p className="text-muted small mb-4">
                                        {esercizio.descrizione}
                                    </p>
                                    <img
                                        src={`http://127.0.0.1:3100/gif/${esercizio?.immagine || esercizio?.image
                                            }`}
                                        alt={esercizio.nome}
                                        className="img-fluid rounded mb-3"
                                        style={{
                                            maxHeight: "220px",
                                            objectFit: "cover",
                                            borderRadius: "15px",
                                        }}
                                    />
                                    <p className="fw-semibold text-primary">
                                        ⏱️ {esercizio.tempo}s
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pulsanti azione */}
                <div className="d-flex justify-content-center flex-wrap gap-3 mt-5">
                    <Link
                        to={`/${id}/esercizio/${scheda?.esercizi[0]?.id}`}
                        className="btn btn-gradient-primary px-5 py-3 fs-5 fw-bold text-uppercase rounded-pill"
                        style={{
                            display: modify ? "none" : "block",
                            letterSpacing: "1px",
                        }}
                    >
                        🚀 Inizia Allenamento
                    </Link>

                    <button
                        onClick={() => setModify((prev) => !prev)}
                        className="btn btn-outline-light px-5 py-3 fs-5 fw-bold text-uppercase rounded-pill"
                        style={{
                            display: modify ? "none" : "block",
                            letterSpacing: "1px",
                        }}
                    >
                        ✏️ Modifica Scheda
                    </button>

                    <button
                        onClick={() => deleteScheda(id)}
                        className="btn btn-outline-danger px-5 py-3 fs-5 fw-bold text-uppercase rounded-pill"
                        style={{
                            display: modify ? "none" : "block",
                            letterSpacing: "1px",
                        }}
                    >
                        🗑️ Elimina Scheda
                    </button>
                </div>

                {/* Modal per modifica */}
                <Modal
                    modifyForm={modifyForm}
                    modify={modify}
                    setModify={setModify}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    numeroEs={numeroEs}
                    setNumeroEs={setNumeroEs}
                    images={images}
                    deleteEsercizio={deleteEsercizio}
                    setDeletedExercises={setDeletedExercises}
                    handleCancel={handleCancel}
                />
            </div>
        </div>
    );
};

export default CardTrainingPage;
