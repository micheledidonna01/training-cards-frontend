import { useEffect, useState } from "react"

const CardsTraining = () => {

    const [schede, setSchede] = useState([]);

    const getSchede = async () => {
        try{
            const promise = await fetch('http://127.0.0.1:3100/api/schede');
            const data = await promise.json();
            if (!promise.ok) {
                throw new Error(promise.status + ' ' + promise.statusText)
            }
            setSchede(data);
            console.log(data);
            return data;
        }catch(error){
            console.log(error);
            return null;
        }
    }

  
    useEffect(() => {
        getSchede();
    }, [])

    return (
        <>
            {schede.map((scheda) => (
                <div key={scheda.id}>
                    <h1>{scheda.nome}</h1>
                    <ul>
                        {scheda.esercizi.map((esercizio, index) => (
                            <li key={index}>
                                <h2>{esercizio.nome}</h2>
                                <p>{esercizio.tempo}s</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    )
}

export default CardsTraining