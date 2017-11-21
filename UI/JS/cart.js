function getCart() {

	var online =1;
	user_id = sessionStorage.getItem('uid');
	

	if(sessionStorage.getItem('cartMode')=='online'){
		online=1;
	}
	else{
		online=0;	
	}

	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = disp_products;
	xhr.open("GET", "http://localhost/QRStore/Backend/Scripts/cart.php?uid="+user_id+"&online="+online, true);
	xhr.send();
}

function disp_products() {
	if (xhr.readyState == 4 && xhr.status == 200) {

		var cart = JSON.parse(xhr.responseText);
		var cart_items = cart['products'];
		var count = cart['count'];
		var prod_list = document.getElementById('product_list');
		var product_template = document.getElementById('product_row');


		total = parseInt(0);

		for (var i = 0; i < count; i++) {
			var new_product_row = product_template.cloneNode(true);
			var prod_description = JSON.parse(cart_items[i]);

			new_product_row.querySelector('#prod_name').innerHTML = prod_description['name'];
			new_product_row.querySelector('#prod_price').innerHTML = prod_description['price'];
			new_product_row.querySelector('#seller_name').innerHTML = "( Seller: "+ prod_description['seller']+" )";
			new_product_row.querySelector('#qty').value = prod_description['qty'];
			new_product_row.querySelector('#prod_subTotal').innerHTML = prod_description['total'];
			new_product_row.setAttribute('id', prod_description['pid']);
			new_product_row.querySelector('#qty').onchange = function (j) { return function () { qtyChanged(j); }; }(prod_description['pid']);
			new_product_row.querySelector('#delete').onclick = function (j) { return function () { deleteItem(j); }; }(prod_description['pid']);

			total += parseInt(prod_description['total']);
			prod_list.appendChild(new_product_row);

		}

		if(count==0){
			document.getElementById('container').setAttribute('style','width:120%');
			document.getElementById('container').innerHTML = '<h4 style="color:#f0ad4e; font-weight:bold; word-wrap: break-word;margin-left: 15%">Shopping Cart is empty</h2>';
			document.getElementById('checkoutbutton').setAttribute('style','display:none; pointer-events: none;');
		}

		updateTotalDisp();
		product_template.outerHTML = "";
		delete product_template;
	}
}

function qtyChanged(pid) {

	var product = document.getElementById(pid);
	var prod_subTotal = product.querySelector('#prod_subTotal');
	var qty = product.querySelector('#qty').value
	total -= parseInt(prod_subTotal.innerHTML);
	var new_prod_subTotal = parseInt(qty) * parseInt(product.querySelector('#prod_price').innerHTML);
	prod_subTotal.innerHTML = new_prod_subTotal;
	total += new_prod_subTotal;
	updateTotalDisp();
}

function updateTotalDisp() {
	document.getElementById('total').innerHTML = "Total Rs. " + total;
	document.getElementById('total2').innerHTML = "Total Rs. " + total;
}

function deleteItem(pid) {

	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function (j) {return function () { updateView(j); }; }(pid);
	xhr.open('DELETE','http://localhost/QRStore/Backend/Scripts/cart.php',true);
	xhr.send("uid="+user_id+"&pid="+pid);
	
}

function updateView(pid){
	if(xhr.readyState == 4 ){
		var product = document.getElementById(pid);
		var prod_subTotal = product.querySelector('#prod_subTotal');
		total -= parseInt(prod_subTotal.innerHTML);
		updateTotalDisp();
	
		product.outerHTML = "";
		delete product;
	}
}

function updateCart() {
	var count = document.getElementById('product_list').rows.length;
	console.log('1');
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = disp;
	xhr.open('PUT', 'http://localhost/QRStore/Backend/Scripts/cart.php', true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.send("uid="+user_id+"&count="+count+"&products=" + JSON.stringify(getProducts()));
}

function disp() {
	if (xhr.readyState == 4 && xhr.status==200) {
		// window.location = 'http://localhost/QRStore/UI/HTML/checkout.html';

	}
}

function getProducts() {
	var cart = document.getElementById('product_list');
	var no_of_items = cart.rows.length;

	var items = [];

	for (var i = 0; i < no_of_items; i++) {
		items.push({});
		var curr_product = cart.rows[i];
		items[i]['pid'] = curr_product.getAttribute('id');
		items[i]['qty'] = curr_product.querySelector('#qty').value;

	}

	return items;
}


function Logout()
{
	sessionStorage.clear();
	window.location.href='./Login.html';
}

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
	
	getCart();
});

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