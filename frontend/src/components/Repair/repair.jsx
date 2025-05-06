import { useState } from 'react'
import CreateRepair from './repair_create.jsx'
import ReadRepair from './repair_read.jsx'
import DeleteRepair from './repair_delete.jsx'
import UpdateRepair from './repair_update.jsx'

function Repair() {
    const [activeSection, setActiveSection] = useState('create')

    const renderSection = () => {
        switch (activeSection) {
            case 'create':
                return <CreateRepair />
            case 'read': 
                return <ReadRepair />
            case 'update': 
                return <UpdateRepair />
            case 'delete': 
                return <DeleteRepair />
            default:
                return null
        }
    }

    return (
        <div style={{ padding: '1rem', color: 'white' }}>
            <nav style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button onClick={() => setActiveSection('create')}>Crear Reparación</button>
                <button onClick={() => setActiveSection('read')}>Listar Reparaciones</button>
                <button onClick={() => setActiveSection('delete')}>Eliminar Reparación</button>
                <button onClick={() => setActiveSection('update')}>Actualizar Reparación</button>
            </nav>



            <div>
                <h3 style={{ color: 'lightblue', textTransform: 'uppercase' }}>
                    {activeSection === 'create' && 'Crear Reparación'}
                    {activeSection === 'read' && 'Listar Reparaciones'}
                    {activeSection === 'delete' && 'Eliminar Reparación'}
                    {activeSection === 'update' && 'Actualizar Reparación'}
                </h3>
                {renderSection()}
            </div>
            
        </div>

        
    )
}

export default Repair
