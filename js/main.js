var currentdate = new Date(); 
var date = currentdate.getDate();
var Month = currentdate.getMonth()+1;

if(currentdate.getDate() < 10){
	date = "0" + currentdate.getDate();
}
if((currentdate.getMonth()+1) < 10){
	Month = "0" + (currentdate.getMonth()+1);
}
date = date + "/" + Month + "/" + currentdate.getFullYear() ;

setInterval(function() {
	document.getElementById("time").innerHTML = date + "&emsp;" + new Date().toLocaleTimeString();
}, 1000);

var bookCount = 0;
var newBookID = 0;
var currentBookQty = 0;
var data = "";

$.ajax({
	url: 'http://localhost:3000/books' ,
	type: 'GET',
	success: function(result) {
		console.log(result);
		if(result.length == 0){
			newBookID = 1;
		}
		else{
			newBookID = parseInt(result[result.length-1].ID) + 1;
		}
		document.getElementById("BookID").value = newBookID;
		bookCount = result.length + 1;
		for (let i = 0; i < result.length; i++) {
			document.getElementById("adminTblBody").innerHTML +=
			"<tr onclick=\"selectRow("+ result[i].ID  +")\" id="+ result[i].ID  +">" +
				"<th scope=\"row\">" + result[i].ID + "</th>" +
				"<td>" + result[i].bookName + "</td>" +
				"<td>" + result[i].author + " </td>" +
				"<td>" + result[i].qty + "</td>" +
				"<td>" + result[i].price + " </td>" +
			"</tr>";
			
		}
	}
});


$.ajax({
	url: 'http://localhost:3000/books' ,
	type: 'GET',
	success: function(result) {
		for (let i = 0; i < result.length; i++) {
			document.getElementById("bookIDIssue").innerHTML +=
			"<option value="+ result[i].ID +">"+ result[i].ID + "-" + result[i].bookName +"</option>";
		}
	}
});

function login(){
	var isFound = false;
	$.ajax({
		url: 'http://localhost:3000/user' ,
		type: 'GET',
		success: function(result) {
			for (let i = 0; i < result.length; i++) {
				if(result[i].username == document.getElementById("username").value && result[i].password == document.getElementById("password").value){
					isFound = true;
					if(result[i].type == "Admin"){
						window.location.href = "./admin.html";
					}
					else{
						window.location.href = "./librarian.html";
					}
				}
			}
			if(!isFound){
				document.getElementById("msg").style.display = "block";
			}
		}
	});
}

function selectOptionClicked(){
	$.ajax({
	url: 'http://localhost:3000/books/' + document.getElementById("bookIDIssue").value ,
	type: 'GET',
	success: function(result) {
		document.getElementById("bookName").value = result[0].bookName;
		document.getElementById("aName").value = result[0].author;
		document.getElementById("aQty").value = result[0].availability;
	}
});
}

function selectRow(data){
	$.ajax({
		url: 'http://localhost:3000/books/' + data ,
		type: 'GET',
		success: function(result) {
			document.getElementById("BookID").value = result[0].ID;
			document.getElementById("BookName").value = result[0].bookName;
			document.getElementById("Author").value = result[0].author;
			document.getElementById("Quantity").value = result[0].qty;
			document.getElementById("Price").value = result[0].price;
			document.getElementById("availablity").value = result[0].availability;
			currentBookQty = result[0].qty;
		}
	});
	document.getElementById("add").setAttribute('disabled', '');
	document.getElementById("add").className = "btn btn-outline-success";
	document.getElementById("dlt").removeAttribute('disabled');
	document.getElementById("update").removeAttribute('disabled');
	document.getElementById("clear").removeAttribute('disabled');
	document.getElementById("dlt").className = "btn btn-danger";
	document.getElementById("update").className = "btn btn-warning";
	document.getElementById("clear").className = "btn btn-secondary";
	/*for(var i = 0 ; i < bookCount ; i++){
		if(i == data.split("-")[5]){
			document.getElementById(i).style.backgroundColor = "white";
		}
		else{
			document.getElementById(i).style.backgroundColor = "gray";
		}
	}*/
	
}

