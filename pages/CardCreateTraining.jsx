import { useEffect, useState } from "react";
import { useContext } from "react";
import { SchedeContext } from "../context/schedeContext";

const CardCreateTraining = () => {

    const { setSchede, getSchede } = useContext(SchedeContext);

    const [numeroEs, setNumeroEs] = useState([0, 1, 2, 3]);

    const [scheda, setScheda] = useState({
        nome: '',
        esercizi: numeroEs.map((index) => ({
            id: index + 1,
            nome: '',
            tempo: 0,
            immagine: '',
            descrizione: ''
        }))
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Caso 1: nome della scheda
        if (name === "name") {
            setScheda(prev => ({
                ...prev,
                nome: value
            }));
            return;
        }

        // Caso 2: campi degli esercizi (es: "esercizio2-nome")
        // Estraggo indice e campo dal nome
        const match = name.match(/esercizio(\d+)-(.*)/);
        if (match) {
            const index = parseInt(match[1]) - 1; // da 1-based a 0-based
            const field = match[2];

            setScheda(prev => {
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


    const addScheda = async () => {

        if(scheda.nome === '' || scheda.esercizi.some(es => es.nome === '')){
            alert('Completa tutti i campi');
            return;
        } 
        try {


            const promise = fetch('http://127.0.0.1:3100/api/schede', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(scheda)
            })

            const data = await promise.json();
            if (!promise.ok) {
                throw new Error(promise.status + ' ' + promise.statusText)
            }

            setSchede(prev => [...prev, scheda]);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }

        // setScheda({
        //     ...scheda,
        //     esercizi: [
        //         ...scheda.esercizi,
        //     ]
        // })

        // setSchede(prev => [...prev, scheda]);
    }


    useEffect(() => {
        getSchede();
    }, [])

    return (
        <>
            <div className="container py-5 my-5">
                <div className="form-container mx-auto p-4 rounded-4 shadow-lg bg-white">
                    <h2 className="text-center mb-4 fw-bold text-primary">
                        ✨ Crea una nuova scheda di allenamento
                    </h2>

                    <form className="d-flex flex-column align-items-center" onSubmit={addScheda}>
                        <div className="col-10 mb-4">
                            <label htmlFor="name" className="form-label fw-semibold">Nome scheda</label>
                            <input
                                type="text"
                                className="form-control form-control-lg shadow-sm rounded-3"
                                name="name"
                                value={scheda.nome}
                                onChange={handleChange}
                                placeholder="Es. Full Body, Cardio Blast..."
                            />
                        </div>

                        <div className="col-12 d-flex flex-wrap justify-content-center gap-4">
                            {numeroEs.map((num) => (
                                <div key={num} className="card esercizio-card col-md-5 p-3 rounded-4 shadow-sm border-0 bg-light">
                                    <h4 className="fw-bold text-primary mb-3">Esercizio {num + 1}</h4>

                                    <div className="mb-3">
                                        <label className="form-label">Nome esercizio</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name={`esercizio${num + 1}-nome`}
                                            value={scheda.esercizi[num]?.nome}
                                            onChange={handleChange}
                                            placeholder="Es. Push-up"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Tempo (s)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name={`esercizio${num + 1}-tempo`}
                                            value={scheda.esercizi[num]?.tempo}
                                            onChange={handleChange}
                                            placeholder="Es. 30"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Immagine (nome file o URL)</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name={`esercizio${num + 1}-immagine`}
                                            value={scheda.esercizi[num]?.immagine}
                                            onChange={handleChange}
                                            placeholder="es. pushup.gif"
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <label className="form-label">Descrizione</label>
                                        <textarea
                                            className="form-control"
                                            name={`esercizio${num + 1}-descrizione`}
                                            value={scheda.esercizi[num]?.descrizione}
                                            onChange={handleChange}
                                            rows="2"
                                            placeholder="Descrivi brevemente l'esercizio..."
                                        ></textarea>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="button" className="btn btn-gradient mt-4 px-5 py-2 rounded-pill fw-semibold" onClick={() => setNumeroEs([...numeroEs, numeroEs.length])} disabled={numeroEs.length === 10}>{numeroEs.length === 10 ? '🚫 Massimo 10 esercizi' : '+'}</button>
                        <button type="submit" className="btn btn-gradient mt-4 px-5 py-2 rounded-pill fw-semibold">
                            💪 Crea scheda
                        </button>
                    </form>
                </div>
            </div>
        </>

    )
}

export default CardCreateTraining;