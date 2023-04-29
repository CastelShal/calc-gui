const displayUp = document.getElementById("disp-upper");
const displayDown = document.getElementById("disp-lower")
const keys = [...document.querySelectorAll(".opkey, .numkey")];
let text = "";
let answer = 0;
let equalled = false;

// Expression Calculation
function Node(value, left, right){
    this.value = value;
    this.left = left;
    this.right = right;
}

function operate(op1, op2, operator){
    op1 = parseFloat(op1)
    op2 = parseFloat(op2)
    switch(operator){
        case '+':
            return op1 + op2
        case '-':
           return op1 - op2
        case '*':
            return op1 * op2
        case '/':
            return op1 / op2
        default:
            return NaN
    }
}

function executeNode(node){
    if( !isNaN(node)){
        return node;
    }
    return operate(executeNode(node.left), executeNode(node.right), node.value);
}

function ParseTree(exp){
    const valid = /\d+\.?\d*|[-+\/*]/g;   //Do not change the order
    tokens = exp.match(valid);

    //Parser
    for(let i = tokens.length - 1; i > 0 ; i--){
        if ( Boolean(tokens[i].match(/[/*]/)) ){
            node = new Node(tokens[i], tokens[i-1], tokens[i+1]);
            tokens.splice(i,2);
            tokens[i-1] = node;
            i--;
        }

        else if( tokens[i] == "-" && Boolean(tokens[i - 1].match(/[-+/*]/)) ){
            tokens[i + 1] *= -1;
            tokens.splice(i,1);
            i--;
        }
    }

    //Normal operators
    for(let i = tokens.length - 1; i > 0 ; i--){
        if ((tokens[i] == "+" || tokens[i] == "-")){
            node = new Node(tokens[i], tokens[i-1], tokens[i+1]);
            tokens.splice(i,2);
            tokens[i-1] = node;
            i--;
        }
    }
    
    return tokens[0];
}

function EvaluateExpression(exp){
    node = ParseTree(exp);
    const ans = executeNode(node)
    console.log(ans);
    if (ans == Number.POSITIVE_INFINITY || ans == Number.NEGATIVE_INFINITY){
        return ("Zero Divison Error");
    }
    else{
        return (ans);
    }
}

//Expression Calculation ends

function isOp(char){
    return (char == "+" || char == "-" || char == "*" || char == "/" || char == "x")
}

function keyboardInput(ev){
    ev.preventDefault()
    console.log("Here");
    if( isOp(ev.key) || !isNaN(ev.key)){
        Update(ev.key);
    }
    else if(ev.key == "Backspace"){
        clear();
    }
    else if( ev.key == "Enter" ){
        equals();
    }
}

function clear(){
    if(equalled)
        {text = "";}
    else{
        text = text.slice(0,text.length - 1)
    }
    displayDown.textContent = "";
    render();
}

function equals(){
    let ans = EvaluateExpression(text.replace("x","*"))
    if(isNaN(ans) || ans == Number.POSITIVE_INFINITY || ans == Number.NEGATIVE_INFINITY){
        displayDown.textContent = "Error";
        equalled = true;
        return;
    }
    ans = Math.round(ans * 10000) / 10000;
    displayDown.textContent = ans;
    text = ans.toString();
    equalled = true;
}

document.onkeydown = keyboardInput;

keys.forEach(key => {
    if( key.id == "equals" ) {
        key.addEventListener('click', equals)
    }

    else if( key.id == "clear"){
        key.addEventListener('click', clear)
    }
    else{
    key.addEventListener('click',function(){
        Update(this.textContent)
        })
    }

})

function render(){
    displayUp.textContent = text;
}

function Update(char){
    const operator = isOp(char);
    if(equalled && !operator){
        text = "";
    }
    equalled = false;
    if(!text){
        if( operator ){
            return;
        }
    }
    else if( isOp(text[text.length - 1]) && operator ){
        if( isOp(text[text.length - 2])){
            return;
        }
        else if( char != "-" ){
            return;
        }
    }

    text += char;
    render();
}
