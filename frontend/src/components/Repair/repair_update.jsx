import { useState } from 'react';

function UpdateRepair() {
    const [idClient, setIdClient] = useState('');
    const [idVehicle, setIdVehicle] = useState('');
    const [dateRepair, setDateRepair] = useState('');
    const [descriptionRepair, setDescriptionRepair] = useState('');
    const [workDone, setWorkDone] = useState('');
    const [cost, setCost] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!idClient || !idVehicle || !dateRepair || !descriptionRepair || !workDone || !cost) {
            setError('Por favor, completá todos los campos');
            return;
        }

        fetch(`http://localhost:5021/api/up_repair_by_client/${idClient}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                id_vehicle: idVehicle,
                date_repair: dateRepair,
                description_repair: descriptionRepair,
                work_done: workDone,
                cost: cost,
            }),
        })
        .then(res => {
            if (!res.ok) throw new Error('No se pudo actualizar la reparación');
            return res.json();
        })
        .then(data => {
            setMessage(data.message);
            setError('');
        })
        .catch(err => {
            setMessage('');
            setError(err.message);
        });
    };

    return (
        <div style={{ color: 'white' }}>
            <h2>Actualizar Reparación</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID del cliente:</label>
                    <input 
                        type="number" 
                        value={idClient} 
                        onChange={e => setIdClient(e.target.value)} 
                    />
                </div>
                <div>
                    <label>ID del vehículo:</label>
                    <input 
                        type="number" 
                        value={idVehicle} 
                        onChange={e => setIdVehicle(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Fecha de la reparación:</label>
                    <input 
                        type="date" 
                        value={dateRepair} 
                        onChange={e => setDateRepair(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Descripción de la reparación:</label>
                    <input 
                        type="text" 
                        value={descriptionRepair} 
                        onChange={e => setDescriptionRepair(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Trabajo realizado:</label>
                    <input 
                        type="text" 
                        value={workDone} 
                        onChange={e => setWorkDone(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Costo:</label>
                    <input 
                        type="number" 
                        step="0.01" 
                        value={cost} 
                        onChange={e => setCost(e.target.value)} 
                    />
                </div>
                <button type="submit">Actualizar</button>
            </form>

            {message && <p style={{ color: 'lightgreen' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default UpdateRepair;