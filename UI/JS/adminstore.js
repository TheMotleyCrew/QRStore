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

function Logout()
{
	sessionStorage.clear();
	window.location.href='./Login.html';
}

$(document).ready(function () {
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