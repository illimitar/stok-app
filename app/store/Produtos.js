Ext.define("Illi.store.Produtos", {
    extend: "Ext.data.Store",
    requires: ["Illi.model.Produto"],
    config: {
        model: "Illi.model.Produto",
        pageSize: 20,
        proxy: {
            //url : "http://testeilli.no-ip.org:8080/stok/mobile/tabela_preco/index/0",
            url: "http://stokrio.ddns.com.br:8088/stok/mobile/tabela_preco/index/0",
            type: 'jsonp',
            reader: {
                type: 'json'
            },
            callbackKey: 'retorno'
        }
    }
});