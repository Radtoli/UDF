function redefinirSenha() {
    const novaSenha = document.getElementById('novaSenha').value;
    const confirmaSenha = document.getElementById('confirmaSenha').value;

    if (novaSenha !== confirmaSenha) {
        alert('As senhas não coincidem. Tente novamente.');
        return;
    }

    // Recupere o usuário do localStorage (você pode usar nome ou email)
    const usuarioCadastrado = JSON.parse(localStorage.getItem('usuario'));

    if (!usuarioCadastrado) {
        alert('Usuário não encontrado. Por favor, tente novamente.');
        return;
    }

    // Atualize a senha do usuário
    usuarioCadastrado.senha = novaSenha;

    // Salve o usuário atualizado de volta no localStorage
    localStorage.setItem('usuario', JSON.stringify(usuarioCadastrado));

    alert('Senha redefinida com sucesso!');
    window.location.href = 'index.html'; // Redirecione para a página principal ou outra página
}
