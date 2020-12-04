//@ts-check
const NUMNOCHES = 14;
cargarFecha();
crearOpcionesNoches();
primerahabitacion();

var habitaciones = document.getElementById("habitaciones");

document.body.appendChild
document.getElementById("anadirContenedor").addEventListener("click", crearHabitacion);
document.getElementById("editarHabitaciones").addEventListener("click", mostrarHabitaciones);
document.getElementById("buscarButton").addEventListener("click", buscar);

/**
 * Genera en la consola unos logs con los datos introducidos.
 *
 */
function buscar() {
    let auxHabitacion = habitaciones.getElementsByClassName("habitacion");
    console.log("RESERVA HOTELERA");
    console.log("Destino: " + document.getElementById("destinoId").value);
    console.log("Fecha de entrada: " + document.getElementById("dateId").value);
    console.log("Número de noches: " + document.getElementById("nochesId").value);
    console.log("Habitaciones:");
    for (let i = 1; i < auxHabitacion.length + 1; i++) {
        console.log("   En habitación " + i + " se hospedarán:");
        console.log("       Adultos: " + auxHabitacion[i - 1].getElementsByClassName("adultoselector")[0].value);
        if (auxHabitacion[i - 1].getElementsByClassName("ninios")[0].getElementsByTagName("select").length == 0) {
            console.log("       Menores: " + auxHabitacion[i - 1].getElementsByClassName("ninioselector")[0].value);

        } else {
            console.log("       Menores: " + auxHabitacion[i - 1].getElementsByClassName("ninioselector")[0].value + " con edades " + recogerninios(auxHabitacion[i - 1]));
        }
    }

    /**
     * Recoge una habitacion y devuelve la edad de los niños
     *
     * @param {Element} habitacion
     * @return {String} 
     */
    function recogerninios(habitacion) {
        let ninios = habitacion.getElementsByClassName("ninios")[0];
        ninios = ninios.getElementsByTagName("select");
        let aux = "";
        for (let i = 0; i < ninios.length; i++) {
            if (i != (ninios.length - 1)) {
                aux += ninios[i].value + " años, ";
            } else {
                aux += ninios[i].value + " años ";
            }

        }
        return aux;
    }


}


/**
 *
 *  Ajusta la fecha del input de tipo fecha con la fecha actual y deshabilitando los botones anteriores a la fecha actual
 *
 */
function cargarFecha() {
    let hoy = new Date().toISOString().split("T")[0];
    let nodoFecha = document.getElementById("dateId");
    // @ts-ignore
    nodoFecha.value = hoy;
    nodoFecha.setAttribute("min", hoy);
}


/**
 * Método que es llamado cuando el popover se esconde y guardando así la información de las habitaciones.
 *
 */
function editarHabitaciones() {
    habitaciones = document.getElementById("habitaciones");
    let auxHabitacion = habitaciones.getElementsByClassName("habitacion");

    let guest = 0;
    for (let i = 0; i < auxHabitacion.length; i++) {
        guest += parseInt(auxHabitacion[i].getElementsByClassName("adultoselector")[0].value);
        guest += parseInt(auxHabitacion[i].getElementsByClassName("ninioselector")[0].value);
    }
    document.getElementById("editarHabitaciones").innerHTML = auxHabitacion.length + " rooms & " + guest + " guest"

}

/**
 *
 * Muestra las habitaciones en el popover
 */
function mostrarHabitaciones() {
    habitaciones.style.visibility = "visible";
}

/**
 * Funcion para crear el select de noches y su contenido
 * 
 */

function crearOpcionesNoches() {
    let select = document.getElementById("nochesId");

    select.appendChild(crearNodoOptionGroup("COMUNES"));
    let Hijo = select.firstElementChild;
    Hijo.appendChild(crearNodoOption(4, "4 Noches"));
    Hijo.appendChild(crearNodoOption(7, "7 Noches"));
    Hijo.appendChild(crearNodoOption(10, "10 Noches"));
    Hijo.appendChild(crearNodoOption(14, "14 Noches"));

    select.appendChild(crearNodoOptionGroup("DIARIAS"))
    Hijo = select.lastElementChild;
    Hijo.appendChild(crearNodoOption(1, 1 + " Noche"))
    for (let i = 2; i < NUMNOCHES + 1; i++) {
        Hijo.appendChild(crearNodoOption(i, i + " Noches"))
    }
    let defaultOption = crearNodoOption(0, "0 Noches");
    defaultOption.selected = true;
    defaultOption.disabled = true;
    defaultOption.hidden = true;
    Hijo.appendChild(defaultOption);
}


/**
 *  Funcion que recibe un texto y genera un grupo de opciones para un select
 *
 * @param {String} texto
 * @return {Element} 
 */
function crearNodoOptionGroup(texto) {
    let nodo = document.createElement("optgroup");
    nodo.setAttribute("label", texto);
    return nodo;
}


/**
 * Crea una opción para un select
 *
 * @param {String} value
 * @param {String} texto
 * @return {Element} 
 */
function crearNodoOption(value, texto) {
    let nodo = document.createElement("option");
    let text = document.createTextNode(texto);

    nodo.appendChild(text);
    nodo.setAttribute("value", value);
    return nodo;
}


