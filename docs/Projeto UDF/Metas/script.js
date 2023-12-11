
function leMeta() {
  let strMetas = localStorage.getItem('metas');
  let objMetas = {};

  if (strMetas) {
    objMetas = JSON.parse(strMetas);
  } else {
    objMetas = { metas: [] };
    localStorage.setItem('metas', JSON.stringify(objMetas));
  }
  return objMetas;
}

// Função para incluir ou editar uma meta no local storage
function incluiMeta() {
  // Dados lidos do formulário
  let objetivo = document.getElementById('inputObjetivo').value;
  let valor = document.getElementById('inputValor').value;
  let prazo = document.getElementById('inputPrazo').value;
  let imagemSrc = document.querySelector('.iconeSelecionado').src;

  // Verificações no envio do formulário
  let objMetas = leMeta();
  if (!objetivo || !valor || !prazo || !imagemSrc) {
    alert('Por favor, preencha todos os campos \nInclusive a seleção de imagem');
  } else if (objMetas.metas.length >= 10) {
    alert('Você atingiu o limite máximo de 10 metas.');
  } else {
    let metaExistente = objMetas.metas.find(meta => meta.objetivo === objetivo);

    if (metaExistente) {
   
      metaExistente.valor = valor;
      metaExistente.prazo = prazo;
      metaExistente.imagem = imagemSrc;
    } else {
      let novoId = objMetas.metas.length;
      let novaMeta = {
        id: novoId,
        objetivo: objetivo,
        valor: valor,
        prazo: prazo,
        imagem: imagemSrc,
        progresso: 0.0,
      };

      // Adiciona a nova meta ao array de metas
      objMetas.metas.push(novaMeta);
    }

    localStorage.setItem('metas', JSON.stringify(objMetas));

    adicionaMetasAoDOM();
    
    // Oculta a div criandoMeta e reinicia os campos
    const criandoMetaDiv = document.getElementById('criandoMeta');
    criandoMetaDiv.style.display = 'none';
    reiniciarCampos();
    
    const inputObjetivo = document.getElementById('inputObjetivo');
    inputObjetivo.setAttribute('readonly');
  }
}

// Botão salvar (envio do formulário)
document.getElementById('editarSalvar').addEventListener('submit', function(event) {
  event.preventDefault();
  // Dados lidos do formulário
  let objetivo = document.getElementById('inputObjetivo').value;
  let valor = document.getElementById('inputValor').value;
  let prazo = document.getElementById('inputPrazo').value;
  let imagemSrc = document.querySelector('.iconeSelecionado').src;

  // Verificações no envio do formulário
  let objMetas = leMeta();
  let indiceMeta = objMetas.metas.findIndex(meta => meta.objetivo === objetivo);

 if (!objetivo || !valor || !prazo || !imagemSrc ||  imagemSrc.includes('adicionarImagem')) {
    alert('Por favor, preencha todos os campos \nInclusive a seleção de imagem');
  } else {
    incluiMeta();
  }
});



