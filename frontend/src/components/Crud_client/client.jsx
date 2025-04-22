import { useState } from 'react'
import ReloadClients from './client_reload.jsx'
import CreateClient from './client_create.jsx'
import DeleteClient from './client_delete.jsx'
import UpdateClient from './client_update.jsx'

function Client() {
    const [activeSection, setActiveSection] = useState('list') // por defecto lista

    const renderSection = () => {
        switch (activeSection) {
            case 'create':
                return <CreateClient />
            case 'list':
                return <ReloadClients />
            case 'delete':
                return <DeleteClient />
            case 'update':
                return <UpdateClient />
            default:
                return null
        }
    }

    return (
        <div style={{ padding: '1rem', color: 'white' }}>
            <nav style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button onClick={() => setActiveSection('create')}>Crear Cliente</button>
                <button onClick={() => setActiveSection('list')}>Lista de Clientes</button>
                <button onClick={() => setActiveSection('delete')}>Eliminar Cliente</button>
                <button onClick={() => setActiveSection('update')}>Actualizar Cliente</button>
            </nav>

            <div>
                <h3 style={{ color: 'LIGHTBLUE', textTransform: 'uppercase' }}>
                    {activeSection === 'create' && 'Crear Cliente'}
                    {activeSection === 'list' && 'Lista de Clientes'}
                    {activeSection === 'delete' && 'Eliminar Cliente'}
                    {activeSection === 'update' && 'Actualizar Cliente mediante ID'}
                </h3>
                {renderSection()}
            </div>
        </div>
    )
}

export default Client