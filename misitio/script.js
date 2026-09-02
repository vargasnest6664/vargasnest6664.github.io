// ============================================
// CONFIGURACIÓN DE PROFESORES
// ============================================
const profesores = [
    { 
        nombre: 'FRANCIS', 
        imagen: 'imagenes/ercy.jpeg'
    },
    { 
        nombre: 'MARGARITA', 
        imagen: 'imagenes/margarita.jpeg' 
    },
    { 
        nombre: 'OSMAN', 
        imagen: 'imagenes/osman.jpeg' 
    },
    { 
        nombre: 'EDUARDO', 
        imagen: 'imagenes/eduardo.jpeg' 
    }
];

// ============================================
// VARIABLE GLOBAL PARA GUARDAR VOTOS
// ============================================
let votos = {};

// ============================================
// CARGAR VOTOS GUARDADOS (LocalStorage)
// ============================================
function cargarVotosGuardados() {
    const votosGuardados = localStorage.getItem('votosProfesores');
    if (votosGuardados) {
        votos = JSON.parse(votosGuardados);
    } else {
        // Inicializar votos en 0
        profesores.forEach(prof => {
            votos[prof.nombre] = 0;
        });
    }
}

// ============================================
// GUARDAR VOTOS (LocalStorage)
// ============================================
function guardarVotos() {
    localStorage.setItem('votosProfesores', JSON.stringify(votos));
}

// ============================================
// FUNCIÓN PARA VOTAR
// ============================================
function votar(nombreProfesor) {
    // Incrementar el voto
    votos[nombreProfesor] = (votos[nombreProfesor] || 0) + 1;
    
    // Guardar en localStorage
    guardarVotos();
    
    // Actualizar la interfaz
    actualizarContadores();
    
    // Mensaje de confirmación
    alert(`✅ ¡Votaste por ${nombreProfesor}! (Total: ${votos[nombreProfesor]} votos)`);
}

// ============================================
// ACTUALIZAR CONTADORES EN PANTALLA
// ============================================
function actualizarContadores() {
    profesores.forEach(profesor => {
        const votosElement = document.querySelector(`[data-profesor="${profesor.nombre}"]`);
        if (votosElement) {
            votosElement.textContent = votos[profesor.nombre] || 0;
        }
    });
}

// ============================================
// MOSTRAR PROFESORES EN PANTALLA
// ============================================
function mostrarProfesores() {
    const grid = document.getElementById('professorsGrid');
    const loading = document.getElementById('loading');
    
    // Ocultar loading
    loading.style.display = 'none';
    
    // Limpiar el grid
    grid.innerHTML = '';

    // Crear tarjeta para cada profesor
    profesores.forEach(profesor => {
        const votosActuales = votos[profesor.nombre] || 0;
        
        const card = document.createElement('div');
        card.className = 'professor-card';
        
        card.innerHTML = `
            <img src="${profesor.imagen}" 
                 alt="${profesor.nombre}"
                 onerror="this.src='https://ui-avatars.com/api/?name=${profesor.nombre}&background=667eea&color=fff&size=150'">
            <h3>${profesor.nombre}</h3>
            <p class="votes">Votos: <strong data-profesor="${profesor.nombre}">${votosActuales}</strong></p>
            <button class="vote-btn" onclick="votar('${profesor.nombre}')">
                Votar
            </button>
        `;
        
        grid.appendChild(card);
    });
}

// ============================================
// INICIALIZAR PÁGINA
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Cargar votos guardados
    cargarVotosGuardados();
    
    // Mostrar profesores
    mostrarProfesores();
    
    // Actualizar contadores
    actualizarContadores();
    
    console.log('✅ Página cargada correctamente');
    console.log('📊 Votos actuales:', votos);
});