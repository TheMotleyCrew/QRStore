//TODO
// check for offline stores - sellers shouldn't be displayed

$('#myModal').on('show', function() {
    var tit = $('.confirm-delete').data('title');

    $('#myModal .modal-body p').html("Desea eliminar al usuario " + '<b>' + tit +'</b>' + ' ?');
    var id = $(this).data('id'),
    removeBtn = $(this).find('.danger');
})

$('.confirm-delete').on('click', function(e) {
    e.preventDefault();

    var id = $(this).data('id');
    $('#myModal').data('id', id).modal('show');
});

$('#btnYes').click(function() {
    // handle deletion here
    var id = $('#myModal').data('id');
    $('[data-id='+id+']').parents('tr').remove();
    $('#myModal').modal('hide');
    
});

$(document).ready(function () {
	$("#sidebar").niceScroll({
		cursorcolor: '#53619d',
		cursorwidth: 4,
		cursorborder: 'none'
	});

	$('#dismiss, .overlay').on('click', function () {
		$('#sidebar').removeClass('active');
		$('.overlay').fadeOut();
	});

	$('#sidebarCollapse').on('click', function () {
		$('#sidebar').addClass('active');
		$('.overlay').fadeIn();
		$('.collapse.in').toggleClass('in');
		$('a[aria-expanded=true]').attr('aria-expanded', 'false');
	});
	
});

$(document).ready(function () 
{
	username=sessionStorage.getItem('username');
	xhr6 = new XMLHttpRequest();
	xhr6.onreadystatechange = function()
	{
		if(xhr6.status==200 && xhr6.readyState==4)
		{
			document.getElementById('adminusername').innerHTML=xhr6.responseText;
		}
	}
	xhr6.open('POST', '../../Backend/Scripts/GetUsername.php', true);
	xhr6.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr6.send('user='+username);
	
	init();
});

function Logout()
{
	sessionStorage.clear();
	window.location.href='./Login.html';
}


function init() {
    //sessionStorage.setItem('viewProductMode','online');
    if(sessionStorage.getItem('viewProductMode')=='online'){
        //sessionStorage.setItem('pname','SmartPhone');
        var pname = sessionStorage.getItem('pname');
        online = 1;
    }
    else{
        //sessionStorage.setItem('pid','17');
        var pid = sessionStorage.getItem('pid');
        online = 0;
        var elem = document.getElementById('reco');
        elem.parentNode.removeChild(elem);
    }
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = displayProduct;
    if(online==1){
       
        xhrReco = new XMLHttpRequest();
        xhrReco.onreadystatechange = dispReco;
        xhrReco.open('GET','http://localhost/QRStore/Backend/Scripts/Recommendation_system/getSuggestions.php?pname='+sessionStorage.getItem('pname'),true);
        xhrReco.send();

        xhr.open("GET", "http://localhost/QRStore/Backend/Scripts/ViewProduct.php?pname="+pname+"&online=1",true);
    }
    else{
        xhr.open("GET", "http://localhost/QRStore/Backend/Scripts/ViewProduct.php?pid="+pid+"&online=0",true);
    }
    xhr.send() ;
}

function displayProduct() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        // console.log(xhr.responseText);
        response = JSON.parse(xhr.responseText);
        document.getElementById("product-title").innerHTML = response['pname'];

        var desc = response['desc'];
        var product_desc = document.getElementById('product-desc');
        if(!desc){
            product_desc.innerHTML = "No decription available";
        }
        else{
            product_desc.innerHTML= desc;
        }


        var count = response['count'];

        if(count > 0){
            var stock = document.getElementById('product-stock');
            stock.innerHTML = "In Stock";
            // var products = JSON.parse(response['products']);
            setQty(JSON.parse(response['products'][0])['qty']);
            setPrice(JSON.parse(response['products'][0])['price']) ;
            
            if(online==1){
                var seller_list = document.createElement("select");
                seller_list.onchange = function(e){displayProductInfo(e.target.value);}
                seller_list.setAttribute('class','form-control text-center');
                seller_list.setAttribute('id','seller-chosen');
            
            
                for(var i=0;i<count;i++){

                    var product_info =  JSON.parse(response['products'][i]);
                    var op = new Option();
                    op.value = product_info['pid'];
                    op.text = product_info['sname'] + ' sells at $' + product_info['price'];
                    seller_list.options.add(op);
                }
                var seller_heading = "More sellers: ";                
            }

             else{
                var seller_list = document.createTextNode(JSON.parse(response['products'][0])['sname']);
                var seller_heading = "Sold At: ";
             }

            var sellers = document.getElementById('sellers');
            sellers.appendChild(document.createTextNode(seller_heading));
            sellers.appendChild(document.createElement('br'));
            sellers.appendChild(document.createElement('br'));            
            sellers.appendChild(seller_list);
        }
        else{
            var stock = document.getElementById('product-stock');
            stock.innerHTML = "Out of Stock";
            stock.style.color = "red";

            document.getElementById("add-button").disabled= true;
        }

    }
}

