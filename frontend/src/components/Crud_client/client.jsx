import { useEffect, useState } from 'react'
import ReloadClients from './client_reload.jsx'
import CreateClient from './client_create.jsx'
import DeleteClient from './client_delete.jsx'

function Client() {
    const [clients, setClients] = useState([])
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' })
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)

    // Obtener lista de clientes
    useEffect(() => {
        fetch('http://localhost:5021/api/clients')
        .then(res => {
            if (!res.ok) throw new Error('Error al obtener clientes')
            return res.json()
        })
        .then(data => setClients(data))
        .catch(err => setError(err.message))
    }, [])

    // Manejar cambios en el formulario
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Enviar nuevo cliente
    const handleSubmit = e => {
        e.preventDefault()
        fetch('http://localhost:5021/api/add_client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
            setMessage(data.error)
            } else {
            setMessage('Cliente agregado con éxito')
            setClients([...clients, data.client]) // Agregar nuevo cliente a la lista
            setFormData({ name: '', email: '', phone: '', address: '' }) // Limpiar formulario
            }
        })
        .catch(() => setMessage('Error al conectar con el servidor'))
    }

    return (
        <div>
            <h3 style={{ color: 'YELLOW' }}>LISTA CLIENTES</h3>
            <ReloadClients/>

            <h3 style={{ color: 'YELLOW' }}>CREAR CLIENTE</h3>
            <CreateClient/>

            <h3 style={{ color: 'YELLOW' }}>BORRAR CLIENTE</h3>
            <DeleteClient/>

        </div>
    )
}

export default Client