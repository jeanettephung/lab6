'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);
	
	var selector = "#" + projectID + ' .details';
	console.log(selector); 
	
	$.get("/project/"+idNumber, addDetail);
	
	$(selector).html("foo");
	
}

function addDetail(result) {
	console.log(result);
	
	var selector = "#project" + result["id"] + ' .details';
	
	var projectHTML = '<img src="' + result['image'] + '" class="detailsImage">' + '<h3>' + result['date'] + '</h3><p>' + result['summary'] + '</p>';
	
	$(selector).html(projectHTML);

}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	$.get("/palette", getColor);

	console.log("User clicked on color button");	
}

function getColor(result) {
	var data = JSON.stringify(result['colors']);
	console.log(data);

	var json = JSON.parse(data);
	console.log(json["hex"][0]);
	
	var colors = [json["hex"][0], json["hex"][1], json["hex"][2], json["hex"][3], json["hex"][4]];
	
		
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}