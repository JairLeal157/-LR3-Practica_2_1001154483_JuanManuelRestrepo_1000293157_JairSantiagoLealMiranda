
var Stack = /** @class */ (function () { //clase pila 
    function Stack() {
        this.vector = new Array();
    }
    Stack.prototype.push = function (a) { //metodo que agrega un elemento a la cima de la pila
        this.vector.push(a);
    };
    Stack.prototype.pop = function () { //metodo que elimina el elemento de la cima de la pila
        return this.vector.pop();
    };
    Stack.prototype.empty = function () { //metodo que verifica si la pila esta vacia
        return this.vector.length == 0;
    };
    return Stack;
}());
var nodoDoble = /** @class */ (function () { //clase nodo doble(cuatro espacios)
    function nodoDoble(valor) {
        this.sw = 0; //variable que indica si el valor del nodo es o no un subarbol
        this.valor = valor; //valor del nodo
        this.ligaIzq = null; //liga del nodo a la izquierda, en el se guarda el nodo padre
        this.ligaDer = null; //liga del nodo a la derecha, en el se guarda el nodo hijo o nodo hermano
    }
    nodoDoble.prototype.getLigaIzq = function () {
        return this.ligaIzq;
    };
    nodoDoble.prototype.setLigaIzq = function (ligaIzq) {
        this.ligaIzq = ligaIzq;
    };
    nodoDoble.prototype.getLigaDer = function () {
        return this.ligaDer;
    };
    nodoDoble.prototype.setLigaDer = function (ligaDer) {
        this.ligaDer = ligaDer;
    };
    nodoDoble.prototype.getValor = function () {
        return this.valor;
    };
    nodoDoble.prototype.setValor = function (valor) {
        this.valor = valor;
    };
    nodoDoble.prototype.getSw = function () {
        return this.sw;
    };
    nodoDoble.prototype.setSw = function (sw) {
        this.sw = sw;
    };
    return nodoDoble;
}());
var arbol = /** @class */ (function () { //clase arbol
    function arbol(arbolHilera) { //constructor de la clase arbol, que recibe un string con los datos del arbol a crear
        var longitud = arbolHilera.length;  //longitud del string
        if (longitud == 3) { //si la longitud del string es 3, el arbol solo tiene un nodo que es la raiz
            this.raiz = new nodoDoble(arbolHilera[1]);
            return;
        }
        this.raiz = new nodoDoble(arbolHilera[1]); //se crea la raiz del arbol
        var auxPadre, hoja, nodoAux;
        var pila = new Stack();
        auxPadre = this.raiz;
        nodoAux = auxPadre;
        var i = 3;
        while (i <= longitud - 3) {
            hoja = new nodoDoble(null);
            nodoAux.setLigaDer(hoja);
            nodoAux = hoja;
            if (arbolHilera[i + 1] == "(") {
                nodoAux.setSw(1);
                pila.push(nodoAux);
                nodoAux.setLigaIzq(auxPadre);
                hoja = new nodoDoble(arbolHilera[i]);
                nodoAux.setValor(hoja);
                hoja.setLigaIzq(auxPadre);
                nodoAux = hoja;
                auxPadre = hoja;
                i = i + 2;
            }
            else {
                nodoAux.setValor(arbolHilera[i]);
                nodoAux.setLigaIzq(auxPadre);
                if (arbolHilera[i + 1] == ")") {
                    i = i + 1;
                    while (i < longitud && arbolHilera[i] == ")" && !pila.empty()) {
                        nodoAux = pila.pop();
                        auxPadre = nodoAux.getLigaIzq();
                        i = i + 1;
                    }
                    if (arbolHilera[i] == ",") {
                        i = i + 1;
                    }
                }
                else {
                    i = i + 2;
                }
            }
        }
    }
    arbol.prototype.finDeRecorrido = function (p) { //metodo que verifica si un nodo salio del recorrido
        return p == null || p == undefined;
    };

    arbol.prototype.imprimir = function () { //metodo que imprime el arbol
        let string = []; //string que almacena el arbol
        let padre = true; //variable que indica si el nodo actual es el padre de un subarbol
        string.push("("); //se agrega un parentesis al inicio del arbol
        let p = this.raiz; //se crea un puntero que apunta al nodo raiz
        let pila = new Stack(); //pila donde se guardan los nodos con subarboles
        while (!this.finDeRecorrido(p)) { //mientras el puntero no apunte a un nodo nulo
            if (p.sw == 0) { //si el nodo no tiene subarbol
                string.push(p.valor); //se agrega el valor del nodo al string
                string.push(padre?"(":this.finDeRecorrido(p.getLigaDer()) ? ")": ","); //se agrega un abre parentesis, cierra parentesis o una coma segun sea el caso
                padre = false; //se indica que el nodo actual no es el padre de un subarbol
                p = p.getLigaDer(); //se mueve el puntero al nodo derecho
                while (!pila.empty() && p == null) { //mientras la pila no este vacia y el puntero apunte a un nodo nulo
                    p = pila.pop();
                    string.push(this.finDeRecorrido(p.getLigaDer()) ? ")": null); //se agrega un cierra parentesis o una coma segun sea el caso
                    p = p.getLigaDer();
                }
            }
            else { //si el nodo tiene subarbol
                pila.push(p); //se agrega el nodo actual a la pila
                p = p.valor; //se mueve el puntero al subarbol
                padre = true; //se indica que el nodo actual es el padre de un subarbol
            }
        }
        string.push(")"); //se agrega un cierra parentesis al final del arbol
        return string.join("");
    };

    arbol.prototype.gradoRegistro = function (pa) { //metodo que calcula el grado de un nodo
        if (pa.getSw()==0 && pa != this.raiz){ //si el nodo no tiene subarbol y no es la raiz
            return 0; //se retorna 0
        }
        let p = (pa == this.raiz)? pa: pa.getValor(); //se crea un puntero que apunta al nodo actual o al subarbol del nodo actual, segun si el nodo actual es la raiz o no
        if (this.finDeRecorrido(p)) { //si el puntero apunta a un nodo nulo, se retorna 0
            return 0;
        }
        p = p.getLigaDer(); //se mueve el puntero al nodo derecho
        let i = 0; //contador que cuenta el grado del nodo actual
        while(!this.finDeRecorrido(p)) { //mientras el puntero no apunte a un nodo nulo, se suma 1 al contador
            i++;
            p = p.getLigaDer();
        }
        return i //se retorna el contador
    }

    arbol.prototype.gradoMayor = function () { //metodo que calcula el grado mayor del arbol
        let p = this.raiz; //se crea un puntero que apunta al nodo raiz
        let pila = new Stack(); //pila donde se guardan los nodos con subarboles
        let mayor = this.gradoRegistro(p); //se calcula el grado del nodo raiz
        let aux = mayor; //se guarda el grado del nodo raiz, en una variable auxiliar
        while (!this.finDeRecorrido(p)) { //mientras el puntero no apunte a un nodo nulo
            if (p.sw == 0) { //si el nodo no tiene subarbol, avanza al nodo derecho 
                p = p.getLigaDer();
                while (!pila.empty() && p == null) {
                    p = pila.pop();
                    p = p.getLigaDer();
                }
            }
            else { //si el nodo tiene subarbol
                pila.push(p); //se agrega el nodo actual a la pila

                aux = this.gradoRegistro(p); //se calcula el grado del subarbol del nodo actual
                p = p.valor; //se mueve el puntero al subarbol
                mayor = mayor >= aux ? mayor : aux; //se compara el grado mayor actual con el grado del subarbol del nodo actual y se guarda el mayor
            }
        }
        return mayor //se retorna el grado mayor
    };

    arbol.prototype.numeroHojas = function () { //metodo que calcula el numero de hojas del arbol
        let p = this.raiz; //se crea un puntero que apunta al nodo raiz
        let pila = new Stack(); 
        let padre = true; //variable que indica si el nodo actual es el padre de un subarbol
        let contador = 0;   //contador que cuenta el numero de hojas del arbol
        while (!this.finDeRecorrido(p)) { //mientras el puntero no apunte a un nodo nulo
            if (p.sw == 0) { //si el nodo no tiene subarbol
                contador = !padre ? contador + 1 : contador; //se suma 1 al contador si el nodo actual no es el padre de un subarbol
                padre = false; //se indica que el nodo actual no es el padre de un subarbol
                p = p.getLigaDer(); //se mueve el puntero al nodo derecho
                while (!pila.empty() && p == null) {
                    p = pila.pop();
                    p = p.getLigaDer();
                }
            }
            else { //si el nodo tiene subarbol, avanza normalmente al subarbol
                pila.push(p);
                p = p.valor;
                padre = true; //se indica que el nodo actual es el padre de un subarbol
            }
        }
        return contador; //se retorna el numero de hojas del arbol
    };
    arbol.prototype.altura = function(raiz){ //metodo que calcula la altura del arbol
        let p = raiz; //se crea un puntero que apunta al nodo raiz
        if(this.finDeRecorrido(p))return 0; //si el puntero apunta a un nodo nulo, se retorna 0
        if(this.finDeRecorrido(p.getLigaDer()))return 1; //si la liga derecha apunta a un nodo nulo, se retorna 1 pues no tiene hijos
        let h=1,aux; //se crea una variable que guarda la altura del subarbol del nodo actual y una variable auxiliar
        p = p.getLigaDer(); //se mueve el puntero al primer hijo del subarbol del nodo actual
        while(!this.finDeRecorrido(p)){ //mientras el puntero no apunte a un nodo nulo
            if(p.getSw()==1){ //si el nodo tiene subarbol
                aux = this.altura(p.getValor()); //se calcula la altura del subarbol del nodo actual
                if(aux>h){ //si la altura del subarbol del nodo actual es mayor que la altura actual
                    h=aux; //se guarda la altura del subarbol del nodo actual
                }
            }
            p = p.ligaDer; //se mueve el puntero al siguiente hijo del subarbol del nodo actual
        }
        return h+1; //se retorna la altura del arbol
    }

    arbol.prototype.gradoDato = function (dato){ //metodo que calcula el grado del dato en el arbol
        let grado = -1; //se crea una variable que guarda el grado del dato, por defecto es -1(que significa que no existe)
        //se recorre el arbol buscando el dato
        let p = this.raiz;
        let pila = new Stack();
        while (!this.finDeRecorrido(p)) {
            if (p.sw == 0) {
                if (p.valor == dato) { //si el dato es el mismo que el nodo actual
                    return this.gradoRegistro(p); //se retorna el grado del nodo actual
                }
                p = p.getLigaDer();
                while (!pila.empty() && p == null) {
                    p = pila.pop();
                    p = p.getLigaDer();
                }
            }
            else {
                pila.push(p);
                if (p.valor.valor == dato) {
                    console.log(p.getSw())
                    return this.gradoRegistro(p);
                }
                p = p.valor;
            }
        }
        alert("No se encontro el dato"); //si no se encuentra el dato, se muestra un mensaje de error
        return grado; //se retorna el grado del dato
    }
    arbol.prototype.nivelRegistro = function (registro){ //metodo que calcula el nivel del registro en el arbol
        if(registro==this.raiz){ //si el registro es el mismo que el nodo raiz
            return 1; //se retorna 1
        }
        if(this.finDeRecorrido(registro)){ //si el registro es un nodo nulo
            return 0; //se retorna 0
        }
        let p = registro.getLigaIzq(); //se crea un puntero que apunta al padre del registro
        let i=1; //se crea una contador que cuenta el numero de padres del registro, es decir el nivel del registro
        while(!this.finDeRecorrido(p)){ //mientras el puntero no apunte a un nodo nulo, es decir que tenga padre
            i = i+1; //se suma 1 al contador
            p = p.getLigaIzq(); //se mueve el puntero al padre del registro
        }
        return i; //se retorna el nivel del registro
    }

    arbol.prototype.nivelDato = function (dato){ //metodo que calcula el nivel del dato en el arbol
        let grado = -1; //se crea una variable que guarda el grado del dato, por defecto es -1(que significa que no existe)
        //se recorre el arbol buscando el dato
        let p = this.raiz;
        let pila = new Stack();
        while (!this.finDeRecorrido(p)) {
            if (p.sw == 0) {
                if (p.valor == dato) { //si el dato es el mismo que el nodo actual
                    return this.nivelRegistro(p); //se retorna el nivel del nodo actual
                }
                p = p.getLigaDer();
                while (!pila.empty() && p == null) {
                    p = pila.pop();
                    p = p.getLigaDer();
                }
            }
            else {
                pila.push(p);
                p = p.valor;
            }
        }

        return grado; //se retorna el grado del dato
    }

    arbol.prototype.ancestrosRegistro = function (registro){ //metodo que calcula los ancestros del registro en el arbol
        let arregloPadres = []; //se crea un arreglo que guarda los ancestros del registro
        if(registro==this.raiz){ //si el registro es el mismo que el nodo raiz
            alert("El registro es la raiz, por lo tanto no tiene ancestros."); //se muestra un mensaje de error
            return -1; //se retorna -1
        }
        let p=registro.getLigaIzq(); //se crea un puntero que apunta al padre del registro
        while(p!=null){ //mientras el puntero no apunte a un nodo nulo, es decir que tenga padre
            arregloPadres.push(p.valor); //se agrega el padre del registro al arreglo
            p = p.getLigaIzq(); //se mueve el puntero al padre del registro
        }
        return arregloPadres; //se retorna el arreglo con los ancestros del registro
    }

    arbol.prototype.ancestrosDato = function (dato){ //metodo que calcula los ancestros del dato en el arbol
        //se recorre el arbol buscando el dato
        let p = this.raiz; 
        let pila = new Stack();
        while (!this.finDeRecorrido(p)) {
            if (p.sw == 0) {
                if (p.valor == dato) { //si el dato es el mismo que el nodo actual
                    return this.ancestrosRegistro(p); //se retorna el arreglo con los ancestros del nodo actual
                }
                p = p.getLigaDer();
                while (!pila.empty() && p == null) {
                    p = pila.pop();
                    p = p.getLigaDer();
                }
            }
            else {
                pila.push(p);
                p = p.valor;
            }
        }
        return -1;
    }



    return arbol;
}());

