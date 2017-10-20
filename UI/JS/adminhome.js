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
	
	populatePending();
});

$(document).ready(function ()
{
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
		if(xhr.status==200 && xhr.readyState==4)
		{
			
		}
	}
	xhr.open('POST', '../../Backend/Scripts/GetPending.php', true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send();
});

function Logout()
{
	sessionStorage.clear();
	window.location.href='./Login.html';
}

$(document).ready(function () 
{
	username=sessionStorage.getItem('username');
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
		if(xhr.status==200 && xhr.readyState==4)
		{
			document.getElementById('adminusername').innerHTML=xhr.responseText;
		}
	}
	xhr.open('POST', '../../Backend/Scripts/GetUsername.php', true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send('user='+username);
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