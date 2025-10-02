import { useParams } from "react-router-dom";
import { SchedeContext } from "../context/schedeContext";
import { useContext, useEffect } from "react";
const Esercizi = () => {

    const {id} = useParams();
    const { esercizi, getEsercizi } = useContext(SchedeContext);
   

    useEffect(() => {
        getEsercizi(id);
    }, [])

    return (
        <>
            <h1>Esercizi</h1>
            {esercizi.map(esercizio => <p key={esercizio.id}>{esercizio.nome}</p>)}
        </>
    )
}

export default Esercizi;