function createUSer(){
	switch("") {
	  case document.getElementById("firstName").value:
		alert("Please Enter Valid First Name. Its Can not be Empty");
		break;
	  case document.getElementById("lastName").value:
		alert("Please Enter Valid Last Name. Its Can not be Empty");
		break;
	  case document.getElementById("email").value:
		alert("Please Enter Valid Email. Its Can not be Empty");
		break;
	  case document.getElementById("mobileNumber").value:
		alert("Please Enter Valid Mobile Number. Its Can not be Empty");
		break;
	   case document.getElementById("username").value:
		alert("Please Enter Valid username. Its Can not be Empty");
		break;
	  case document.getElementById("password").value:
		alert("Please Enter Valid password. Its Can not be Empty");
		break;
	  case document.getElementById("accType").value:
		alert("Please Select The Account Type");
		break;
	  default:
		var ID = 0;
		$.ajax({
			url: 'http://localhost:3000/user' ,
			type: 'GET',
			success: function(result) {
				ID = result.length + 1 ;
				
				var obj = new Object();
				obj.ID = ID;
				obj.firstName = document.getElementById("firstName").value;
				obj.lastName = document.getElementById("lastName").value;
				obj.email = document.getElementById("email").value;
				obj.mobileNumber = document.getElementById("mobileNumber").value;
				obj.username = document.getElementById("username").value;
				obj.password = document.getElementById("password").value;
				obj.type = document.getElementById("accType").value;
				$.ajax({
					url: 'http://localhost:3000/user',
					type: 'POST',
					data : obj,
					success: function(result) {
						if(result == "Error"){
							document.getElementById("error").style.display = "block";
						}
						else{
							document.getElementById("success").style.display = "block";
						}
					} 
				});
			}
		});	
	}
	
	
}

function clearAllAccountsAdmin(){
	document.getElementById("firstName").value = "";
	document.getElementById("lastName").value = "";
	document.getElementById("email").value = "";
	document.getElementById("mobileNumber").value = "";
	document.getElementById("username").value = "";
	document.getElementById("password").value = "";
	document.getElementById("accType").value = 0;
	document.getElementById("error").style.display = "none";
	document.getElementById("success").style.display = "none";
}

function serachMember(){
	document.getElementById("tableRows").innerHTML = null;
	document.getElementById("warning").style.display = "none";	
	$.ajax({
		url: 'http://localhost:3000/member/' + document.getElementById("search").value,
		type: 'GET',
		success: function(result) {
			if(result.length == 0){
				document.getElementById("warning").style.display = "block";
				document.getElementById("tabledata").style.display = "none";
			}
			else{
				document.getElementById("mId").value = result[0].ID + "-" + result[0].name;
				document.getElementById("des").innerHTML = result[0].name + "'s Book Borrowing History";
				document.getElementById("initialDiv").style.display = "none";
				document.getElementById("tabledata").style.display = "block";
				$.ajax({
					url: 'http://localhost:3000/memberBookDetails/' + document.getElementById("search").value,
					type: 'GET',
					success: function(result) {
						
						var gotArrray = result[0];
						
						for (let i = 1; i < gotArrray.length; i++) {
							if(gotArrray[i].isBorrowed == true){
								document.getElementById("tableRows").innerHTML +=
								"<tr>" +
									"<th scope=\"row\">" + gotArrray[i].ID + "</th>" +
									"<td>" + gotArrray[i].bookID + "-" + gotArrray[i].bookName +  "-" + gotArrray[i].authorName + "</td>" +
									"<td>" + gotArrray[i].date + " </td>" +
									"<td>" + gotArrray[i].returnDate + "</td>" +
									"<td class=\"text-center\"><button type=\"button\" class=\"btn btn-warning my-2\" onclick=\"returnBook("+gotArrray[i].ID +")\">Mark As Returned</button></td>" +
								"</tr>";
							}
							else{
								document.getElementById("tableRows").innerHTML +=
								"<tr>" +
									"<th scope=\"row\">" + gotArrray[i].ID + "</th>" +
									"<td>" + gotArrray[i].bookID + "-" + gotArrray[i].bookName + "</td>" +
									"<td>" + gotArrray[i].date + " </td>" +
									"<td>" + gotArrray[i].returnDate + "</td>" +
									"<td  class=\"text-center\"><i class=\"fa fa-check-circle\" style=\"font-size:24px ; color : green;\"></i></td>" +
								"</tr>";
							}
							
							
						}		
					} 
				});
			}			
		} 
	});

}

