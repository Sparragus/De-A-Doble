
(function(){
	
	$.takePictureButton.addEventListener("click", function(e) {
		var cameraWindow = Alloy.createController('camera').getView();
		$.navwin.openWindow(cameraWindow);
	});
	
	var setup = function() {
		Alloy.Globals.navwin = $.navwin;
		$.navwin.open();
	};
	
	setup();
	
})();

