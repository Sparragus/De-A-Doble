(function(){
	
	var facebook = require('facebook');
	facebook.appid = 594467703974683;
 	facebook.permissions = ['publish_actions'];
	var shareOnFacebook = function(foto) {
		if ( !facebook.loggedIn ) {
			facebook.authorize();
		}
		else {
			facebook.requestWithGraphPath(
				'me/feed', 
				{message: "Hello, world!"}, 
		         "POST", 
		         function(e) {
				    if (e.success) {
				        alert("Success!  From FB: " + e.result);
				    } 
				    else {
				        if (e.error) {
				            alert(e.error);
				        } else {
				            alert("Unkown result");
				        }
				    }
				});
		}
	};
	
	var shareOnInstagram = function(foto) {
		
		//write to file using the object returned by getFile().
		//create file using getFile(). Name file with ending ****.ig
		//use documentviewer to open in instagram.
		//to write tags to the description check out http://developer.appcelerator.com/question/155950/adding-caption-for-instagram
		// instagram iphone hooks: http://instagram.com/developer/iphone-hooks/
		var filePath = Ti.Filesystem.applicationDataDirectory + '/temp/instagram.ig';
		var deADobleFile = Ti.Filesystem.getFile(filePath);
		deADobleFile.write(foto);
		
		var instagramViewer = Ti.UI.iOS.createDocumentViewer({
			url: 'instagram.ig',
			UTI: "com.instagram.photo",
			// annotation: {InstagramCaption: "#deadoble",}
		});
		
		instagramViewer.show();		
	};
	
	$.deADobleFoto.setImage(Alloy.Globals.deADobleFoto);
	
	$.shareFacebookButton.addEventListener('click', function(){
		// shareOnFacebook(Alloy.Globals.deADobleFoto);
	});
	
	$.shareInstagramButton.addEventListener('click', function(){
		shareOnInstagram(Alloy.Globals.deADobleFoto);
	});
	
})();