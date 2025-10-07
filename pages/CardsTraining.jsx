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


            <div className="row flex-wrap gap-4 justify-content-center">
                {schede.map((scheda, index) => (
                    <div className="w-50 text-decoration-none W-50 scheda" key={index}>
                        <Link to={'/' + scheda.id}  >

                            <h5 className="card-title p-2">{scheda.nome}</h5>
                            <ul className="list-group p-3">
                                {scheda.esercizi.map((esercizio, index) => (
                                    <li key={index} className="list-group-item list-group-item-action list">
                                        <p>{esercizio.nome}</p>
                                        <p>{esercizio.tempo}s</p>
                                    </li>
                                ))}
                            </ul>
                        </Link>
                        <div>
                            <button onClick={() => deleteScheda(scheda.id)} className="btn btn-danger">Elimina</button>
                            <Link to={"/" + scheda.id} className="btn btn-warning">Modifica</Link>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}

export default CardsTraining