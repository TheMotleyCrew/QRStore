function scanBarcode(){
	
	cordova.plugins.barcodeScanner.scan(
      function (result) {
          // alert("We got a barcode\n" +
                // "Result: " + result.text + "\n" +
                // "Format: " + result.format + "\n" +
                // "Cancelled: " + result.cancelled);
		if(!result.cancelled){
			sessionStorage.setItem('qrcancelled','no');
			var pid = result.text;
			// alert("Pid: "+pid);
			// alert("Cancelled: "+ result.cancelled);
			sessionStorage.setItem('pid',pid);
			sessionStorage.setItem('viewProductMode','offline');
			window.location.href="./UI/HTML/ViewProduct.html";
		}
		else{
			sessionStorage.setItem('qrcancelled','yes');
		}

      },
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          preferFrontCamera : false, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Place a qrcode inside the scan area", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS
      }
   );
}

// function addProduct(){
	// if(xhr.readyState==4 && xhr.status==200){
		// sessionStorage.setItem('pid',pid);
		// sessionStorage.setItem('viewProductMode','online');
		// window.location.href="ViewProduct.html";
	// }
// }

 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
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
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
