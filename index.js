function operate(op1, op2, operator){
    const validOperators = ['+','-','*','/'];
    if (!validOperators.includes(operator)){
        return
    }

    switch(operator){
        case '+':
            return op1 + op2;
            
        case '-':
            return op1 - op2;
            
        case '*':
            return op1 * op2;
            
        case '/':
            if(op2==0){
                return
            }
            return op1 / op2;
        
        default:
            return;    
    }
}