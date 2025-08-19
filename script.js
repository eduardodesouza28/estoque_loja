class Produto {
    constructor(produto, entradas, saidas, qtd) {
        this.produto = produto;
        this.entradas = entradas;
        this.saidas = saidas;
        this.qtd = qtd;
        this.situacao = qtd < 5 ? "comprar" : "ok";
    }
}

function salvarProdutos(produtos) {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

function carregarProdutos() {
    let dados = localStorage.getItem("produtos");
    if (dados) {
        let array = JSON.parse(dados);
        return array.map(p => new Produto(p.produto, p.entradas, p.saidas, p.qtd));
    }
    return null;
}

function salvarLancamentos(lancamentos) {
    localStorage.setItem("lancamentos", JSON.stringify(lancamentos));
}

function carregarLancamentos() {
    let dados = localStorage.getItem("lancamentos");
    if (dados) {
        return JSON.parse(dados);
    }
    return [];
}

let produtos = carregarProdutos();


if (!produtos) {
    let regua = new Produto("regua", 6, 4, 2);
    let lapis = new Produto("lapis", 15, 12, 3);
    let caderno = new Produto("caderno", 50, 22, 28);
    let cola = new Produto("cola", 15, 0, 15);
    let caneta = new Produto("caneta", 125, 11, 114);
    let papel = new Produto("papel", 10, 4, 6);

    produtos = [regua, lapis, caderno, cola, caneta, papel];
    salvarProdutos(produtos);
}

const dropdown = document.getElementById("produtos");

if (window.location.pathname.endsWith("entradas_saidas.html")) {
    produtos.forEach(produto => {
        const optionElement = document.createElement("option");
        optionElement.value = produto.produto;
        optionElement.textContent = produto.produto;
        dropdown.appendChild(optionElement);
    });


    const form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let data = form.elements["data"].value;
        let tipo = form.elements["tipo"].value;
        let descricao = form.elements["descricao"].value;
        let produtoSelecionado = form.elements["produto"].value;
        let quantidade = parseInt(form.elements["quantidade"].value);

        let lancamento = {
            data,
            tipo,
            descricao,
            produto: produtoSelecionado,
            quantidade
        };


        let lancamentos = carregarLancamentos();
        lancamentos.push(lancamento);
        salvarLancamentos(lancamentos);

        let produto = produtos.find(p => p.produto === produtoSelecionado);
        if (produto) {
            if (tipo === "entrada") {
                produto.entradas += quantidade;
                produto.qtd += quantidade;
            } else if (tipo === "saida") {
                produto.saidas += quantidade;
                produto.qtd -= quantidade;
                if (produto.qtd < 0) produto.qtd = 0;
            }
            produto.situacao = produto.qtd < 5 ? "comprar" : "ok";
        }

        salvarProdutos(produtos);

        alert("Lançamento salvo e estoque atualizado!");
        form.reset();
    });
}

function irParaEstoque() {
    window.location.href = "estoque.html";
}

function irParaLancamentos() {
    window.location.href = "entradas_saidas.html";
}

function irParaHome() {
    window.location.href = "index.html";
}

function irParaLancamentosHistorico() {
    window.location.href = "lancamentos.html";
}

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

    renderTabela();
}

if (window.location.pathname.endsWith("lancamentos.html")) {
    function renderLancamentos() {
        let tbody = document.getElementById("tabela-lancamentos");
        let lancamentos = carregarLancamentos();

        if (lancamentos.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5">Nenhum lançamento encontrado</td></tr>`;
            return;
        }

        tbody.innerHTML = lancamentos.map(l => `
          <tr>
            <td>${l.data}</td>
            <td>${l.tipo}</td>
            <td>${l.descricao}</td>
            <td>${l.produto}</td>
            <td>${l.quantidade}</td>
          </tr>
        `).join("");
    }

    renderLancamentos();
}

