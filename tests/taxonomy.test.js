/**
 * @author Administrator
 */
var assert = require('assert'),
    childProcess = require('child_process'),
    http = require('http'),
    path = require('path'),
    sys = require('sys'),
    cwd = process.cwd(),
    fs = require('fs'),
    tax = require('../lib/taxonomy');
    

/*
var sections = {};

*/
exports['test name'] = function(){
    assert.equal(tax.moduleName(), "taxonomy");
};

var masterTerms = ['News', 'Sports', 'Opinion', 'Recess', 'Towerview'];

exports['test insert and get'] = function() {
	var expectedObject = {name: null, parent: null, children: []};
	
	// insert and fetch master terms
	for (var i = 0; i < masterTerms.length; i++) {
		expectedObject.name = masterTerms[i];
		assert.eql(tax.insertTerm(masterTerms[i]), expectedObject);
		assert.eql(tax.fetchTerm(masterTerms[i]), expectedObject);
	}
};

exports['test duplicate insert'] = function() {
	for (var i = 0; i < masterTerms.length; i++) {
		assert.equal(tax.insertTerm(masterTerms[0]), false);
	}
};

exports['test child term insert'] = function() {
	var name = 'Local National';
	var parent = 'News';
	var expectedParent = {name: parent, parent: null, children: [name]};
	var expectedChild = {name: name, parent: parent, children: []};
	
	assert.eql(tax.insertTerm(name, parent), expectedChild);
	assert.eql(tax.fetchTerm(parent), expectedParent);
	
	var name2 = 'University';
	var parent2 = 'News';
	var expectedParent2 = {name: parent2, parent: null, children: [name, name2]};
	var expectedChild2 = {name: name2, parent: parent2, children: []};
	
	assert.eql(tax.insertTerm(name2, parent2), expectedChild2);
	assert.eql(tax.fetchTerm(parent2), expectedParent2);
	
	// insert child of child
	var child_level2 = 'Arts';
	var parent_level2 = 'Local National';
	var expectedParent_level2 = {name: parent_level2, parent: "News", children: [child_level2]};
	var expectedChild_level2 = {name: child_level2, parent: parent_level2, children: []};
	assert.eql(tax.insertTerm(child_level2, parent_level2), expectedChild_level2);
	assert.eql(tax.fetchTerm(parent_level2), expectedParent_level2);
};