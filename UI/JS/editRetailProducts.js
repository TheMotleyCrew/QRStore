function load()
{
	pid=sessionStorage.getItem('pid')
	xhr1 = new XMLHttpRequest();
	xhr1.onreadystatechange = function()
	{
		if(xhr1.status==200 && xhr1.readyState==4)
		{
			var response = JSON.parse(xhr1.responseText);
			pname=document.getElementById('pname').value=response[0]['pname'];
			price=document.getElementById('price').value=response[0]['price'];
			qty=document.getElementById('qty').value=response[0]['qty'];
			description=document.getElementById('description').value=response[0]['description'];
			category=document.getElementById('category').value=response[0]['category'];
		}
	}
	xhr1.open('POST', '../../Backend/Scripts/GetProductInfo.php', true);
	xhr1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr1.send("pid="+pid);
}

function editNew()
{
	pid=sessionStorage.getItem('pid')
	pname=document.getElementById('pname').value;
	price=document.getElementById('price').value;
	qty=document.getElementById('qty').value;
	description=document.getElementById('description').value;
	category=document.getElementById('category').value;
	
	xhr1 = new XMLHttpRequest();
	xhr1.onreadystatechange = function()
	{
		if(xhr1.status==200 && xhr1.readyState==4)
		{
			window.location.href="./RetailHome.html"
		}
	}
	xhr1.open('POST', '../../Backend/Scripts/UpdateProductInfo.php', true);
	xhr1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr1.send("uid="+sessionStorage.getItem('uid')+"&pname="+pname+"&qty="+qty+"&sid=1&category="+category+"&price="+price+"&description="+description+"&pid="+pid);
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
	
	load();
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