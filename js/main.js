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


function enableEditing() {
	document.getElementById("saveBtn").style.display = "inline";
	document.getElementById("cancelBtn").style.display = "inline";
	document.getElementById("enableEditingBtn").style.display = "none";

	document.getElementById("name").removeAttribute('disabled');
	document.getElementById("address").removeAttribute('disabled');
	document.getElementById("DOB").removeAttribute('disabled');
	document.getElementById("email").removeAttribute('disabled');
	document.getElementById("pw").removeAttribute('disabled');
}

function calcelEditing() {
	window.location.reload();
}

function updateData() {
	var obj = new Object();
	obj.name = document.getElementById("name").value;
	obj.address = document.getElementById("address").value;
	obj.DOB = document.getElementById("DOB").value;
	obj.email = document.getElementById("email").value;
	obj.password = document.getElementById("pw").value;

	$.ajax({
		url: 'http://localhost:5000/userByUser/' + localStorage.getItem("loggedInUserLoanManagementSystem"),
		type: 'PUT',
		data: obj,
		success: function (result) {
			window.location.reload();
		}
	});
}

function loadUserData() {
	var loggedInUserID = localStorage.getItem("loggedInUserLoanManagementSystem");
	document.getElementById("userID").value = loggedInUserID;

	$.ajax({
		url: 'http://localhost:5000/user/' + loggedInUserID,
		type: 'GET',
		success: function (result) {
			console.log(result);
			document.getElementById("name").value = result[0].FullName;
			document.getElementById("address").value = result[0].Address;
			document.getElementById("DOB").value = result[0].DOB;
			document.getElementById("email").value = result[0].Email;
			document.getElementById("pw").value = result[0].Password;
			document.getElementById("UsedAmount").innerHTML = result[0].UsedAmount + " LKR";
			document.getElementById("loanBalance").innerHTML = result[0].LoanBalance + " LKR";
		}
	});

	$.ajax({
		url: 'http://localhost:5000/payment',
		type: 'GET',
		success: function (result) {

			for (let i = 0; i < result.length; i++) {
				if (result[i].userID == loggedInUserID) {
					if (result[i].Status == "Pending") {
						document.getElementById("userTblData").innerHTML +=
							"<tr>" +
							"  <td>" + result[i].Date + "</td>" +
							"  <td>" + result[i].BankName + "</td>" +
							"  <td>" + result[i].BranchName + "</td>" +
							"  <td>" + result[i].BranchCode + "</td>" +
							"  <td>" + result[i].Amount + "</td>" +
							"  <td><span class=\"badge bg-warning\">pending</span></td>" +
							"</tr>";
					}
					if (result[i].Status == "Accepted") {
						document.getElementById("userTblData").innerHTML +=
							"<tr>" +
							"  <td>" + result[i].Date + "</td>" +
							"  <td>" + result[i].BankName + "</td>" +
							"  <td>" + result[i].BranchName + "</td>" +
							"  <td>" + result[i].BranchCode + "</td>" +
							"  <td>" + result[i].Amount + "</td>" +
							"  <td><span class=\"badge bg-success\">accepted</span></td>" +
							"</tr>";
					}
					if (result[i].Status == "Rejected") {
						document.getElementById("userTblData").innerHTML +=
							"<tr>" +
							"  <td>" + result[i].Date + "</td>" +
							"  <td>" + result[i].BankName + "</td>" +
							"  <td>" + result[i].BranchName + "</td>" +
							"  <td>" + result[i].BranchCode + "</td>" +
							"  <td>" + result[i].Amount + "</td>" +
							"  <td><span class=\"btn badge bg-danger\" onclick=\"showReason('" + result[i].Reason + "')\">rejected</span></td>" +
							"</tr>";
					}
				}
			}
		}
	});
}

function showReason(reason) {
	$('#reasonDataModal').modal('show');
	document.getElementById("msg").innerHTML = reason;
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
					if (result[i].Email == document.getElementById("username").value && result[i].Password == document.getElementById("pw1").value) {
						isFound = true;
						localStorage.setItem("loggedInUserLoanManagementSystem", result[i]._id);

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
					"<td>" + result[i].LoanBalance + "</td>" +
					"<td>" + result[i].UsedAmount + " </td>" +
					"<td>" + result[i].InstalmentPlan + " </td>" +
					"</tr>";

			}
		}
	});
}

