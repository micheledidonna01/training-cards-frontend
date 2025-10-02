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
        

        <div className="d-flex flex-wrap">
            {schede.map((scheda) => (
                <Link to={'/' + scheda.id} key={scheda.id} className="col-4 text-decoration-none W-50">
                    
                        <ul className="list-group">
                        <h5 className="card-title">{scheda.nome}</h5>
                            {scheda.esercizi.map((esercizio, index) => (
                                <li key={index} className="list-group-item list-group-item-action">
                                    <p>{esercizio.nome}</p>
                                    <p>{esercizio.tempo}s</p>
                                </li>
                            ))}
                        </ul>
                    
                </Link>
            ))}
        </div>
       
        </>
    )
}

export default CardsTraining