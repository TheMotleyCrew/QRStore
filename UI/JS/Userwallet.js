
function Logout()
{
	sessionStorage.clear();
	window.location.href='./Login.html';
}

function getWalletBalance(){

	username=sessionStorage.getItem('username');
	xhr1 = new XMLHttpRequest();
	xhr1.onreadystatechange = function()
	{
		if(xhr1.status==200 && xhr1.readyState==4)
		{
			document.getElementById('walletbalance').innerHTML=xhr1.responseText;
		}
	}
	xhr1.open('POST', '../../Backend/Scripts/GetWalletBalance.php', true);
	xhr1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr1.send('user='+sessionStorage.getItem('username'));
}
function addMoneyToWallet(){
	amountID=document.getElementById("addAmount");
	amount=amountID.value;
	if(amount=="") {
		amountID.setAttribute("style","border-color:red")
		return;
	}
	else{
		username=sessionStorage.getItem('username');
	
		sessionStorage.setItem('amount',amount);
		window.location.href="Paymentgateway.html";	
	}
}
function handleamount(input){
	if(input.value<1) input.value=1;
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
	
	getWalletBalance();
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