import { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SchedeContext } from "../context/schedeContext";

const CardTrainingPage = () => {
    const [modify, setModify] = useState(false);
    const {id} = useParams();
    const [scheda, setScheda] = useState();
    const [modifyForm, setModifyForm] = useState({
        id: parseInt(id),
        nome: '',
        esercizi: [
            {
                id: 1,
                nome: '',
                tempo: 0,
                immagine: '',
                descrizione: ''
            },
            {
                id: 2,
                nome: '',
                tempo: 0,
                immagine: '',
                descrizione: ''
            },
            {
                id: 3,
                nome: '',
                tempo: 0,
                immagine: '',
                descrizione: ''
            },
            {
                id: 4,
                nome: '',
                tempo: 0,
                immagine: '',
                descrizione: ''
            }
        ]
    });

    const navigate = useNavigate();

    const {
        setSchede
    } = useContext(SchedeContext);

    const getScheda = async() => {
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




   
    const handleSubmit = (e) => {
        
        e.preventDefault();

        const finalScheda = {
            id: id,
            nome: modifyForm.nome.trim() !== '' ? modifyForm.nome.trim() : scheda?.nome,
            esercizi: [
                {
                    
                    nome: modifyForm.esercizi[0].nome.trim() !== '' ? modifyForm.esercizi[0].nome.trim() : scheda?.esercizi[0]?.nome,
                    tempo: parseInt(modifyForm.esercizi[0].tempo) !== 0 ? modifyForm.esercizi[0].tempo : scheda?.esercizi[0]?.tempo,
                    immagine: modifyForm.esercizi[0].immagine.trim() !== '' ? modifyForm.esercizi[0].immagine.trim() : scheda?.esercizi[0]?.immagine ,
                    descrizione: modifyForm.esercizi[0].descrizione.trim() !== '' ? modifyForm.esercizi[0].descrizione.trim() : scheda?.esercizi[0]?.descrizione
                },
                {
                    
                    nome: modifyForm.esercizi[1].nome.trim() !== '' ? modifyForm.esercizi[1].nome.trim() : scheda?.esercizi[1]?.nome,
                    tempo: parseInt(modifyForm.esercizi[1].tempo) !== 0 ? modifyForm.esercizi[1].tempo : scheda?.esercizi[1]?.tempo,
                    immagine: modifyForm.esercizi[1].immagine.trim() !== '' ? modifyForm.esercizi[1].immagine.trim() : scheda?.esercizi[1]?.immagine,
                    descrizione: modifyForm.esercizi[1].descrizione.trim() !== '' ? modifyForm.esercizi[1].descrizione.trim() : scheda?.esercizi[1]?.descrizione
                },
                {
                    
                    nome: modifyForm.esercizi[2].nome.trim() !== '' ? modifyForm.esercizi[2].nome.trim() : scheda?.esercizi[2]?.nome,
                    tempo: parseInt(modifyForm.esercizi[2].tempo) !== 0 ? modifyForm.esercizi[2].tempo : scheda?.esercizi[2]?.tempo,
                    immagine: modifyForm.esercizi[2].immagine.trim() !== '' ? modifyForm.esercizi[2].immagine.trim() : scheda?.esercizi[2]?.immagine,
                    descrizione: modifyForm.esercizi[2].descrizione.trim() !== '' ? modifyForm.esercizi[2].descrizione.trim() : scheda?.esercizi[2]?.descrizione
                },
                {
                    
                    nome: modifyForm.esercizi[3].nome.trim() !== '' ? modifyForm.esercizi[3].nome.trim() : scheda?.esercizi[3]?.nome,
                    tempo: parseInt(modifyForm.esercizi[3]) !== 0 ? modifyForm.esercizi[3].tempo : scheda?.esercizi[3]?.tempo,
                    immagine: modifyForm.esercizi[3].immagine.trim() !== '' ? modifyForm.esercizi[3].immagine.trim() : scheda?.esercizi[3]?.immagine,
                    descrizione: modifyForm.esercizi[3].descrizione.trim() !== '' ? modifyForm.esercizi[3].descrizione.trim() : scheda?.esercizi[3]?.descrizione
                }
            ]
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


    return <>
        
        <h1 className="text-center mt-5">{scheda?.nome}</h1>
        {scheda?.esercizi.map((esercizio) => (
            <div key={esercizio.id} className="text-center pt-4 d-flex justify-content-center align-items-center gap-1">
                <div>
                <h2>{esercizio.nome}</h2>
                <p>{esercizio.descrizione}</p>
                    <img src={`http://127.0.0.1:3100/gif/${esercizio?.image}`} alt="esercizio" className="img-fluid"/>
                    <hr className="w-100 color-black" />
                </div>
                
            </div>
        ))}

        <div className="d-flex justify-content-center py-5">

            <Link to={'/' + id + '/esercizio/' + scheda?.esercizi[0]?.id} className="btn btn-primary col-3" esercizi={scheda?.esercizi} style={{ display: modify ? 'none' : 'block' }}>Inizia</Link>
        <button onClick={() => setModify(prev => !prev)} className="btn btn-primary" style={{display: modify ? 'none' : 'block'}} >Modifica</button>
            {modify === true && (
                <>
                <form className="d-flex flex-wrap" onSubmit={handleSubmit}>
                    <div className=" col-12">
                        <label htmlFor="name" className="form-label">Nome scheda</label>
                        <input type="text" className="form-control" name="name" value={modifyForm.nome} onChange={handleChange} />
                    </div>


                    <div className="col-12 d-flex flex-wrap">



                        {[1, 2, 3, 4].map((num) => (

                            <div key={num}>
                                <h4>Esercizio {num}</h4>
                                <div className="col-12">
                                    <label htmlFor={`esercizio${num}-nome`} className="form-label">Nome Esercizio {num}</label>
                                    <input type="text" className="form-control" name={`esercizio${num}-nome`} value={modifyForm.esercizi[num - 1].nome} onChange={handleChange} />
                                </div>

                                <div className="col-12">
                                    <label htmlFor={`esercizio${num}-tempo`} className="form-label">Tempo esercizio {num}</label>
                                    <input type="number" className="form-control" name={`esercizio${num}-tempo`} value={modifyForm.esercizi[num - 1].tempo} onChange={handleChange} />
                                </div>

                                <div className="col-12">
                                    <label htmlFor={`esercizio${num}-immagine`} className="form-label">Immagine esercizio {num}</label>

                                    <input type="text" className="form-control" name={`esercizio${num}-immagine`} value={modifyForm.esercizi[num - 1].immagine} onChange={handleChange} />
                                </div>

                                <div className="col-12">
                                    <label htmlFor={`esercizio${num}-descrizione`} className="form-label">Descrizione esercizio {num}</label>
                                    <input type="text" className="form-control" name={`esercizio${num}-descrizione`} value={modifyForm.esercizi[num - 1].descrizione} onChange={handleChange} />
                                </div>
                            </div>
                        ))}
                    </div>


                    <button className="btn btn-primary">Conferma</button>

                </form>
                
                </>
            )}
        </div>
    </>
}

export default CardTrainingPage;