function returnBook (id){
	var link1 = "member/" + document.getElementById("mId").value.split("-")[0] + "/bookHistory/" + id + "/isBorrowed";
	var link2 = "member/" + document.getElementById("mId").value.split("-")[0] + "/bookHistory/" + id + "/returnDate";
	
	var obj = new Object();
	obj.link1 = link1;
	obj.link2 = link2;
	$.ajax({
		url: 'http://localhost:3000/reurnBook',
		type: 'POST',
		data : obj,
		success: function(result) {
			if(result == "Error"){
				alert("Error!");
			}
			else{
				
			}
		}
		
	});
	serachMember();
}

function issueBook(){
	var ID = 0;
	$.ajax({
		url: 'http://localhost:3000/memberBookDetails/' +  document.getElementById("search").value,
		type: 'GET',
		success: function(result) {
			if(result.length == 0){
				ID = 1;
			}
			else{
				ID = result[0].length;
			}
			var obj = new Object();
			obj.recordID = ID;
			obj.memberID = document.getElementById("mId").value;
			obj.bookID = document.getElementById("bookIDIssue").value;
			obj.bookName = document.getElementById("bookName").value;
			obj.author = document.getElementById("aName").value;
			obj.availableQty = document.getElementById("aQty").value;
			
			$.ajax({
				url: 'http://localhost:3000/member/' + document.getElementById("search").value,
				type: 'POST',
				data : obj,
				success: function(result) {
					if(result == "Error"){
						document.getElementById("error").style.display = "block";
					}
					else{
						alert("Saved Successfully");
						document.getElementById("mId").value;
						document.getElementById("bookIDIssue").value = 0;
						document.getElementById("bookName").value = "";
						document.getElementById("aName").value = "";
						document.getElementById("aQty").value = "";
						serachMember();
					}
				} 
			});
		}
	});	
}

function createBook(){
	switch("") {
	  case document.getElementById("BookName").value:
		alert("Please Enter Valid Book Name. Its Can not be Empty");
		break;
	  case document.getElementById("Author").value:
		alert("Please Enter Valid Author. Its Can not be Empty");
		break;
	  case document.getElementById("Quantity").value:
		alert("Please Enter Valid Quantity. Its Can not be Empty");
		break;
	  case document.getElementById("Price").value:
		alert("Please Enter Valid Price. Its Can not be Empty");
		break;
	  default:
		var obj = new Object();
		obj.ID = document.getElementById("BookID").value;
		obj.bookName = document.getElementById("BookName").value;
		obj.author = document.getElementById("Author").value;
		obj.qty = document.getElementById("Quantity").value;
		obj.price = document.getElementById("Price").value;
		obj.availability = document.getElementById("Quantity").value;
		$.ajax({
			url: 'http://localhost:3000/books',
			type: 'POST',
			data : obj,
			success: function(result) {
				if(result == "Error"){
					alert("Sorry! AnError Occured");
				}
				else{
					alert("Book Details Saved Successfully.");
				}
				window.location.reload();			
			} 
		});
	}
	
}

