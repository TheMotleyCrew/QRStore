function populate(des,price,status){
	list=document.getElementById("myorder");
	table=document.createElement("table");
	table.className="table table-hover";
	// product_div=document.createElement("div");
	// product_div.className="container product row";
	// product_des=document.createElement("div");
	// product_price=document.createElement("div");
	// product_status=document.createElement("div");
	// product_des.className="col-md-6 description";
	// product_price.className="col-md-2 price";
	// product_status.className="col-md-4 status";
	// product_des.innerHTML=des;
	// product_price.innerHTML=price;
	// product_status.innerHTML=status;
	// product_div.appendChild(product_des);
	// product_div.appendChild(product_price);
	// product_div.appendChild(product_status);
	// list.appendChild(product_div);


}
function getOrders(){
	username=sessionStorage.getItem("username");
	xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200)
		{
			// data=xhr.responseText;
			// lines=data.split("\n");
			// for(var j=0;j<lines.length-1;j++){
			// 	prod=lines[j].split("|");
			// 	populate(prod[0],prod[1],prod[2]);
			// }
			// list=document.getElementById("myorder");
			// table=document.createElement("table");
			// table.className="table table-hover";
			if(xhr.responseText)
				document.getElementById("myorder").innerHTML =xhr.responseText;
			else
				document.getElementById("myorder").innerHTML = '<p style="color:#f0ad4e; margin-top:3%; font-weight:bold; word-wrap: break-word;">No Previous Purchases</p>';
		}
	}
	xhr.open('POST','../../Backend/Scripts/getOrders.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.send('user='+username);
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
	
	getOrders();
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