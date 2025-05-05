import { useEffect, useState } from 'react'

function ReadClients({ onClientsLoaded }) {

    {/* const [error, setError] = useState(null) */} 
        
    const [clients, setClients] = useState([])

    useEffect(() => {
        fetch('http://localhost:5021/api/clients')
        .then(res => {
            if (!res.ok) throw new Error('Error al obtener clientes')
            return res.json()
        })
        .then(data => {
            setClients(data)
            onClientsLoaded(data)
        })
        .catch(err => setError(err.message))
    }, [])

    return (
        <div>
        <h2>Lista de clientes</h2>
        <ul>
            {clients.map(client => (
            <li style={{ color: 'white' }}key={client.id}>{client.name} - {client.email} - ID: {client.id_client}</li>
            ))}
        </ul>
        {/* {error && <p style={{ color: 'red' }}>{error}</p>} */} 
        </div>
    )
}

export default ReadClients
