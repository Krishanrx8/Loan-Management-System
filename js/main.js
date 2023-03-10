var currentdate = new Date();
var date = currentdate.getDate();
var Month = currentdate.getMonth() + 1;

if (currentdate.getDate() < 10) {
	date = "0" + currentdate.getDate();
}
if ((currentdate.getMonth() + 1) < 10) {
	Month = "0" + (currentdate.getMonth() + 1);
}
date = date + "/" + Month + "/" + currentdate.getFullYear();

setInterval(function () {
	document.getElementById("time").innerHTML = date + "&emsp;" + new Date().toLocaleTimeString();
}, 1000);

document.getElementById("singup").style.display = "none";
function viewSignUp() {
	document.getElementById("login").style.display = "none";
	document.getElementById("singup").style.display = "block";
}

function viewLogin() {
	document.getElementById("login").style.display = "block";
	document.getElementById("singup").style.display = "none";
}




function login() {
	var isFound = false;
	if (document.getElementById("username").value == "Admin" && document.getElementById("pw1").value == "admin123") {
		window.location.href = "./admin.html";
	}
	else {
		$.ajax({
			url: 'http://localhost:5000/user',
			type: 'GET',
			success: function (result) {
				for (let i = 0; i < result.length; i++) {
					if (result[i].username == document.getElementById("username").value && result[i].password == document.getElementById("pw1").value) {
						isFound = true;
						window.location.href = "./user.html";
					}
				}
				if (!isFound) {
					document.getElementById("msg").style.display = "block";
				}
			}
		});
	}
}

function loadData() {
	$.ajax({
		url: 'http://localhost:5000/user',
		type: 'GET',
		success: function (result) {
			console.log(result);
			for (let i = 0; i < result.length; i++) {
				document.getElementById("adminTblBody").innerHTML +=
					"<tr onclick=\"selectRow('" + result[i]._id + "')\">" +
					"<td>" + result[i]._id + "</td>" +
					"<td>" + result[i].FullName + "</td>" +
					"<td>" + result[i].DOB + " </td>" +
					"<td>" + result[i].LoanAmount + "</td>" +
					"<td>" + result[i].UsedAmount + " </td>" +
					"<td>" + result[i].InstalmentPlan + " </td>" +
					"</tr>";

			}
		}
	});
}

function selectRow(data) {
	console.log(data);
	$('#userModal').modal('show');
}

function createUSer() {
	switch ("") {
		case document.getElementById("name").value:
			alert("Please Enter Valid Name. Its Can not be Empty");
			break;
		case document.getElementById("address").value:
			alert("Please Enter Valid Address. Its Can not be Empty");
			break;
		case document.getElementById("DOB").value:
			alert("Please Enter Valid Date of Birth. Its Can not be Empty");
			break;
		case document.getElementById("email").value:
			alert("Please Enter Valid Email. Its Can not be Empty");
			break;
		case document.getElementById("pw2").value:
			alert("Please Enter Valid password. Its Can not be Empty - " + document.getElementById("pw2").value);
			break;
		default:
			var obj = new Object();
			obj.name = document.getElementById("name").value;
			obj.address = document.getElementById("address").value;
			obj.DOB = document.getElementById("DOB").value;
			obj.email = document.getElementById("email").value;
			obj.password = document.getElementById("pw2").value;

			$.ajax({
				url: 'http://localhost:5000/user',
				type: 'POST',
				data: obj,
				success: function (result) {
					if (result == "Success") {
						$.ajax({
							url: 'http://localhost:5000/user',
							type: 'GET',
							success: function (result) {
								for (let i = 0; i < result.length; i++) {
									if (result[i].Email == document.getElementById("email").value && result[i].Password == document.getElementById("pw2").value) {
										window.location.href = "./user.html";
									}
								}
							}
						});
					}
					else {
						alert("Sorry! Account Creation Unsuccessfull.");
					}
				}
			});
	}
}

