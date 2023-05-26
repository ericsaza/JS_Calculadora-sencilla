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
        let caracteresPermitidos = "1234567890+-x÷*/.%";
        for (var i = 0; i < arrayOperacion.length; i++) {

            // Comprobaremos que los caracteres esten permitidos
            if (caracteresPermitidos.includes(arrayOperacion[i])) {
                console.log(arrayOperacion[i]);
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
        console.log(operacionCorrecta);
        document.getElementById("calculo").value += "=" + eval(operacionCorrecta);
        var historial = document.querySelector(".contenedor-historial");
        historial.innerHTML += document.getElementById("calculo").value + "\n";
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
