$( document ).ready(function() {


	/* Triggered when user clicks LOAD ALL PLUGINS */
	document.getElementById('loadMyVstiList').addEventListener('click', loadPlugins);

	/* Fetch all localStorage VSTi records. */
	function loadPlugins() {
		//JSON.stringify(localStorage); not needed, already done @ #151 below
	
	/*	console.log('hey ' + localStorage.key(5)); 
		 ABOVE IS STATIC: (i) gets the first one or 5 will get the fifth one because its not looping.

		for (var i=0, vCounter=localStorage.length; i<vCounter; ++i) { 
		    var storageKey = localStorage.key(i);
		    var 
		    console.log( storageKey + ': ' + localStorage.getItem(storageKey) );
		}	
*/

var counter = 0;
o = localStorage;
console.log('Here\'s the list: ')
//console.log(Object.keys(o).toString()); // key1 value1

for(var blowme in o) {
  if(o.hasOwnProperty(blowme)) {
    console.log(blowme); // Dont ask me why blowme still works. whats in a name?
  }
}

		

		// iterate localStorage
		/*
		for (var i = 0; i < localStorage.length; i++) {
		  // set iteration key name
		  var description = localStorage.key(i);
		  console.log(i + " : " + description + " = " + localStorage.getItem(description)	);  
		}
		*/	

	}
	/* Setup up Event Listeners here */
	/* Triggered when user clicks ADD NEW VSTI button from the main page. */
	document.getElementById('addNewVstiBtn').addEventListener('click', popVSTiModal);			

	/* Triggered when user clicks EDIT button from a dataRow on the main page. */
	    /* The Edit button click handler is dynamically generated from submitNewVSTi() where the prototype is built */ 	

	/* Triggered when user clicks CANCEL from the modal */
	document.getElementById('cancelVstiSubmit').addEventListener('click', cancelSubmit);

	/* When user clicks SUBMIT from the modal: */
	document.getElementById('vstiSubmit').addEventListener('click', submitNewVSTi);
	/* Run the check for a new dataRow, since the default hostile msg can be removed IF THERE IS DATA */	
	document.getElementById('vstiSubmit').addEventListener('click', killMsg);								

	/* Event trigger callback functions */
	function killMsg() {
		var noDataMsg = document.getElementById('defaultData');
		/*doc has a dataRow and its ID isnt  vstiTemplateData */
		var dataRowCheck = document.getElementsByClassName('dataRow').length;

		console.log('Entering killMsg() = Does a check for elements with classname dataRow.');
		console.log('    ' + dataRowCheck + ' ele(s) with classname of dataRow exist on this page.');
		if (dataRowCheck < 2) {
			noDataMsg.style.display = "block";
			console.log('    There is \<\= 1 ele with classname of dataRow, there is no data to display, so SHOW the default warning msg.');				
		} else {
			noDataMsg.style.display = "none";
			console.log('    Since there is > 1 ele with classname of dataRow, there is data to display, so HIDE the default warning msg.');					
		}
	}
	killMsg();

	function popVSTiModal() {
		console.log('    Entering popVSTiModal() = User has clicked Add from the default msg row.');				
	}
	

	function cancelSubmit() {
		console.log('    Entering cancelSubmit() = User clicked cancel. Modal is closed. No dataRow is cloned until Submit.');
	}

	function submitNewVSTi() {
		var vForm = document.getElementById('vstiEntry');
		var dObjID = 'vsti-' + Math.floor(Math.random() * 900);	

		console.log('The randomly generated ID that will get applied to the cloned dataRow \(aka dObjID\) is : ' + dObjID);	//prove the random generator is working	

		var editBtn = 'editBtn' + dObjID.substr(4);

		/* Provide common names for use in dataRow innerHTML (values) manipulation */	
		var dVSTiName = document.getElementById('vstiName').value;
		var dVSTiVersion = document.getElementById('vstiVersion').value;
		var dVSTiDescription = document.getElementById('vstiDescription').value;
		var dVSTiFormat = document.getElementById('vstiFormat').value;
		var dVSTiRating = document.getElementById('vstiRating').value;
		var dVSTiReview	= document.getElementById('vstiReview').value;

		console.log('    Entering addNewVSTi() = Create a new cloned dataRow and apply the dynamic ID to the row.');

		/* Create the prototype constructor object (NOT an Object itself) using dynamic values to build new objects from. */									
		function Vsti(obj, btn, name, version, description, format, rating, review, vmethod) {
			this.obj = dObjID;
			this.btn = editBtn; 
			this.name = name;
			this.version = version;
			this.description = description;
			this.format = format;
			this.rating = rating;
			this.review = review;
			this.vmethod = function() {
				console.log( 'HELLO new VSTi Object, why not introduce yourself? Go ahead and say a few words...' + '\n');
				console.log('     Uhhh-huhhh....um, yeah... OK, I don\'t' + ' really like talking about myself. Hi. My name is ' 
					+ this.obj + ' and i have a button named ' 
					+ this.btn 
					+ ' and ummmm i like Lime JELLO and safe rooms');			
			};
		}	

		/********** Build the new object from the prototype */
		var dynamicVSTiObject = new Vsti(dObjID, editBtn, dVSTiName, dVSTiVersion, dVSTiDescription, dVSTiFormat, dVSTiRating, dVSTiReview);				
		dynamicVSTiObject.vmethod();  // Run the new VSTIs function (method)

		console.log('    Clone the dataRow (template) and generate a new dataRow with a dynamic ID.');

		/********** Clone the dataRow (template) w default values */
		var sourceRow = document.getElementsByClassName('dataRow')[0]; // Grab the first dataRow in the document (hidden div) to use as HTML template 
		var destination = document.getElementById('outputList'); // Set destination for the cloned div 
		var cln = sourceRow.cloneNode(true); // Duplicate the sourceRows contents
		destination.appendChild(cln); // and append the outputList div with the cloned template row 					
					
		var myNewRow = destination.lastChild; // After cloning row, get the latest dataRow from the page 
		var myNewID = dObjID; // Grab the dynamic ID
		myNewRow.setAttribute("id", myNewID); // Apply the dynamic ID to the dataRow

		/********** Set form field values based on entries */

		/********** Create common names for referring to el IDs */
		var newRowID 		= document.getElementById(myNewID);
		var myNewBtn 		= newRowID.querySelector('.btn').setAttribute("id", editBtn);			
		var newName 		= newRowID.querySelector('.dVSTiName');
		var newVersion 		= newRowID.querySelector('.dVSTiVersion');
		var newDescription	= newRowID.querySelector('.dVSTiDescription');
		var newFormat 		= newRowID.querySelector('.dVSTiFormat');
		var newRating 		= newRowID.querySelector('.dVSTiRating');
		var newReview 		= newRowID.querySelector('.dVSTiReview');

		/* Set event listener on the new button */
		var clickThisBtn = document.getElementById(editBtn);
		clickThisBtn.addEventListener("click", editThisVsti);

		function buildTheRow() {
			console.log('    ENTERING buildTheRow func ...');

			/*Set localStorage from the new prototype object */
			localStorage.setItem(dObjID, JSON.stringify(dynamicVSTiObject)); // 1) Set the storage objects name using prev generated dynamic ID 2) STRINGIFY IT so you can use it.

			/* Confused. Thought this was needed. Followup.
				var vstiList = JSON.parse(localStorage.getItem(dynamicVSTiObject)); // Get the localStorage object so we can mess with it.
			*/

			var pluginName = dynamicVSTiObject["name"];
			var pluginVersion = dynamicVSTiObject["version"];
			var pluginFormat = dynamicVSTiObject["format"];		
			var pluginDescription = dynamicVSTiObject["description"];
			var pluginReview = dynamicVSTiObject["review"];

			console.error('******************** Prove that it got inserted into localStorage. The item added includes: ' + 
				'\n' + pluginName +
				'\n' + pluginVersion +
				'\n' + pluginFormat +
				'\n' + pluginDescription +
				'\n' + pluginReview
			);	

			newName.innerHTML = dynamicVSTiObject.name;
			newVersion.innerHTML = dynamicVSTiObject.version;
			newDescription.innerHTML = dynamicVSTiObject.description;
			newFormat.innerHTML = dynamicVSTiObject.format;
			newRating = dynamicVSTiObject.rating;
			newReview = dynamicVSTiObject.review;

		}	
		buildTheRow();

		function editThisVsti() {
			alert(	'The btn ID ' + editBtn + ' was clicked.' 	);				
			console.log('    Now entering editThisVsti(): ' + dynamicVSTiObject.name);		
			/* FOR EDIT BUTTON USE: Provide common names for use in form field value manipulation */
							
			var vstiName = document.getElementById('vstiName').value;
			var vstiVersion = document.getElementById('vstiVersion').value;
			var vstiDescription = document.getElementById('vstiDescription').value;
			var vstiFormat = document.getElementById('vstiFormat').value;
			var vstiRating = document.getElementById('vstiRating').value;
			var vstiReview	= document.getElementById('vstiReview').value;
			
			vstiName = dynamicVSTiObject.name;
			vstiVersion = dynamicVSTiObject.version;
			vstiDescription = dynamicVSTiObject.description;
			vstiFormat = dynamicVSTiObject.format;
			vstiRating = dynamicVSTiObject.rating;
			vstiReview	= dynamicVSTiObject.review;

			/*			
			vstiName = dynamicVSTiObject.name;
			vstiVersion = dynamicVSTiObject.version;
			vstiDescription = dynamicVSTiObject.description;
			vstiFormat = dynamicVSTiObject.format;
			vstiRating = dynamicVSTiObject.rating;
			vstiReview	= dynamicVSTiObject.review;
			*/		
		}
	
	}



});// End: 	DocReady



