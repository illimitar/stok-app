Ext.define("Illi.controller.Main", {
    extend: "Ext.app.Controller",
    requires: ["Illi.store.Produtos"],
    config: {
        refs: {
            barraPesquisa: "barraPesquisa",
            listaProduto: "listaProduto",
            valorPesquisa: "barraPesquisa > toolbar > searchfield",
            botaoPesquisa: "barraPesquisa > toolbar > #botaoPesquisar"

        },
        control: {
            barraPesquisa: {
                pesquisarProduto: "onPesquisar"
            }
        }
    },
    onPesquisar: function() {

        var botao = Ext.ComponentQuery.query('barraPesquisa > toolbar > #botaoPesquisar')[0];
        botao.setText('Pesquisando');
        botao.setDisabled(true);

        var store = Ext.create("Illi.store.Produtos");
        store.getProxy().setExtraParam("descricao", this.getValorPesquisa().getValue());

        var listaProduto = this.getListaProduto();
        var storeLista = this.getListaProduto().getStore();
        var descricaoPesquisa = this.getValorPesquisa().getValue();

        listaProduto.setMasked(true);

        store.load({
            callback: function(rec, response) {


                if (response.success) {

                    var illi = Ext.create('Illi.store.Sqlite', {
                        sorters: ['id'],
                        storeId: 'comparar',
                        autoLoad: true
                    });
                    var registros = [];


                    this.each(function(rec) {
                        var reg = rec.getData();

                        if (null === illi.findRecord('DsCodigo', rec.get('DsCodigo'))) {
                            illi.add(reg);
                            illi.sync();
                        } else {
                            var regLocal = illi.findRecord('DsCodigo', rec.get('DsCodigo'));

                            if (regLocal.raw.dtaltvlprecovenda !== rec.get('dtaltvlprecovenda')) {
                                illi.remove(regLocal);
                                illi.add(reg);
                                illi.sync();
                            }
                        }

                    });

                    botao.setUi('normal');
                } else {
                    botao.setUi('decline');
                }



                botao.setText('Pesquisar');
                botao.setDisabled(false);

                storeLista.filter('descricao', descricaoPesquisa, true);
                storeLista.load();
            }
        });



        storeLista.filter('descricao', descricaoPesquisa, true);
        storeLista.load();
        listaProduto.setMasked(false);
        //Ext.getCmp('carregando').destroy();

    }


});