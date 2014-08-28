$(document).bind( 'mobileinit', function(){
    $.mobile.loader.prototype.options.text = "Carregando";
    $.mobile.loader.prototype.options.textVisible = false;
    $.mobile.loader.prototype.options.theme = "a";
    $.mobile.loader.prototype.options.html = "";
    $.mobile.page.prototype.options.domCache = true;
    $.mobile.pageLoadErrorMessage = 'Ocorreu um erro ao conectar ao servidor verifique sua CONEXÃO!';

});


$(document).bind('pageinit',function(){
    console.log('carregou pageinit');
    //console.log(localStorage);
    lista_itens();
    pesquisar_produto();
    add_item();
    dadosFormulario();
    
});

function add_item(){
    $("#pagina_add_item").on("pageshow", function(e) {
        dadosFormulario();
        console.log('add_item');
        
        $("#idqtde").setMask();
        $('#iddescricao_item').val(localStorage.descricao_item);
        $('#idpreco_item').val(localStorage.preco_item).setMask();
       
       
       
        if(localStorage.idpagamento !== 'Prazo' && localStorage.tabela_preco === 'TA 1'){
            $('#idpreco_item').addClass("ui-disabled");
        }
        else{
            $('#idpreco_item').removeClass("ui-disabled");
        }
    
    });

}

function adicionar_item(){
    setTexto('qtde', $("#idqtde").val());
    console.log(localStorage.NrOrdemDigitacao)
    if(localStorage.NrOrdemDigitacao != undefined){ 
        var ordem = parseFloat(localStorage.NrOrdemDigitacao) + 1; 
    }else{
        var ordem = 1;     
    }
    setTexto('NrOrdemDigitacao', ordem);
    setTexto('preco_item', $("#idpreco_item").val());
    //console.log(localStorage);
    
    $.mobile.showPageLoadingMsg();
    $.post("../salvar_item", 
        localStorage
        , function(res) {
            
            console.log(res);
            
            if(res.alerta){
                adicionar_item();
            }else{
             
                setTexto('totalItens',res.qtdPedido);
                setTexto('total_pedido_br',res.valor_br);
                setTexto('total_pedido_bd',res.valor);
                //$.mobile.hidePageLoadingMsg();
                carregar_pagina('../abrir/itens_pedido');  
                
            }
            
         
        
        },"json");

    dadosFormulario();
}

function carregarPedido(){
    console.log(localStorage.idorcamento);
    $.mobile.showPageLoadingMsg();
    $.post("carregarPedido", 
        localStorage
        , function(res) {
            
            console.log('retorno');
            console.log(res);
            
            
            //$.mobile.hidePageLoadingMsg();
            carregar_pagina('./abrir_itens');
        
        },"json");
    
}

function apagarItem(id){
    
    $.mobile.showPageLoadingMsg();
    $.post("apagar_item", 
    {
        IdOrcamentoItem:id
    }
    , function(res) {
        
        console.log(res);
        
        
        if(res.alerta){
            setTexto('total_pedido_br',res.totalPedido);
            setTexto('totalItens',res.qtdPedido);
            $("#totalpedido").html(res.totalPedido+' | '+ res.qtdPedido);
            
            var ids = "#"+id;
            $(ids).html(" ");
        }else{
            alert('Houve Algum erro tente novamente!')
        }
        $.mobile.hidePageLoadingMsg();
    //carregar_pagina('abrir_itens');
    
    },"json");

}
function cancelar_item(){
    setTexto('qtde', null);
    setTexto('preco_item', null);
    setTexto('id_item', null);
//console.log(localStorage);

}

