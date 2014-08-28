Ext.define("Illi.view.produto.Pesquisa",{
    extend: "Ext.Toolbar",
    xtype: "barraPesquisa",
    requires: ["Ext.field.Search"],

    initialize: function() {
        var barraPesquisa = {
            xtype: "toolbar",
            ui: "searchbar",
            items: [
            {
                xtype: "searchfield",
                placeHolder: "Pesquisar Produto ...",
                flex: 1
            },
            {
                xtype: "button",
                itemId:'botaoPesquisar',
                text: "Pesquisar",
                handler: this.pesquisar,
                scope: this
            }
            ]
        };

        this.add([barraPesquisa]);
    },

    config: {
        docked: "top",
        ui: "searchbar",
        layout: "vbox"
    },

    pesquisar: function() {
        this.fireEvent("pesquisarProduto", this);
    }
});