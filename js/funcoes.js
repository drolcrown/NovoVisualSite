var placeAtiv = false;
var eventos = [];
var cont = 0;
var data = new Date();

function detalhe() {
    document.getElementById('imgDetalhe').style.display = "block";
}

function acionaEventos() {
    if(!placeAtiv) {
        adicionarPlaceholders();
    }
    mostraCalendario();
    mostraEventos();
}

function adicionarPlaceholders() {
    var dia = data.getDate(), mes = data.getMonth() + 1;

    if(data.getDate() < 10){
        dia = '0' + dia;
    }
    if(data.getMonth() < 10){
        mes = '0' + mes;
    }
    document.getElementById('dataInicio').placeholder =
        dia + '/' + mes + '/' + data.getFullYear() ;
    document.getElementById('dataFim').placeholder = '31/12/' + data.getFullYear() ;
    placeAtiv = true;
}

function mostraCalendario() {
    $(document).ready(function () {
        $('#dataInicio').datepicker({
            format: "dd/mm/yyyy",
            language: "pt-BR",
            startDate: '-1000d'
        });
        $('#dataFim').datepicker({
            format: "dd/mm/yyyy",
            language: "pt-BR",
            startDate: '-1000d'
        });
    });
}

function mostraEventos() {
    var evento = document.getElementById('eventos');

    if(!eventos.length > 0) {
        evento.innerHTML = "<h1 id='eventoh1'>Nao Existem Eventos</h1>";
    }
    if(eventos.length === 1) {
        evento.removeChild(document.getElementById('eventoh1'));
    }
}

function adicionarEvento() {
    var dataI = document.getElementById('dataInicio');
    var dataF = document.getElementById('dataFim');

    if(dataI.value !== '' && dataI.value !== '') {
        eventos.push({
            dataInicio: dataI.value,
            dataFim: dataF.value,
            estado: document.getElementById('estado').value,
            municipio: document.getElementById('municipio').value,
            indice: cont
        });


        //Criando o cartão
        var evento = document.getElementById('eventos');
        var cartao = document.createElement('div');
        var dia = document.createElement('div');
        var texto = document.createElement('div');
        cartao.className = 'cartao' + ' row';
        texto.className = 'textoEvento' + ' col-sm-8';
        dia.className = 'dia' + ' col-sm-4';
        dia.innerHTML = data.toDateString();
        texto.innerHTML = "<h3>Primeiro Evento de teste</h3>";
        cartao.appendChild(dia);
        cartao.appendChild(texto);
        evento.appendChild(cartao);
        cont++;

        mostraEventos();
    }else{
        dataI.oninvalid=alert('Por favor, Preencha os Campos de Data');
    }
}

function pesquisarEvento(dataI, dataF, estado, municipio) {
    var dataInicio = document.getElementById('dataInicio').value;
    var dataFim = document.getElementById('dataFim').value;
    var event = null;

    for(i = 0; i < eventos.length; i++){
        if(estado === eventos[i].estado || estado === 0){
            if(municipio === eventos[i].municipio || municipio === 0){
                if(dataF <= dataFim && dataI >= dataInicio) {
                    event = eventos[i];
                    break;
                }
            }
        }
    }
    if(event === null){
        alert("Evento Não Encontrado");
    }else{
        return event;
    }
    // (dataFim === dataFim.placeholder || dataInicio === dataInicio.placeholder)
}