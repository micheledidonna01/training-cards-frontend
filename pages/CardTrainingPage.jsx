import { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SchedeContext } from "../context/schedeContext";
import Modal from "../components/Modal";

const CardTrainingPage = () => {
    const [modify, setModify] = useState(false);
    const { id } = useParams();
    const [scheda, setScheda] = useState();
    const [modifyForm, setModifyForm] = useState({
        id: parseInt(id),
        nome: '',
        esercizi: [
            {
                id: 1,
                nome: '',
                tempo: 0,
                image: '',
                descrizione: ''
            },
            {
                id: 2,
                nome: '',
                tempo: 0,
                image: '',
                descrizione: ''
            },
            {
                id: 3,
                nome: '',
                tempo: 0,
                image: '',
                descrizione: ''
            },
            {
                id: 4,
                nome: '',
                tempo: 0,
                image: '',
                descrizione: ''
            }
        ]
    });

    const navigate = useNavigate();

    const {
        setSchede
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





    const handleSubmit = (e) => {

        e.preventDefault();

        const finalScheda = {
            id: id,
            nome: modifyForm.nome.trim() !== '' ? modifyForm.nome.trim() : scheda?.nome,
            esercizi: [
                {

                    nome: modifyForm.esercizi[0].nome.trim() !== '' ? modifyForm.esercizi[0].nome.trim() : scheda?.esercizi[0]?.nome,
                    tempo: parseInt(modifyForm.esercizi[0].tempo) !== 0 ? modifyForm.esercizi[0].tempo : scheda?.esercizi[0]?.tempo,
                    image: modifyForm.esercizi[0].image !== '' ? modifyForm.esercizi[0].image : scheda?.esercizi[0]?.image,
                    descrizione: modifyForm.esercizi[0].descrizione.trim() !== '' ? modifyForm.esercizi[0].descrizione.trim() : scheda?.esercizi[0]?.descrizione
                },
                {

                    nome: modifyForm.esercizi[1].nome.trim() !== '' ? modifyForm.esercizi[1].nome.trim() : scheda?.esercizi[1]?.nome,
                    tempo: parseInt(modifyForm.esercizi[1].tempo) !== 0 ? modifyForm.esercizi[1].tempo : scheda?.esercizi[1]?.tempo,
                    image: modifyForm.esercizi[1].image !== '' ? modifyForm.esercizi[1].image : scheda?.esercizi[1]?.image,
                    descrizione: modifyForm.esercizi[1].descrizione.trim() !== '' ? modifyForm.esercizi[1].descrizione.trim() : scheda?.esercizi[1]?.descrizione
                },
                {

                    nome: modifyForm.esercizi[2].nome.trim() !== '' ? modifyForm.esercizi[2].nome.trim() : scheda?.esercizi[2]?.nome,
                    tempo: parseInt(modifyForm.esercizi[2].tempo) !== 0 ? modifyForm.esercizi[2].tempo : scheda?.esercizi[2]?.tempo,
                    image: modifyForm.esercizi[2].image !== '' ? modifyForm.esercizi[2].image : scheda?.esercizi[2]?.image,
                    descrizione: modifyForm.esercizi[2].descrizione.trim() !== '' ? modifyForm.esercizi[2].descrizione.trim() : scheda?.esercizi[2]?.descrizione
                },
                {

                    nome: modifyForm.esercizi[3].nome.trim() !== '' ? modifyForm.esercizi[3].nome.trim() : scheda?.esercizi[3]?.nome,
                    tempo: parseInt(modifyForm.esercizi[3]) !== 0 ? modifyForm.esercizi[3].tempo : scheda?.esercizi[3]?.tempo,
                    image: modifyForm.esercizi[3].image !== '' ? modifyForm.esercizi[3].image : scheda?.esercizi[3]?.image,
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
                    <img src={`http://127.0.0.1:3100/gif/${esercizio?.image}`} alt="esercizio" className="img-fluid" />
                    <hr className="w-100 color-black" />
                </div>

            </div>
        ))}

        <div className="d-flex justify-content-center pt-5 flex-wrap">
            <Link to={'/' + id + '/esercizio/' + scheda?.esercizi[0]?.id} className="btn btn-primary col-6" esercizi={scheda?.esercizi} style={{ display: modify ? 'none' : 'block' }}>Inizia</Link>
        </div>

        <div className="d-flex justify-content-center pt-2 flex-wrap">
            <button onClick={() => setModify(prev => !prev)} className="btn btn-primary col-6" style={{ display: modify ? 'none' : 'block' }} >Modifica</button>
            <Modal modifyForm={modifyForm} modify={modify} setModify={setModify} handleSubmit={handleSubmit} handleChange={handleChange} />
        </div>
    </>
}

export default CardTrainingPage;