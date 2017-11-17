function goToCart(navigateTo) {
    if (navigateTo == 'online') {
        sessionStorage.setItem('cartMode','online');
    }
    else {
        sessionStorage.setItem('cartMode','offline');
    }
    window.location.href = '../HTML/cart.html';
}