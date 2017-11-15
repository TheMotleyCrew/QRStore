function populate(des,price,status){
	list=document.getElementById("myorder");
	table=document.createElement("table");
	table.className="table table-hover";
	// product_div=document.createElement("div");
	// product_div.className="container product row";
	// product_des=document.createElement("div");
	// product_price=document.createElement("div");
	// product_status=document.createElement("div");
	// product_des.className="col-md-6 description";
	// product_price.className="col-md-2 price";
	// product_status.className="col-md-4 status";
	// product_des.innerHTML=des;
	// product_price.innerHTML=price;
	// product_status.innerHTML=status;
	// product_div.appendChild(product_des);
	// product_div.appendChild(product_price);
	// product_div.appendChild(product_status);
	// list.appendChild(product_div);


}
function getOrders(){
	username=sessionStorage.getItem("username");
	xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200)
		{
			// data=xhr.responseText;
			// lines=data.split("\n");
			// for(var j=0;j<lines.length-1;j++){
			// 	prod=lines[j].split("|");
			// 	populate(prod[0],prod[1],prod[2]);
			// }
			// list=document.getElementById("myorder");
			// table=document.createElement("table");
			// table.className="table table-hover";
			document.getElementById("myorder").innerHTML+=xhr.responseText;
		}
	}
	xhr.open('POST','../../Backend/Scripts/getOrders.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.send('user='+username);
}