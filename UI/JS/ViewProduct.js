//TODO
// check for offline stores - sellers shouldn't be displayed

function init() {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = displayProduct;
    xhr.open("GET", "http://localhost/QRStore/Backend/Scripts/ViewProduct.php?pname=My Product&online=1",true);
    xhr.send() ;
}

function displayProduct() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
        response = JSON.parse(xhr.responseText);
        document.getElementById("product-title").innerHTML = response['pname'];

        var desc = response['desc'];
        var product_desc = document.getElementById('product-desc');
        if(!desc){
            product_desc.innerHTML = "No decription available";
        }
        else{
            product_desc.innerHTML= desc;
        }


        var count = response['count'];

        if(count > 0){
            var stock = document.getElementById('product-stock');
            stock.innerHTML = "In Stock";
            // var products = JSON.parse(response['products']);
            setQty(JSON.parse(response['products'][0])['qty']);
            setPrice(JSON.parse(response['products'][0])['price']) ;
            
            var seller_list = document.createElement("select");
            seller_list.onchange = function(e){displayProductInfo(e.target.value);}
            seller_list.setAttribute('class','form-control text-center');
            seller_list.setAttribute('id','seller-chosen');
            
            for(var i=0;i<count;i++){

                var product_info =  JSON.parse(response['products'][i]);
                var op = new Option();
                op.value = product_info['pid'];
                op.text = product_info['sname'] + ' sells at $' + product_info['price'];
                seller_list.options.add(op);
            }

            var sellers = document.getElementById('sellers');
            sellers.appendChild(document.createTextNode('More sellers: '));
            sellers.appendChild(document.createElement('br'));
            sellers.appendChild(document.createElement('br'));            
            sellers.appendChild(seller_list);
        }
        else{
            var stock = document.getElementById('product-stock');
            stock.innerHTML = "Out of Stock";
            stock.style.color = "red";

            document.getElementById("add-button").disabled= true;
        }

    }
}

function displayProductInfo(pid){
    var count = response['count'];

    for(var i=0;i<count;i++){
        var product_info =  JSON.parse(response['products'][i]);

        if(product_info['pid']==pid){
            setPrice(product_info['price']);
            setQty(product_info['qty']);
        }
    }
}

function setPrice(price){
    document.getElementById('product-price').innerHTML = "$"+price;
}

function setQty(qty){
    document.getElementById('qty-available').innerHTML = qty+ " available with this seller";
}

function addToCart(){
    
    var pid = document.getElementById('seller-chosen').value;
    xhr = new XMLHttpRequest();
	xhr.onreadystatechange = addConfirm;
	xhr.open('POST', 'http://localhost/QRStore/Backend/Scripts/cart.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send('qty=1&uid=6&sid=0&pid='+pid);
}

function addConfirm(){
    if(xhr.readyState==4 && xhr.status==200){
        var cart_prompt = document.getElementById('cart-prompt');
        cart_prompt.innerHTML = xhr.responseText;
        console.log(xhr.responseText);
        cart_prompt.style.display ="block";
        
    }

    else if(xhr.readyState==4 && xhr.status!=200){
        var cart_prompt = document.getElementById('cart-prompt');
        cart_prompt.innerHTML =  xhr.responseText;
    }

    setTimeout(removeAlert,1200);
}

function removeAlert(){
    var cart_prompt = document.getElementById('cart-prompt');
    cart_prompt.innerHTML = "";
    cart_prompt.style.display = "none";
}