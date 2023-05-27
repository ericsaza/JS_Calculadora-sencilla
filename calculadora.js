var puedesEscribir = true;
/**
 * Función para escribir el botón en el input del calculo
 */
function escribir(valorEscribir) {
    if (puedesEscribir) {
        document.getElementById("calculo").value += valorEscribir;
    }
}

/**
 * Función para calcular la operación que escriba el usuario
 */
function calcular() {
    var operacion = document.getElementById("calculo").value;
    if (operacion == null || operacion == '') {
        document.getElementById("calculo").placeholder = "ERROR";
    } else {
        document.getElementById("calculo").placeholder = "0";
        var arrayOperacion = operacion.split('');
        var operacionCorrecta = '';
        var caracteresPermitidos = "1234567890+-x÷*/.%";
        for (var i = 0; i < arrayOperacion.length; i++) {

            // Comprobaremos que los caracteres esten permitidos
            if (caracteresPermitidos.includes(arrayOperacion[i])) {
                // console.log(arrayOperacion[i]);

                // Convertiremos el signo de división en barra para que el método ".eval()" lo acepte
                if (arrayOperacion[i] == '÷') {
                    arrayOperacion[i] = '/';
                }

                // Convertiremos el signo de multiplicación en barra para que el método ".eval()" lo acepte
                if (arrayOperacion[i] == 'x') {
                    arrayOperacion[i] = '*';
                }
            }
            operacionCorrecta += arrayOperacion[i];
        }
        // console.log(operacionCorrecta);
        document.getElementById("calculo").value += "=" + eval(operacionCorrecta);
        var historial = document.querySelector(".contenedor-historial");

        // Obtendremos la fecha de la operación
        var fecha = new Date();

        // Obtenemos la fecha en formato "DD/MM/YYYY"
        var fechaActual = fecha.toLocaleDateString();
        var horaActual = fecha.toLocaleTimeString();
        // console.log(fechaActual);
        // console.log(horaActual);
        
        // Añadimos la operación en el historial
        historial.innerHTML += document.getElementById("calculo").value + " - " + fechaActual + " " + horaActual 
        + "\n---------------------------------------\n";
        document.getElementById("calculo").maxLength = document.getElementById("calculo").length;
        puedesEscribir = false;
    }
}

/**
 * Función para limpiar en "input" para el calculo
 */
function limpiar() {
    document.getElementById("calculo").value = "";
    document.getElementById("calculo").placeholder = "0";
    puedesEscribir = true;
}

/**
 * Función para eliminar un caracter
 */
function eliminar() {
    var operacion = document.getElementById("calculo").value;
    var operacionSinResultado = operacion.split("=");
    operacionSinResultado[1] = "";
    document.getElementById("calculo").value = operacion.substr(0, operacionSinResultado[0].length - 1);
    puedesEscribir = true;
}


/**
 * Función para exportar el historial cuando se haya pulsado el botón
 *  - Pedimos al usuario el nombre del archivo
 */
function exportarHistorial() {
    var textoHistorial = document.getElementById("contenedorHistorial").value;

    // Tendremos un menú donde preguntaremos al usuario que opción del menú quiere escoger
    var menu = prompt('-----------------------------------------------------\n'
        + '-                                 MENÚ                               -\n'
        + '-----------------------------------------------------\n'
        + 'E - Exportar historial\n'
        + 'S - Salir');
    while (menu != 's' && menu != 'S') {
        if (menu == 'E' || menu == 'e') {

            // Preguntaremos el nombre del archivo
            var nombreArchivo = prompt('Escribe el nombre del archivo (no cal escribir formato, por defecto sera ".txt"): ');
            var nombreFormateado = nombreArchivo + ".txt";

            // Mientras este vacio o el usuario intente cancelar te volverá a preguntar
            while (nombreArchivo == null || nombreArchivo == '') {
                nombreArchivo = prompt('ERROR - Escribe el nombre del archivo (no cal escribir formato, por defecto sera ".txt"): ');
                nombreFormateado = nombreArchivo + ".txt";
            }

            // Función donde estará el proceso de exportación
            exportar(textoHistorial, nombreFormateado);

            // Break es para romper el bucle
            break;
        }
        menu = prompt('-----------------------------------------------------\n'
            + '-                                 MENÚ                               -\n'
            + '-----------------------------------------------------\n'
            + 'E - Exportar historial\n'
            + 'S - Salir');
    }

}

/**
 * Función para hacer el proceso de exportación
 * @param texto: texto que queremos exportar
 * @param nombreArchivo: Nombre del archivo (Solo se aceptará que sea txt)
 */
function exportar(texto, nombreArchivo) {

    // Si sabes que el valor de una variable no cambiará durante todo el programa, es recomendable utilizar "const"
    const link = document.createElement('a');
    const contenido = texto;

    // Creamos un objeto blob (Es un término que se usa para almacenar un elemento grande de datos en una base de datos que está en código binario.)
    const blob = new Blob([contenido], { type: 'octet/stream' });

    // Este código crea un enlace descargable a partir de un objeto blob en el navegador.
    const enlace = window.URL.createObjectURL(blob);

    // A la etiqueta "a" que habiamos creado antes, le añadimos un href y una descarga con el nombre que le pedimos al usuario
    link.href = enlace;
    link.download = nombreArchivo;
    link.click();
    window.URL.revokeObjectURL(enlace);
}