//Criando uma div para cada meta no local storage
function criaDivMeta(meta) {

  let div = document.createElement('div');
  div.id = 'metaPronta';
  div.classList = 'metaProntaC';

  let btnsDiv = document.createElement('div')
  btnsDiv.id = 'btnsDiv';

  // Botão X
  let btnExcluir = document.createElement('button');
  btnExcluir.textContent = 'X';
  btnExcluir.classList = 'btnX';

  btnExcluir.addEventListener('click', function() {
  let objMetas = leMeta();

  objMetas.metas = objMetas.metas.filter(m => m.objetivo !== meta.objetivo);
  localStorage.setItem('metas', JSON.stringify(objMetas));  
  div.remove();

  if (objMetas.metas.length === 0) {
    document.getElementById('semMetasDef').style.display = 'flex';
  }
  else {
    document.getElementById('semMetasDef').style.display = 'none';
  }
  });

  //Botão Editar
  let editIcon = document.createElement('img')
  editIcon.src = "Icones/edit 2.svg";
  let btnEditar = document.createElement('button')
  btnEditar.appendChild(editIcon);
  btnEditar.classList = 'btnEdit';

  btnEditar.addEventListener('click', function() {
    //Função para editar a meta
    editarMeta(meta);
  });

  btnsDiv.appendChild(btnExcluir,btnEditar);
  btnsDiv.appendChild(btnEditar);
  div.appendChild(btnsDiv);

  let objMetaPronta = document.createElement('div');
  objMetaPronta.className = 'objMetaPronta';

  let p = document.createElement('p');
  p.textContent = meta.objetivo;
  objMetaPronta.appendChild(p);

  //incluindo a imagem selecionada na div
  let img = document.createElement('img');
  img.src = meta.imagem;
  img.alt = 'icone-da-meta';
  img.className = 'iconeGrande2';
  objMetaPronta.appendChild(img);

  div.appendChild(objMetaPronta);
  //Div valoresMetaPronta
  let valoresMetaPronta = document.createElement('div');
  valoresMetaPronta.className = 'valoresMetaPronta';
  //Valor
  let valor = document.createElement('div');
  valor.innerHTML = `<span class="mostraDados1">Valor: ${meta.valor} R$</span>`;
  valoresMetaPronta.appendChild(valor);
  //Prazo
  let prazo = document.createElement('div');
  prazo.innerHTML = `<span class="mostraDados1">Prazo: ${meta.prazo} Meses</span>`;
  valoresMetaPronta.appendChild(prazo);
  //Parcelas
  var parc = (meta.valor / meta.prazo).toFixed(2);
  let parcelas = document.createElement('div');
  parcelas.innerHTML = `<span class="mostraDados2">Parcelas:</span><span class="mostraDados3">R$ ${parc}/mês</span>`;
  valoresMetaPronta.appendChild(parcelas);
  //Progresso
  var progress= 0.00;
  let progresso = document.createElement('div');
  progresso.innerHTML = `<span class="mostraDados2">Progresso:</span><span class="mostraDados3"> <button class="btnIncremento">+</button>  R$ <span class="pr">${progress} </span> <button class="btnDecremento">-</button> </span>`;
  valoresMetaPronta.appendChild(progresso);

  div.appendChild(valoresMetaPronta);

  //Botões + e -
  let btnIncremento = progresso.querySelector('.btnIncremento');
  let btnDecremento = progresso.querySelector('.btnDecremento');

  //Função botão +
  btnIncremento.addEventListener('click', function () {
    let valorParcela = meta.valor / meta.prazo;
    let progressoSpan = div.querySelector('.pr');
    let progressoAtual = parseFloat(progressoSpan.textContent.replace('R$', ''));

    if(progressoAtual < meta.valor){      
      let novoProgresso = (progressoAtual + valorParcela).toFixed(2);
      // Atualiza o progresso na div
      meta.progresso=novoProgresso;
      progressoSpan.textContent = `${meta.progresso}`;
    }
    verificarConclusaoMeta(meta, div)
    atualizarProgressoMeta(meta, div, 0);
  });

  //Função botão -
  btnDecremento.addEventListener('click', function () {
    let valorParcela = meta.valor / meta.prazo;
    let progressoSpan = div.querySelector('.pr');
    let progressoAtual = parseFloat(progressoSpan.textContent.replace('R$', ''));

    if(progressoAtual > 0) {   
      let novoProgresso = (progressoAtual - valorParcela).toFixed(2);
      // Atualiza o progresso na div
      meta.progresso = novoProgresso
      progressoSpan.textContent = `${meta.progresso}`;
    }
    atualizarProgressoMeta(meta, div, 0);

  });

  return div;
}



function limparDivsMetas() {
  const divsMetas = document.querySelectorAll('#metaPronta');
  divsMetas.forEach(div => {
    div.remove();
  });
}

//Exibir as metas
function adicionaMetasAoDOM() {
  let objMetas = leMeta();
  let container = document.querySelector('main .container');
  let novaMetaButton = document.getElementById('novaMeta');
  let criarMetaDiv = document.getElementById('criandoMeta');

    if (objMetas.metas.length === 0) {
      document.getElementById('semMetasDef').style.display = 'flex';
    } 
    else {
      document.getElementById('semMetasDef').style.display = 'none';
    }

document.querySelectorAll('.meta').forEach(div => div.remove());
limparDivsMetas();

objMetas.metas.forEach(meta => {
  const div = criaDivMeta(meta);
  container.appendChild(div);
});

container.appendChild(novaMetaButton);
container.appendChild(criarMetaDiv);

}

document.addEventListener('DOMContentLoaded', adicionaMetasAoDOM);
document.addEventListener('DOMContentLoaded', function() {
  const metasLocalStorage = JSON.parse(localStorage.getItem('metas'));


//Verificação para exibição da div semMetasDef
  if (!metasLocalStorage || !metasLocalStorage.metas || metasLocalStorage.metas.length === 0) {
    const semMetasDiv = document.getElementById('semMetasDef');
    semMetasDiv.style.display = 'flex';
  }
  else {
    const semMetasDiv = document.getElementById('semMetasDef');
    semMetasDiv.style.display = 'none';
  }

});


//Seleção de icones para meta
window.onload = function() {
const imagensDisponiveis = document.querySelectorAll('.iconesDisponiveis img');
imagensDisponiveis.forEach(function(imagem) {

    imagem.addEventListener('click', function() {
        const selecionarIcone = document.getElementById('selecionarIcone');
        const iconeSelecionado = selecionarIcone.querySelector('img');
        
        imagensDisponiveis.forEach(function(outraImagem) {
            outraImagem.classList.remove('selecionada');
        });

        imagem.classList.add('selecionada');

        iconeSelecionado.src = imagem.src;
        iconeSelecionado.alt = imagem.alt;
    });
});
};

//Função botão + nova meta
document.addEventListener('DOMContentLoaded', function() {
  const novaMetaButton = document.getElementById('novaMeta');
  const criandoMetaDiv = document.getElementById('criandoMeta');

  novaMetaButton.addEventListener('click', function() {
    const estiloDisplay = getComputedStyle(criandoMetaDiv).getPropertyValue('display');
    const inputObjetivo = document.getElementById('inputObjetivo');

    if (estiloDisplay === 'none' || estiloDisplay === '') {
      criandoMetaDiv.style.display = 'flex';
      inputObjetivo.removeAttribute('readonly');
    } 
    else {
      criandoMetaDiv.style.display = 'none';
      reiniciarCampos();
      inputObjetivo.setAttribute('readonly', 'readonly');
    }

  });
} )

