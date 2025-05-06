import { useState, useEffect } from 'react';

function CreateRepair({ onRepairAdded }) {
    const [formData, setFormData] = useState({
        id_vehicle: '',
        id_client: '',
        date_repair: '',
        description_repair: '',
        work_done: '',
        cost: ''
    });
    const [message, setMessage] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const [clients, setClients] = useState([]);

    // Cargar vehículos y clientes
    useEffect(() => {
        // Cargar vehículos
        fetch('http://localhost:5021/api/vehicles')
            .then(res => res.json())
            .then(data => setVehicles(data))
            .catch(err => console.error('Error fetching vehicles:', err));

        // Cargar clientes
        fetch('http://localhost:5021/api/clients')
            .then(res => res.json())
            .then(data => setClients(data))
            .catch(err => console.error('Error fetching clients:', err));
    }, []);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (!formData.id_vehicle || !formData.id_client || !formData.date_repair || !formData.description_repair || !formData.work_done || !formData.cost) {
            setMessage('Todos los campos son obligatorios');
            return;
        }

        fetch('http://localhost:5021/api/add_repair', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                setMessage('Error');
            } else {
                setMessage('Reparación agregada con éxito');
                onRepairAdded(data.repair); 
                setFormData({
                    id_vehicle: '',
                    id_client: '',
                    date_repair: '',
                    description_repair: '',
                    work_done: '',
                    cost: ''
                });
            }
        })
    };

    return (
        <div style={{ color: 'green' }}>
            <h3>Agregar Reparación</h3>
            <form onSubmit={handleSubmit}>
                <select
                    name="id_vehicle"
                    value={formData.id_vehicle}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione Vehículo</option>
                    {vehicles.map(vehicle => (
                        <option key={vehicle.id_vehicle} value={vehicle.id_vehicle}>
                            {vehicle.brand} - {vehicle.model}
                        </option>
                    ))}
                </select>

                <select
                    name="id_client"
                    value={formData.id_client}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione Cliente</option>
                    {clients.map(client => (
                        <option key={client.id_client} value={client.id_client}>
                            {client.name}
                        </option>
                    ))}
                </select>

                <input
                    type="date"
                    name="date_repair"
                    value={formData.date_repair}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description_repair"
                    placeholder="Descripción de la reparación"
                    value={formData.description_repair}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="work_done"
                    placeholder="Trabajo realizado"
                    value={formData.work_done}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="cost"
                    placeholder="Costo"
                    value={formData.cost}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Agregar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateRepair;
