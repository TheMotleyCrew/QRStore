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
	
	init();
});

function Logout()
{
	sessionStorage.clear();
	window.location.href='./Login.html';
}

function init() {
    pageNo = 1;
    sortFilter = 'pname';
    window.onscroll = fetchMoreProducts;
    getCategories();
}

function fetchMoreProducts() {

    // console.log('Hey!');
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
        pageNo++;
        getProducts(pageNo);
    }
}

function getProducts(pNo) {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = disp_products;
    xhr.open("GET", "../../Backend/Scripts/ListProducts.php?page_no=" + pNo+'&sort_field='+sortFilter+'&category='+category, true);
    xhr.send();
}

function performSearch()
{
	document.getElementById('card_holder').innerHTML='';
	tempitems = [];
	count=0;
	for (var i = 0; i < items.length; i++) 
	{
		var product = JSON.parse(items[i]);
		if(product['pname'].toLowerCase().indexOf(document.getElementById('searchbox').value.toLowerCase()) > -1)
		{
			tempitems[count] = items[i];
			count++;
		}
	}
	fillCard(tempitems);
}

function fillDatalist()
{
	if(document.getElementById('searchbox').value.length >=3)
	{
		document.getElementById('search').innerHTML='';
		for (var i = 0; i < items.length; i++) 
		{
			var product = JSON.parse(items[i]);
			document.getElementById('search').innerHTML +="<option value='"+product['pname']+"'>\n";
		}
	}
	else
	{
		document.getElementById('search').innerHTML='';
	}
}

function disp_products() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        items = response['products'];
        
		fillCard(items);
    }
}

function fillCard(items)
{
	for (var i = 0; i < items.length; i++) 
	{
            var product = JSON.parse(items[i]);
            var card = createCard(product['pname'], 'Rs. ' + product['price']);
            addCard(card);
    }
}

function getCategories()
{
	xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = disp_categories;
    xhr1.open("GET", "../../Backend/Scripts/ListCategories.php", true);
    xhr1.send();
}

function disp_categories()
{	
	if (xhr1.readyState == 4 && xhr1.status == 200) {
        var response = JSON.parse(xhr1.responseText);
        var items = response['category'];
        var count = response['count'];
		
		categories = JSON.parse(items[0]);
		category = categories['category'];
		document.getElementById('category').innerHTML='';
        for (var i = 0; i < count; i++) {

            var categories = JSON.parse(items[i]);
			document.getElementById('category').innerHTML+='<option value="'+categories['category']+'">'+categories['category']+'</option>';
        }
		getProducts(pageNo);
    }
}

function viewProduct(prod_name)
{
	sessionStorage.setItem('pname',prod_name);
	sessionStorage.setItem('viewProductMode','online');
	window.location.href="ViewProduct.html";
}

function createCard(prod_name, desc) {
    var card = document.createElement('div');
	card.setAttribute('class', 'col-xs-6 col-sm-3 col-lg-3');

    var thumbnail = document.createElement('div');
	thumbnail.setAttribute('onclick',"viewProduct('"+prod_name+"')");
    thumbnail.setAttribute('class', 'thumbnail');

    card.appendChild(thumbnail);

    var cardImg = document.createElement('img');
    cardImg.setAttribute('src', '../Assets/placeholder.png');

    thumbnail.appendChild(cardImg);

    var content = document.createElement('div');
    content.setAttribute('class', 'caption');

    thumbnail.appendChild(content);

    var cardName = document.createElement('h5');
    cardName.appendChild(document.createTextNode(prod_name));

    content.appendChild(cardName);

    var description = document.createElement('p');
    description.setAttribute('class', 'flex-text text-muted');
    description.appendChild(document.createTextNode(desc));

    content.appendChild(description);

/*    var navigateButton = document.createElement('a');
   navigateButton.setAttribute('class', 'btn btn-primary');
    navigateButton.innerHTML = "View Product";

    content.appendChild(navigateButton);
*/
    return card;

    // document.getElementById('card_holder').appendChild(card);
}

function addCard(card) {
    document.getElementById('card_holder').appendChild(card);
}

function filterByProduct(e){

    sortFilter = 'pname';
    category = e.target.value;
    pageNo = 1;
    emptyProductList();
    getProducts(pageNo);

}

function sortResults(e){
    
    sortFilter = e.target.value;
    pageNo = 1;
    emptyProductList();
    getProducts(pageNo);

}

function emptyProductList(){
    var card_holder = document.getElementById('card_holder');
    
    console.log(card_holder.childNodes[0]);

    while (card_holder.hasChildNodes()) {   
        card_holder.removeChild(card_holder.firstChild);
    }
    
}