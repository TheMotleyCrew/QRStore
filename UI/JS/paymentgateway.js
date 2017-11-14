
function show(){
  username=sessionStorage.getItem('username');
  amount=sessionStorage.getItem('amount');
  document.getElementById("amount1").innerHTML=amount;
  document.getElementById("amount2").innerHTML=amount;
}
function updateWalletBalance(){


  xhr2=new XMLHttpRequest();
  xhr2.onreadystatechange = function()
  {
    if(xhr2.status==200 && xhr2.readyState==4)
    {
      //document.getElementById('walletbalance').innerHTML=xhr1.responseText;
      window.location.href="./Userwallet.html"
    }
  }
  xhr2.open('POST', '../../Backend/Scripts/addToWallet.php', true);
  xhr2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr2.send("user="+username+"&amount="+amount);

}


