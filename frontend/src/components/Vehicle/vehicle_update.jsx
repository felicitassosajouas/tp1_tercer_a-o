import { useState } from 'react'

function UpdateVehicle() {
    const [patente, setPatente] = useState('')
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        year_vehicles: '',
        cost: '',
        id_client: ''
    })
    const [message, setMessage] = useState('')

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleUpdate = async () => {
        try {
            const res = await fetch(`http://localhost:5021/api/up_vehicle/${patente}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Error al actualizar')
            setMessage('Vehículo actualizado con éxito')
        } catch (err) {
            setMessage(err.message)
        }
    }

    return (
        <div>
            <input placeholder="Patente del vehículo" onChange={e => setPatente(e.target.value)} />
            <input name="brand" placeholder="Marca" onChange={handleChange} />
            <input name="model" placeholder="Modelo" onChange={handleChange} />
            <input name="year_vehicles" placeholder="Año" onChange={handleChange} />
            <input name="cost" placeholder="Costo" onChange={handleChange} />
            <input name="id_client" placeholder="ID Cliente" onChange={handleChange} />
            <button onClick={handleUpdate}>Actualizar</button>
            {message && <p style={{ color: 'lightblue' }}>{message}</p>}
        </div>
    )
}

export default UpdateVehicle
