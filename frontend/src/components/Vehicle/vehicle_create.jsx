import { useState } from 'react'

function CreateVehicle() {
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        patente: '',
        year_vehicles: '',
        cost: '',
        id_client: ''
    })
    const [message, setMessage] = useState('')

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:5021/api/add_vehicle', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Error al crear vehículo')
            setMessage('Vehículo creado con éxito')
            // limpiar formulario
            setFormData({
                brand: '',
                model: '',
                patente: '',
                year_vehicles: '',
                cost: '',
                id_client: ''
            })
        } catch (err) {
            setMessage(err.message)
        }
    }

    return (
        <div style={{ color: 'green' }}>
            <h3>Agregar Vehículo</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <input
                    name="brand"
                    placeholder="Marca"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                />
                <input
                    name="model"
                    placeholder="Modelo"
                    value={formData.model}
                    onChange={handleChange}
                    required
                />
                <input
                    name="patente"
                    placeholder="Patente"
                    value={formData.patente}
                    onChange={handleChange}
                    required
                />
                <input
                    name="year_vehicles"
                    placeholder="Año"
                    value={formData.year_vehicles}
                    onChange={handleChange}
                    required
                />
                <input
                    name="cost"
                    placeholder="Costo"
                    value={formData.cost}
                    onChange={handleChange}
                    required
                />
                <input
                    name="id_client"
                    placeholder="ID Cliente"
                    value={formData.id_client}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Crear</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}

export default CreateVehicle
