import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { SchedeContext } from "../context/schedeContext";
const CardsTraining = () => {

    const {
        getSchede,
        schede,
    } = useContext(SchedeContext);
  
    useEffect(() => {
        getSchede();
    }, [])

    return (
        <>
        

        <div className="d-flex gap-3">
            {schede.map((scheda) => (
                <Link to={'/' + scheda.id} key={scheda.id} className="col-4">
                    <div className="card">
                        <p className="card-title">{scheda.nome}</p>
                        <ul className="card-list">
                            {scheda.esercizi.map((esercizio, index) => (
                                <li key={index} className="card-item">
                                    <p>{esercizio.nome}</p>
                                    <p>{esercizio.tempo}s</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Link>
            ))}
        </div>
       
        </>
    )
}

export default CardsTraining