// Variáveis
let currentValue = ''; // Número atual
let equation = ''; // Histórico completo da equação
let lastInput = ''; // Armazena o último input para evitar operadores consecutivos
 
// Display e botões
const cont = document.getElementById('cont');
const result = document.getElementById('result');
const calculator = document.getElementById('calculator');
const buttons = calculator.querySelectorAll('button');
 
// Clique nos botões
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
 
        if (!isNaN(value) || value === '.') {
            handleNumber(value);
        } else if (value === 'C') {
            clearAll();
        } else if (value === '=') {
            calculate();
        } else {
            handleOperator(value);
        }
    });
});
 
// Função para lidar com números
function handleNumber(num) {
    if (num === '.' && currentValue.includes('.')) return;
 
    currentValue += num;
    equation += num;
    lastInput = num;
    updateDisplay();
}
 
// Função para lidar com operadores
function handleOperator(op) {
    if (lastInput === '' || isNaN(lastInput)) return; // Evita operadores consecutivos
 
    equation += ` ${op} `;
    lastInput = op;
    currentValue = ''; // Prepara para o próximo número
    updateDisplay();
}
 
// Função para calcular
function calculate() {
    if (lastInput === '' || isNaN(lastInput)) return; // Impede calcular sem número final
 
    try {
        const resultValue = Function(`'use strict'; return (${equation})`)(); // Avalia a equação com mais segurança
 
        result.textContent = resultValue;
        currentValue = resultValue.toString();
        equation = currentValue;
        lastInput = resultValue.toString();
 
        updateDisplay();
    } catch (error) {
        result.textContent = 'Erro';
        currentValue = '';
        equation = '';
        lastInput = '';
    }
}
 
// Função para limpar
function clearAll() {
    currentValue = '';
    equation = '';
    lastInput = '';
    updateDisplay();
}
 
// Atualiza o display
function updateDisplay() {
    cont.textContent = equation || '0';
    result.textContent = currentValue || '0';
}