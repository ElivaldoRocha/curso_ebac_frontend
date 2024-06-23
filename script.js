// Adiciona um ouvinte de eventos ao formulário para o evento 'submit'
document.getElementById('meuFormulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Obtém os valores dos campos A e B
    const campoA = document.getElementById('campoA').value;
    const campoB = document.getElementById('campoB').value;
    
    // Obtém o elemento do parágrafo para exibir mensagens
    const mensagem = document.getElementById('mensagem');

    // Verifica se o valor do campo B é maior que o valor do campo A
    if (Number(campoB) > Number(campoA)) {
        // Exibe mensagem positiva se o campo B for maior que o campo A
        mensagem.textContent = 'O formulário é válido. Número B é maior que o número A.';
        mensagem.style.color = 'green'; // Define a cor do texto como verde
    } else {
        // Exibe mensagem negativa se o campo B não for maior que o campo A
        mensagem.textContent = 'O formulário é inválido. Número B deve ser maior que o número A.';
        mensagem.style.color = 'red'; // Define a cor do texto como vermelho
    }
});
