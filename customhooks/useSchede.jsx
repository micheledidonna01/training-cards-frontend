import { useState } from "react"
import { useParams } from "react-router-dom";
function useSchede() {

    const [schede, setSchede] = useState([]);
    const [esercizi, setEsercizi] = useState([]);
    const {id} = useParams();
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

    const getEsercizi = async (idInt) => {
        try{
            const promise = await fetch('http://127.0.0.1:3100/api/schede/' + idInt + '/esercizi');
            const data = await promise.json();
            if (!promise.ok) {
                throw new Error(promise.status + ' ' + promise.statusText)
            }
            setEsercizi(data);
            console.log(data);
            return data;
        }catch(error){
            console.log(error);
            return null;
        }
    }

    return {
        getSchede,
        schede,
        setSchede,
        esercizi,
        getEsercizi
    }
}

export default useSchede;