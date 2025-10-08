const Modal = ({ modify, modifyForm, handleSubmit, setModify, handleChange }) => {
    if (modify === false) {
        return null;
    }
    return (
        <>
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div className="modal-xl modal-dialog modal-dialog-centered " role="document">
                    <div className="modal-content shadow-lg">



                        <form className="d-flex flex-wrap justify-content-center" onSubmit={handleSubmit}>
                            <div className="modal-header col-10">
                                <label htmlFor="name" className="form-label">Nome scheda</label>
                                <input type="text" className="form-control" name="name" value={modifyForm.nome} onChange={handleChange} />

                            </div>

                            <div className="modal-body col-12 d-flex flex-wrap justify-content-center gap-3 mt-3">


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

                            <div className="modal-footer mt-3">
                                <button className="btn btn-primary">Conferma</button>
                                <button className="btn btn-danger" onClick={() => setModify(false)}>Annulla</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;