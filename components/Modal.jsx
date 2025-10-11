const Modal = ({ modify, modifyForm, handleSubmit, setModify, handleChange, numeroEs, setNumeroEs, images }) => {

    console.log(numeroEs);
    console.log(images);
    if (!modify) return null;

    return (
        <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(5px)" }}
        >
            <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden animate-fade-in">

                    {/* Header */}
                    <div className="modal-header bg-gradient text-white py-3 px-4 d-flex justify-content-between align-items-center">
                        <h3 className="mb-0 fw-bold">✏️ Modifica Scheda Allenamento</h3>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={() => setModify(false)}
                        ></button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-4">
                        <div className="mb-4">
                            <label htmlFor="name" className="form-label fw-semibold">Nome Scheda</label>
                            <input
                                type="text"
                                className="form-control form-control-lg rounded-3 shadow-sm"
                                name="name"
                                placeholder="Inserisci il nome della scheda..."
                                value={modifyForm.nome}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="row g-4">
                            {numeroEs.map((num) => (
                                <div key={num} className="col-md-6">
                                    <div className="card esercizio-card h-100 border-0 shadow-sm rounded-4 p-3">
                                        <div className="card-body">
                                            <h5 className="fw-bold text-primary mb-3">
                                                Esercizio {num + 1}
                                            </h5>

                                            <div className="mb-3">
                                                <label className="form-label">Nome</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name={`esercizio${num + 1}-nome`}
                                                    placeholder="Nome esercizio..."
                                                    value={modifyForm.esercizi[num]?.nome || ''}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Tempo (secondi)</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name={`esercizio${num + 1}-tempo`}
                                                    placeholder="Durata..."
                                                    value={modifyForm.esercizi[num]?.tempo || 0}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Immagine (URL o nome file)</label>
                                                <select
                                                    className="form-select"
                                                    name={`esercizio${num + 1}-image`}
                                                    value={modifyForm.esercizi[num]?.image || ''}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Nessuna immagine</option>
                                                    {images.map((image, index) => (
                                                        <option key={index} value={image}>
                                                            {image}
                                                        </option>
                                                    ))}
                                                </select>
                                                {/* <input
                                                    type="text"
                                                    className="form-control"
                                                    name={`esercizio${num + 1}-image`}
                                                    placeholder="es. squat.gif"
                                                    value={modifyForm.esercizi[num]?.image || ''}
                                                    onChange={handleChange}
                                                /> */}
                                            </div>

                                            <div>
                                                <label className="form-label">Descrizione</label>
                                                <textarea
                                                    className="form-control"
                                                    name={`esercizio${num + 1}-descrizione`}
                                                    rows="2"
                                                    placeholder="Descrizione esercizio..."
                                                    value={modifyForm.esercizi[num]?.descrizione || ''}
                                                    onChange={handleChange}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                                <button type="button" onClick={() => setNumeroEs(prev => [...prev, numeroEs.length ])} className="btn btn-primary" disabled={numeroEs.length >= 10}>{numeroEs.length < 10 ? '+' : 'Limite raggiunto'}</button>
                            
                        </div>

                        {/* Footer */}
                        <div className="modal-footer mt-5 border-0 d-flex justify-content-end gap-3">
                            <button
                                type="button"
                                className="btn btn-outline-secondary px-4 py-2 rounded-pill"
                                onClick={() => setModify(false)}
                            >
                                ❌ Annulla
                            </button>
                            <button
                                type="submit"
                                className="btn btn-gradient-primary px-4 py-2 rounded-pill fw-semibold"
                            >
                                💾 Salva Modifiche
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;
