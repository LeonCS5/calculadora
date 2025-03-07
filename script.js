// variaveis
let currentValue = '';
let previousValue = '';
let currentOperator = null;
let equation = ''; // Nova variável para armazenar o histórico da conta

// display e botoes
const cont = document.getElementById('cont');
const result = document.getElementById('result');
const calculator = document.getElementById('calculator');
const buttons = calculator.querySelectorAll('button');
 
// clique
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    if (!isNaN(value) || value === '.') {
      handleNumber(value);
    } else if (value === 'C') {
      // botao de limpar
      clearAll();
    } else if (value === '=') {
      // botao de calcular
      calculate();
    } else {
      // clique em um operador
      handleOperator(value);
    }
  });
});
 
// funcao para lidar com numeros
function handleNumber(num) {
  // evita inserir mais de um ponto decimal
  if (num == '.' && currentValue.includes('.')) return;
  currentValue += num;
  updateDisplay();
}
 
// funcao para lidar com operadores
function handleOperator(op) {
  // se ainda nao digitou nada e nao for um operador que aceite valores negativos
  if (currentValue === '' && op !== '-') {
    return;
  }
  if (previousValue === '') {
    // Se for a primeira vez escolhendo operador
    previousValue = currentValue;
    currentValue = '';
  } else if (currentValue !== '') {
    // Se já há valores, efetua um cálculo parcial
    calculate();
  }
  currentOperator = op;
  equation += ` ${previousValue} ${currentOperator} `;
  updateDisplay();
}
 
// Função para efetuar o cálculo
function calculate() {
  // Se não houver valores ou operador, sai
  if (currentValue === '' || previousValue === '' || currentOperator === null) return;
  const num1 = parseFloat(previousValue);
  const num2 = parseFloat(currentValue);
  let result = 0;
  switch (currentOperator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case 'X':
      result = num1 * num2;
      break;
    case '/':
      if (num2 === 0) {
        updateDisplay('Erro');
        return;
      }
      result = num1 / num2;
      break;
    case 'q':
      result = num1 * num1;
      break;
    default:
      return;
  }
 
  // Armazena o resultado para uso em cálculos contínuos
  previousValue = result.toString();
  currentValue = '';
  currentOperator = null;
  // Atualiza o histórico com o resultado final
  equation += `${previousValue}`;
  updateDisplay();
}
 
// Função para limpar tudo
function clearAll() {
  currentValue = '';
  previousValue = '';
  currentOperator = null;
  equation = ''; // Limpar o histórico
  updateDisplay();
}
 
// Atualiza o texto do display
function updateDisplay() {
  result.textContent = currentValue === '' ? previousValue : currentValue;  // Exibe apenas o resultado final
  cont.textContent = equation;  // Exibe o histórico completo da operação
}