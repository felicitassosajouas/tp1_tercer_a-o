import { useState, useEffect } from 'react';

function ReadVehicle({ onVehiclesLoaded }) {
    const [vehicles, setVehicles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5021/api/vehicles')
            .then(res => {
                if (!res.ok) throw new Error('Error al obtener vehículos');
                return res.json();
            })
            .then(data => {
                setVehicles(data);
                if (onVehiclesLoaded) onVehiclesLoaded(data);
            })
            .catch(err => setError(err.message));
    }, []);

    return (
        <div>
            <h2>Lista de Vehículos</h2>
            <ul>
                {vehicles.map(vehicle => (
                    <li key={vehicle.patente} style={{ color: 'white' }}>
                        {vehicle.brand} {vehicle.model} - Año: {vehicle.year_vehicles} -
                        Patente: {vehicle.patente} - Costo: ${vehicle.cost} - Cliente ID: {vehicle.id_client}
                    </li>
                ))}
            </ul>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default ReadVehicle;
