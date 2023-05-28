// Busca el elemento con el id "embedim--snow"
var efectoNieve = document.getElementById("efecto-nieve");

// Comprueba si el elemento no existe
if (!efectoNieve) {
    // Declara una función llamada efectoRandom que devuelve un número aleatorio entre a y b
    function efectoRandom(a, b) {
        return Math.floor(Math.random() * (b - a + 1)) + a;
    }

    // Define un estilo CSS para la clase ".embedim-snow"
    var cssEfecto = '.nieve{position: absolute;width: 10px;height: 10px;background: white;border-radius: 50%;margin-top:-10px}';

    // Inicializa una variable para almacenar el HTML generado
    var htmlEfecto = '';

    // Genera el HTML para los elementos de nieve
    for (i = 1; i < 200; i++) {

        // Agrega un elemento <i> con la clase "embedim-snow" al HTML generado
        htmlEfecto += '<i class="nieve"></i>';

        // Genera números aleatorios para las propiedades de animación de cada elemento de nieve
        var posRandom = (efectoRandom(0, 1000000) * 0.0001);
        var movimientoRandom = efectoRandom(-100000, 100000) * 0.0001;
        var tiempoRandom = (efectoRandom(3, 8) * 10).toFixed(2);
        var tamanyoRandom = (efectoRandom(0, 10000) * 0.0001).toFixed(2);

        // Agrega reglas CSS para animar cada elemento de nieve
        // .toFixed: és para saber cuantos decimales quieres de un decimal
        cssEfecto += '.nieve:nth-child(' + i + ')' + '{' + 'opacity:' + (efectoRandom(1, 10000) * 0.0001).toFixed(2) + ';'
            + 'transform:translate(' + posRandom.toFixed(2) + 'vw,-10px) scale(' + tamanyoRandom + ');'
            + 'animation:fall-' + i + ' ' + efectoRandom(10, 30) + 's -' + efectoRandom(0, 30) + 's linear infinite' + '}'
            + '@keyframes fall-' + i + '{' + tiempoRandom + '%{' + 'transform:translate(' + (posRandom + movimientoRandom).toFixed(2) + 'vw,' + tiempoRandom + 'vh) scale(' + tamanyoRandom + ')' + '}'
            + 'to{' + 'transform:translate(' + (posRandom + (movimientoRandom / 2)).toFixed(2) + 'vw, 105vh) scale(' + tamanyoRandom + ')' + '}' + '}';
    }

    // Crea un nuevo elemento <div> para contener la nieve
    efectoNieve = document.createElement('div');
    efectoNieve.id = 'efecto-nieve';

    // Agrega el estilo CSS y el HTML generado al elemento <div>
    efectoNieve.innerHTML = '<style>#efecto-nieve{position:fixed;left:0;top:0;bottom:0;width:100vw;height:100vh;overflow:hidden;z-index:9999999;pointer-events:none}'
        + cssEfecto + '</style>' + htmlEfecto;

    // Agrega el efecto dentro del div principal
    var principal = document.querySelector(".principal");
    principal.appendChild(efectoNieve);
}
