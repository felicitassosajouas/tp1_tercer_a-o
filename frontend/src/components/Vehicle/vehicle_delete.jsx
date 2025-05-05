import React, { useState } from 'react';

function DeleteVehicle() {
    const [patente, setPatente] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!patente) {
            setError('Por favor, ingrese la patente del vehículo.');
            return;
        }

        try {
            const res = await fetch(`http://localhost:5021/api/del_vehicle/${encodeURIComponent(patente)}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                let errorMessage = 'Error al eliminar vehículo';
                try {
                    const errorData = await res.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (jsonError) {
                    console.error("Error parsing JSON:", jsonError);
                    // Si falla el parseo del JSON, usa el mensaje de error genérico
                }
                throw new Error(errorMessage);
            }

            const responseData = await res.json(); // Almacenar la respuesta JSON
            setMessage(responseData.message || 'Vehículo eliminado con éxito'); // Usar la respuesta para el mensaje
            setPatente('');

        } catch (err) {
            setError(err.message || 'Ocurrió un error inesperado. Por favor, intente nuevamente.');
            console.error(err);
        }
    };

    return (
        <div style={{ color: 'red' }}>
            <h3>Eliminar Vehículo</h3>
            <form onSubmit={handleDelete} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <input
                    placeholder="Patente del vehículo"
                    value={patente}
                    onChange={(e) => setPatente(e.target.value)}
                    required
                />
                <button type="submit">Eliminar</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </div>
    );
}

export default DeleteVehicle;
