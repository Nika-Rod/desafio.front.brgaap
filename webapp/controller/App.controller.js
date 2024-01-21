sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/Text",
 ], (Controller, JSONModel, Dialog, Button, Text) => {
	"use strict";
 
	return Controller.extend("desafio.brgaap.controller.App", {
		_pQuickView: null,

	   onInit() {
			fetch('https://jsonplaceholder.typicode.com/todos')
				.then(response => response.json())
				.then(data => {
					var oModel = new sap.ui.model.json.JSONModel({
						apiData: data
					});

					this.getView().setModel(oModel, "apiModel");
				})
			.catch(error => {
				console.error('Erro ao obter dados da API:', error);
			});
	   },

	   onCheckBoxPress: function (oEvent) {
			var oCheckBox = oEvent.getSource();
			var oBindingContext = oCheckBox.getBindingContext("apiModel");
			var sPath = oBindingContext.getPath();
			var bCompleted = oBindingContext.getProperty("completed");
		
			oBindingContext.getModel().setProperty(sPath + "/completed", !bCompleted);
		
			var userId = oBindingContext.getProperty("userId");
			if (userId === 1) { 
				oCheckBox.setSelected(bCompleted);
			}
		},
	

	   onDialogWithSizePress: function (oEvent) {
		var oSelectedItem = oEvent.getSource().getBindingContext("apiModel").getObject();
	
		if (!this.oFixedSizeDialog) {
			this.oFixedSizeDialog = new Dialog({
				title: "Informações da Notas Fiscais",
				content: new Text({
					text: ""
				}).addStyleClass("sapUiSmallMargin"),
				contentWidth: "300px",
				contentHeight: "115px",
				endButton: new Button({
					text: "Fechar",
					press: function () {
						this.oFixedSizeDialog.close();
					}.bind(this)
				})
			});
	
			this.getView().addDependent(this.oFixedSizeDialog);
		}
	
		var oText = this.oFixedSizeDialog.getContent()[0];
		oText.setText("User ID: " + oSelectedItem.userId + "\n" + "ID: " + oSelectedItem.id + "\n" + "Nome: " + oSelectedItem.title + "\n" +  "Completado: " + oSelectedItem.completed);
	
		this.oFixedSizeDialog.open();
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