sap.ui.define([
	"sap/ui/core/mvc/Controller"
 ], (Controller) => {
	"use strict";
 
	return Controller.extend("ui5.walkthrough.controller.App", {
	   onShowHello() {
		  // show a native JavaScript alert
		  alert("Hello World");
	   },

	   onInit() {
		fetch('https://jsonplaceholder.typicode.com/todos').then(response => response.json())
        .then(data => {
			var oModel = new sap.ui.model.json.JSONModel({
                apiData: data
            });

			this.getView().setModel(oModel, "apiModel");
			console.log(data)
        })
        .catch(error => {
            console.error('Erro ao obter dados da API:', error);
        });
	   },

	   onSearch: function(oEvent) {

		var nameQuery = oEvent.getSource().getValue();
		var oTable = this.getView().byId("tableId")

		if (oTable) {
        var aFilters = [];
        
        if (nameQuery && nameQuery.length > 0) {

            var oFilter = new sap.ui.model.Filter("title", sap.ui.model.FilterOperator.Contains, nameQuery);
            aFilters.push(oFilter);
        }
        oTable.getBinding("rows").filter(aFilters, sap.ui.model.FilterType.Application);
    }
		
	   }
	});
 });