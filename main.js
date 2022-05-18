function startGame(dificuldade){
    //configuracoes para cada nivel de dificuldade, criação de um mapa para configuração

    var configuracoes = {}
    configuracoes['easy'] = {'rows':8, 'columns': 10, 'bombs': 10}
    configuracoes['medium'] = {'rows':14, 'columns': 18, 'bombs': 40}
    configuracoes['hard'] = {'rows':20, 'columns': 24, 'bombs': 99}

    //escrever o array preenchido com zeros de acordo com o nivel de dificuldade
    index = 0
    matriz = []
    var qtdLinhas = configuracoes[dificuldade]['rows']
    var qtdColunas = configuracoes[dificuldade]['columns']
    celulasRestantes = qtdColunas*qtdLinhas
    while(index<qtdLinhas){
        var newRow = new Array(qtdColunas).fill(0); //cria linha preenchida com zeros
        matriz.push(newRow)
        index++
    }
  
    console.log(matriz);
    
   
    
    //posicionar bombas
    numBombas = 0
    var numBombasDesejadas =  configuracoes[dificuldade]['bombs']
    while(numBombas<numBombasDesejadas){
        //sortear uma linha e coluna da matriz da matriz
        var destinationRow =  Math.floor(Math.random() * ((qtdLinhas-1)))
        var destinationColumn =  Math.floor(Math.random() * ((qtdColunas-1)))
        //30% de chance de ter bomba no local
        var chanceBombaAlvo = 0.3 
        //sorteia numero qualquer entre 0 e 1
        var chanceBombaObtida = Math.random()
        //verifica se o numero sorteado é menor que a chance de ter bomba
        if(chanceBombaObtida<chanceBombaAlvo){
            matriz[destinationRow][destinationColumn] = 1
            numBombas++
        }
    }
    console.log('Numero de bombas obtidas: ' + numBombas.toString())
    console.log(matriz)
    
    console.log('abriu novo arquivo')
    //escreve innerHTML da tabela

    document.getElementsByTagName('body')[0].innerHTML = ''
    
    escreveTabuleiro(matriz)
    iniciar()
}

var cont = document.createElement("label");
cont.id = "cont"
document.getElementsByTagName('body')[0].appendChild("cont") 

function escreveTabuleiro(matriz){
    //muda para arquivo com o tabuleiro

    var tabelaJogo = document.createElement('table');


    rowIndex = 0
    
    while(rowIndex<matriz.length){
        columnIndex = 0
        var newRow = tabelaJogo.insertRow()
        while (columnIndex<matriz[rowIndex].length){

            //escreve botao da posicao
            var newCell = newRow.insertCell()
            var button = document.createElement('button');
            button.innerHTML = '?';
            button.style.backgroundColor = 'grey';
            button.setAttribute("row", rowIndex)
            button.setAttribute("column", columnIndex)
            button.setAttribute("value", matriz[rowIndex][columnIndex])
            button.onclick = function(){
              var bombasAoRedor = clicarBotao(this.getAttribute("row"),this.getAttribute("column"),this.getAttribute("value"));
              if(this.getAttribute("value") == 1){
                this.style.backgroundColor = 'red';
              }
              else{this.style.backgroundColor = 'blue'; 
            this.innerHTML = bombasAoRedor.toString()
        }
            };
            newCell.appendChild(button)
            columnIndex++
        }
        rowIndex++

    }

    document.getElementsByTagName('body')[0].appendChild(tabelaJogo)

   
}


function clicarBotao(row,column,value){  
    newMatriz = matriz
    if(value == 1){
        console.log('possui bomba')
        alert('Você fez BUM!')
        document.location.reload(true)
        }
    celulasRestantes = celulasRestantes -1
    console.log('celulas restantes : '+celulasRestantes.toString())
    console.log('número de bombas : '+ numBombas.toString())
    if(numBombas == celulasRestantes)
    {
        console.log('zero bombas bb')
        alert('Você é o chefe das minas, rs')
        document.location.reload(true)
        
    }
    
   
    //calcular qtd de minas ao redor
    var bombasAoRedor = 0;
    console.log(newMatriz)
    //testar coluna antes e depois
    try{if(newMatriz[row][parseInt(column)-1] == 1){bombasAoRedor++}} catch(e) {console.log('erro')}
    try{if(newMatriz[row][parseInt(column)+1] == 1){bombasAoRedor++}} catch(e) {console.log('erro')}
    //testar linhas antes e depois
    try{if(newMatriz[parseInt(row)-1][column] == 1){bombasAoRedor++}} catch(e) {console.log('erro')}
    try{if(newMatriz[parseInt(row)+1][column] == 1){bombasAoRedor++}} catch(e) {console.log('erro')}
    //testar coluna anterior linha superior e inferior
    try{if(newMatriz[parseInt(row)-1][parseInt(column)-1] == 1){bombasAoRedor++}} catch(e) {console.log('erro')}
    try{if(newMatriz[parseInt(row)+1][parseInt(column)-1] == 1){bombasAoRedor++}} catch(e) {console.log('erro')}
    //testar coluna depois linha superior e inferior
    try{if(newMatriz[parseInt(row)-1][parseInt(column)+1] == 1){bombasAoRedor++}} catch(e) {console.log('erro')}
    try{if(newMatriz[parseInt(row)+1][parseInt(column)+1] == 1){bombasAoRedor++}} catch(e) {console.log('erro')}
    return bombasAoRedor
    
}


