Ext.define('Illi.model.Produto', {
    extend: 'Ext.data.Model',

    config: {
        //identifier: 'uuid',
        fields: [
        {
            name: "DsCodigo",  
            type: "string"
        },
        {
            name: "descricao",  
            type: "string"
        },

        {
            name: "ta1"      
        },
        {
            name: "ta2"     
        },

        {
            name: "dtaltvlprecovenda"
        //type: "date"
        }
        ]
    }
});