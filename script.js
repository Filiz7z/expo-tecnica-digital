let proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
function guardar() { localStorage.setItem("proyectos", JSON.stringify(proyectos)); }

const pagina = location.pathname.split("/").pop();

/* =========================================================
   REGISTRO.HTML
   ========================================================= */
if (pagina === "registro.html") {

    document.getElementById("formProyecto").addEventListener("submit", (e) => {
        e.preventDefault();

        let proyecto = {
            nombre: nombre.value.trim(),
            integrantes: integrantes.value.trim(),
            especialidad: especialidad.value.trim(),
            categoria: categoria.value.trim(),
            descripcion: descripcion.value.trim(),
            puntaje: Number(puntaje.value),
            estado: estado.value,
            fecha: new Date().toLocaleString()
        };

        if (!proyecto.nombre || !proyecto.integrantes || !proyecto.especialidad ||
            !proyecto.categoria || !proyecto.descripcion) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        if (!proyecto.estado) {
            alert("Debe seleccionar si el proyecto está completo o incompleto.");
            return;
        }

        proyectos.push(proyecto);
        guardar();
        alert("Proyecto agregado correctamente ✔");
        e.target.reset();
    });
}


/* =========================================================
   PROYECTOS.HTML
   ========================================================= */
if (pagina === "proyectos.html") {

    function mostrarTabla() {
        const tbody = document.getElementById("tablaProyectos");
        tbody.innerHTML = "";

        proyectos.forEach((p, index) => {
            tbody.innerHTML += `
                <tr>
                    <td>${p.nombre}</td>
                    <td>${p.especialidad}</td>
                    <td>${p.categoria}</td>
                    <td>${p.puntaje}</td>
                    <td class="${p.estado === 'Completo' ? 'estado-completo' : 'estado-incompleto'}">${p.estado}</td>
                    <td><button class="btn-ver" onclick="verDetalle(${index})">👁</button></td>
                    <td><button class="btn-eliminar" onclick="eliminar(${index})">🗑</button></td>
                </tr>
            `;
        });
    }

    mostrarTabla();

    document.getElementById("buscar").addEventListener("input", (e) => {
        let texto = e.target.value.toLowerCase();
        const tbody = document.getElementById("tablaProyectos");
        tbody.innerHTML = "";

        proyectos.filter(p => p.nombre.toLowerCase().includes(texto))
            .forEach((p, index) => {
                tbody.innerHTML += `
                    <tr>
                        <td>${p.nombre}</td>
                        <td>${p.especialidad}</td>
                        <td>${p.categoria}</td>
                        <td>${p.puntaje}</td>
                        <td class="${p.estado === 'Completo' ? 'estado-completo' : 'estado-incompleto'}">${p.estado}</td>
                        <td><button onclick="verDetalle(${index})">👁</button></td>
                        <td><button onclick="eliminar(${index})">🗑</button></td>
                    </tr>
                `;
            });
    });

    window.eliminar = function (i) {
        if (confirm("¿Eliminar proyecto?")) {
            proyectos.splice(i, 1);
            guardar();
            mostrarTabla();
        }
    };

    window.verDetalle = function (i) {
        const p = proyectos[i];
        modalNombre.textContent = p.nombre;
        modalIntegrantes.textContent = p.integrantes;
        modalEspecialidad.textContent = p.especialidad;
        modalCategoria.textContent = p.categoria;
        modalDescripcion.textContent = p.descripcion;
        modalPuntaje.textContent = p.puntaje;
        modalEstado.textContent = p.estado;
        modal.classList.remove("oculto");
    };

    window.cerrarModal = () => modal.classList.add("oculto");
}


/* =========================================================
   ESTADISTICAS.HTML
   ========================================================= */
if (pagina === "estadisticas.html") {
    const total = proyectos.length;
    document.getElementById("totalProyectos").textContent = "Total de proyectos: " + total;

    if (total === 0) {
        document.getElementById("promedioPuntaje").textContent = "Promedio de puntaje: 0";
    } else {
        const suma = proyectos.reduce((acc, p) => acc + p.puntaje, 0);
        const prom = (suma / total).toFixed(2);
        document.getElementById("promedioPuntaje").textContent = "Promedio de puntaje: " + prom;
    }
}