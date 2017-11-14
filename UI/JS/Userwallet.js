
function Logout()
{
	sessionStorage.clear();
	window.location.href='./Login.html';
}
function getWalletBalance(){

	username=sessionStorage.getItem('username');
	xhr1 = new XMLHttpRequest();
	xhr1.onreadystatechange = function()
	{
		if(xhr1.status==200 && xhr1.readyState==4)
		{
			document.getElementById('walletbalance').innerHTML=xhr1.responseText;
		}
	}
	xhr1.open('POST', '../../Backend/Scripts/GetWalletBalance.php', true);
	xhr1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr1.send('user='+username);
}
function addMoneyToWallet(){
	amountID=document.getElementById("addAmount");
	amount=amountID.value;
	if(amount=="") {
		amountID.setAttribute("style","border-color:red")
		return;
	}
	else{
		username=sessionStorage.getItem('username');
	
		sessionStorage.setItem('amount',amount);
		window.location.href="Paymentgateway.html";	
	}
}
function handleamount(input){
	if(input.value<1) input.value=1;
}
