// Certifique-se de que o documento está pronto antes de executar qualquer código
$(document).ready(function() {
    // Função que será chamada quando o formulário for submetido
    $('#task-form').submit(function(event) {
        // Previne o comportamento padrão do formulário (recarregar a página)
        event.preventDefault();
        // Obtém o texto do campo de entrada
        let taskText = $('#task-input').val();
        // Verifica se o campo de entrada não está vazio
        if (taskText) {
            // Adiciona um novo item à lista de tarefas
            $('#task-list').append(`<li>${taskText}</li>`);
            // Limpa o campo de entrada
            $('#task-input').val('');
        }
    });

    // Adiciona um evento de clique aos itens da lista (inclusive os futuros)
    $('#task-list').on('click', 'li', function() {
        // Alterna a classe 'completed' no item clicado
        $(this).toggleClass('completed');
    });
});