function pesquisar_produto(){
    $("#pagina_item").on("pageshow", function(e) {
        
        console.log("pesquisar_produto");
        
      
        
        //$("#totalpedido").text("Total Pedido R$ "+localStorage.total_pedido_br);
        
        var lista_item = $("#lista_item");
        
        $("#id_item").on("input", function(e) {
            lista_item.html("<li>Digite no mínimo 5 letras para pesquisar!</li>");
            lista_item.listview("refresh");
            var text = $(this).val();
            if(text.length < 1) {
                lista_item.html("<li>Digite no mínimo 5 letras para pesquisar!</li>");
                lista_item.listview("refresh");
            } else if(text.length > 5) {
                
                $.mobile.showPageLoadingMsg();
                $.post("../lista_itens", {
                    q: text
                }, function(res) {
                    //console.log(res);
                    if(res != null){
                        $.mobile.hidePageLoadingMsg();
                        var str = "";
                        for(var i=0, len=res.length; i<len; i++) {
                            //console.table(res);
                            str += "<li> <a onclick=\"setTexto('id_item','"+res[i].IdDetalhe+"');  ";
                            
                            //console.log(localStorage.idpagamento !== 'Prazo' && localStorage.tabela_preco === 'TA 1');
                            if(localStorage.idpagamento !== 'Prazo' && localStorage.tabela_preco === 'TA 1'){
                                str +=" setTexto('preco_item','"+res[i].ta2+"');";
                            }else if(localStorage.idpagamento !== 'Prazo' && localStorage.tabela_preco === 'TA 2'){
                                str +=" setTexto('preco_item','"+res[i].VlPrecoVenda+"');";
                            }
                            else{
                                str +=" setTexto('preco_item','"+res[i].VlPrecoVenda+"');";
                            }
                            
                            str +=" setTexto('descricao_item','"+res[i].DsDetalhe+"');";
                            str +=" carregar_pagina('../abrir/add_item');";
                            str +="\">";
                            str +=res[i].DsDetalhe+"<br/> TA 1= "+res[i].ta2+"<br/> TA 2= "+res[i].VlPrecoVenda+"";
                            str +="</a></li>";
                        }
                        lista_item.html(str);
                        lista_item.listview("refresh");
                    
                    }else{
                        $.mobile.hidePageLoadingMsg();
                        lista_item.html("<li><b>item:</b> <i>"+text+"</i> <b>Não encontrado</b></li>");
                        lista_item.listview("refresh");
                        return false;
                    }
                },"json");
            
              
               
        
            }
        });
    });
 
}

function dadosFormulario() {
    
    console.log('dadosFormulario');
    
    //console.log(localStorage);
    
    $('#id_cliente').val(localStorage.idnomecliente);
    $('#id_avista').val(localStorage.idpagamento);
    

}


function carregar_pagina(url){
    $.mobile.changePage( url,{
        transition: "none"
    
    } );
    console.log("Carregando->"+url );
    return false;

}


function setTexto(id,texto){
    localStorage.setItem(id, texto);
//console.log(localStorage);
}
function cancelar(){
    localStorage.clear();
}



//    this.setItem(key, JSON.stringify(value));
//    return JSON.parse(this.getItem(key));






//banco de dados

function banco_illi(){
    
    
    try {  
        if (!window.openDatabase) {  
            console.log('Seu navegador websql');  
        } else {  
            //  apagar_tabela();
            criar_tabela();
            lista_itens();
        
        }  
    } catch(e) {  
        
        if (e === 2) {  
            // Version number mismatch.  
            console.log("Invalid database version.");  
        } else {  
            console.log("Unknown error "+e+".");  
        }  
        return;  
    }  
}  



function criar_tabela() {
    var db = openDatabase('illi_local', '1.0', 'Test DB', 5 * 1024 * 1024);
    
    db.transaction(function(tx) {
        //tx.executeSql("DROP TABLE itens", []);
        tx.executeSql("CREATE TABLE  itens (id TEXT, descricao TEXT,ta1 TEXT,ta2 TEXT,data_importacao DATETIME )", []);
    });
    
    atualizar_itens();
}

