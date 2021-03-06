function initialize(lt,lo) {
        var mapCanvas = document.getElementById('map');
        var mapOptions = {
          center: new google.maps.LatLng(lt, lo),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(mapCanvas, mapOptions)
      }


//*****************************************************************
function method(id,user,object)
{
	
	console.log(user);
	
}

//===================*******************************************************************=============================

// Userlist data array for filling in info box

var userListData = [];

//============================================ DOM Ready =============================================================
    $(document).ready(function() {

        // Populate the user table on initial page load
        populateTable();
        //initialize();
        // Username link click
    $('#userlist table tbody').on('click', 'td a.linkshowuser', showUserInfo);
    $('#userlist table tbody').on('click', 'td a.linkcomment', commentUser);

});

//============================================= Functions =============================================================

// Fill table with data
function populateTable() {
console.log("Reached Here array pos populateTable");
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/userlist', function( data ) {
    	// Stick our user data array into a userlist variable in the global object
    userListData = data;

      console.log("Length of returned queries :"+userListData.length);
       
    });
};


// Show User Info
function showUserInfo(event) {
	console.log("Reached Here in Click Call!!");
	populateTable();
    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem._id; }).indexOf(thisUserName);
    // Get our User Object
    var thisUserObject = userListData[arrayPosition];
    //console.log("Reached Here array pos");

    console.log(thisUserObject._id);
    //console.log("Reached Here cs log");

    var commentCheck=thisUserObject.comment;

    if(typeof commentCheck==='undefined')
    {
    	commentCheck="No Comment to Display";
    }

    swal({   title: "Information!",   text: "Tweet ID: "+thisUserObject.id+"\n Name: "+thisUserObject.fromUserName+"\n User ID: "+thisUserObject.fromUser+"\n Text: "+thisUserObject.text+"\n Longitude: "+thisUserObject.longitude+"\t Latitude:"+thisUserObject.latitude+"\n comment: "+commentCheck,   type: "warning",   confirmButtonText: "OK, Go Back" });

};

function commentUser(event) {
	console.log("Reached Here in Click comment Call!!");
	//populateTable();
    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisID = $(this).attr('rel');

    var globalVar="Test Variable";

    function tryMethod(variable)
    {
    	//alert(variable);
    	globalVar=variable;



        // If it is, compile all user info into one object
        var newUsercomment = {
            'id1': thisID,
            'comment': globalVar
        }
        console.log(newUsercomment);

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUsercomment,
            url: '/commentuser',
            dataType: 'JSON',

        }).done(function( response ){

           // Check for a successful (blank) response
            if (response.msg === '') {
                
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });
        populateTable();
    }

    swal({   title: "A comment for input!",   text: "Write something interesting for comment",   
    	type: "input",   showCancelButton: true,   closeOnConfirm: false,   
    	animation: "slide-from-top",   inputPlaceholder: "Write something" }, 
    	
    	function(inputValue){
    	 globalVar=inputValue;   
    		if (inputValue === false) return false;      
    		if (inputValue === "") 
    			{     swal.showInputError("You need to write something!");     return false;   }      
    		else{
    			swal("Nice!", "You wrote: " + globalVar, "success")
    		tryMethod(globalVar);
    			}
    		}
    		);
    
};