import { useState } from 'react'

function UpdateClient() {
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!id || !name || !email || !phone || !address) {
            setError('Por favor, completá todos los campos')
            return
        }

        fetch(`http://localhost:5021/api/up_client/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, phone, address })
        })
        .then(res => {
            if (!res.ok) throw new Error('No se pudo actualizar el cliente')
            return res.json()
        })
        .then(data => {
            setMessage(data.message)
            setError('')
        })
        .catch(err => {
            setMessage('')
            setError(err.message)
        })
    }

    return (
        <div style={{ color: 'white' }}>
            <h2>Actualizar Cliente</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID del cliente:</label>
                    <input type="number" value={id} onChange={e => setId(e.target.value)} />
                </div>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Teléfono:</label>
                    <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div>
                    <label>Dirección:</label>
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
                </div>
                <button type="submit">Actualizar</button>
            </form>

            {message && <p style={{ color: 'lightgreen' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}

export default UpdateClient
