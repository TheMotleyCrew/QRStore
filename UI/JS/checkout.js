function availability()
{
	if(sessionStorage.getItem('cartMode')=='online')
		sid = 1;
	else
		sid = 2;
	xhr2 = new XMLHttpRequest();
	xhr2.onreadystatechange = function()
	{
		if(xhr2.status==200 && xhr2.readyState==4)
		{
			total = 0;
			document.getElementById('tablecontent').innerHTML='';
			purchaseflag = 0;
			myObj = JSON.parse(this.responseText);
			for(i=0;i<myObj.length;i++)
			{
				total += myObj[i]['price']*myObj[i]['qty'];
				ele = document.createElement('tr');
				if(parseInt(myObj[i]['qty'])<=parseInt(myObj[i]['totalqty']))
				{
					ele.innerHTML='<td></td><td>'+myObj[i]['pname']+'<br>Qty: '+myObj[i]['qty']+'<br>Rate: '+myObj[i]['price']+'<br><p style="color:green; font-weight:bold">Available</p></td><td></td>';
					purchaseflag++;
				}
				else if(parseInt(myObj[i]['totalqty'])==0)
				{
					ele.innerHTML='<td></td><td>'+myObj[i]['pname']+'<br>Qty: '+myObj[i]['qty']+'<br>Rate: '+myObj[i]['price']+'<br><p style="color:red; font-weight:bold">Product Out of Stock</p></td><td></td>';
				}
				else
				{
					ele.innerHTML='<td></td><td>'+myObj[i]['pname']+'<br>Qty: '+myObj[i]['qty']+'<br>Rate: '+myObj[i]['price']+'<br><p style="color:red; font-weight:bold">Stocks Lesser than in Cart</p></td><td></td>';
				}
				document.getElementById('tablecontent').appendChild(ele);
			}
			if(purchaseflag==myObj.length)
				document.getElementById('pay').setAttribute('style','pointer-events:auto;');
			else
				document.getElementById('pay').setAttribute('style','pointer-events:none;');
			ele = document.createElement('tr');
			ele.innerHTML='<td></td><td><p style="color:#f0ad4e; font-weight:bold; word-wrap: break-word;font-size: 20px">Total: '+total+' </p></td><td></td>';
			document.getElementById('tablecontent').appendChild(ele);
		}
	}
	xhr2.open('POST', '../../Backend/Scripts/checkout.php', true);
	xhr2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr2.send("uid="+sessionStorage.getItem('uid')+"&sid="+sid);
}

function purchase()
{
	if(sessionStorage.getItem('cartMode')=='online')
		sid = 1;
	else
		sid = 2;
	xhr3 = new XMLHttpRequest();
	xhr3.onreadystatechange = function()
	{
		if(xhr3.status==200 && xhr3.readyState==4)
		{
			if(xhr3.responseText.localeCompare('True')==0)
			{
				window.location.href='./ListProducts.html';
			}
			else if(xhr3.responseText.localeCompare('False')==0)
			{
				availability();
			}
			else if(xhr3.responseText=='Cash')
			{
				console.log('hi');
				window.location.href='./Userwallet.html';
			}
		}
	}
	xhr3.open('POST', '../../Backend/Scripts/Purchase.php', true);
	xhr3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr3.send("uid="+sessionStorage.getItem('uid')+"&sid="+sid);
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
	
	availability();
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