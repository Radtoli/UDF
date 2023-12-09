var tipo;

function PegarTipo(TipoSelecionado){
    sessionStorage.setItem('tipo', TipoSelecionado);
}

window.onload = function() {
    if (!localStorage.getItem('entradas')) {
        localStorage.setItem('entradas', JSON.stringify({fixas: [], variaveis: []}));
    }
    if (!localStorage.getItem('saidas')) {
        localStorage.setItem('saidas', JSON.stringify({fixas: [], variaveis: []}));
    }

    // Exibe os dados
    exibirDados();
}

function SalvarDados(){
    alert('Dados Salvos!');
    var tipo = sessionStorage.getItem('tipo');
    var nome = document.getElementById('Nome').value;
    var valor = document.getElementById('Valor').value;
    var recorrencia = document.getElementById('Recorrencia').value;
    var selectTipo = document.getElementById('selectTipo');
    var tipoSelecionadoFixaOuVariavel = selectTipo.options[selectTipo.selectedIndex].value;

    var novoItem = { Nome: nome, Valor: valor, Recorrencia: recorrencia };

    if(tipo == 'entrada'){
        var entradas = JSON.parse(localStorage.getItem('entradas'));
        if(tipoSelecionadoFixaOuVariavel == "Fixa"){
            entradas.fixas.push(novoItem);
        } else if(tipoSelecionadoFixaOuVariavel == "Variável"){
            entradas.variaveis.push(novoItem);
        }
        localStorage.setItem('entradas', JSON.stringify(entradas));
    } else if(tipo == 'saida'){
        var saidas = JSON.parse(localStorage.getItem('saidas'));
        if(tipoSelecionadoFixaOuVariavel == "Fixa"){
            saidas.fixas.push(novoItem);
        } else if(tipoSelecionadoFixaOuVariavel == "Variável"){
            saidas.variaveis.push(novoItem);
        }
        localStorage.setItem('saidas', JSON.stringify(saidas));
    }
}

function createClickHandler(k, secao, tipo, dados) {
    return function() {
        // Remove o item do array
        dados.splice(k, 1);

        // Atualiza o localStorage
        if(secao == 'entradas') {
            var entradas = JSON.parse(localStorage.getItem('entradas'));
            entradas[tipo] = dados;
            localStorage.setItem('entradas', JSON.stringify(entradas));
        } else if(secao == 'saidas') {
            var saidas = JSON.parse(localStorage.getItem('saidas'));
            saidas[tipo] = dados;
            localStorage.setItem('saidas', JSON.stringify(saidas));
        }

        // Atualiza a exibição dos dados
        exibirDados();
    };
}

function exibirDados() {
    var entradas = JSON.parse(localStorage.getItem('entradas'));
    var saidas = JSON.parse(localStorage.getItem('saidas'));

    var tipos = ['fixas', 'variaveis'];
    var secoes = ['entradas', 'saidas'];

    for (var i = 0; i < secoes.length; i++) {
        for (var j = 0; j < tipos.length; j++) {
            var secao = secoes[i];
            var tipo = tipos[j];
            var dados = secao == 'entradas' ? entradas[tipo] : saidas[tipo];
            var container = document.getElementById(secao + tipo);

            // Limpa o conteúdo existente
            container.innerHTML = '';

            // Adiciona novos itens
            for (var k = 0; k < dados.length; k++) {
                var item = dados[k];
                var div = document.createElement('div');
                div.className = 'caixaVariavel';
                div.innerHTML = '<p>' + item.Nome + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp <span>R$:' + item.Valor + '</span><button id="btn'+k+'"><strong>X</strong></button></p>';
                container.appendChild(div);

                // Adiciona evento de clique ao botão
                document.getElementById('btn'+k).addEventListener('click', createClickHandler(k, secao, tipo, dados));
            }
        }
    }
}
