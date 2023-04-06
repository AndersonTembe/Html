var start = true;
var controlo = 1;
var op1 = "";
var op2 = "";
var operacao = "";
var res = document.getElementById("res");

function addNumber() {
    var x = event.target.value;
    if (controlo == 1) {
        op1 += x;
    }
    else {
        op2 += x;
    }
    if (start == true) {
        res.innerText = "";
        start = false;
    }
    res.innerText += x;
   
}

function addOperation() {
    var x = event.target.value;
    if (operacao == "" && op1 != "") {
        operacao = x;
        res.innerText += x;
        controlo = 2;
    }
    else {
        erro();
    }
    function clearResult() {
        start = true;
        controlo = 1;
        operacao = "";
        op1 = "";
        op2 = "";
        res.innerText = "0";
    }
    function calculate() {
        var error = 0;
        if (controlo = 2) {
            switch (operacao) {
                case "+":
                    res = parseFloat(op1) + parseFloat(op2);
                    break;
                case "-":
                    res = parseFloat(op1) - parseFloat(op2);
                    break;
                case "*":
                    res = parseFloat(op1) * parseFloat(op2);
                    break;
                case "/":
                    if (op2 == 0) {
                        alert("Operação não definida");
                        break;
                    }
                    else {
                        res = parseFloat(op1) + parseFloat(op2);
                        break;
                    }
                    
            }
        }
    }
}