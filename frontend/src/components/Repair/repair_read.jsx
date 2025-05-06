import { useEffect, useState } from 'react';

function ReadRepair({ onRepairsLoaded }) {

    const [repairs, setRepairs] = useState([])

    useEffect(() => {
        fetch('http://localhost:5021/api/repairs')
        .then(res => {
            if (!res.ok) throw new Error('Error al obtener reparaciones')
            return res.json()
        })
        .then(data => {
            setRepairs(data)
            onRepairsLoaded(data)
        })
        .catch(err => console.error('Error:', err))
    }, [])

    return (
        <div>
            <h2>Lista de Reparaciones</h2>
            <ul>
                {repairs.map(repair => (
                    <li key={repair.id_repair} style={{ color: 'white' }}>
                        {repair.id_repair} - {repair.client_name} - {repair.vehicle_patente} - {repair.date_repair} - {repair.work_done} - ${repair.cost}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ReadRepair;