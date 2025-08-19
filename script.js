class Produto {
    constructor(produto,entradas,saidas,qtd) {
        this.produto = produto;
        this.entradas = entradas;
        this.saidas = saidas;
        this.qtd = qtd;
        this.situação = qtd < 5? "comprar" : "ok";
    }
}
let regua = new Produto("regua", 6, 4, 2)
let lapis = new Produto("lapis", 15, 12, 3)
let caderno = new Produto("caderno", 50, 22, 28)
let cola = new Produto("cola", 15, 0, 15)
let caneta = new Produto("caneta", 125, 11, 114)
let papel = new Produto("papel", 10, 4, 6)

let produtos = [regua, lapis, caderno, cola, caneta, papel];
// let pedidos = [{ data, tipo, descrição, produto, qtd }];

const dropdown = document.getElementById("produtos");

produtos.forEach(produto => {
    const optionElement = document.createElement("option");
    optionElement.textContent = produto.produto;
    dropdown.appendChild(optionElement);
});

function irParaEstoque() {
    window.location.href = "estoque.html";
}