/*
 LOCAL STORAGE NOTES: =======================================================================

var test = { test: "thing", test2: "thing2", test3: [0, 2, 44] }​​​​​​​; // Create the storage array object
localStorage.setItem("test", JSON.stringify(test)); //Set it and stringify it
var test2 = localStorage.getItem("test"); // fetch the property/ies you need
console.log(test2); // Test your work - logs "{"test":"thing","test2":"thing2","test3":[0,2,44]}"


this works:
var theList = Storage;
console.log(theList.hasOwnProperty("name")); //returns true 

var theList = Storage;
console.log("name" in theList); // test for existence of name property (boolean test)
console.log(theList.name); // reveal the stored object's name.
console.log(Object.values(theList));

var temp = JSON.parse(localStorage.getItem('vsti-106'));
console.log(temp.name);
console.log(temp.obj);
console.log(Object.keys(temp));

var temp = JSON.parse(localStorage.getItem(	localStorage.key(3)	));
console.log(temp.name);
console.log(temp.obj);
console.log(Object.keys(temp));




Helpful Resources that Explain This Stuff: =======================================================================
-http://adripofjavascript.com/blog/drips/the-uses-of-in-vs-hasownproperty.html
-https://stackoverflow.com/questions/40603019/how-do-we-find-the-various-properties-of-localstorage-in-html5




	// show key/value pairs as an object:
	for(var i =0; i < localStorage.length; i++){
	   console.log(	localStorage.getItem(localStorage.key(i)	)	);
	}

	// iterate localStorage
	
	for (var i = 0; i < localStorage.length; i++) {
	  // set iteration key name
	  var key = localStorage.newObjID(i);
	  // use key name to retrieve the corresponding value
	  var value = localStorage.getItem(key);
	  // console.log the iteration key and value
	  console.log('Key: ' + key + ', Value: ' + value);  
	}

	//Use the values from localStorage 
	document.getElementById("test").innerHTML = localStorage.getItem("name1");
	console.log('the damn thing is ' + newObjID.description);

	//Iterate through properties:
	//============================
	for(var i=0; i < localStorage.length; i++){
	var propertyName = localStorage.key(i);
	console.log(  i + " : " + propertyName + " = " +
	localStorage.getItem(propertyName));
	}

	//Storage Event Listener: (ONLY WORKS WHEN MORE THAN ONE WINDOW/TAB IS OPEN FOR THE SAME PG, like it tells the OTHER WINDOWS an update occurred. Weird.)
	// https://stackoverflow.com/questions/40603019/how-do-we-find-the-various-properties-of-localstorage-in-html5
	function onStorageEvent(storageEvent){
	    alert("storage event");
	}

	window.addEventListener('storage', onStorageEvent, false); 

	//Using localStorage as a DB so VSTIs are avail when page reloads
	//	Setting LS Values::
	//	Using an -Existing- object and storing via localStorage:
	//	window.localStorage.setItem('user', JSON.stringify(person));
	//
	//	Creating a -New- object and storing via localStorage:
	//	localStorage.setItem('thisThing', JSON.stringify({'myKey':'myValue'}))
	//	
	//	Getting LS Values::
	//	var retrievedObject = localStorage.getItem(obj);
	//	console.log(obj, JSON.parse(obj));
*/	

