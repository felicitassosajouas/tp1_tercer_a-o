import React, { useState } from 'react';

function DeleteClient({ onDeleted }) {
    const [idClient, setIdClient] = useState('');

    const handleDelete = () => {
        if (!idClient) {
            alert('Por favor ingrese un ID de cliente válido');
            return;
            }
        
            fetch(`http://localhost:5021/api/del_client/${idClient}`, {
            method: 'DELETE',
            })
            .then(async (res) => {
                const data = await res.json();
                if (res.ok) {
                onDeleted(idClient);
                    alert('Cliente eliminado correctamente');
                setIdClient('');
                } else {
                    alert(data.message || data.error || 'Error al eliminar cliente');
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
            placeholder="INGRESE ID DE USUARIO A ELIMINAR"
            value={idClient}
            onChange={(e) => setIdClient(e.target.value)}
            required
        />
        <button onClick={handleDelete}>Eliminar</button>
        </div>
    );
}

export default DeleteClient;