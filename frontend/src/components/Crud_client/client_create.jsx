import { useState } from 'react'

function CreateClient({ onClientAdded }) {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' })
    const [message, setMessage] = useState(null)

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

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
            onClientAdded(data.client) // notificar al padre
            setFormData({ name: '', email: '', phone: '', address: '' })
        }
        })
    }

    return (
        <div style={{ color: 'green' }}>
        <h3>Agregar Cliente</h3>
        <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    name="phone"
                    placeholder="Teléfono"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <input
                    name="address"
                    placeholder="Dirección"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Agregar</button>
            </form>
        {message && <p>{message}</p>}
        </div>
        
    )
}

export default CreateClient
