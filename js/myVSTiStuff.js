$( document ).ready(function() {

loadPlugins(); /* Loads the vsti Plugins from localStorage can be removed after testing to demo the workflow */
	/* Fetch all localStorage VSTi records. */
	function loadPlugins() {
		var o = localStorage;
		var i = 0;
		var keyIndex = Object.keys(o)[i];
		var dParsed = JSON.parse(o[keyIndex]).description;

		console.log('>>>>> loadPlugins() For In Loop -- For every object, IF... the object has custom properties fetch them ... output as console log');
		for (var key in o) {
			if (o.hasOwnProperty(key)) {

				console.log('    >>>>> VSTi Plugin: ' + 
					'\n' + 'obj ID: ' + JSON.parse(o[key])['obj'] + 
					'\n' + 'btn ID: ' + JSON.parse(o[key])['btn'] +
					'\n' + 'plugin Name: ' + JSON.parse(o[key])["name"] + 
					'\n' + 'Description: ' + JSON.parse(o[key])["description"] + 
					'\n' + 'Version: ' + JSON.parse(o[key])["version"] +
					'\n' + 'Rating: ' + JSON.parse(o[key])["rating"] + 
					'\n' + 'Review: ' + JSON.parse(o[key])["review"] 
				);	

				var lsId = JSON.parse(o[key])['obj'];
				var lsBtn = JSON.parse(o[key])['btn'];
				var lsName = JSON.parse(o[key])['name']; 
				var lsDescr = JSON.parse(o[key])['description']; 
				var lsFormat = JSON.parse(o[key])['format']; 
				var lsVersion = JSON.parse(o[key])['version'];
				var lsRating = JSON.parse(o[key])['rating']; 
				var lsReview = JSON.parse(o[key])['review'];
				// TODO: write them to the template divs here.

				function ddRow() {
					console.log('    ENTERING ddRow func ...');

					console.log('    Clone the dataRow (template) and generate a new dataRow with a dynamic ID.');

					/********** Clone the dataRow (template) w default values */
					var sourceRow 	= document.getElementsByClassName('dataRow')[0]; // Grab the first dataRow in the document (hidden div) to use as HTML template 
					var destination = document.getElementById('sandbox'); // Set destination for the cloned div 
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

				function buildDataRows() {
				  	var sand = '<span>' + JSON.parse(o[key])["name"] + '</span>' + '<br />' + '<span>' + JSON.parse(o[key])["description"] + '</span>' +'<br /><br />';	
				  	/* Demonstrate use of ES6? backticks to allow for huge chunks of HTML w/out need for escaping or working about line breaks */
				  	let htmlBlob = `
						<div id="${lsId}" class="dataRow row">
							<div class="col-1 fieldData text-center">
								<button 
									id="${lsBtn}"
									type="button" 
									class="btn btn-default Edit" 
									data-toggle="modal" 
									data-target="#VSTiInsertModal" onclick="">
									edit
								</button>
							</div>						
							<div class="col-3 fieldData">
								<span class="dVSTiName">${lsName}</span> 
								<span class="dVSTiVersion" class="version">${lsVersion}</span>
							</div>
							<div class="col-3 fieldData">
								<span class="dVSTiDescription">${lsDescr}</span>
							</div>
							<div class="col-1 fieldData text-center dVSTiFormat">
								${lsFormat}
							</div>
							<div class="col-4 fieldData">
								<span class="dVSTiRating">${lsRating}</span>
								<span class="dVSTiReview">${lsReview}</span>							
								<div class="vDemo col">
								<!--								
									<audio controls>
										<source src="myAudio.mp3" type="audio/mp3">
										<source src="myAudio.ogg" type="audio/ogg">
									</audio>
								-->
								</div>
							</div>
						</div>
				  	`;

					document.getElementById('outputList').insertAdjacentHTML('beforeend', htmlBlob);
					document.getElementById(lsBtn).addEventListener('click', popVSTiModal);	
					document.getElementById(lsBtn).addEventListener('click', editThisVsti);
				}
				buildDataRows();

			}
			else {
				// console.log('    >>>>> TESTING: ELSE... this property is inherited from localStorage __prototype__ ' + key); // these are from __prototype__
			}
		}	
	}

	function editThisVsti(err) { 

		/* Change the modal's title and btn submit=update based on plugin name */
		var modalTitle = document.getElementById('VSTiModalLabel');
		modalTitle.innerHTML ='Edit Mode for Plugin: ' + editThis_name;
		var submitBtnTitle = document.getElementById('vstiSubmit');	
		submitBtnTitle.innerHTML ='update';

		var updateBtn = document.getElementById('vstiSubmit');
		updateBtn.setAttribute('id', 'vstiUpdate', 'type', 'button');
		/* Add event listener for Update button in the modal, still has ID of vstiSubmit */
		document.getElementById('vstiUpdate').addEventListener('click', doUpdate(event));		


		var o = localStorage;
		var clickedBtn = event.srcElement.id; // what got clicked w out knowing its ID or how many etc - dynamic		
		var selectedRow 			= document.getElementById(clickedBtn).parentNode.parentNode.id; // Get the selected row's ID
		console.log(selectedRow);

		/* Fetch the Object from localStorage based on the buttons ID */
		var e = o.getItem(selectedRow);
		console.log('the object you want from localStorage should be: ' + JSON.parse(e).name); // without first parsing, e will be object object	

		var editThis_btnID = JSON.parse(e).btn;
		var editThis_name = JSON.parse(e).name;
		var editThis_version  = JSON.parse(e).version;
		var editThis_description  = JSON.parse(e).description;
		var editThis_format  = JSON.parse(e).format;
		var editThis_rating  = JSON.parse(e).rating;
		var editThis_review  = JSON.parse(e).review;

		/* Use collected data in a more readable testing format */
		let fetchedObjString = `
			${editThis_btnID}
			${editThis_name}
			${editThis_version}
			${editThis_description}
			${editThis_format}
			${editThis_rating}
			${editThis_review}
		`
		console.log(fetchedObjString);		

		//console.log('the plugin Name from localStorage object is ' + '');
/*	
		var editedName 				= selectedRow.querySelector('.dVSTiName'); // use selectedRow to target classname based on the row's ID.
		var editedVersion 			= selectedRow.querySelector('.dVSTiVersion'); // use selectedRow to target classname based on the row's ID.
		var editedDescription		= selectedRow.querySelector('.dVSTiDescription'); // use selectedRow to target classname based on the row's ID.
		var editedFormat 			= selectedRow.querySelector('.dVSTiFormat'); // use selectedRow to target classname based on the row's ID.
		var editedRating 			= selectedRow.querySelector('.dVSTiRating'); // use selectedRow to target classname based on the row's ID.
		var*/ editedReview 			= selectedRow.querySelector('.dVSTiReview'); // use selectedRow to target classname based on the row's ID.



		function doUpdate(event) {

			alert('its update time');

		}
/*
		editedName.innerHTML 		= localStorage.setItem(selectedRow, 'tuna') dynamicVSTiObject.name;
		editedVersion.innerHTML 	= localStorage.setItem(selectedRow, 'tuna') dynamicVSTiObject.version;
		editedDescription.innerHTML = localStorage.setItem(selectedRow, 'tuna') dynamicVSTiObject.description;
		editedFormat.innerHTML 		= localStorage.setItem(selectedRow, 'tuna') dynamicVSTiObject.format;
		editedRating.innerHTML 		= localStorage.setItem(selectedRow, 'tuna') dynamicVSTiObject.rating;
		editedReview.innerHTML 		= localStorage.setItem(selectedRow, 'tuna') dynamicVSTiObject.review;
*/
	}
	



	/* Setup up Event Listeners here */
	/* Triggered when user clicks LOAD ALL PLUGINS */
	document.getElementById('loadMyVstiList').addEventListener('click', loadPlugins);

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
	}

});// End: 	DocReady