var newMemberId = 0;
$.ajax({
	url: 'http://localhost:3000/member' ,
	type: 'GET',
	success: function(result) {
		console.log(result);
		newMemberId = result.length + 1;
		document.getElementById("id").value = parseInt(newMemberId) + 2022000;
	}
});

function createMember(){
	switch("") {
	  case document.getElementById("name").value:
		alert("Please Enter Valid Name. Its Can not be Empt");
		break;
	  case document.getElementById("address").value:
		alert("Please Enter Valid Address. Its Can not be Empty");
		break;
	  case document.getElementById("mobileNumber").value:
		alert("Please Enter Valid Mobile Number. Its Can not be Empty");
		break;
	  case document.getElementById("gender").value:
		alert("Please Select Your Gender");
		break;
	  case document.getElementById("age").value:
		alert("Please Enter Valid Age. Its Can not be Empty");
		break;
	  case document.getElementById("dob").value:
		alert("Please Select Your Date of Birth");
		break;
	  default:
		var obj = new Object();
		obj.ID = document.getElementById("id").value;
		obj.name = document.getElementById("name").value;
		obj.address = document.getElementById("address").value;
		obj.mobileNumber = document.getElementById("mobileNumber").value;
		obj.gender = document.getElementById("gender").value;
		obj.Age = document.getElementById("age").value;
		obj.dob = document.getElementById("dob").value;
		$.ajax({
			url: 'http://localhost:3000/member',
			type: 'POST',
			data : obj,
			success: function(result) {
				if(result == "Error"){
					alert("Sorry! AnError Occured");
				}
				else{
					alert("Book Details Saved Successfully.");
				}
				window.location.reload();			
			} 
		});
	}
		
}

function updateBook(){
	var obj = new Object();
	obj.ID = document.getElementById("BookID").value;
	obj.bookName = document.getElementById("BookName").value;
	obj.author = document.getElementById("Author").value;
	obj.qty = document.getElementById("Quantity").value;
	obj.price = document.getElementById("Price").value;
	if(currentBookQty != document.getElementById("Quantity").value){
		obj.availability = parseInt(document.getElementById("availablity").value) + (parseInt(document.getElementById("Quantity").value) - parseInt(currentBookQty));
	}
	else{
		obj.availability = document.getElementById("availablity").value;
	}
	
	$.ajax({
		url: 'http://localhost:3000/books',
		type: 'POST',
		data : obj,
		success: function(result) {
			if(result == "Error"){
				alert("Sorry! AnError Occured");
			}
			else{
				alert("Book Details Updated Successfully.");
			}
			window.location.reload();			
		} 
	});
}

function deleteBook(){
	var ID = document.getElementById("BookID").value;
	
	$.ajax({
		url: 'http://localhost:3000/books/' + ID,
		type: 'POST',
		success: function(result) {
			if(result == "Error"){
				alert("Sorry! AnError Occured");
			}
			else{
				alert("Book Deleted Successfully.");
			}
			window.location.reload();			
		} 
	});
}

function clearAllBooks(){
	document.getElementById("BookID").value = newBookID;
	document.getElementById("BookName").value = "";
	document.getElementById("Author").value = "";
	document.getElementById("Quantity").value = "";
	document.getElementById("Price").value = "";
	
	document.getElementById("add").removeAttribute('disabled');
	document.getElementById("add").className = "btn btn-success";
	document.getElementById("dlt").setAttribute('disabled', '');
	document.getElementById("update").setAttribute('disabled', '');
	document.getElementById("clear").setAttribute('disabled', '');
	document.getElementById("dlt").className = "btn btn-outline-danger";
	document.getElementById("update").className = "btn btn-outline-warning";
	document.getElementById("clear").className = "btn btn-outline-secondary";

}

function clearAll(){
		
	document.getElementById("name").value = "";
	document.getElementById("address").value = "";
	document.getElementById("mobileNumber").value = "";
	document.getElementById("gender").value = 0;
	document.getElementById("age").value = "";
	document.getElementById("dob").value = "";
}