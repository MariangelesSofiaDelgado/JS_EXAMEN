import { useState, useEffect } from 'react';

function University() {
    const [uni, setUni] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function cargarProductos() {
            try {
                const respuesta = await fetch('/api/search?country=Peru');
                
                if (!respuesta.ok) {
                    throw new Error(`Error en el servidor: ${respuesta.status}`);
                }

                const datos = await respuesta.json();
                setUni(datos);
            } catch (err) {
                setError(err.message + " (Verifica si el navegador bloqueó la conexión HTTP)");
            } finally {
                setCargando(false);
            }
        }
        cargarProductos();
    }, []);

    if (cargando) return <p>Cargando universidades (Fetch HTTP)...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Catálogo Universidades (HTTP)</h2>
            <ul>
                {uni.slice(0, 5).map((u, index) => (
                    <li key={`${u.name}-${index}`}>
                        {u.name} - {u.country}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default University;