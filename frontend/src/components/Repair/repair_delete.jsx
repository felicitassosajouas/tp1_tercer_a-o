import React, { useState } from 'react';

function DeleteRepair({ onDeleted }) {
    const [idClient, setIdClient] = useState('');

    const handleDelete = () => {
        if (!idClient) {
            alert('Por favor ingrese un ID de cliente válido');
            return;
        }

        fetch(`http://localhost:5021/api/del_repairs_by_client/${idClient}`, {
            method: 'DELETE',
        })
        .then(async (res) => {
            const data = await res.json();
            if (res.ok) {
                onDeleted(idClient);
                alert('Reparaciones eliminadas correctamente');
                setIdClient('');
            } else {
                alert(data.message || data.error || 'Error al eliminar reparaciones');
            }
        })
        .catch(err => {
            console.error('Error:', err);
            alert('Refresque la página para mostrar cambios');
        });
    };

    return (
        <div>
            <input
                type="number"
                name="id_client"
                placeholder="INGRESE ID DE CLIENTE A ELIMINAR REPARACIONES"
                value={idClient}
                onChange={(e) => setIdClient(e.target.value)}
                required
            />
            <button onClick={handleDelete}>Eliminar Reparaciones</button>
        </div>
    );
}

export default DeleteRepair;