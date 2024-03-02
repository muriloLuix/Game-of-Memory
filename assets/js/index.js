function jogoDaMemoria() {
    let numeros = [];
    let respostas = [];
    let acertos = 0;
    let messageDiv = document.getElementById('message');
    let startButton = document.getElementById('start');

    // Desabilitar botão de iniciar para evitar regerar números durante o jogo
    startButton.disabled = true;

    for (let i = 0; i < 5; i++) {
        numeros.push(Math.floor(Math.random() * 50) + 1);
    }

    let j = 5;
    messageDiv.innerText = `Decore os números abaixo em ${j}\n\n${numeros.join('\t')}`;
    let interval = setInterval(() => {
        j--;

        if (j === 0) {
            clearInterval(interval);
            messageDiv.innerHTML = "Informe os números que foram exibidos<br>";
            receberRespostas();
        } else {
            messageDiv.innerText = `Decore os números abaixo em ${j}\n\n${numeros.join('\t')}`;
        }
    }, 1000);

    function receberRespostas() {
        for (let i = 0; i < 5; i++) {
            let inputContainer = document.createElement('div');
            inputContainer.classList.add('input-container');
            let input = document.createElement('input');
            input.type = 'number';
            input.placeholder = `Informe o ${i+1}º número`;
            input.required = true;
            inputContainer.appendChild(input);
            messageDiv.appendChild(inputContainer);
        }

        let button = document.createElement('button');
        button.innerText = 'Enviar';
        messageDiv.appendChild(button);

        button.addEventListener('click', function() {
            // Desabilitar botão de enviar para evitar clique múltiplo
            button.disabled = true;

            let inputs = messageDiv.querySelectorAll('input');
            let allInputsFilled = true;
            inputs.forEach((input) => {
                if (!input.value) {
                    allInputsFilled = false;
                    let errorMessage = document.createElement('div');
                    errorMessage.classList.add('error-message');
                    errorMessage.innerText = "Campo obrigatório";
                    input.parentNode.appendChild(errorMessage);
                }
            });

            if (allInputsFilled) {
                inputs.forEach((input, index) => {
                    let resposta = parseInt(input.value);
                    respostas.push(resposta);

                    if (resposta === numeros[index]) {
                        acertos++;
                    }
                });

                if (acertos === 5) {
                    messageDiv.innerHTML = "Parabéns! Sua memória é muito boa.<br>Veja os números exibidos:<br>" + numeros.join('\t');
                } else {
                    messageDiv.innerHTML = "Que pena! Sua memória não é muito boa.<br>Veja os números exibidos:<br>" + numeros.join('\t');
                }
                
                // Adicionar botão de reiniciar
                let restartButton = document.createElement('button');
                restartButton.innerText = 'Reiniciar Jogo';
                restartButton.addEventListener('click', reiniciarJogo);
                messageDiv.appendChild(restartButton);
            } else {
                messageDiv.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    function reiniciarJogo() {
        numeros = [];
        respostas = [];
        acertos = 0;
        messageDiv.innerHTML = '';
        startButton.disabled = false;
        jogoDaMemoria();
    }
}

document.getElementById("start").addEventListener("click", jogoDaMemoria);