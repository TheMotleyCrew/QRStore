var togglep;
var pass;
function setup(){
	togglep=true;
	var ed=document.getElementById("editinfo");
	var ep=document.getElementById("chngpass");
	ed.addEventListener("click",toggleInput);
	ep.addEventListener("click",togglepasswordblock);
	getPersonalInfo();
}
function getPersonalInfo(){
	
	username=sessionStorage.getItem("username");
	xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(xhr.status=200 && xhr.readyState==4){
			data=xhr.responseText.split("|");

				document.getElementById('fullname').value=data[0];
				document.getElementById('email').value=data[2];
				document.getElementById('address').value=data[3];
				document.getElementById('phone').value=data[4];
				
				pass=data[1];
		}
	};
	xhr.open('POST','../../Backend/Scripts/getUserInfo.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.send('user='+username);
	//document.getElementById

}
function toggleInput(){

	fullname=document.getElementById("fullname");
	email=document.getElementById("email");
	address=document.getElementById("address");
	phone=document.getElementById("phone");
	toggle=fullname.disabled ==false? toggleDis(fullname,address,phone,email) : toggleEn(fullname,address,phone,email);

}
function togglepasswordblock(){

	block=document.getElementById("passwordblock");
	chng=document.getElementById("chngpass");
	togglep?showpass(block,chng):hidepass(block,chng);
	
	togglep=!togglep;

}
function showpass(block,chng){
	block.style.display="block";
	chng.innerHTML="Cancel";
}
function hidepass(block,chng){
	block.style.display="none";
	chng.innerHTML="Change";
}
function toggleDis(fullname,address,phone,email){
	document.getElementById("editinfo").innerHTML="Edit";
	fullname.disabled=true;
	email.disabled=true;
	address.disabled=true;
	phone.disabled=true;
	getPersonalInfo();
	document.getElementById("saveinfo").style.display="none";

}
function toggleEn(fullname,address,phone,email){
	document.getElementById("editinfo").innerHTML="Cancel";
	fullname.disabled=false;
	email.disabled=false;
	phone.disabled=false;
	address.disabled=false;
	document.getElementById("saveinfo").style.display="block";
}
function updateinfo(){
	un=sessionStorage.getItem("username");
	fullname=document.getElementById("fullname").value;
	email=document.getElementById("email").value;
	address=document.getElementById("address").value;
	phone=document.getElementById("phone").value;
	xhr1=new XMLHttpRequest();
	xhr1.onreadystatechange=function(){
		if(xhr1.status=200 && xhr1.readyState==4){
			if(xhr1.responseText==1){
					toggleInput();
				}
		}
	};
	xhr1.open('POST','../../Backend/Scripts/updateUserInfo.php',true);
	xhr1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr1.send('user='+un+'&name='+fullname+"&phone="+phone+"&email="+email+"&address="+address+"&toggle=1");

}
function updatepass(){
	un=sessionStorage.getItem("username");
	oldpassword=document.getElementById("currpassword");
	newpassword=document.getElementById("newpassword");
	xhr2=new XMLHttpRequest();
	xhr2.onreadystatechange=function(){
		if(xhr2.status=200 && xhr2.readyState==4){
			if(xhr2.responseText==1){
				newpassword.value="";
				togglepasswordblock();
			}
		}
	};
	xhr2.open('POST','../../Backend/Scripts/updateUserInfo.php',true);
	xhr2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr2.send('user='+un+'&password='+newpassword.value+"&toggle=2");
	
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
	
	setup();
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