//Limpando formulário de criação de metas
function reiniciarCampos() {
  //Limpando campos
  document.getElementById('inputObjetivo').value = '';
  document.getElementById('inputValor').value = '';
  document.getElementById('inputPrazo').value = '';

  const imagensDisponiveis = document.querySelectorAll('.iconesDisponiveis img');
  imagensDisponiveis.forEach(function(imagem) {
    imagem.classList.remove('selecionada');

  });
  //Restaurando Imagem
  const selecionarIcone = document.getElementById('selecionarIcone');
  const iconeSelecionado = selecionarIcone.querySelector('img');
  iconeSelecionado .src = "Icones/adicionarImagem .png";
}

function editarMeta(meta) {
  // Exibir a div criandoMeta
  const criandoMetaDiv = document.getElementById('criandoMeta');
  criandoMetaDiv.style.display = 'flex';

  // Preenchendo os campos com os detalhes da meta existente para edição
  preencherCamposParaEdicao(meta);
  const inputObjetivo = document.getElementById('inputObjetivo');
  inputObjetivo.setAttribute('readonly', 'readonly');
}

// Função para preencher os campos de edição com os detalhes da meta existente
function preencherCamposParaEdicao(meta) {
  document.getElementById('inputObjetivo').value = meta.objetivo;
  document.getElementById('inputValor').value = meta.valor;
  document.getElementById('inputPrazo').value = meta.prazo;

  const imagensDisponiveis = document.querySelectorAll('.iconesDisponiveis img');
  imagensDisponiveis.forEach(function(imagem) {
    if (imagem.src === meta.imagem) {
      imagem.classList.add('selecionada');
    } else {
      imagem.classList.remove('selecionada');
    }

    const selecionarIcone = document.getElementById('selecionarIcone');
    const iconeSelecionado = selecionarIcone.querySelector('img');

    iconeSelecionado.src = meta.imagem;
  });
}

function verificarConclusaoMeta(meta, div) {
  let progressoSpan = div.querySelector('.pr');
  let progressoAtual = parseFloat(progressoSpan.textContent.replace('R$', ''));

  if (progressoAtual >= meta.valor) {

   div.classList = 'metaConcluida'; 

   let concluida = document.createElement('p');
   concluida.textContent = 'Concluída';
   div.querySelector('.objMetaPronta').appendChild(concluida);

   let verificar = document.createElement('img');
   verificar.src="Icones/verificar.png"
   div.querySelector('.objMetaPronta').appendChild(verificar);
      }
  
}

document.addEventListener('DOMContentLoaded', function() {
  const inputObjetivo = document.getElementById('inputObjetivo');
  const popover = document.getElementById('popover');

  inputObjetivo.addEventListener('mouseover', function() {
    const isReadonly = inputObjetivo.hasAttribute('readonly');

    if (isReadonly) {
      exibirPopover();
    }
  });

  inputObjetivo.addEventListener('mouseout', function() {
    esconderPopover();    
  });

  const objMetas = leMeta();
const metaProntas = document.querySelectorAll('.metaProntaC');

objMetas.metas.forEach((meta, index) => {
  const div = metaProntas[index];
  const valorParcela = meta.valor / meta.prazo;
  verificarConclusaoMeta(meta, div);
});
});


function exibirPopover() {
  const inputObjetivo = document.getElementById('inputObjetivo');
  const popover = document.getElementById('popover');

  const inputRect = inputObjetivo.getBoundingClientRect();
  const popoverTop = inputRect.top - popover.offsetHeight - 5;
  const popoverLeft = inputRect.left + inputRect.width / 2 - popover.offsetWidth / 2;

  popover.style.top = `${popoverTop}px`;
  popover.style.left = `${popoverLeft}px`;
  popover.style.display = 'block';
}

function esconderPopover() {
  const popover = document.getElementById('popover');
  popover.style.display = 'none';
}

function atualizarProgressoMeta(meta, div, valorParcela) {
  let progressoSpan = div.querySelector('.pr');
  let progressoAtual = parseFloat(progressoSpan.textContent.replace('R$', ''));

  if (true) {
    // Atualiza o progresso na div
    meta.progresso = progressoAtual;
    progressoSpan.textContent = `${meta.progresso.toFixed(2)}`;
    atualizarObjMetasNoLocalStorage();
  }
}  

function atualizarObjMetasNoLocalStorage() {
  const objMetas = leMeta();
  const metaProntas = document.querySelectorAll('.metaProntaC');

  objMetas.metas.forEach((meta, index) => {
    const div = metaProntas[index];
    const progressoSpan = div.querySelector('.pr');
    meta.progresso = parseFloat(progressoSpan.textContent.replace('R$', ''));
  });

  localStorage.setItem('metas', JSON.stringify(objMetas));
}
