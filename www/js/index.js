/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var dontTpl = Handlebars.compile($("#dont-tpl").html());
var homeTpl = Handlebars.compile($("#home-tpl").html());

var app = {
	// Application Constructor
	initialize: function() {
		this.bindEvents();

        // Set up storage
        var self = this;
        this.store = new LocalStorageStore(function() {
        	//self.showAlert('Store Initialized', 'Info');
        });
        
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    
		this.renderHomeView();  		
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicity call 'app.receivedEvent(...);'
	createNotification: function() {
		app.showAlert('You clicked a button', "Wow");
	},
	onDeviceReady: function() {
		app.receivedEvent('deviceready');
	},
	// Update DOM on a Received Event
	receivedEvent: function(id) {
		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');

		console.log('Received Event: ' + id);
	},
	renderDontView: function() {
		$("#main").html(dontTpl());
	},
	renderHomeView: function() {
		$('#main').html(homeTpl());
	},  	
	showAlert: function (message, title) {
		if (navigator.notification) {
			navigator.notification.alert(message, null, title, 'OK');
		} else {
			alert(title ? (title + ": " + message) : message);
		}
	},
	update_accel: function (){
		console.log('Updating accelerometer');
		navigator.accelerometer.getCurrentAcceleration(this.update_accel_on_success, function(){alert("accelerometer update failed!")});
	},
	update_accel_on_success: function(acceleration){
    	//alert('Acceleration X: ' + acceleration.x + '\n' + 'Acceleration Y: ' + acceleration.y + '\n' +	'Acceleration Z: ' + acceleration.z + '\n' +  'Timestamp: ' + acceleration.timestamp + '\n');
    	$("#accel-x").html(acceleration.x);
    	$("#accel-y").html(acceleration.y);
    	$("#accel-z").html(acceleration.z);
    	$("#accel-time").html(acceleration.timestamp);
    	return false;
	}
};

$(window).load(function() {
	    $("#button-accel").on("click", function(){
	    	app.update_accel();
	    }); 
		//setTimeout("update_accel()", 3000);    
});
