Ext.define("Illi.view.produto.ListaContainer",{
    extend: "Ext.Panel",
    xtype: "listaContainer",

    requires: ["Illi.view.produto.Lista"],

    initialize: function() {
        this.add([{
            xtype: "barraPesquisa"
        }, {
            xtype: "listaProduto"
        }]);
    },

    config: {
        layout: "fit", //critical for list to show
        title: "Início",
        iconCls: "home"
    },

    onAddNoteTap: function() {
        this.fireEvent("addNoteCommand",this);
    }
});