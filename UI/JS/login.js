flag = 1

function checkUser()
{
	user=document.getElementById('reguname').value;
	if(user.localeCompare('')==0 || user==null)
	{
		document.getElementById('errorbox').innerHTML='<center style="color: white; background-color: none"></center><br>';		
	}
	else
	{
		xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function()
		{
			if(this.readyState==4 && this.status==200)
			{
				if(this.responseText.localeCompare('False')==0)
				{
					document.getElementById('errorbox').innerHTML='<center style="color: white; background-color: red">Username Already Taken</center><br>';
					document.body.scrollTop = 0;
					flag = 0
				}
				else
				{	
					document.getElementById('errorbox').innerHTML='<center style="color: black; background-color: #99ff99">Username Available</center><br>';
					flag = 1
				}
			}
		};
		xhr.open('POST','../../Backend/Scripts/CheckUser.php',false);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send('user='+user);
	}
}

function signIn()
{
	user=document.getElementById('loginuname').value;
	pass=document.getElementById('loginpass').value;
	if(user.localeCompare('')==0 || user==null)
	{
		document.getElementById('errorbox').innerHTML='<center style="color: white; background-color: red">Enter Username</center><br>';		
		document.body.scrollTop = 0;
    
	}
	else
	{		
		xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function()
		{
			if(this.readyState==4 && this.status==200)
			{
				myObj = this.responseText.split(';');
				if(myObj[0].localeCompare('False')==0)
				{
					document.getElementById('errorbox').innerHTML='<center style="color: white; background-color: red">Wrong Username or Password</center><br>';
					document.body.scrollTop = 0;
    
				}
				if(myObj[0].localeCompare('Pending')==0)
				{
					document.getElementById('errorbox').innerHTML='<center style="color: white; background-color: #99ff99">Waiting for Admin approval</center><br>';
					document.body.scrollTop = 0;
    
				}
				else if(myObj[0].localeCompare('user')==0)
				{	
					sessionStorage.setItem("uid", myObj[1]);
					sessionStorage.setItem("username", user);
					sessionStorage.setItem("role", myObj[0]);
					document.location.href = './ListProducts.html';
				}
				else if(myObj[0].localeCompare('admin')==0)
				{	
					sessionStorage.setItem("uid", myObj[1]);
					sessionStorage.setItem("username", user);
					sessionStorage.setItem("role", myObj[0]);
					document.location.href = './AdminHome.html';
				}
				else if(myObj[0].localeCompare('retail')==0)
				{	
					sessionStorage.setItem("uid", myObj[1]);
					sessionStorage.setItem("username", user);
					sessionStorage.setItem("role", myObj[0]);
					document.location.href = './RetailHome.html';
				}
			}
		};
		xhr.open('POST','../../Backend/Scripts/Login.php',true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send('user='+user+'&pass='+pass);
	}
}

function signUp()
{
	if(flag==1)
	{	
		user=document.getElementById('reguname').value;
		pass=document.getElementById('regpass').value;
		name=document.getElementById('regname').value;
		role=document.getElementById('regrole').value;
		if(name.localeCompare('')==0 || name==null || user.localeCompare('')==0 || user==null)
		{
			document.getElementById('errorbox').innerHTML='<center style="color: white; background-color: red">Fill All Empty Fields</center><br>';		
			document.body.scrollTop = 0;
    
		}
		else
		{
			xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function()
			{
				if(this.readyState==4 && this.status==200)
				{
					if(this.responseText.localeCompare('False')==0)
					{
						document.getElementById('errorbox').innerHTML='<center style="color: white; background-color: red">Error in Registration</center><br>';
						document.body.scrollTop = 0;
    
					}
					else if(this.responseText.localeCompare('True')==0 && role.localeCompare('retail')==0)
					{	
						document.getElementById('errorbox').innerHTML='<center style="color: black; background-color: #99ff99">Waiting for Admin approval</center><br>';
						document.body.scrollTop = 0;
    
					}
					else if(this.responseText.localeCompare('True')==0 && role.localeCompare('user')==0)
					{	
						document.getElementById('errorbox').innerHTML='<center style="color: black; background-color: #99ff99">Registration successful. Proceed to LogIn</center><br>';
						document.body.scrollTop = 0;
    
					}
				}
			};
			xhr.open('POST','../../Backend/Scripts/Register.php',true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send('user='+user+'&pass='+pass+'&name='+name+'&role='+role);
		}
	}
}