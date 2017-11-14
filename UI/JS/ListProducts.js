function init() {
    pageNo = 1;
    category = 'Apparel';
    sortFilter = 'pname';
    window.onscroll = fetchMoreProducts;
    getProducts(pageNo);
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
    xhr.open("GET", "http://localhost/QRStore/Backend/Scripts/ListProducts.php?page_no=" + pNo+'&sort_field='+sortFilter+'&category='+category, true);
    xhr.send();
}

function disp_products() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        var items = response['products'];
        var count = response['count'];


        for (var i = 0; i < count; i++) {

            var product = JSON.parse(items[i]);
            var card = createCard(product['pname'], '$ ' + product['price']);
            addCard(card);
        }
    }
}

function createCard(prod_name, desc) {
    var card = document.createElement('div');
    card.setAttribute('class', 'col-xs-6 col-sm-3 col-lg-3');

    var thumbnail = document.createElement('div');
    thumbnail.setAttribute('class', 'thumbnail');

    card.appendChild(thumbnail);

    var cardImg = document.createElement('img');
    cardImg.setAttribute('src', '../Assets/placeholder.png');

    thumbnail.appendChild(cardImg);

    var content = document.createElement('div');
    content.setAttribute('class', 'caption');

    thumbnail.appendChild(content);

    var cardName = document.createElement('h3');
    cardName.appendChild(document.createTextNode(prod_name));

    content.appendChild(cardName);

    var description = document.createElement('p');
    description.setAttribute('class', 'flex-text text-muted');
    description.appendChild(document.createTextNode(desc));

    content.appendChild(description);

    var navigateButton = document.createElement('a');
    navigateButton.setAttribute('class', 'btn btn-primary');
    navigateButton.innerHTML = "View Product";

    content.appendChild(navigateButton);

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