var dataAtual = new Date();

var mesesAno = [{nome: 'Janeiro', dias: 31}, {nome: 'Fevereiro', dias: 28},
    {nome: 'Março', dias: 31}, {nome: 'Abril', dias: 30},
    {nome: 'Maio', dias: 31}, {nome: 'Junho', dias: 30},
    {nome: 'Julho', dias: 31}, {nome: 'Agosto', dias: 31},
    {nome: 'Setembro', dias: 30}, {nome: 'Outubro', dias: 31},
    {nome: 'Novembro', dias: 30}, {nome: 'Dezembro', dias: 31}];

var anoAtual = dataAtual.getFullYear();

var mesAtual = ({nome: mesesAno[verificaIndice(dataAtual.getMonth())].nome,
    dias: mesesAno[verificaIndice(dataAtual.getMonth())].dias, indice: dataAtual.getMonth()});

var mesPassado = ({nome: mesesAno[verificaIndice(dataAtual.getMonth()-1)].nome,
    dias: mesesAno[verificaIndice(dataAtual.getMonth()-1)].dias, indice: verificaIndice(dataAtual.getMonth()-1)});

var primeiroDia = descobreDia(anoAtual, mesAtual.indice, 1);

var proxLinha = false;

var buttonPress = true;

function descobreDia(ano, mes, dia) {
    return new Date(ano, mes, dia).getDay();
}

function acionaTabela() {
    var linhas = document.getElementById('mes').getElementsByTagName('tr');
    var colunas, ativContador = true, ativId = false;
    var contador = mesPassado.dias - primeiroDia;

    anoBis(anoAtual);
    for(i = 0; i < linhas.length; i++){
        if(primeiroDia === 7 && i === 1){
            proxLinha = true;
        }
        colunas = linhas[i].getElementsByTagName('td');
        for(j = 0; j < colunas.length; j++) {
            colunas[j].style.background = "#96ad90";
            if((j === primeiroDia && ativContador) || (proxLinha && ativContador)){
                contador = 0;
                ativId = true;
                proxLinha = false;
                ativContador = false;
            }
            contador++;
            if(ativId && contador <= mesAtual.dias) {
                if (contador < 10) {
                    colunas[j].id = "col0" + contador;
                } else {
                    colunas[j].id = "col" + contador;
                }
                colunas[j].style.background = "linear-gradient(to right, rgba(33, 102, 155,0.8), rgba(44, 167, 207,0.8))";
            }
            else {
                if(!ativContador) {
                    if (contador > mesAtual.dias) {
                        ativId = false;
                        contador = 1;
                    }
                }
            }
            colunas[j].getElementsByTagName("div")[0].textContent = contador;
        }
    }
    acionaTitulo();
}

function mudaMes(frente) {
    for (i = 0; i < 12; i++) {
        if (i === mesAtual.indice) {
            if (frente) {
                i++;
                if (i === 12) {
                    i = 0;
                    anoAtual += 1;
                }
                primeiroDia = descobreDia(anoAtual, mesAtual.indice, mesAtual.dias)+1;
            } else {
                i--;
                if (i === -1) {
                    i = 11;
                    anoAtual -= 1;
                }
                primeiroDia = descobreDia(anoAtual, mesPassado.indice, 1);
                if(primeiroDia === 0){
                    primeiroDia = 7;
                }
            }
            alteraMeses(i);
        }
    }
    acionaTabela();
}

function alteraMeses(i) {
    mesAtual.nome = mesesAno[i].nome;
    mesAtual.dias = mesesAno[i].dias;
    mesAtual.indice = i;
    mesPassado.nome = mesesAno[verificaIndice(i-1)].nome;
    mesPassado.dias = mesesAno[verificaIndice(i-1)].dias;
    mesPassado.indice = verificaIndice(i-1);
}

function acionaTitulo() {
    //Pesquisa a div do titulo calendario
    var tituloCalendario = document.getElementById('tituloCalendario').getElementsByTagName('b')[0];
    tituloCalendario.textContent = mesAtual.nome + ' ' + anoAtual;
}

function verificaIndice(indice) {
    var novoIndice = indice;
    if(indice === -1){
        novoIndice = 11
    }
    if(indice === 12){
        novoIndice = 0
    }

    return novoIndice;
}


function anoBis(ano) {
    if ((ano % 4 === 0) && !(ano % 100 === 0) || (ano % 400 === 0)) {
        mesesAno[1].dias = 29;
    }else{
        mesesAno[1].dias = 28;
    }
}

function adicionaEvento(idColuna) {
    var id = document.getElementById(idColuna);

    if(id !== null){
        var eventos = id.getElementsByTagName('div')[1];
        if (buttonPress) {
            buttonPress = false;
            var textarea = document.createElement('input');
            var button = document.createElement('input');
            textarea.value = eventos.textContent;
            eventos.textContent = '';
            textarea.className = 'infoTx';
            textarea.type = 'text';
            button.className = 'btn btn-warning';
            button.type = 'button';
            button.value = 'salvar';
            eventos.appendChild(textarea);
            eventos.appendChild(button);
            button.onclick = function () {
                eventos.textContent = textarea.value;
                buttonPress = true;
            }
        }
    }
}

function detalhe() {
    document.getElementById('imgDetalhe').style.display = "block";
}