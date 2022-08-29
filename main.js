
function validarDatos(string){
    return string
}

function main (){
    let $ = document.getElementById.bind(document);
    let $inputCargaDeDatos = $("inputCargaDatos");
    let $botonCargarDatos = $("botonCargarDatos");
    let $textArbolCargado = $("textArbolCargado");
    
    let $alturaArbol = $("alturaArbol");
    let $gradoArbol = $("gradoArbol");
    let $numeroHojasArbol = $("numeroHojasArbol");


    let $inputCargarDato = $("inputCargarDato");
    let $botonCargarDato = $("botonCargarDato");
    let $textArbolCargadoDato = $("Dato");

    let $nivelDato = $("nivelDato");
    let $gradoDato = $("gradoDato");
    let $ancestrosDato = $("ancestrosDato");

    var arboll;
    $botonCargarDatos.addEventListener("click", function(){
        let datos = $inputCargaDeDatos.value;
        validarDatos(datos);
        arboll = new arbol(datos);
        $textArbolCargado.innerHTML = arboll.imprimir();
        $inputCargaDeDatos.value = "";

        $alturaArbol.innerHTML = arboll.altura(arboll.raiz);
        $gradoArbol.innerHTML = arboll.gradoMayor();
        $numeroHojasArbol.innerHTML = arboll.numeroHojas();
    });

    $botonCargarDato.addEventListener("click", function(){
        let dato = $inputCargarDato.value;
        $textArbolCargadoDato.innerHTML = dato;
        $inputCargarDato.value = "";

        $nivelDato.innerHTML = arboll.nivelDato(dato);
        $gradoDato.innerHTML = arboll.gradoDato(dato);
        $ancestrosDato.innerHTML = arboll.ancestrosDato(dato);
    });


}

main();