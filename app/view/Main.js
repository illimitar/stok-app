Ext.define('Illi.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'mainpanel',
   
    requires: [
    'Ext.TitleBar',
    'Ext.Video'
    ],
    
    config: {
        tabBarPosition: 'bottom',

        items: [
       
        {
            title: 'Início',
            iconCls: 'home',
            xtype: 'listaContainer'
        }
        
        ]
    }
});