function atualizar_itens(){
    
    //var num = Math.round(Math.random() * 10000);
    //console.log(num);
    var dados = "";
    var sql = "";
    
    
    var url = "../../mobile/tabela_preco";
    
    
    if(localStorage.carga === 'cargaTotal'){
        url = "../../mobile/mobile/tabela_preco/true"
    }
    $.mobile.showPageLoadingMsg();
    $.post(url, function(res) {
        
        console.log("<------------- atualizando-------------------->");
        //apagar_tabela();
        console.log('Limpando Banco Local');
        
        
        console.log('Atualizando Banco Local');
        
        
        
        
        for(var i=0, len=res.length; i<len; i++) {
            
            //dados +="'"+res[i].iddetalhe+"','"+res[i].dsdetalhe+"','"+res[i].ta1+"','"+res[i].ta2+"',"+data_importacao+",";
            
            var id = res[i].iddetalhe;
            var descricao = res[i].DsCodigo+" - "+res[i].descricao+"-"+ res[i].DsSigla;
            var ta1 = res[i].ta1;
            var ta2 = res[i].ta2;
            var data_importacao = res[i].dtaltvlprecovenda;
            var sql_item = "";
            var sql_delete = "";
            
            //   console.log([id,descricao,ta1,ta2,data_importacao ] +"\n");
            
            //console.table(res);
            
            dados = "'"+id+"','"+descricao+"','"+ta1+"','"+ta2+"','"+data_importacao+"'" ;   
            
            sql_delete = "delete from itens where id = '"+id+"'";
            add_local(sql_delete);
            
            
            sql_item = " INSERT INTO itens(id, descricao,ta1,ta2,data_importacao) VALUES ("+dados+"); \n ";
            add_local(sql_item);
        
        
        
        }
    
        $.mobile.hidePageLoadingMsg();
    
    
    
    },"json")
    
    
    .error(function() {
        $("#totalpedido").append("<h2>OFF LINE</h2>");
        console.log("sem conexao");
    })






}
function add_local(sql){
    
    var banco = openDatabase('illi_local', '1.0', 'Test DB', 5 * 1024 * 1024);
    banco.transaction(function(rs){
        rs.executeSql(sql,null,  
            function(rt){
                //                console.log(rs);
                return true;
            },  
            function(rt){
                console.log(rs);
                return false;
            }
            );
    });

}


function lista_itens() {
    $("#pTabelaPreco").on("pageshow", function(e) {
        
        
        console.log("<------------- LISTANDO -------------------->");
        
        
        var texto = "";
        var tabela_preco = $("#lista_tabela");
        var db = openDatabase('illi_local', '1.0', 'Test DB', 5 * 1024 * 1024);
        db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM itens", [], function(tx, result) {
                
                // console.log('select * from itens');
                //   console.log(result.rowsAffected);
                // console.table(result);
                for (var i = 0, item = null; i < result.rows.length; i++) {
                    item = result.rows.item(i);
                    
                    
                    texto+="<li>";
                    texto+= ""+item['descricao']+" <br/>Ta1 = R$ "+$.mask.string(item['ta2'],'decimal')+" </br>Ta2 =  R$ "+$.mask.string(item['ta1'],'decimal')+"";
                    texto+="</li>";
                
                }
                
                tabela_preco.html(texto);
                tabela_preco.listview("refresh");
            });
        });
    });
    
//$("#totalpedido").append('teste');
}




    
$(document).delegate("#pagina_item", "pageinit", function() {
    console.log('Executou script pagina pagina_item');
    if(localStorage.total_pedido_br){
        $('#valorTotalPedido').html("Total Pedido : "+localStorage.total_pedido_br);
    }else{
        $('#valorTotalPedido').html("");
    }
});  


$(document).delegate("#pPagamento", "pageinit", function() {
    console.log('Executou script pagina pPagamento');
    // console.log(parseInt(localStorage.totalItens));
    if( parseInt(localStorage.totalItens)> 0){
        $('.content-primary *').addClass("ui-disabled");
    }else{
        $('.content-primary *').removeClass("ui-disabled");
    }
});  


$(document).delegate("#pTabelaPreco", "pageinit", function() {
    console.log('atualizou banco');
    banco_illi();
});  

$(document).delegate("#pCarga", "pageinit", function() {
    setTexto('carga', 'cargaTotal');
    console.log('atualizou banco');
    banco_illi();
    
});  


    
function atualizarPagina(){
    $.mobile.showPageLoadingMsg();
    window.location.reload();
}