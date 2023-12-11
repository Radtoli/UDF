let database = {
  usuarios: [
    {
      id: 1,
      nome: "Admin",
      email: "admin@gmail.com",
      tel: "123456789",
      saldo: "0",
      senha: "0000",
    },
  ],

  entradas: [
    {
      idusuario: 1,
      nome: "Salario principal",
      valor: "1400",
      tipo: "fixa",
      recorrencia: "12",
    },
  ],

  saidas: [
    {
      idusuario: 1,
      nome: "Aluguel",
      valor: "900",
      tipo: "fixa",
      recorrencia: "12",
    },
  ],

  metas: [
    {
      idusuario: 1,
      valor: "15000",
      prazo: "5",
      parcelas: "60",
      progresso: "0",
    },
  ],
};

let nomeTemporario;
let emailTemporaro;

let banco = JSON.parse(localStorage.getItem("bancoDeDados"));
if (!banco) {
  // Se não houver dados no localStorage, inicialize com os dados originais
  banco = { usuarios: [] };
  banco.usuarios.push(...database.usuarios);
  localStorage.setItem("bancoDeDados", JSON.stringify(banco));
  localStorage.setItem("bancoDeDados", JSON.stringify(database));
}

const cadastroForm = document.getElementById("cadastroForm");
const nomeInput = document.getElementById("nome");
const sobrenomeInput = document.getElementById("sobrenome");
const emailInput = document.getElementById("email");
const telInput = document.getElementById("tel");
const senhaInput = document.getElementById("senha");
const confirmaSenhaInput = document.getElementById("confirma_senha");
const btnCadastro = document.getElementById("btnCadastro");

let todosOsDados = JSON.parse(localStorage.getItem("bancoDeDados")) || {
  usuarios: [],
  entradas: [],
  saidas: [],
  metas: []
};