/**
 * Crea un select según el número de elementos que se le pase
 *
 * @param {int} numElementos
 * @return {*} 
 */
function crearSelectNum(numElementos) {
    let nodo = crearNodo("select", undefined, undefined);
    //TODO PONER ID
    for (let i = 1; i < numElementos + 1; i++) {
        nodo.appendChild(crearNodoOption(i, i));
    }
    return nodo;
}


/**
 * Crea un nodo según el tipo delemento que se le pase, el texto y la clase
 *
 * @param {String} tipoElemento
 * @param {String} texto
 * @param {String} clase
 * @return {Element} 
 */
function crearNodo(tipoElemento, texto, clase) {
    let nodo = document.createElement(tipoElemento);
    if (texto != undefined) {
        let text = document.createTextNode(texto);
        nodo.appendChild(text);
    }
    if (clase != undefined)
        nodo.className = clase;
    return nodo;
}

/**
 * Función que gestiona el evento on change del selector de niños y genera niños
 *
 * @param {Element} nodo
 * @param {int} numHijo
 */
function anadirHijo(nodo, numHijo) {
    if (numHijo > nodo.childElementCount) {
        for (let i = nodo.childElementCount; i < numHijo; i++) {
            nodo.appendChild(crearSelectNum(12));
        }
    } else {
        while (nodo.childElementCount != numHijo) {
            nodo.removeChild(nodo.lastElementChild);
        }
    }
}


/**
 * Prepara la primera habitación para tener funcionalidad.
 *
 */

function primerahabitacion() {
    let nodo = document.getElementById("habitacion1");
    let selectorHijos = document.getElementsByClassName("ninioselector")[0];

    selectorHijos.addEventListener("change", () => anadirHijo(nodo.lastElementChild, selectorHijos.value));
}

/**
 * Se le pasa un nodo y borra todo los hijos que contenga de forma recursiva
 *
 * @param {Element} node
 */
function borrarHijos(node) {
    while (node.lastElementChild) {
        borrarHijos(node.lastElementChild);
        node.removeChild(node.lastElementChild);
    }
}

/**
 * Borra una habitación
 *
 * @param {Element} habitacion
 */
function eliminarHabitacion(habitacion) {
    let eliminarHabitacion = document.getElementById(habitacion);
    ajustarNumHabitacion(eliminarHabitacion);
    borrarHijos(eliminarHabitacion);
    document.getElementById("habitaciones").removeChild(eliminarHabitacion.previousElementSibling);
    document.getElementById("habitaciones").removeChild(eliminarHabitacion);
}


/**
 * Ajusta el núimero de la habitación cuando una de ellas es borrada
 *
 * @param {Element} habitacion habitación que se va a borrar
 */

function ajustarNumHabitacion(habitacion) {
    let habitacionModificar = habitacion.nextElementSibling.nextElementSibling;
    if (habitacionModificar.id != "anadirHabitacion") {
        let nuevoid = (habitacionModificar.id.split("n")[1] - 1);
        habitacionModificar.id = "habitacion" + nuevoid;
        habitacionModificar.firstElementChild.id = "eliminar" + nuevoid;
        habitacionModificar.firstElementChild.nextElementSibling.innerHTML = `${nuevoid} Habitación`;
        ajustarNumHabitacion(habitacionModificar);
    }
}


/**
 * Crea una habitación clonando una ya creada.
 *
 */
function crearHabitacion() {
    if ((document.getElementsByClassName("habitacion").length) < 4) {
        let habitaciones = document.getElementById("anadirHabitacion");
        let habitacionTemplate = document.getElementById("habitacion1");
        let nodo = habitacionTemplate.cloneNode(true);

        nodo.id = "habitacion" + (document.getElementsByClassName("habitacion").length + 1);
        nodo.firstElementChild.nextElementSibling.innerHTML = (document.getElementsByClassName("habitacion").length + 1) + " Habitación";

        habitaciones.before(nodo);

        nodo.firstElementChild.id = "eliminar" + (document.getElementsByClassName("habitacion").length);
        nodo.firstElementChild.innerHTML = "X";
        nodo.firstElementChild.addEventListener("click", () => eliminarHabitacion(nodo.id));



        /* 
        let eliminarButton = crearNodo("label", "X", "eliminarHabitacion");
        eliminarButton

        eliminarButton.id = "eliminar" + (document.getElementsByClassName("habitacion").length);
        document.getElementById(nodo.id).firstElementChild.before(eliminarButton);
        */
        habitaciones.before(crearNodo("hr", undefined, undefined));
        let selectorHijos = document.getElementsByClassName("ninioselector")[document.getElementsByClassName("ninioselector").length - 1];

        selectorHijos.addEventListener("change", () => anadirHijo(nodo.lastElementChild, selectorHijos.value));

        //Si se clona el primero y ya tiene hijos creados, estos también se clonaran, entonces por si acaso , se limpia el contenedor de hijos
        borrarHijos(nodo.lastElementChild);
    }
}

$("#editarHabitaciones").on("hide.bs.popover", editarHabitaciones);

$("#doneButton").on("click", () => {
    $("#editarHabitaciones").popover("hide")
});


$(function () {
    $('#editarHabitaciones').popover({
        container: 'body',
        content: habitaciones,
        placement: "bottom",
        html: true
    });
});