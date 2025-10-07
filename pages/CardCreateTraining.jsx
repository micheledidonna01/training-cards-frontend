import { useEffect, useState } from "react";
import { useContext } from "react";
import { SchedeContext } from "../context/schedeContext";

const CardCreateTraining = () => {

    const { setSchede, getSchede } = useContext(SchedeContext);

    const [scheda, setScheda] = useState({
        nome: '',
        esercizi: [
            {
                nome: '',
                tempo: 0,
                immagine: '',
                descrizione: ''
            },
            {
                nome: '',
                tempo: 0,
                immagine: '',
                descrizione: ''
            },
            {
                nome: '',
                tempo: 0,
                immagine: '',
                descrizione: ''
            },
            {
                nome: '',
                tempo: 0,
                immagine: '',
                descrizione: ''
            }
        ]
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


    const addScheda = async() => {
        try{

        
        const promise = fetch('http://127.0.0.1:3100/api/schede', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(scheda)
        })

        const data =  await promise.json();
        if (!promise.ok) {
            throw new Error(promise.status + ' ' + promise.statusText)
        }

        setSchede(prev => [...prev, scheda]);
        return data; 
    }catch(error){
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
            <div className="container p-3">
                <form className="d-flex flex-wrap">
                    <div className=" col-12">
                        <label htmlFor="name" className="form-label">Nome scheda</label>
                        <input type="text" className="form-control" name="name" value={scheda.nome} onChange={handleChange} />
                    </div>


                    <div className="col-12 d-flex flex-wrap">



                        {[1, 2, 3, 4].map((num) => (

                            <div key={num}>
                                <h4>Esercizio {num}</h4>
                                <div className="col-12">
                                    <label htmlFor={`esercizio${num}-nome`} className="form-label">Nome Esercizio {num}</label>
                                    <input type="text" className="form-control" name={`esercizio${num}-nome`} value={scheda.esercizi[num - 1].nome} onChange={handleChange}/>
                                </div>

                                <div className="col-12">
                                    <label htmlFor={`esercizio${num}-tempo`} className="form-label">Tempo esercizio {num}</label>
                                    <input type="number" className="form-control" name={`esercizio${num}-tempo`} value={scheda.esercizi[num - 1].tempo} onChange={handleChange} />
                                </div>

                                <div className="col-12">
                                    <label htmlFor={`esercizio${num}-immagine`} className="form-label">Immagine esercizio {num}</label>

                                    <input type="file" className="form-control" name={`esercizio${num}-immagine`} value={scheda.esercizi[num - 1].immagine} onChange={handleChange} />
                                </div>

                                <div className="col-12">
                                    <label htmlFor={`esercizio${num}-descrizione`} className="form-label">Descrizione esercizio {num}</label>
                                    <input type="text" className="form-control" name={`esercizio${num}-descrizione`} value={scheda.esercizi[num - 1].descrizione} onChange={handleChange} />
                                </div>
                            </div>
                        ))}
                    </div>


                    <button onClick={addScheda}>Aggiungi scheda</button>

                </form>
            </div>
        </>
    )
}

export default CardCreateTraining;