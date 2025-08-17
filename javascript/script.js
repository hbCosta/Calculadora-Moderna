let justCalculated = false; // escopo global
function intoDisplay(value) {
    const display = document.getElementById('display');
    const isOperator = /^[+\-*/]$/.test(value);
    const isDigitOrDot = /^[0-9.]$/.test(value);

    // Se veio de um cálculo terminado com '=', tratar conforme o tipo do botão
    if (justCalculated) {
        // Se digitou número (ou ponto), substitui o resultado pelo novo número
        if (isDigitOrDot) {
            display.value = value;
            justCalculated = false;
            return;
        }
        // Se digitou operador, continua a expressão com o resultado atual
        if (isOperator) {
            // Se estava em 'Erro', começar com 0
            if (display.value === 'Erro') display.value = '0';
            display.value += value;
            justCalculated = false;
            return;
        }
        // Outros casos (ex: teclas especiais) -> apenas resetar flag
        justCalculated = false;
    }

    // Se estiver 'Erro' e digitar número, substitui
    if (display.value === 'Erro') {
        if (isOperator) {
            display.value = '0' + value;
        } else {
            display.value = value;
        }
    } else {
        display.value += value;
    }
}

// Função para inverter o sinal (+/-)
function toggleSign() {
    const display = document.getElementById('display');
    let value = display.value;
    
    // Se o valor é um número válido
    if (/^-?[0-9.]+$/.test(value)) {
        if (value.startsWith('-')) {
            // Se é negativo, remove o sinal (vira positivo)
            display.value = value.substring(1);
        } else {
            // Se é positivo, adiciona o sinal negativo
            display.value = '-' + value;
        }
    }
}

function clearDisplay(){
    const display = document.getElementById('display');
    display.value = '';
}
function clearEntry(){
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function clearEntryC() {
    const display = document.getElementById('display');
    let value = display.value;

    // Se o valor é apenas um número (incluindo negativos) ou resultado de cálculo, limpa tudo
    if (/^-?[0-9.]+$/.test(value)) {
        display.value = '0';
        return;
    }

    // Se há uma operação em andamento, apaga apenas o último número
    if (/(\+|-|\*|\/)[0-9.]*$/.test(value)) {
        display.value = value.replace(/(\+|-|\*|\/)[0-9.]*$/, '$1');
    } else {
        // Se não há operação, limpa tudo e coloca 0
        display.value = '0';
    }
}

function result() {
    const display = document.getElementById('display');
    try {
        // remove operadores/dots no final (evita erro em "3+")
        const expr = display.value.replace(/[+\-*/.]+$/, '');
        display.value = eval(expr);
        justCalculated = true;
    } catch (error) {
        display.value = 'Erro';
        justCalculated = true;
    }
}


// Função para calcular o quadrado
function calculateSquare() {
    const display = document.getElementById('display');
    const currentValue = parseFloat(display.value);
    
    if (!isNaN(currentValue)) {
        const result = currentValue * currentValue;
        display.value = result;
    } else {
        display.value = 'Erro';
    }
}

// Função para calcular a raiz quadrada
function calculateSqrt() {
    const display = document.getElementById('display');
    const currentValue = parseFloat(display.value);
    
    if (!isNaN(currentValue) && currentValue >= 0) {
        const result = Math.sqrt(currentValue);
        display.value = result;
    } else {
        display.value = 'Erro';
    }
}

// Função para calcular o inverso (1/x)
function calculateInverse() {
    const display = document.getElementById('display');
    const currentValue = parseFloat(display.value);
    
    if (!isNaN(currentValue) && currentValue !== 0) {
        const result = 1 / currentValue;
        display.value = result;
    } else {
        display.value = 'Erro';
    }
}
// Função para calcular porcentagem
function calculatePercentage() {
    const display = document.getElementById('display');
    const currentValue = parseFloat(display.value);
    
    if (!isNaN(currentValue)) {
        // Converte o número para porcentagem (divide por 100)
        const result = currentValue / 100;
        display.value = result;
    } else {
        display.value = 'Erro';
    }
}