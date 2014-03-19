(function(){

	var cropSquarePhoto = function(photo) {
		var h = 2448,
			w = 2448,
			x = 0,
			y = 368;
		
		var croppedPhoto = photo.imageAsCropped({
			height: h,
			width: w,
			x: x,
			y: y
		});
		
	    var resizedPhoto = croppedPhoto.imageAsResized(640, 640);
	 
		return resizedPhoto;
	};
	
	var deADoblePhoto = function(photo) {
			
		var container = Ti.UI.createView({
		});
		
		var background = Ti.UI.createImageView({
			image: photo,
			height: 640,
			width: 640,
			transform: Ti.UI.create2DMatrix().rotate(90)
		});
			
		var foreground = Ti.UI.createImageView({
			image: 'images/hands.png',
			height: 640,
			width: 640,	
		});
		
		
		container.add(background);
		container.add(foreground);
		
		var compositeImage = container.toImage();
			
		return compositeImage;
	};
	
	
	var editPhoto = function(photo) {
		var croppedPhoto = cropSquarePhoto(photo);
		var handsPhoto = deADoblePhoto(croppedPhoto);
		
		return handsPhoto;
	};
	
	var publishPhoto = function(photo) {
		Alloy.Globals.deADobleFoto = photo;
		var publish = Alloy.createController('publish').getView();
		Alloy.Globals.navwin.openWindow(publish);
	};

	var createCameraOverlay = function() {
		
		
		var cameraOverlay = Ti.UI.createView({
			height: Ti.UI.SIZE,
			width: Ti.UI.SIZE,
			top: 0,
			left: 0
		});
		
		var cameraOverlayImage = Ti.UI.createImageView({
			image: 'images/camera-overlay.png',
			height: Ti.UI.FILL,
			width: Ti.UI.FILL,
			top: 0,
			left: 0
		});
		
		var cameraCloseButton = Ti.UI.createButton({
			title: "Close",
			height: 40,
			width: Ti.UI.SIZE,
			top: 20,
			left: 20
		});
		
		cameraCloseButton.addEventListener('click', function() {
			Alloy.Globals.navwin.closeWindow(Ti.UI.currentWindow);
		});
		
		var cameraShutterButton = Ti.UI.createButton({
			backgroundImage: 'images/camera-button-normal.png',
			backgroundSelectedImage: 'images/camera-button-selected.png',
			height: 120,
			width: 235,
			top: 450,
			left: 50,
			zIndex: 1
		});
		
		cameraShutterButton.addEventListener('click', function(e) {
			Ti.Media.takePicture();
		});
		
		cameraOverlay.add(cameraOverlayImage);
		// cameraOverlay.add(cameraCloseButton);
		cameraOverlay.add(cameraShutterButton);
		
		return cameraOverlay;
		
	};

	var showCamera = function() {
    	Ti.Media.showCamera({
	    	animated: false,
	    	overlay: createCameraOverlay(),
	    	showControls: false,
	    	// saveToPhotoGallery: true,
	    	success: function(photo) {
	    		var editedPhoto = editPhoto(photo.media);
	    		publishPhoto(editedPhoto);
	    	},
	    	transform: Ti.UI.create2DMatrix().scale(1)
		});
	};
	
    setTimeout(showCamera, 500);
	
})();
