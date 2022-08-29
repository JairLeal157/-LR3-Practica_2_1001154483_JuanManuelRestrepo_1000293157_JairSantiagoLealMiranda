
var Stack = /** @class */ (function () {
    function Stack() {
        this.vector = new Array();
    }
    Stack.prototype.push = function (a) {
        this.vector.push(a);
    };
    Stack.prototype.pop = function () {
        return this.vector.pop();
    };
    Stack.prototype.empty = function () {
        return this.vector.length == 0;
    };
    return Stack;
}());
var nodoDoble = /** @class */ (function () {
    function nodoDoble(valor) {
        this.sw = 0;
        this.valor = valor;
        this.ligaIzq = null;
        this.ligaDer = null;
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
var arbol = /** @class */ (function () {
    function arbol(arbolHilera) {
        var longitud = arbolHilera.length;
        if (longitud < 1)
            return;
        if (longitud == 3) {
            this.raiz = new nodoDoble(arbolHilera[1]);
            return;
        }
        this.raiz = new nodoDoble(arbolHilera[1]);
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
    arbol.prototype.finDeRecorrido = function (p) {
        return p == null || p == undefined;
    };

    arbol.prototype.imprimir = function () {
        let string = [];
        let padre = true;
        string.push("(");
        let p = this.raiz;
        let pila = new Stack();
        while (!this.finDeRecorrido(p)) {
            if (p.sw == 0) {
                string.push(p.valor);
                string.push(padre?"(":this.finDeRecorrido(p.getLigaDer()) ? ")": ",");
                padre = false;
                p = p.getLigaDer();
                while (!pila.empty() && p == null) {
                    p = pila.pop();
                    string.push(this.finDeRecorrido(p.getLigaDer()) ? ")": null);
                    p = p.getLigaDer();
                }
            }
            else {
                pila.push(p);
                p = p.valor;
                padre = true;
            }
        }
        string.push(")");
        return string.join("");
    };

    arbol.prototype.gradoRegistro = function (pa) {
        if (pa.getSw()==0 && pa != this.raiz){
            return 0;
        }
        let p = (pa == this.raiz)? pa: pa.getValor();
        if (this.finDeRecorrido(p)) {
            return 0;
        }
        p = p.getLigaDer();
        let i = 0;
        while(!this.finDeRecorrido(p)) {
            i++;
            p = p.getLigaDer();
        }
        return i
    }

    arbol.prototype.gradoMayor = function () {
        let p = this.raiz;
        let pila = new Stack();
        let mayor = this.gradoRegistro(p);
        let aux = mayor;
        while (!this.finDeRecorrido(p)) {
            if (p.sw == 0) {
                p = p.getLigaDer();
                while (!pila.empty() && p == null) {
                    p = pila.pop();
                    p = p.getLigaDer();
                }
            }
            else {
                pila.push(p);

                aux = this.gradoRegistro(p);
                p = p.valor;
                mayor = mayor >= aux ? mayor : aux;
            }
        }
        return mayor
    };

    arbol.prototype.numeroHojas = function () {
        let p = this.raiz;
        let pila = new Stack();
        let padre = true;
        let contador = 0;
        while (!this.finDeRecorrido(p)) {
            if (p.sw == 0) {
                contador = !padre ? contador + 1 : contador;
                padre = false;
                p = p.getLigaDer();
                while (!pila.empty() && p == null) {
                    p = pila.pop();
                    p = p.getLigaDer();
                }
            }
            else {
                pila.push(p);
                p = p.valor;
                padre = true;
            }
        }
        return contador;
    };
    arbol.prototype.altura = function(raiz){
        let p = raiz;
        if(this.finDeRecorrido(p))return 0;
        if(this.finDeRecorrido(p.getLigaDer()))return 1;
        let h=1,aux;
        p = p.getLigaDer();
        while(!this.finDeRecorrido(p)){
            if(p.getSw()==1){
                aux = this.altura(p.getValor());
                if(aux>h){
                    h=aux;
                }
            }
            p = p.ligaDer;
        }
        return h+1;
    }

    arbol.prototype.gradoDato = function (dato){
        let grado = -1;
        let p = this.raiz;
        let pila = new Stack();
        while (!this.finDeRecorrido(p)) {
            if (p.sw == 0) {
                if (p.valor == dato) {
                    return this.gradoRegistro(p);
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
        alert("No se encontro el dato");
        return grado;
    }
    arbol.prototype.nivelRegistro = function (registro){
        if(registro==this.raiz){
            return 1;
        }
        if(this.finDeRecorrido(registro)){
            return 0;
        }
        let p = registro.getLigaIzq();
        let i=1;
        while(!this.finDeRecorrido(p)){
            i = i+1;
            p = p.getLigaIzq();
        }
        return i;
    }

    arbol.prototype.nivelDato = function (dato){
        let grado = -1;
        let p = this.raiz;
        let pila = new Stack();
        while (!this.finDeRecorrido(p)) {
            if (p.sw == 0) {
                if (p.valor == dato) {
                    return this.nivelRegistro(p);
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

        return grado;
    }

    arbol.prototype.ancestrosRegistro = function (registro){
        let arregloPadres = [];
        if(registro==this.raiz){
            alert("El registro es la raiz, por lo tanto no tiene ancestros.");
            return -1;
        }
        let p=registro.getLigaIzq();
        while(p!=null){
            arregloPadres.push(p.valor);
            p = p.getLigaIzq();
        }
        return arregloPadres;
    }

    arbol.prototype.ancestrosDato = function (dato){
        let arregloPadres = [];
        let p = this.raiz;
        let pila = new Stack();
        while (!this.finDeRecorrido(p)) {
            if (p.sw == 0) {
                if (p.valor == dato) {
                    return this.ancestrosRegistro(p);
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

