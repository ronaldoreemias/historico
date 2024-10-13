document.addEventListener('DOMContentLoaded', function() {
    loadProducts();

    document.getElementById('enviar').addEventListener('click', function() {
        const nomeProduto = document.getElementById('nome_produto').value;
        const preco = parseFloat(document.getElementById('preco').value);
        const quantidade = parseInt(document.getElementById('quantidade').value);
        const fornecedor = document.getElementById('fornecedor').value;
        const dataCadastro = document.getElementById('data_cadastro').value;

        if (!nomeProduto || isNaN(preco) || isNaN(quantidade) || !fornecedor || !dataCadastro) {
            alert('Preencha todos os campos!');
            return;
        }

        const product = {
            nomeProduto,
            preco,
            quantidade,
            fornecedor,
            dataCadastro
        };

        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));

        clearInputs();
        loadProducts();
    });

    document.getElementById('imprimir').addEventListener('click', function() {
        window.print();
    });

    document.getElementById('pesquisar').addEventListener('click', function() {
        const dataFiltro = document.getElementById('data_filtro').value;
        filterByDate(dataFiltro);
    });
});

function loadProducts() {
    const historicoCorpo = document.getElementById('historico_corpo');
    const products = JSON.parse(localStorage.getItem('products')) || [];

    historicoCorpo.innerHTML = '';
    products.forEach((product, index) => {
        const productEntry = `
            <tr>
                <td>${product.nomeProduto}</td>
                <td>${product.preco.toFixed(2)}</td>
                <td>${product.quantidade}</td>
                <td>${product.fornecedor}</td>
                <td>${product.dataCadastro}</td>
                <td><button class="btn btn-danger" onclick="deleteProduct(${index})">Excluir</button></td>
            </tr>
        `;
        historicoCorpo.innerHTML += productEntry;
    });

    checkScroll();
}

function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
}

function clearInputs() {
    document.getElementById('nome_produto').value = '';
    document.getElementById('preco').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('fornecedor').value = '';
    document.getElementById('data_cadastro').value = '';
}

function filterByDate(dataFiltro) {
    const historicoCorpo = document.getElementById('historico_corpo');
    const products = JSON.parse(localStorage.getItem('products')) || [];

    historicoCorpo.innerHTML = '';
    const filteredProducts = products.filter(product => product.dataCadastro === dataFiltro);

    filteredProducts.forEach((product, index) => {
        const productEntry = `
            <tr>
                <td>${product.nomeProduto}</td>
                <td>${product.preco.toFixed(2)}</td>
                <td>${product.quantidade}</td>
                <td>${product.fornecedor}</td>
                <td>${product.dataCadastro}</td>
                <td><button class="btn btn-danger" onclick="deleteProduct(${index})">Excluir</button></td>
            </tr>
        `;
        historicoCorpo.innerHTML += productEntry;
    });

    if (filteredProducts.length === 0) {
        historicoCorpo.innerHTML = '<tr><td colspan="6">Nenhum produto encontrado para a data selecionada.</td></tr>';
    }

    checkScroll();
}

function checkScroll() {
    const historicoCorpo = document.getElementById('historico_corpo');
    const rows = historicoCorpo.getElementsByTagName('tr');
    
    if (rows.length > 3) {
        historicoCorpo.style.overflowY = 'scroll';
        historicoCorpo.style.maxHeight = '200px';
    } else {
        historicoCorpo.style.overflowY = 'hidden';
        historicoCorpo.style.maxHeight = 'none';
    }
}