Ext.define("Illi.store.Sqlite", {
    extend: 'Ext.data.Store',
    requires: ["Illi.model.Produto"],
    config: {
        storeId:'illiLocal',
        model: "Illi.model.Produto",
        pageSize: 20,
        proxy: {
            type: 'localstorage',
            id:'illiLocal',
            reader: {
                type: 'json'
            }   
        }
    //autoLoad: true
    }
});