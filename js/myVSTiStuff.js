$( document ).ready(function() {


	/* Triggered when user clicks LOAD ALL PLUGINS */
	document.getElementById('loadMyVstiList').addEventListener('click', loadPlugins);

	/* Fetch all localStorage VSTi records. */
	function loadPlugins() {
		//JSON.stringify(localStorage); not needed, already done @ #151 below

		/* Set VARS */
		var o = localStorage;
		var i = 0;
		var keyIndex = Object.keys(o)[i];
		var dParsed = JSON.parse(o[keyIndex]).description;
		var stuff = 'stuff';

		console.table(o);

		console.log('vsti Name: ' + keyIndex + '\n' + 'Description: ' + dParsed); // Testing - just gets first item, outside the forin loop.			

		for (var key in o) {
		  if (o.hasOwnProperty(key)) {
		  	var sand = JSON.parse(o[key])["name"] + JSON.parse(o[key])["description"];
			console.log('<div id=" + JSON.parse(o[key])['obj'] + ">' +
				'\n' + 'vsti Name: ' + JSON.parse(o[key])["name"] + 
				'\n' + 'Description: ' + JSON.parse(o[key])["description"] + 
				'\n' + 'Version: ' + JSON.parse(o[key])["version"] +
				'\n' + 'Rating: ' + JSON.parse(o[key])["rating"] + 
				'\n' + 'Review: ' + JSON.parse(o[key])["review"] );							
			document.getElementById('sandbox').append(sand);
			// Displays Properties, values for consumption by another function
		  }
		  else {
		   console.log('ELSE ' + key); // these are from __prototype__
		 }
		}
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
		var dObjID = 'vsti-' + Math.floor(Math.random() * 900);	//create a var to become the object's ID/key

		console.log('The randomly generated ID that will get applied to the cloned dataRow \(aka dObjID\) is : ' + dObjID);	//prove the random generator is working	

		var editBtn = 'editBtn' + dObjID.substr(4);

		/* Provide common names for use in dataRow innerHTML (values) manipulation */	
		var dVSTiName 			= document.getElementById('vstiName').value; // modal value
		var dVSTiVersion 		= document.getElementById('vstiVersion').value; // modal value
		var dVSTiDescription 	= document.getElementById('vstiDescription').value; // modal value
		var dVSTiFormat 		= document.getElementById('vstiFormat').value; // modal value
		var dVSTiRating 		= document.getElementById('vstiRating').value; // modal value
		var dVSTiReview			= document.getElementById('vstiReview').value; // modal value
		var dVSTiHTML; // dynamically-generated HTML to follow, from below.		

		console.log('    Entering addNewVSTi() = Create a new cloned dataRow and apply the dynamic ID to the row.');

		/* Create the prototype constructor object (NOT an Object itself) using dynamic values to build new objects from. */									
		function VstiObject(obj, btn, name, version, description, format, rating, review, htmlCode, vmethod) {
			this.obj = dObjID;
			this.btn = editBtn; 
			this.name = name;
			this.version = version;
			this.description = description;
			this.format = format;
			this.rating = rating;
			this.review = review;
			this.htmlCode = "";
			this.vmethod = function() {
				console.log( 'HELLO new VSTi Object, why not introduce yourself? Go ahead and say a few words...' + '\n');
				console.log('     Uhhh-huhhh....um, yeah... OK, I don\'t' + ' really like talking about myself. Hi. My name is ' 
					+ this.obj + ' and i have a button named ' 
					+ this.btn 
					+ ' and ummmm i like Lime JELLO and safe rooms');			
			};
		}	

		/********** Build the new object from the prototype */
		var dynamicVSTiObject = new VstiObject(dObjID, editBtn, dVSTiName, dVSTiVersion, dVSTiDescription, dVSTiFormat, dVSTiRating, dVSTiReview, dVSTiHTML);				
		dynamicVSTiObject.vmethod();  // Run the new VSTIs function (method)


		function buildTheRow() {
			console.log('    ENTERING buildTheRow func ...');

			console.log('    Clone the dataRow (template) and generate a new dataRow with a dynamic ID.');

			/********** Clone the dataRow (template) w default values */
			var sourceRow 	= document.getElementsByClassName('dataRow')[0]; // Grab the first dataRow in the document (hidden div) to use as HTML template 
			var destination = document.getElementById('outputList'); // Set destination for the cloned div 
			var cln 		= sourceRow.cloneNode(true); // Duplicate the sourceRows contents
			destination.appendChild(cln); // and append the outputList div with the cloned template row 					
						
			var myNewRow 	= destination.lastChild; // After cloning row, get the latest dataRow from the page 
			var myNewObjID 	= dObjID; // Grab the dynamic ID
			myNewRow.setAttribute("id", myNewObjID); // Apply the dynamic ID to the cloned dataRow (e.g. "destination").

			/********** Set form field values based on entries */

			/********** Create common names for referring to el Ids and Classes */
			var newRowID 		= document.getElementById(myNewObjID); // use newRowID to setup references to later drop values into.
			var newRowHTML		= newRowID.innerHTML;
			var myNewBtn 		= newRowID.querySelector('.btn').setAttribute("id", editBtn); // use newRowId to target classname based on the row's ID.	
			var newName 		= newRowID.querySelector('.dVSTiName'); // use newRowId to target classname based on the row's ID.
			var newVersion 		= newRowID.querySelector('.dVSTiVersion'); // use newRowId to target classname based on the row's ID.
			var newDescription	= newRowID.querySelector('.dVSTiDescription'); // use newRowId to target classname based on the row's ID.
			var newFormat 		= newRowID.querySelector('.dVSTiFormat'); // use newRowId to target classname based on the row's ID.
			var newRating 		= newRowID.querySelector('.dVSTiRating'); // use newRowId to target classname based on the row's ID.
			var newReview 		= newRowID.querySelector('.dVSTiReview'); // use newRowId to target classname based on the row's ID.

			/* Set event listener on the new button */
			var clickThisBtn = document.getElementById(editBtn);
			clickThisBtn.addEventListener("click", editThisVsti);

			var pluginHTML			= newRowID.innerHTML;
/*
			console.log('******************** Prove localStorage insert worked. The item added to this lSo includes these values: ' + 
				'\n' + pluginName +
				'\n' + pluginVersion +
				'\n' + pluginFormat +
				'\n' + pluginDescription + 
				'\n' + pluginRating +				
				'\n' + pluginReview
			);	
*/
			/* Output new data to the outputlist div */
			newName.innerHTML 			= dynamicVSTiObject.name;
			newVersion.innerHTML 		= dynamicVSTiObject.version;
			newDescription.innerHTML 	= dynamicVSTiObject.description;
			newFormat.innerHTML 		= dynamicVSTiObject.format;
			newRating.innerHTML 		= dynamicVSTiObject.rating;
			newReview.innerHTML 		= dynamicVSTiObject.review;

		localStorage.setItem(dObjID, JSON.stringify(dynamicVSTiObject)); 
		/* Set localStorage from the new prototype object created above (dynamicVSTiObject); stringify it, so you can use it to retrieve key/property values. */			

			console.log('the HTML survey says : ' + pluginHTML);
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

