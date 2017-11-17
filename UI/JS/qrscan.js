function scanQRCode(){
	
	cordova.plugins.barcodeScanner.scan(
      function (result) {
          // alert("We got a barcode\n" +
                // "Result: " + result.text + "\n" +
                // "Format: " + result.format + "\n" +
                // "Cancelled: " + result.cancelled);
				
        sessionStorage.setItem('pid',result.text);
        window.location.href = "../HTML/ViewProduct.html"
		// alert("Pid: "+pid);
		// xhr = new XMLHttpRequest();
		// xhr.onreadystatechange = addProduct;
		// xhr.open('POST', 'http://192.168.1.4:80/QRStore/Backend/Scripts/cart.php', true);
		// xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		// xhr.send('qty=1&uid=6&sid=0&pid='+pid); 
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