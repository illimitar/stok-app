Ext.define('Illi.view.produto.Lista', {
    extend: "Ext.dataview.List",
    xtype: "listaProduto",
    config: {
        store: Ext.create('Illi.store.Sqlite', {
            grouper: 'descricao',
            sorters: ['name', 'id']
        }),
        grouped: true,
        loadingText: 'Carregando ...',
        itemTpl: [
            '<div>',
            '<div><b>Código: </b>  {DsCodigo}</div>',
            '<p><b>Descrição: </b> {descricao}</p>',
            '<p><b>Tabela 1: </b>{ta1}</p>',
            '<p><b>Tabela 2: </b>{ta2}</p>',
            '<p><b>Dt. Alteração: </b>{dtaltvlprecovenda}</p>',
            '</div>'
        ]

    }
});