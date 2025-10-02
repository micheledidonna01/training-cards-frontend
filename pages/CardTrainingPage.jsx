import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";

const CardTrainingPage = () => {
    const [scheda, setScheda] = useState();
    const {id} = useParams();

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

   
    


    return <>
        
        <h1 className="text-center mt-5">{scheda?.nome}</h1>
        {scheda?.esercizi.map((esercizio) => (
            <div key={esercizio.id} className="text-center pt-4">
                <h2>{esercizio.nome}</h2>
                <p>{esercizio.descrizione}</p>
            </div>
        ))}

        <div className="d-flex justify-content-center ">

        <Link to={'/' + id + '/esercizio/' + scheda?.esercizi[0]?.id} className="btn btn-primary col-3" esercizi={scheda?.esercizi}>Inizia</Link>
        </div>
    </>
}

export default CardTrainingPage;