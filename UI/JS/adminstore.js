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
	xhr1 = new XMLHttpRequest();
	xhr1.onreadystatechange = function()
	{
		if(xhr1.status==200 && xhr1.readyState==4)
		{
			document.getElementById('adminusername').innerHTML=xhr1.responseText;
		}
	}
	xhr1.open('POST', '../../Backend/Scripts/GetUsername.php', true);
	xhr1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr1.send('user='+username);
	getProducts();
});

emptyflag = 1;

function getProducts()
{
	document.getElementById('tablecontent').innerHTML='';
	xhr2 = new XMLHttpRequest();
	xhr2.onreadystatechange = function()
	{
		if(xhr2.status==200 && xhr2.readyState==4)
		{
			myObj = JSON.parse(this.responseText);
			for(i=0;(i<myObj.length && i<9);i++)
			{
				emptyflag = 0;
				ele = document.createElement('tr');
				ele.setAttribute("id", myObj[i]['pid']);
				ele.innerHTML = '<td></td><td style="word-wrap:break-word;"><table width=100% class="table table-borderless"><th style="word-wrap:break-word;" colspan=2>'+myObj[i]['pname']+'</th><tr><td style="word-wrap:break-word;"><b>Price: </b>'+myObj[i]['price']+'</td><td style="word-wrap:break-word;"><b>Qty: </b>'+myObj[i]['qty']+'</td></tr><tr><td style="word-wrap:break-word;" colspan=2><b>Category: </b>'+myObj[i]['category']+'</td></tr><tr><td style="word-wrap:break-word;" colspan=2><b>Store: </b>'+myObj[i]['sname']+'</td></tr><tr><td><button onclick="EditProducts('+myObj[i]['pid']+')" type="button" class="btn btn-info sidebar"><span class="glyphicon glyphicon-pencil"></span> Edit</button></td><td><button onclick="DeleteProducts('+myObj[i]['pid']+')" type="button" class="btn btn-danger sidebar"><span class="glyphicon glyphicon-trash"></span> Delete</button></td></tr></table></td><td></td>'
				document.getElementById('tablecontent').appendChild(ele);
			}
			if(myObj.length>9)
			{
				ele=document.createElement('tr');
				ele.setAttribute("id", "pagination");
				ele.innerHTML = '<td></td>';
				ele.innerHTML += '<td style="text-align:right;" class="sidebar"><button onclick="NextProducts(1)" type="button" class="btn btn-primary sidebar"><span class="glyphicon glyphicon-chevron-right"></span></button></td>';
				ele.innerHTML += '<td></td>';
				document.getElementById('tablecontent').appendChild(ele);
			}
			if(emptyflag == 1)
			{
				ele = document.createElement('tr');
				ele.innerHTML = '<td></td><td style="color:#f0ad4e; font-weight:bold; word-wrap: break-word;">No Products Found</td>';
				document.getElementById('tablecontent').appendChild(ele);
			}
		}
	}
	xhr2.open('POST', '../../Backend/Scripts/GetProducts.php', true);
	xhr2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr2.send('uid=0');
}

function NextProducts(count)
{
	document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
	document.getElementById('tablecontent').innerHTML='';
	for(i=count*9;(i<myObj.length && i<((count+1)*9));i++)
	{
		ele = document.createElement('tr');
		ele.setAttribute("id", myObj[i]['pid']);
		ele.innerHTML = '<td></td><td style="word-wrap:break-word;"><table width=100% class="table table-borderless"><th style="word-wrap:break-word;" colspan=2>'+myObj[i]['pname']+'</th><tr><td style="word-wrap:break-word;"><b>Price: </b>'+myObj[i]['price']+'</td><td style="word-wrap:break-word;"><b>Qty: </b>'+myObj[i]['qty']+'</td></tr><tr><td style="word-wrap:break-word;" colspan=2><b>Category: </b>'+myObj[i]['category']+'</td></tr><tr><td style="word-wrap:break-word;" colspan=2><b>Store: </b>'+myObj[i]['sname']+'</td></tr><tr><td><button onclick="EditProducts('+myObj[i]['pid']+')" type="button" class="btn btn-info sidebar"><span class="glyphicon glyphicon-pencil"></span> Edit</button></td><td><button onclick="DeleteProducts('+myObj[i]['pid']+')" type="button" class="btn btn-danger sidebar"><span class="glyphicon glyphicon-trash"></span> Delete</button></td></tr></table></td><td></td>'
		document.getElementById('tablecontent').appendChild(ele);
	}
	if(myObj.length>(count+1)*9 && count>0)
	{
		ele=document.createElement('tr');
		ele.setAttribute("id", "pagination");
		ele.innerHTML = '<td></td>';
		ele.innerHTML += '<td style="text-align:right;" class="sidebar"><button onclick="PreviousProducts('+(count+1)+')" type="button" class="btn btn-primary sidebar"><span class="glyphicon glyphicon-chevron-left"></span></button>&ensp;<button onclick="NextProducts('+(count+1)+')" type="button" class="btn btn-primary sidebar"><span class="glyphicon glyphicon-chevron-right"></span></button></td>';
		ele.innerHTML += '<td></td>';
		document.getElementById('tablecontent').appendChild(ele);
	}
	else if(count>0)
	{
		ele=document.createElement('tr');
		ele.setAttribute("id", "pagination");
		ele.innerHTML = '<td></td>';
		ele.innerHTML += '<td style="text-align:right;" class="sidebar"><button onclick="PreviousProducts('+(count+1)+')" type="button" class="btn btn-primary sidebar"><span class="glyphicon glyphicon-chevron-left"></span></button></td>';
		ele.innerHTML += '<td></td>';
		document.getElementById('tablecontent').appendChild(ele);
	}
	else if(myObj.length>(count+1)*9)
	{
		ele=document.createElement('tr');
		ele.setAttribute("id", "pagination");
		ele.innerHTML = '<td></td>';
		ele.innerHTML += '<td></td>';
		ele.innerHTML += '<td style="text-align:right;" class="sidebar"><button onclick="NextProducts('+(count+1)+')" type="button" class="btn btn-primary sidebar"><span class="glyphicon glyphicon-chevron-right"></span></button></td>';
		document.getElementById('tablecontent').appendChild(ele);
	}
	
}