function displayProductInfo(pid){
    var count = response['count'];

    for(var i=0;i<count;i++){
        var product_info =  JSON.parse(response['products'][i]);

        if(product_info['pid']==pid){
            setPrice(product_info['price']);
            setQty(product_info['qty']);
        }
    }
}

function setPrice(price){
    document.getElementById('product-price').innerHTML = "$"+price;
}

function setQty(qty){
    document.getElementById('qty-available').innerHTML = qty+ " available with this seller";
}

function addToCart(){
    if(online==1){
        var pid = document.getElementById('seller-chosen').value;
    }
    else{
        var pid = sessionStorage.getItem('pid');
    }
    var uid = sessionStorage.getItem('uid');
    xhr = new XMLHttpRequest();
	xhr.onreadystatechange = addConfirm;
	xhr.open('POST', 'http://localhost/QRStore/Backend/Scripts/cart.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send('qty=1&uid='+uid+'&pid='+pid);
}

function addConfirm(){
    if(xhr.readyState==4 && xhr.status==200){
        var cart_prompt = document.getElementById('cart-prompt');
        cart_prompt.innerHTML = xhr.responseText;
        console.log(xhr.responseText);
        cart_prompt.style.display ="block";
        
    }

    else if(xhr.readyState==4 && xhr.status!=200){
        var cart_prompt = document.getElementById('cart-prompt');
        cart_prompt.innerHTML =  xhr.responseText;
    }

    setTimeout(removeAlert,1200);
}

function removeAlert(){
    var cart_prompt = document.getElementById('cart-prompt');
    cart_prompt.innerHTML = "";
    cart_prompt.style.display = "none";
}

function dispReco(){
    if (xhrReco.readyState == 4 && xhrReco.status == 200) {
        console.log(xhrReco.responseText)
        var response = JSON.parse(xhrReco.responseText);
        var count = response['count'];
        
        if(count>0){
            var first_reco = JSON.parse(response['products'][0]);
            console.log(first_reco);
            var reco1 = document.getElementById('reco1');
            reco1.removeChild(reco1.firstChild);
            reco1.innerHTML = "<img src='../Assets/placeholder.png' width='100%'/>";
            reco1.innerHTML += '<h4>'+ first_reco['pname']+'</h4>'
        }
        if(count==2){
            var second_reco = JSON.parse(response['products'][1]);
            var reco2 = document.getElementById('reco2');
            reco2.removeChild(reco2.firstChild);
            reco2.innerHTML = "<img src='../Assets/placeholder.png' width='100%'/>";
            reco2.innerHTML += '<h4>'+ second_reco['pname']+'</h4>'
        }
        
        if(count==0){
            var reco1 = document.getElementById('reco1');
            var reco2 = document.getElementById('reco2');
            reco1.innerHTML = "<h4>No more suggestions</h4>";
            reco2.innerHTML = "<h4>No more suggestions</h4>";
        }

        if(count==1){
            var reco2 = document.getElementById('reco2');
            // reco2.innerHTML = "<img src='../Assets/placeholder.png'/>"; 
            reco2.innerHTML += "<h4>No more suggestions</h4>";
        }
    }
}