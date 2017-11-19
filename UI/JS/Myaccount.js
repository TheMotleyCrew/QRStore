var togglep;
var pass;
function setup(){
	togglep=true;
	var ed=document.getElementById("editinfo");
	var em=document.getElementById("editemail");
	var eph=document.getElementById("editphone");
	var ea=document.getElementById("editaddress");
	var ep=document.getElementById("chngpass");
	ed.addEventListener("click",toggleInput);
	ep.addEventListener("click",togglepasswordblock);
	ea.addEventListener("click",toggleAddress);
	em.addEventListener("click",toggleEmail);
	eph.addEventListener("click",togglePhone);
	getPersonalInfo();
}
function getPersonalInfo(){
	
	username=sessionStorage.getItem("username");
	document.getElementById('welcome').innerHTML=username;
	xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(xhr.status=200 && xhr.readyState==4){
			data=xhr.responseText.split("|");

				document.getElementById('fullname').value=data[0];
				document.getElementById('username').value=data[1];
				document.getElementById('email').value=data[5];
				document.getElementById('phone').value=data[6];
				document.getElementById('address').value=data[4];
				document.getElementById('bal').innerHTML=data[3];
				pass=data[2];
		}
	};
	xhr.open('POST','../../Backend/Scripts/getUserInfo.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.send('user='+username);
	//document.getElementById

}
function toggleInput(){

	fullname=document.getElementById("fullname");
	username=document.getElementById("username");
	toggle=fullname.disabled ==false? toggleDis(fullname,username) : toggleEn(fullname,username);

}
function toggleDis(fullname,username){
	document.getElementById("editinfo").innerHTML="Edit";
	fullname.disabled=true;
	username.disabled=true;
	getPersonalInfo();
	document.getElementById("saveinfo").style.display="none";

}
function toggleEn(fullname,username){
	document.getElementById("editinfo").innerHTML="Cancel";
	fullname.disabled=false;
	username.disabled=false;
	document.getElementById("saveinfo").style.display="block";
}
function toggleEmail(){

	email=document.getElementById("email");
	toggle=email.disabled ==false? emailDis(email) : emailEn(email);

}
function emailEn(email){
	document.getElementById("editemail").innerHTML="Cancel";
	email.disabled=false;
	document.getElementById("saveemail").style.display="block";
}
function emailDis(email){
	document.getElementById("editemail").innerHTML="Edit";
	email.disabled=true;
	getPersonalInfo();
	document.getElementById("saveemail").style.display="none";
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
function togglePhone(){
	phone=document.getElementById("phone");
	toggle=phone.disabled ==false? phoneDis(phone) : phoneEn(phone);

}
function phoneEn(phone){
	document.getElementById("editphone").innerHTML="Cancel";
	phone.disabled=false;
	document.getElementById("savephone").style.display="block";
}
function phoneDis(phone){
	document.getElementById("editphone").innerHTML="Edit";
	phone.disabled=true;
	getPersonalInfo();
	document.getElementById("savephone").style.display="none";
}
function toggleAddress(){
	address=document.getElementById("address");
	toggle=address.disabled ==false? addressDis(address) : addressEn(address);
}
function addressEn(address){
	document.getElementById("editaddress").innerHTML="Cancel";
	address.disabled=false;
	document.getElementById("saveaddress").style.display="block";
}
function addressDis(address){
	document.getElementById("editaddress").innerHTML="Edit";
	address.disabled=true;
	getPersonalInfo();
	document.getElementById("saveaddress").style.display="none";
}
function updateinfo(){
	un=sessionStorage.getItem("username");
	fullname=document.getElementById("fullname").value;
	username=document.getElementById("username").value;
	xhr1=new XMLHttpRequest();
	xhr1.onreadystatechange=function(){
		if(xhr1.status=200 && xhr1.readyState==4){
			if(xhr1.responseText==1){
					spn=document.getElementById("alrt");
					spn.className="alert alert-success";
					spn.innerHTML="Inforamation Successfully Updated";
					toggleInput();
				}
		}
	};
	xhr1.open('POST','../../Backend/Scripts/updateUserInfo.php',true);
	xhr1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr1.send('user='+un+'&name='+fullname+"&username="+username+"&toggle=1");

}
function updatepass(){
	un=sessionStorage.getItem("username");
	oldpassword=document.getElementById("currpassword");
	newpassword=document.getElementById("newpassword");
	repassword=document.getElementById("repassword");
	if(validatepass(oldpassword,newpassword,repassword)==true){
		xhr2=new XMLHttpRequest();
		xhr2.onreadystatechange=function(){
			if(xhr2.status=200 && xhr2.readyState==4){
				if(xhr2.responseText==1){
					spn=document.getElementById("alrt");
					spn.className="alert alert-success";
					spn.innerHTML="Password Successfully Updated";
					oldpassword.value="";
					newpassword.value="";
					repassword.value="";
					togglepasswordblock();
				}
			}
		};
		xhr2.open('POST','../../Backend/Scripts/updateUserInfo.php',true);
		xhr2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr2.send('user='+un+'&password='+newpassword.value+"&toggle=2");

	}

	
}
function validatepass(oldpassword,newpassword,repassword){
	spn=document.getElementById("alrt");
	if(pass!=oldpassword.value){
		
		spn.className="alert alert-danger";
		spn.innerHTML="Incorrect Current Password";
		oldpassword.value="";
		newpassword.value="";
		repassword.value="";
		return false;
	}
	else if(newpassword.value!=repassword.value){
		spn.className="alert alert-danger";
		spn.innerHTML="Password do not match."
		oldpassword.value="";
		newpassword.value="";
		repassword.value="";
		return false;
	}
	else return true;
}
function updateemail(){
	un=sessionStorage.getItem("username");
	email=document.getElementById("email").value;
	xhr1=new XMLHttpRequest();
	xhr1.onreadystatechange=function(){
		if(xhr1.status=200 && xhr1.readyState==4){
			if(xhr1.responseText==1){
					spn=document.getElementById("alrt");
					spn.className="alert alert-success";
					spn.innerHTML="Email Successfully Updated";
					toggleEmail();
				}
		}
	};
	xhr1.open('POST','../../Backend/Scripts/updateUserInfo.php',true);
	xhr1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr1.send('user='+un+'&email='+email+"&toggle=3");

}
function updatephone(){
	un=sessionStorage.getItem("username");
	phone=document.getElementById("phone").value;
	xhr1=new XMLHttpRequest();
	xhr1.onreadystatechange=function(){
		if(xhr1.status=200 && xhr1.readyState==4){
			if(xhr1.responseText==1){
					spn=document.getElementById("alrt");
					spn.className="alert alert-success";
					spn.innerHTML="Mobile Number Successfully Updated";
					togglePhone();
				}
		}
	};
	xhr1.open('POST','../../Backend/Scripts/updateUserInfo.php',true);
	xhr1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr1.send('user='+un+'&phone='+phone+"&toggle=4");

}
function updateaddress(){
	un=sessionStorage.getItem("username");
	address=document.getElementById("address").value;
	xhr1=new XMLHttpRequest();
	xhr1.onreadystatechange=function(){
		if(xhr1.status=200 && xhr1.readyState==4){
			if(xhr1.responseText==1){
					spn=document.getElementById("alrt");
					spn.className="alert alert-success";
					spn.innerHTML="Address Successfully Updated";
					toggleAddress();
				}
		}
	};
	xhr1.open('POST','../../Backend/Scripts/updateUserInfo.php',true);
	xhr1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr1.send('user='+un+'&address='+address+"&toggle=5");

}
function toggleggpass(ip){
	document.getElementById(ip).type=="password"? document.getElementById(ip).type="text": document.getElementById(ip).type="password";
}	
