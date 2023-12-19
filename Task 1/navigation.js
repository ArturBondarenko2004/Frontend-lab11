
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(showPosition);
 } else {
	alert("Браузер не підтримує геолокацію");
 }
 
 function showPosition(position) {
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	document.getElementById("location").innerHTML = "Широта: " + latitude + "<br>Довгота: " + longitude;
	navigator.geolocation.watchPosition(updatePosition);
 }
 function updatePosition(position) {
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	document.getElementById("location").innerHTML = "Широта: " + latitude + "<br>Довгота: " + longitude;
 }
 