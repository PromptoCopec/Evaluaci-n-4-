class GestorUsuarios {
    constructor() {
        this.usuarios = [];
        this.resultado = document.getElementById("resultado");
        this.campoBusqueda = document.getElementById("campoBusqueda");
        this.resultado.innerHTML = `<p>Cargando datos...</p>`;
        this.cargarUsuarios();
    }

    cargarUsuarios() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
        xhr.responseType = "json";

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                this.usuarios = xhr.response;
                this.resultado.innerHTML = `<p>Datos cargados correctamente. Usa los botones para explorar los usuarios.</p>`;
            } else {
                console.error(`Error al cargar usuarios: ${xhr.status}`);
                this.resultado.innerHTML = `<p>No se pudieron cargar los usuarios. Revisa la consola y vuelve a intentarlo.</p>`;
            }
        };

        xhr.onerror = () => {
            console.error("Error de red al cargar los usuarios.");
            this.resultado.innerHTML = `<p>No se pudieron cargar los usuarios. Revisa la consola y vuelve a intentarlo.</p>`;
        };

        xhr.send();
    }

    obtenerNombreBuscado() {
        return this.campoBusqueda.value.trim();
    }

    buscarUsuarioPorNombre() {
        const nombre = this.obtenerNombreBuscado();
        if (!nombre) {
            this.resultado.innerHTML = `<p>Ingresa un nombre en el campo de búsqueda.</p>`;
            return null;
        }

        return this.usuarios.find(usuario =>
            usuario.name.toLowerCase() === nombre.toLowerCase() ||
            usuario.username.toLowerCase() === nombre.toLowerCase()
        );
    }

    listarNombres() {
        if (!this.usuarios.length) {
            this.resultado.innerHTML = `<p>Los datos aún no están disponibles.</p>`;
            return;
        }

        const html = `
            <h2>Nombres de Usuarios</h2>
            <ol>
                ${this.usuarios.map(usuario => `<li>${usuario.name}</li>`).join("")}
            </ol>
        `;

        this.resultado.innerHTML = html;
    }

    buscarInfoBasica() {
        const usuario = this.buscarUsuarioPorNombre();
        if (!usuario) {
            return;
        }

        this.resultado.innerHTML = `
            <h2>Información básica</h2>
            <p><strong>Nombre:</strong> ${usuario.name}</p>
            <p><strong>Usuario:</strong> ${usuario.username}</p>
            <p><strong>Correo:</strong> ${usuario.email}</p>
            <p><strong>Teléfono:</strong> ${usuario.phone}</p>
            <p><strong>Sitio web:</strong> ${usuario.website}</p>
        `;
    }

    buscarDireccion() {
        const usuario = this.buscarUsuarioPorNombre();
        if (!usuario) {
            return;
        }

        this.resultado.innerHTML = `
            <h2>Dirección</h2>
            <p><strong>Calle:</strong> ${usuario.address.street}</p>
            <p><strong>Suite:</strong> ${usuario.address.suite}</p>
            <p><strong>Ciudad:</strong> ${usuario.address.city}</p>
            <p><strong>Código postal:</strong> ${usuario.address.zipcode}</p>
            <p><strong>Geo:</strong> ${usuario.address.geo.lat}, ${usuario.address.geo.lng}</p>
        `;
    }

    buscarInfoAvanzada() {
        const usuario = this.buscarUsuarioPorNombre();
        if (!usuario) {
            return;
        }

        console.log("Empresa:", usuario.company);

        this.resultado.innerHTML = `
            <h2>Información avanzada</h2>
            <p><strong>Teléfono:</strong> ${usuario.phone}</p>
            <p><strong>Sitio web:</strong> ${usuario.website}</p>
            <p><strong>Empresa:</strong> ${usuario.company.name}</p>
            <p><strong>Catchphrase:</strong> ${usuario.company.catchPhrase}</p>
            <p><strong>BS:</strong> ${usuario.company.bs}</p>
        `;
    }

    listarEmpresas() {
        if (!this.usuarios.length) {
            this.resultado.innerHTML = `<p>Los datos aún no están disponibles.</p>`;
            return;
        }

        const html = `
            <h2>Empresas</h2>
            <ul>
                ${this.usuarios.map(usuario => `
                    <li>
                        <strong>${usuario.company.name}</strong><br>
                        ${usuario.company.catchPhrase}
                    </li>
                `).join("")}
            </ul>
        `;

        this.resultado.innerHTML = html;
    }

    listarOrdenados() {
        if (!this.usuarios.length) {
            this.resultado.innerHTML = `<p>Los datos aún no están disponibles.</p>`;
            return;
        }

        const ordenados = [...this.usuarios].sort((a, b) =>
            a.name.localeCompare(b.name)
        );

        const html = `
            <h2>Usuarios Ordenados</h2>
            <ol>
                ${ordenados.map(usuario => `<li>${usuario.name}</li>`).join("")}
            </ol>
        `;

        this.resultado.innerHTML = html;
    }
}

const gestor = new GestorUsuarios(); 