function loadDataRequests() {
	$.ajax({
		url: 'http://localhost:5000/payment',
		type: 'GET',
		success: function (result) {
			console.log(result);
			for (let i = 0; i < result.length; i++) {
				if (result[i].Status == "Pending") {
					document.getElementById("allData").innerHTML +=
						"<div class=\"shadow p-3 mb-5 bg-body rounded w-75 mx-auto\">" +
						"<div class=\"row\">" +
						"	<div class=\"col\">" +
						"		<h6>Request ID - " + result[i]._id + "</h6>" +
						"	</div>" +
						"	<div class=\"col text-end\">" +
						"		<h6>User ID - " + result[i].userID + "</h6>" +
						"	</div>" +
						"</div>" +
						"<table class=\"table table-bordered my-4\">" +
						"  <thead>" +
						"	<tr>" +
						"	  <th scope=\"col\" style=\"width : 20%;\">Payment Date</th>" +
						"	  <th scope=\"col\" style=\"width : 40%;\">Bank Name</th>" +
						"	  <th scope=\"col\" style=\"width : 15%;\">Brach Name</th>" +
						"	  <th scope=\"col\" style=\"width : 10%;\">Branch Code</th>" +
						"	  <th scope=\"col\" style=\"width : 15%;\">Amount</th>" +
						"	</tr>" +
						" </thead>" +
						"  <tbody>" +
						"	<tr>" +
						"	  <td>" + result[i].Date + "</td>" +
						"	  <td>" + result[i].BankName + "</td>" +
						"	  <td>" + result[i].BranchName + "</td>" +
						"	  <td>" + result[i].BranchCode + "</td>" +
						"	  <td>" + result[i].Amount + "</td>" +
						"	</tr>" +
						" </tbody>" +
						"</table>" +
						"<button type=\"button\" class=\"btn btn-success\" onclick=\"acceptRequest('" + result[i]._id + "' , '" + result[i].userID + "' , '" + result[i].Amount + "')\">ACCEPT</button>" +
						"<button type=\"button\" class=\"btn btn-danger mx-2\" onclick=\"rejectRequest('" + result[i]._id + "')\">REJECT</button>" +
						"</div>";
				}
			}
		}
	});
}

function acceptRequest(recordID, userID, Amount) {
	var newAmount = 0;
	$.ajax({
		url: 'http://localhost:5000/user/' + userID,
		type: 'GET',
		success: function (result) {
			newAmount = Number(result[0].LoanBalance) - Number(Amount);

			var obj = new Object();
			obj.NewAmount = newAmount;
			obj.userID = userID;


			$.ajax({
				url: 'http://localhost:5000/acceptPayment/' + recordID,
				type: 'PUT',
				data: obj,
				success: function (result) {
					window.location.reload();
				}
			});

		}
	});

}

var rejectID = "";
function rejectRequest(recordID) {
	rejectID = recordID;
	$('#reasonModal').modal('show');
}

function rejectConfimed() {
	var obj = new Object();
	obj.Reason = document.getElementById("reason").value;

	$.ajax({
		url: 'http://localhost:5000/rejectPayment/' + rejectID,
		type: 'PUT',
		data: obj,
		success: function (result) {
			window.location.reload();
		}
	});
}


function selectRow(data) {
	document.getElementById("cusID").innerHTML = data;
	$.ajax({
		url: 'http://localhost:5000/user/' + data,
		type: 'GET',
		success: function (result) {
			console.log(result);
			document.getElementById("nameU").value = result[0].FullName;
			document.getElementById("addressU").value = result[0].Address;
			document.getElementById("DOBU").value = result[0].DOB;
			document.getElementById("emailU").value = result[0].Email;
			document.getElementById("loanU").value = result[0].LoanBalance;
			document.getElementById("UsedAmountU").value = result[0].UsedAmount;
		}
	});
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
			alert("Please Enter Valid password. Its Can not be Empty");
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
										localStorage.setItem("loggedInUserLoanManagementSystem", result[i]._id);
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

function submitPaymentRequest() {
	switch ("") {
		case document.getElementById("date").value:
			alert("Please Enter Valid Date. Its Can not be Empty");
			break;
		case document.getElementById("bankName").value:
			alert("Please Enter Valid Bank Name. Its Can not be Empty");
			break;
		case document.getElementById("branchName").value:
			alert("Please Enter Valid Branch Name. Its Can not be Empty");
			break;
		case document.getElementById("branchCode").value:
			alert("Please Enter Valid Branch Code. Its Can not be Empty");
			break;
		case document.getElementById("amount").value:
			alert("Please Enter Valid Amount. Its Can not be Empty");
			break;
		default:
			var obj = new Object();
			obj.userID = document.getElementById("userID").value;
			obj.Date = document.getElementById("date").value;
			obj.BankName = document.getElementById("bankName").value;
			obj.BranchName = document.getElementById("branchName").value;
			obj.BranchCode = document.getElementById("branchCode").value;
			obj.Amount = document.getElementById("amount").value;

			$.ajax({
				url: 'http://localhost:5000/payment',
				type: 'POST',
				data: obj,
				success: function (result) {
					window.location.reload();
				}
			});
	}
}

function deleteUser() {
	$.ajax({
		url: 'http://localhost:5000/user/' + document.getElementById("cusID").innerHTML,
		type: 'DELETE',
		success: function (result) {
			window.location.reload();
		}
	});
}

function updateUser() {
	var obj = new Object();
	obj.name = document.getElementById("nameU").value;
	obj.address = document.getElementById("addressU").value;
	obj.DOB = document.getElementById("DOBU").value;
	obj.email = document.getElementById("emailU").value;
	obj.loanU = document.getElementById("loanU").value;
	obj.UsedAmountU = document.getElementById("UsedAmountU").value;

	$.ajax({
		url: 'http://localhost:5000/user/' + document.getElementById("cusID").innerHTML,
		type: 'PUT',
		data: obj,
		success: function (result) {
			window.location.reload();
		}
	});


}
