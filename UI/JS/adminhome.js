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

emptyflag = 1;

function getPending()
{
	xhr1 = new XMLHttpRequest();
	xhr1.onreadystatechange = function()
	{
		if(xhr1.status==200 && xhr1.readyState==4)
		{
			var myObj = JSON.parse(this.responseText);
			for(i=0;i<myObj.length;i++)
			{
				emptyflag = 0;
				ele = document.createElement('tr');
				ele.setAttribute("id", myObj[i]['username']);
				myObj[i]['username'] = "'"+myObj[i]['username']+"'";
				ele.innerHTML = '<td></td><td style="word-wrap: break-word;">'+myObj[i]['uname']+'<br><span style="position:relative; top:10px" class="label label-warning">Pending</span><br><br><button onclick="ConfirmPending('+myObj[i]['username']+')" type="button" class="btn btn-success sidebar"><span class="glyphicon glyphicon-ok"></span> Accept</button>&ensp;<button onclick="RejectPending('+myObj[i]['username']+')" type="button" class="btn btn-danger sidebar"><span class="glyphicon glyphicon-remove"></span> Reject</button></td><td></td>';
				document.getElementById('tablecontent').appendChild(ele);
			}
			getRetailers();
		}
	}
	xhr1.open('POST', '../../Backend/Scripts/GetPending.php', true);
	xhr1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr1.send();
}

function getRetailers()
{
	xhr2 = new XMLHttpRequest();
	xhr2.onreadystatechange = function()
	{
		if(xhr2.status==200 && xhr2.readyState==4)
		{
			var myObj = JSON.parse(this.responseText);
			for(i=0;i<myObj.length;i++)
			{
				emptyflag = 0;
				ele = document.createElement('tr');
				ele.setAttribute("id", myObj[i]['username']);
				myObj[i]['username'] = "'"+myObj[i]['username']+"'";
				ele.innerHTML = '<td></td><td style="word-wrap: break-word;">'+myObj[i]['uname']+'<br><span style="position:relative; top:10px" class="label label-success">Active</span><br><br><button onclick="DeleteRetailers('+myObj[i]['username']+')" type="button" class="btn btn-danger sidebar">Remove Retailer</button></td>';
				document.getElementById('tablecontent').appendChild(ele);
			}
			if(emptyflag == 1)
			{
				ele = document.createElement('tr');
				ele.innerHTML = '<td></td><td style="color:#f0ad4e; font-weight:bold; word-wrap: break-word;">No Retailers Found</td>';
				document.getElementById('tablecontent').appendChild(ele);
			}
		}
	}
	xhr2.open('POST', '../../Backend/Scripts/GetRetailers.php', true);
	xhr2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr2.send();
}

function Logout()
{
	sessionStorage.clear();
	window.location.href='./Login.html';
}

function ConfirmPending(user)
{
	xhr3 = new XMLHttpRequest();
	xhr3.onreadystatechange = function()
	{
		if(xhr3.status==200 && xhr3.readyState==4)
		{
			document.getElementById('tablecontent').innerHTML='';
			getPending();
		}
	}
	xhr3.open('POST', '../../Backend/Scripts/ConfirmPending.php', true);
	xhr3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr3.send('username='+user);
}

function RejectPending(user)
{
	xhr4 = new XMLHttpRequest();
	xhr4.onreadystatechange = function()
	{
		if(xhr4.status==200 && xhr4.readyState==4)
		{
			document.getElementById('tablecontent').innerHTML='';
			getPending();
		}
	}
	xhr4.open('POST', '../../Backend/Scripts/RejectPending.php', true);
	xhr4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr4.send('username='+user);
}

function DeleteRetailers(user)
{
	xhr5 = new XMLHttpRequest();
	xhr5.onreadystatechange = function()
	{
		if(xhr5.status==200 && xhr5.readyState==4)
		{
			document.getElementById('tablecontent').innerHTML='';
			getPending();
		}
	}
	xhr5.open('POST', '../../Backend/Scripts/DeleteRetailers.php', true);
	xhr5.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr5.send('username='+user);
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
	
	document.getElementById('tablecontent').innerHTML='';
	getPending();
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