function PreviousProducts(count)
{
	document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
	document.getElementById('tablecontent').innerHTML='';
	for(i=(count-2)*9;(i<myObj.length && i<((count-1)*9));i++)
	{
		ele = document.createElement('tr');
		ele.setAttribute("id", myObj[i]['pid']);
		ele.innerHTML = '<td></td><td style="word-wrap:break-word;"><table width=100% class="table table-borderless"><th style="word-wrap:break-word;" colspan=2>'+myObj[i]['pname']+'</th><tr><td style="word-wrap:break-word;"><b>Price: </b>'+myObj[i]['price']+'</td><td style="word-wrap:break-word;"><b>Qty: </b>'+myObj[i]['qty']+'</td></tr><tr><td style="word-wrap:break-word;" colspan=2><b>Category: </b>'+myObj[i]['category']+'</td></tr><tr><td style="word-wrap:break-word;" colspan=2><b>Store: </b>'+myObj[i]['sname']+'</td></tr><tr><td><button onclick="EditProducts('+myObj[i]['pid']+')" type="button" class="btn btn-info sidebar"><span class="glyphicon glyphicon-pencil"></span> Edit</button></td><td><button onclick="DeleteProducts('+myObj[i]['pid']+')" type="button" class="btn btn-danger sidebar"><span class="glyphicon glyphicon-trash"></span> Delete</button></td></tr></table></td><td></td>'
		document.getElementById('tablecontent').appendChild(ele);
	}
	if(myObj.length>(count-1)*9 && (count-2)>0)
	{
		ele=document.createElement('tr');
		ele.setAttribute("id", "pagination");
		ele.innerHTML = '<td></td>';
		ele.innerHTML += '<td style="text-align:right;" class="sidebar"><button onclick="PreviousProducts('+(count-1)+')" type="button" class="btn btn-primary sidebar"><span class="glyphicon glyphicon-chevron-left"></span></button>&ensp;<button onclick="NextProducts('+(count-1)+')" type="button" class="btn btn-primary sidebar"><span class="glyphicon glyphicon-chevron-right"></span></button></td>';
		ele.innerHTML += '<td></td>';
		document.getElementById('tablecontent').appendChild(ele);
	}
	else if((count-2)>0)
	{
		ele=document.createElement('tr');
		ele.setAttribute("id", "pagination");
		ele.innerHTML = '<td></td>';
		ele.innerHTML += '<td style="text-align:right;" class="sidebar"><button onclick="PreviousProducts('+(count-1)+')" type="button" class="btn btn-primary sidebar"><span class="glyphicon glyphicon-chevron-left"></span></button></td>';
		ele.innerHTML += '<td></td>';
		document.getElementById('tablecontent').appendChild(ele);
	}
	else if(myObj.length>(count-1)*9)
	{
		ele=document.createElement('tr');
		ele.setAttribute("id", "pagination");
		ele.innerHTML = '<td></td>';
		ele.innerHTML += '<td style="text-align:right;" class="sidebar"><button onclick="NextProducts('+(count-1)+')" type="button" class="btn btn-primary sidebar"><span class="glyphicon glyphicon-chevron-right"></span></button></td>';
		ele.innerHTML += '<td></td>';
		document.getElementById('tablecontent').appendChild(ele);
	}
	
}

function DeleteProducts(pid)
{
	xhr3 = new XMLHttpRequest();
	xhr3.onreadystatechange = function()
	{
		if(xhr3.status==200 && xhr3.readyState==4)
		{
			document.getElementById('tablecontent').innerHTML='';
			getProducts();
		}
	}
	xhr3.open('POST', '../../Backend/Scripts/DeleteProducts.php', true);
	xhr3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr3.send('pid='+pid);
}

function addProduct()
{
	window.location.href="addAdminProducts.html"
}

function EditProducts(pid)
{
	sessionStorage.setItem('pid',pid)
	window.location.href="editAdminProducts.html"
}