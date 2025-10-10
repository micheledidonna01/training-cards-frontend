import { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SchedeContext } from "../context/schedeContext";
import Modal from "../components/Modal";

const CardTrainingPage = () => {
    const [modify, setModify] = useState(false);
    const { id } = useParams();
    const [scheda, setScheda] = useState();
    const [numeroEs, setNumeroEs] = useState([]);
    const [modifyForm, setModifyForm] = useState({
        id: parseInt(id),
        nome: '',
        esercizi: numeroEs?.map((es, index) => ({
            id: index + 1,
            nome: '',
            tempo: 0,
            image: '',
            descrizione: ''
        }))
    });

    const navigate = useNavigate();

    const {
        setSchede,
        getSchede,
        schede
    } = useContext(SchedeContext);


    const getScheda = async () => {
        try {
            const promise = await fetch('http://127.0.0.1:3100/api/schede/' + id);
            const data = await promise.json();
            if (!promise.ok) {
                throw new Error(promise.status + ' ' + promise.statusText)
            }
            setScheda(data);
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    useEffect(() => {
        getScheda();
    }, []);



    useEffect(() => {
        if (scheda?.esercizi?.length) {
            const arr = Array.from({ length: scheda.esercizi.length }, (_, index) => index);
            setNumeroEs(arr);
        }
    }, [scheda]);

    console.log(numeroEs);




    const handleSubmit = (e) => {
        e.preventDefault();

        const finalScheda = {
            id: id,
            nome: modifyForm.nome.trim() !== '' ? modifyForm.nome.trim() : scheda?.nome,
            esercizi: numeroEs.map((es, index) => {
                if ((numeroEs.length - 1) <= index) {
                    if ((modifyForm.esercizi[index]?.nome && modifyForm.esercizi[index]?.tempo && modifyForm.esercizi[index]?.image && modifyForm.esercizi[index]?.descrizione) &&
                        modifyForm.esercizi[index]?.nome.trim() !== '' ||
                        modifyForm.esercizi[index]?.tempo !== 0 ||
                        modifyForm.esercizi[index]?.image !== '' ||
                        modifyForm.esercizi[index]?.descrizione !== ''
                    ) {
                        return {
                            id: index + 1,
                            nome: es.nome?.trim(),
                            tempo: parseInt(es.tempo),
                            image: es.image !== '',
                            descrizione: es.descrizione?.trim()
                        }
                    } else {
                        alert('Completa tutti i campi dei nuovi esercizi aggiunti');
                        return;

                    }

                }
                return {
                    id: scheda?.esercizi[index]?.id ?? index + 1,
                    nome: modifyForm.esercizi[index]?.nome?.trim() || scheda?.esercizi[index]?.nome,
                    tempo: parseInt(modifyForm.esercizi[index]?.tempo) || scheda?.esercizi[index]?.tempo,
                    image: modifyForm.esercizi[index]?.image || scheda?.esercizi[index]?.image,
                    descrizione: modifyForm.esercizi[index]?.descrizione?.trim() || scheda?.esercizi[index]?.descrizione
                }
            })
        }

        if (numeroEs.length > finalScheda.esercizi.length) {
            const isAllCampiFull = finalScheda.esercizi.every(esercizio => esercizio.nome !== '' && esercizio.tempo !== 0 && esercizio.image !== '' && esercizio.descrizione !== '');
            if (isAllCampiFull === false) {
                alert('Completa tutti i campi dei nuovi esercizi');
                return;
            }
        } else {
            modifyScheda(finalScheda);
            return;
        }

        modifyScheda(finalScheda);
    }


    console.log(scheda);
    console.log(modifyForm);
    const modifyScheda = async (finalScheda) => {
        try {
            const response = await fetch(`http://127.0.0.1:3100/api/schede/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(finalScheda)
            });

            if (!response.ok) {
                throw new Error(response.status + ' ' + response.statusText);
            }

            const data = await response.json();

            setSchede(prev =>
                prev.map(prevScheda => prevScheda.id === scheda.id ? data : prevScheda)
            );

            navigate('/');
            return data;

        } catch (error) {
            console.error('Errore durante la modifica:', error);
            return null;
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "name") {
            setModifyForm(prev => ({
                ...prev,
                nome: value
            }));
            return;
        }

        const match = name.match(/esercizio(\d+)-(.*)/);
        if (match) {
            const index = parseInt(match[1]) - 1;
            const field = match[2];

            setModifyForm(prev => {
                const updatedEsercizi = [...prev.esercizi];
                updatedEsercizi[index] = {
                    ...updatedEsercizi[index],
                    [field]: value
                };

                return {
                    ...prev,
                    esercizi: updatedEsercizi
                };
            });
        }
    };

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

    return <>

        <div className="container py-5">
            {/* Titolo scheda */}
            <div className="text-center mb-5">
                <h1 className="fw-bold display-5 text-primary">{scheda?.nome}</h1>
                <p className="text-muted fs-5">
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
                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 hover-scale">
                            <div className="card-body text-center p-4">
                                <h4 className="fw-bold text-dark mb-3">{esercizio.nome}</h4>
                                <p className="text-muted small mb-4">{esercizio.descrizione}</p>
                                <img
                                    src={`http://127.0.0.1:3100/gif/${esercizio?.immagine || esercizio?.image}`}
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
                    className="btn btn-outline-primary px-5 py-3 fs-5 fw-bold text-uppercase rounded-pill"
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
            />
        </div>

    </>
}

export default CardTrainingPage;