if (btnCadastro) {
  btnCadastro.addEventListener("click", function (e) {
    e.preventDefault();

    const nome = nomeInput.value;
    const sobrenome = sobrenomeInput.value;
    const email = emailInput.value;
    const tel = telInput.value;
    const senha = senhaInput.value;
    const confirmaSenha = confirmaSenhaInput.value;

    if (!nome || !email || !senha || !confirmaSenha) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    if (senha !== confirmaSenha) {
      alert("As senhas não coincidem. Tente novamente.");
      return;
    }

    const id = todosOsDados.usuarios.length + 1;
    const usuario = {
      nome,
      sobrenome,
      email,
      tel,
      senha,
      id,

      entradas: [
        {
          idusuario: id,
          nome: "Salario principal",
          valor: "1400",
          tipo: "fixa",
          recorrencia: "12",
        },
      ],

      saidas: [
        {
          idusuario: id,
          nome: "Aluguel",
          valor: "900",
          tipo: "fixa",
          recorrencia: "12",
        },
      ],

      metas: [
        {
          idusuario: id,
          valor: "15000",
          prazo: "5",
          parcelas: "60",
          progresso: "0",
        },
      ],
    };

    todosOsDados.usuarios.push(usuario);

    localStorage.setItem("bancoDeDados", JSON.stringify(todosOsDados));

    clearFormInputs();
    alert("Cadastro realizado com sucesso!");
    window.location.href = "index.html";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const btnLogin = document.getElementById("btnLogin");

  if (btnLogin) {
    btnLogin.addEventListener("click", function (e) {
      e.preventDefault();

      const email = emailInput.value;
      const senha = senhaInput.value;

      todosOsDados = JSON.parse(localStorage.getItem("bancoDeDados")) || [];

      const usuarioCadastrado = todosOsDados.usuarios.find(
        (user) => user.email === email && user.senha === senha
      );


      
      const idUsuario = usuarioCadastrado.id;

      if (usuarioCadastrado) {
        alert("Login realizado com sucesso!");
        window.location.href = `../MinhaConta/minha-conta.html?id=${idUsuario}`;
      } else {
        alert("Credenciais incorretas. Tente novamente.");
      }
    });
  }
});

function clearFormInputs() {
  nomeInput.value = "";
  sobrenomeInput.value = "";
  emailInput.value = "";
  telInput.value = "";
  senhaInput.value = "";
  confirmaSenhaInput.value = "";
}

//novos códigos para redefinição de senha
function enviarEmail() {
  nomeTemporario = document.getElementById("nome").value;
  emailTemporario = document.getElementById("email").value;

  todosOsDados = JSON.parse(localStorage.getItem("bancoDeDados")) || [];
  const usuarioCadastrado = todosOsDados.usuarios.find(
    (user) => user.nome === nomeTemporario && user.email === emailTemporario
  );

  if (usuarioCadastrado) {
    localStorage.setItem("tempNome", nomeTemporario);
    localStorage.setItem("tempEmail", emailTemporario);

    alert(
      "Email enviado com sucesso! Verifique sua caixa de entrada para redefinir a senha."
    );
    window.location.href = "trocasenha.html";
  } else {
    alert("Usuário não encontrado. Por favor, tente novamente.");
  }
}
//redefine a senha
function redefinirSenha() {
  const novaSenha = document.getElementById("novaSenha").value;
  const confirmaSenha = document.getElementById("confirmaSenha").value;

  if (novaSenha !== confirmaSenha) {
    alert("As senhas não coincidem. Tente novamente.");
    return;
  }

  // Recupere os valores temporários do localStorage
  const nomeTemporario = localStorage.getItem("tempNome");
  const emailTemporario = localStorage.getItem("tempEmail");

  todosOsDados = JSON.parse(localStorage.getItem("bancoDeDados")) || [];
  const usuarioCadastrado = todosOsDados.usuarios.find(
    (user) => user.nome === nomeTemporario && user.email === emailTemporario
  );

  if (usuarioCadastrado) {
    // Atualize a senha do usuário
    usuarioCadastrado.senha = novaSenha;

    // Salve o usuário atualizado de volta no localStorage
    localStorage.setItem("bancoDeDados", JSON.stringify(todosOsDados));

    // Limpe os valores temporários
    localStorage.removeItem("tempNome");
    localStorage.removeItem("tempEmail");

    alert("Senha redefinida com sucesso!");
    window.location.href = "index.html"; // Redirecione para a página principal ou outra página
  } else {
    alert("Usuário não encontrado. Por favor, tente novamente.");
  }
}

function removerUsuario(id) {
  const indiceUsuario = todosOsDados.usuarios.findIndex(
    (usuario) => usuario.id === id
  );

  if (indiceUsuario !== -1) {
    todosOsDados.usuarios.splice(indiceUsuario, 1);
    localStorage.setItem("bancoDeDados", JSON.stringify(todosOsDados));
    alert("Usuário removido com sucesso!");
  } else {
    alert("Usuário não encontrado.");
  }
}

//SCRIPT JOÃO VITOR (MINHA-CONTA)
let parametro = new URLSearchParams(window.location.search);
const idAtual = parseInt(parametro.get("id"));

let usuarioAtual = {};

for (let i = 0; i < todosOsDados.usuarios.length; i++) {
  if (todosOsDados.usuarios[i].id == idAtual) {
    usuarioAtual = {
      nome: todosOsDados.usuarios[i].nome,
      sobrenome: todosOsDados.usuarios[i].sobrenome,
      email: todosOsDados.usuarios[i].email,
      telefone: todosOsDados.usuarios[i].tel,
      senha: todosOsDados.usuarios[i].senha,
    };
  }
}

function ClicarBotaoMetas() {
  window.location.href = `/UDFMetas -JVP-Vs-Code/index.html?id=${idAtual}`;
}

function ClicarBotaoGastos() {
  window.location.href = `
  /EntradaseSaidas/EntradasESaidas.html?id=${idAtual}`;
}

function ClicarBotaoRenda() {
  window.location.href = `
  /EntradaseSaidas/EntradasESaidas.html?id=${idAtual}`;
}

let ID_USER;
function InsereDados() {
  let usuario = usuarioAtual;

  //LENDO DADOS DOS INPUTS E ATRIBUINDO O VALOR DO LOCALSTORAGE
  document.querySelector("#change-name").value = usuario.nome;
  document.querySelector("#change-sobrenome").value = usuario.sobrenome;
  document.querySelector("#change-email").value = usuario.email;
  document.querySelector("#change-number").value = usuario.telefone;
  document.querySelector("#change-password").value = usuario.senha;
}

function HabilitarEdicao() {
  let usuario = usuarioAtual;
  if (document.querySelector("#change-name").disabled == true) {
    document.querySelector("#change-name").disabled = false;
    document.querySelector("#change-sobrenome").disabled = false;
    document.querySelector("#change-email").disabled = false;
    document.querySelector("#change-number").disabled = false;
    document.querySelector("#submit-edicao").disabled = false;
    return false;
  } else {
    document.querySelector("#change-name").disabled = true;
    document.querySelector("#change-sobrenome").disabled = true;
    document.querySelector("#change-email").disabled = true;
    document.querySelector("#change-number").disabled = true;
    document.querySelector("#submit-edicao").disabled = true;

    document.querySelector("#change-name").value = usuario.nome;
    document.querySelector("#change-sobrenome").value = usuario.sobrenome;
    document.querySelector("#change-email").value = usuario.email;
    document.querySelector("#change-number").value = usuario.telefone;
    document.querySelector("#change-password").value = usuario.senha;
    return true;
  }
}

function insercao() {
  var senha = document.getElementById("senha");
  senha.value = senhaAtual;
}

function CloseModal(id) {
  $(`#${id}`).modal("hide");
}

/*function jquery(){
    $('document').ready(function(){
        $('#submit-edicao')
        console.log("JQuery deu certo!")

        $('#confirm-pass');
    });
}*/

let ID_URL = "index.html?id=0";

function URL_Paramater() {
  window.location.href = ID_URL;
}

function HabilitarEdicaoSenha() {
  let senha = usuarioAtual.senha;
  var currentPassword = document.getElementById("senhaatual").value;
  document.getElementById("resposta").innerText = " ";

  if (currentPassword == senha) {
    let idModal = document.querySelector("#modal-password").id;
    document.getElementById("resposta").innerText = "Senha certa!";
    CloseModal(idModal);
    let novasenha = (document.querySelector("#new-password").disabled = false);
    document.querySelector("#confirm-password").disabled = false;
    document.querySelector("#submit-edicao").disabled = false;
    return true;
  } else {
    document.getElementById("resposta").innerText = "Senha errada";
    return false;
  }
}

function SalvarAlteracoes() {
  let User = usuarioAtual;
  let NovoNome = document.querySelector("#change-name");
  let NovoSobrenome = document.querySelector("#change-sobrenome").value;
  let NovoEmail = document.querySelector("#change-email").value;
  let NovoNumero = document.querySelector("#change-number").value;
  let NovaSenha = document.querySelector("#new-password"); // nova senha
  let ConfirmSenha = document.querySelector("#confirm-password").value;

  if (NovoNome.disabled == false) {
    User.nome = NovoNome.value;
    User.sobrenome = NovoSobrenome;
    User.email = NovoEmail;
    User.telefone = NovoNumero;

    for (let i = 0; i < todosOsDados.usuarios.length; i++) {
      if (todosOsDados.usuarios[i].id == idAtual) {
        todosOsDados.usuarios[i].nome = User.nome;
        todosOsDados.usuarios[i].sobrenome = User.sobrenome;
        todosOsDados.usuarios[i].email = User.email;
        todosOsDados.usuarios[i].tel = User.telefone;
      }
    }

    localStorage.setItem("bancoDeDados", JSON.stringify(todosOsDados));
    window.location.reload();
  }

  // confirmação da nova senha
  if (NovaSenha.disabled == false) {
    if (NovaSenha.value == ConfirmSenha) {
      User.senha = ConfirmSenha;
      for (let i = 0; i < todosOsDados.usuarios.length; i++) {
        if (todosOsDados.usuarios[i].id == idAtual) {
          todosOsDados.usuarios[i].senha = User.senha;
        }
      }
      localStorage.setItem("bancoDeDados", JSON.stringify(todosOsDados));
      window.location.reload();
      alert("Senha alterada com sucesso!");
    } else {
      alert("Confirme sua nova senha!");
    }
  }
}

let opt = "init";
function Conteudo() {
  let painel = document.querySelector("#init");
  let User = usuarioAtual;
  let str = "";

  if (opt == "init") {
    str = `<div class="content-container">
        <div class="div-title">
          <h1>Olá, <span>${User.nome}</span>!</h1>
        </div>
        <div class="subtitle">
          <p>Boas vindas ao melhor ambiente para seu controle financeiro.</p>
        </div>

        <div class="complemento">
          <div class="complemento-mensagem col-6">
            <p>Use a barra de navegação ao lado para ver suas movimentações</p>
          </div>
          <div class="complemento-slogan col-6">
            <h1>SEU DINHEIRO</h1>
            <div class="background">
              <h1><span>SOB</span> SEU CONTROLE.</h1>
            </div>
          </div>
        </div>
      </div>`;
  } else {
    str = `<div class="main-content">
        <div id="profile" class="col-6"> <!-- Imagem da conta -->
          <div id="edit-img">
            <!-- Button trigger modal -->
            <button
              type="button"
              class="btn-modal"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              
            >
              <img class="editar" src="./imagens/editar.png" alt="">
            </button>
            <!-- Modal -->
            <div
              class="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">
                      Insira aqui a sua nova foto de perfil
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <input
              type="file"
              id="current-password"
            />
                  </div>
                  <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">
                      Confirmar
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <img
            src="./imagens/User.png"
            id="img-profile"
            alt="img-profile"
          />
        </div>
        <div id="inputs-LEFT"> <!-- INPUTS DA ESQUERDA -->
          <div id="div-nome" class="dados">
            <label class="label-edit" for="change-name">Nome:</label> <br />
            <input
              class="inputs in"
              type="text"
              id="change-name"
              class="name"
              disabled/>
              <img class="editar" src="./imagens/editar.png" alt="editar" id="habilit-edit" onclick="HabilitarEdicao()"/>
          </div>

          <div id="div-sobrenome" class="dados">
            <label class="label-edit" for="change-sobrenome">Sobrenome:</label> <br />
            <input
              class="inputs in"
              type="text"
              id="change-sobrenome"
              class="name"
              disabled/>
          </div>

          <div id="div-email" class="dados">
            <label class="label-edit" for="change-email">E-mail:</label> <br />
            <input
              class="inputs in"
              type="email"
              id="change-email"
              disabled/> <br/>
          </div>

          <div id="div-telefone" class="dados">
            <label class="label-edit" for="change-number">Telefone:</label> <br />
            <input
              class="inputs in"
              type="text"
              id="change-number"
              disabled/>
          </div>
        </div>

        <div id="inputs-RIGTH">
          <div id="div-senha" class="dados">
            <label class="label-edit" for="change-password">Senha atual:</label>
            <br />
            <input
              class="inputs"
              type="password"
              id="change-password"
              disabled/>
            <!-- Button trigger modal -->
            <button
              type="button"
              class="btn-modal"
              data-bs-toggle="modal"
              data-bs-target="#modal-password"
            >
              <img class="editar" src="./imagens/editar.png" alt="editar-senha" id="edit-senha">
            </button>
            <!-- Modal -->
            <div
              class="modal fade"
              id="modal-password"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">
                      Informe sua senha atual
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <input
              class="inputs"
              type="password"
              id="senhaatual"
            />
                    <h4 id="resposta">Aguardando senha atual...</h4>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="confirm-pass" onclick="HabilitarEdicaoSenha()">
                      Confirmar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="div-novasenha" class="dados">
              <label for="new-password">Nova senha:</label> <br />
              <input
                class="inputs"
                type="password"
                id="new-password"
                disabled
                required
              />

          </div>

            <div id="div-confirm" class="dados">
              <label for="#confirm-password">Repita a nova senha:</label> <br />
              <input
                class="inputs"
                type="password"
                id="confirm-password"
                disabled
                required
              />
            </div>

            <div id="div-submit" style="margin-top: 24px;">
              <input id="submit-edicao" type="submit" value="Salvar alterações" disabled onclick="SalvarAlteracoes()">
            </div>
        </div>
      </div>
    </div>
    <hr style="margin: 20px" />

    <div class=" container anchor">
      <div class="col-4">
        <h5>Valor poupado:</h5>
        <p>R$1432,00</p>
        <a href="">Ver mais</a>
      </div>
      <div class="col-4">
        <h5>Despesa atual:</h5>
        <p>R$1255,00</p>
        <a href="">Ver mais</a>
      </div>
      <div class="col-4">
        <h5>Deficiência da meta:</h5>
        <p>R$9.575,00</p>
        <a href="">Ver mais</a>
      </div>
    </div>`;
  }
  document.querySelector("#content-conta").innerHTML = str;
}

//PARTE LUAN (ENTRADAS E SAÍDAS)

var tipo;
let entradaAtual = [];
let saidaAtual = [];

for (let i = 0; i < todosOsDados.usuarios.length; i++) {
  if (todosOsDados.usuarios[i].id == idAtual) {
    let usuarioAtualEntrada = {
      entradaAtual: todosOsDados.entradas,
      saidaAtual: todosOsDados.saidas,
      PosicaoUsuario: i,
    };
  }
}

function PegarTipo(TipoSelecionado) {
  sessionStorage.setItem("tipo", TipoSelecionado);
}

window.onload = function () {
  if (!localStorage.getItem("entradas")) {
    localStorage.setItem(
      "entradas",
      JSON.stringify({ fixas: [], variaveis: [] })
    );
  }
  if (!localStorage.getItem("saidas")) {
    localStorage.setItem(
      "saidas",
      JSON.stringify({ fixas: [], variaveis: [] })
    );
  }
  // Exibe os dados
  exibirDados();
};

function SalvarDados() {
  alert("Dados Salvos!");
  // Verifique se todosOsDados está definido e se entradas e saidas são arrays
  if (todosOsDados && todosOsDados.entradas && todosOsDados.saidas) {
    var tipo = sessionStorage.getItem("tipo");
    var nome = document.getElementById("Nome").value;
    var valor = document.getElementById("Valor").value;
    var recorrencia = document.getElementById("Recorrencia").value;
    var selectTipo = document.getElementById("selectTipo");
    var tipoSelecionadoFixaOuVariavel = selectTipo.options[selectTipo.selectedIndex].value;

    var novoItem = {
      idusuario: idAtual,
      nome: nome,
      valor: valor,
      tipo: tipoSelecionadoFixaOuVariavel,
      recorrencia: recorrencia
    };

    if (tipo == "entrada") {
      // Certifique-se de que entradas é um array
      if (!todosOsDados.entradas) {
        todosOsDados.entradas = [];
      }

      todosOsDados.entradas.push(novoItem);
    } else if (tipo == "saida") {
      // Certifique-se de que saidas é um array
      if (!todosOsDados.saidas) {
        todosOsDados.saidas = [];
      }
      todosOsDados.saidas.push(novoItem);
    }
    localStorage.setItem("bancoDeDados", JSON.stringify(todosOsDados));
    window.location.href = `EntradasESaidas.html?id=${idAtual}`;
  } else {
    console.error("Erro: 'entradas' ou 'saidas' não estão definidos em 'todosOsDados'.");
  }
}

let PosicaoUsuario;
function exibirDados() {
  for (let i = 0; i < todosOsDados.usuarios.length; i++) {
    if (todosOsDados.usuarios[i].id == idAtual) {
      entradaAtual = todosOsDados.entradas;
      saidaAtual = todosOsDados.saidas;
      PosicaoUsuario = i;
      
    }
  }
  for (let i = 0; i < entradaAtual.length; i++) {
    // Exibir entradas
    if (entradaAtual[i].tipo == "Fixa" && entradaAtual[i].idusuario == todosOsDados.usuarios[PosicaoUsuario].id) 
    {
      var container = document.getElementById('entradasfixas');
      var div = document.createElement("div");
      div.className = "caixaVariavel";
      div.innerHTML =
      "<p>" +
      entradaAtual[i].nome +
      "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp <span>R$:" +
      entradaAtual[i].valor +
      '</span><button id="btn' +
      i +
      '"><strong>X</strong></button></p>';
    container.appendChild(div);

    document.getElementById('btn' + i).addEventListener('click', (function(index) {
      return function() {
        removerItemEntrada(index);
      };
    })(i));
    } else if(entradaAtual[i].tipo == "Variavel" && entradaAtual[i].idusuario == todosOsDados.usuarios[PosicaoUsuario].id){
      var container = document.getElementById('entradasvariaveis');
      var div = document.createElement("div");
      div.className = "caixaVariavel";
      div.innerHTML =
      "<p>" +
      entradaAtual[i].nome +
      "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp <span>R$:" +
      entradaAtual[i].valor +
      '</span><button id="btn' +
      i +
      '"><strong>X</strong></button></p>';
    container.appendChild(div);

    // Adicionando evento de clique ao botão
    document.getElementById('btn' + i).addEventListener('click', (function(index) {
      return function() {
        removerItemEntrada(index);
      };
    })(i));
    }
  }

  //saidas
  for (let i = 0; i < saidaAtual.length; i++) {
    if (saidaAtual[i].tipo == "Fixa" && saidaAtual[i].idusuario == todosOsDados.usuarios[PosicaoUsuario].id) {
      var container = document.getElementById('saidasfixas');
      var div = document.createElement("div");
      div.className = "caixaVariavel";
      div.innerHTML =
      "<p>" +
      saidaAtual[i].nome +
      "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp <span>R$:" +
      saidaAtual[i].valor +
      '</span><button id="btn' +
      i +
      '"><strong>X</strong></button></p>';
    container.appendChild(div);

    // Adicionando evento de clique ao botão
    document.getElementById('btn' + i).addEventListener('click', (function(index) {
      return function() {
        removerItemSaida(index);
      };
    })(i));
    } else if(saidaAtual[i].tipo == "Variavel" && saidaAtual[i].idusuario == todosOsDados.usuarios[PosicaoUsuario].id){
      var container = document.getElementById('saidasvariaveis');
      var div = document.createElement("div");
      div.className = "caixaVariavel";
      div.innerHTML =
        "<p>" +
        saidaAtual[i].nome +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp <span>R$:" +
        saidaAtual[i].valor +
        '</span><button id="btn' +
        i +
        '"><strong>X</strong></button></p>';
      container.appendChild(div);

      // Adicionando evento de clique ao botão
      document.getElementById('btn' + i).addEventListener('click', (function(index) {
        return function() {
          removerItemSaida(index);
        };
      })(i));
    }
  }

//Remover item
function removerItemEntrada(index) {

  entradaAtual.splice(index, 1);
  atualizarLocalStorage(entradaAtual,saidaAtual);
  window.location.reload();
}

function removerItemSaida(index) {
  saidaAtual.splice(index, 1);
  atualizarLocalStorage(entradaAtual,saidaAtual);
  window.location.reload();
}

function atualizarLocalStorage(entradasAtualizadas, saidasAtualizadas){
  let BancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"));
  BancoDeDados.entradas = entradasAtualizadas;
  BancoDeDados.saidas = saidasAtualizadas;
  localStorage.setItem('bancoDeDados', JSON.stringify(BancoDeDados));

}

  /*
  var tipos = ["fixas", "variaveis"];
  var secoes = ["entradas", "saidas"];

  for (var i = 0; i < secoes.length; i++) {
    for (var j = 0; j < tipos.length; j++) {
      var secao = secoes[i];
      var tipo = tipos[j];
      var dados = secao == "entradas" ? entradas[tipo] : saidas[tipo];
      var container = document.getElementById(secao + tipo);

      // Limpa o conteúdo existente
      container.innerHTML = "";

      // Adiciona novos itens
      for (var k = 0; k < dados.length; k++) {
        var item = dados[k];
        var div = document.createElement("div");
        div.className = "caixaVariavel";
        div.innerHTML =
          "<p>" +
          item.Nome +
          "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp <span>R$:" +
          item.Valor +
          '</span><button id="btn' +
          k +
          '"><strong>X</strong></button></p>';
        container.appendChild(div);

        // Adiciona evento de clique ao botão
        document
          .getElementById("btn" + k)
          .addEventListener("click", createClickHandler(k, secao, tipo, dados));
      }
    }
  }

  */
}

function URLUSer() {
  window.location.href = `AdicionarEntradaSaida.html?id=${idAtual}`;
}
