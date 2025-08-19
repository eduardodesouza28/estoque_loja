class Produto {
    constructor(produto, entradas, saidas, qtd) {
        this.produto = produto;
        this.entradas = entradas;
        this.saidas = saidas;
        this.qtd = qtd;
        this.situacao = qtd < 5 ? "comprar" : "ok";
    }
}
let regua = new Produto("regua", 6, 4, 2)
let lapis = new Produto("lapis", 15, 12, 3)
let caderno = new Produto("caderno", 50, 22, 28)
let cola = new Produto("cola", 15, 0, 15)
let caneta = new Produto("caneta", 125, 11, 114)
let papel = new Produto("papel", 10, 4, 6)

let produtos = [regua, lapis, caderno, cola, caneta, papel];
const dropdown = document.getElementById("produtos");
let quantidade = 0;

if (window.location.pathname.endsWith("entradas_saidas.html")) {
    produtos.forEach(produto => {
    const optionElement = document.createElement("option");
    optionElement.textContent = produto.produto;
    dropdown.appendChild(optionElement);
});}

function irParaEstoque() {
    window.location.href = "estoque.html";
}

function irParaLancamentos() {
    window.location.href = "entradas_saidas.html";
}

// function getValue() {
//     quantidade = document.getElementById("quantidade").value;

//     console.log(quantidade)
// }


if (window.location.pathname.endsWith("estoque.html")) {
    function renderTabela() {
        let tbody = document.getElementById("tabela-produtos");
        tbody.innerHTML = produtos.map(p => `
      <tr>
        <td>${p.produto}</td>
        <td>${p.entradas}</td>
        <td>${p.saidas}</td>
        <td>${p.qtd}</td>
        <td>${p.situacao}</td>
        <td>
          <span class="alarme ${p.situacao == "comprar" ? "vermelho" : "verde"}"></span>
        </td>
      </tr>
    `).join("");
    }
}

renderTabela();
