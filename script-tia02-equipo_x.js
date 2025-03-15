// Función para agregar un proyecto al localStorage
document.getElementById('formulario-proyecto').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    // Obtener los valores de los campos del formulario
    const idProyecto = document.getElementById('id-proyecto').value;
    const nombreProyecto = document.getElementById('nombre-proyecto').value;
    const descripcion = document.getElementById('descripcion').value;
    const responsable = document.getElementById('responsable').value;
    const fechaInicio = document.getElementById('fecha-inicio').value;
    const fechaFin = document.getElementById('fecha-fin').value;
    const duracion = document.getElementById('duracion').value;
    const estado = document.getElementById('estado').value;
    const documento = document.getElementById('documento').value;

    // Crear un objeto con los datos del proyecto
    const proyecto = {
        idProyecto,
        nombreProyecto,
        descripcion,
        responsable,
        fechaInicio,
        fechaFin,
        duracion,
        estado,
        documento
    };

    // Obtener los proyectos existentes en localStorage
    let proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];

    // Verificar si el ID ya existe
    const proyectoExistente = proyectos.some(proy => proy.idProyecto === idProyecto);
    if (proyectoExistente) {
        alert('El ID del proyecto ya existe. Usa otro ID.');
        return;
    }

    // Agregar el nuevo proyecto al array
    proyectos.push(proyecto);

    // Guardar el array actualizado en localStorage
    localStorage.setItem('proyectos', JSON.stringify(proyectos));

    // Mostrar el proyecto en la consola solo como JSON
    console.log(JSON.stringify(proyecto, null, 2));

    // Limpiar el formulario
    document.getElementById('formulario-proyecto').reset();
    alert('Proyecto ingresado con éxito');
});

// Función para consultar un proyecto por ID
document.getElementById('formulario-consulta-proyecto').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    // Obtener el ID ingresado
    const proyectoId = document.getElementById('proyecto-id').value;

    // Obtener los proyectos desde localStorage
    const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];

    // Buscar el proyecto por ID
    const proyectoEncontrado = proyectos.find(proyecto => proyecto.idProyecto === proyectoId);

    // Mostrar los resultados de la consulta
    if (proyectoEncontrado) {
        document.getElementById('resultado-consulta').style.display = 'block';
        document.getElementById('resultado-nombre').textContent = `Nombre del Proyecto: ${proyectoEncontrado.nombreProyecto}`;
        document.getElementById('resultado-descripcion').textContent = `Descripción: ${proyectoEncontrado.descripcion}`;
        document.getElementById('resultado-responsable').textContent = `Responsable: ${proyectoEncontrado.responsable}`;
        document.getElementById('resultado-fechas').textContent = `Fechas: ${proyectoEncontrado.fechaInicio} - ${proyectoEncontrado.fechaFin}`;
        document.getElementById('resultado-duracion').textContent = `Duración: ${proyectoEncontrado.duracion} meses`;
        document.getElementById('resultado-estado').textContent = `Estado: ${proyectoEncontrado.estado}`;
        document.getElementById('resultado-documento').textContent = `Documento: ${proyectoEncontrado.documento}`;
    } else {
        alert('No se encontró el proyecto');
        document.getElementById('resultado-consulta').style.display = 'none';
    }
});

// Función para eliminar un proyecto por ID
document.getElementById('formulario-eliminar-proyecto').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    // Obtener el ID del proyecto a eliminar
    const proyectoId = document.getElementById('proyecto-id-eliminar').value;

    // Obtener los proyectos desde localStorage
    let proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];

    // Buscar el índice del proyecto a eliminar
    const index = proyectos.findIndex(proyecto => proyecto.idProyecto === proyectoId);

    if (index !== -1) {
        // Eliminar el proyecto
        proyectos.splice(index, 1);

        // Guardar los proyectos actualizados en localStorage
        localStorage.setItem('proyectos', JSON.stringify(proyectos));

        alert('Proyecto eliminado con éxito');
    } else {
        alert('No se encontró el proyecto para eliminar');
    }

    // Limpiar el formulario de eliminación
    document.getElementById('formulario-eliminar-proyecto').reset();
});

// Llamar a la función para mostrar el proyecto guardado al cargar la página
window.onload = mostrarProyectoGuardado;

// Función para mostrar el proyecto guardado en la consola
function mostrarProyectoGuardado() {
    const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
    if (proyectos.length > 0) {
        console.log('Proyectos Guardados:', JSON.stringify(proyectos, null, 2));
    }
}

window.addEventListener("scroll", function () {
    let navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("shrink");
    } else {
        navbar.classList.remove("shrink");
    }
});

$(document).ready(function () {
    // Cerrar el menú hamburguesa después de hacer clic en cualquier enlace
    $('.navbar-nav .nav-link').on('click', function () {
        // Solo cerrar el menú si está abierto
        if ($('.navbar-toggler').attr('aria-expanded') === 'true') {
            $('.navbar-toggler').click();
        }
    });
});