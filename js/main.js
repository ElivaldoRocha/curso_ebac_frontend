$(document).ready(function () { // Função que é executada quando o documento está pronto
    // Aplica a máscara de telefone ao campo com id 'telefone'
    $('#telefone').mask('(00) 00000-0000', {
        placeholder: '(DDD) 12345-6789' // Define o placeholder da máscara
    });

    // Aplica a máscara de CPF ao campo com id 'cpf'
    $('#cpf').mask('000.000.000-00', {
        placeholder: '123.456.789-00' // Define o placeholder da máscara
    });

    // Aplica a máscara de CEP ao campo com id 'cep'
    $('#cep').mask('00000-000', {
        placeholder: '012345-678' // Define o placeholder da máscara
    });

    // Validação do formulário
    $('form').validate({
        rules: { // Define as regras de validação para cada campo
            nome: {
                required: true // Campo obrigatório
            },
            email: {
                required: true, // Campo obrigatório
                email: true // Deve ser um email válido
            },
            telefone: {
                required: true // Campo obrigatório
            },
            endereco: {
                required: true // Campo obrigatório
            },
            cep: {
                required: true // Campo obrigatório
            },
            cpf: {
                required: true // Campo obrigatório
            },
        },
        // Função que é chamada quando o formulário é enviado com sucesso
        submitHandler: function (form) {
            alert("Sua requisição foi enviada para análise, parabéns pela aquisição!"); // Mensagem de sucesso
            form.reset(); // Reseta o formulário
        },
        // Função que é chamada quando há campos inválidos no formulário
        invalidHandler: function (form, validator) {
            alert("Por favor, preencha os campos para prosseguir com a compra!"); // Mensagem de erro
        }
    });
});
