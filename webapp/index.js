sap.ui.define([
	"sap/ui/core/mvc/XMLView"
], (XMLView) => {
	"use strict";

	XMLView.create({
		viewName: "desafio.brgaap.view.App"
	}).then((oView) => oView.placeAt("content"));
});
