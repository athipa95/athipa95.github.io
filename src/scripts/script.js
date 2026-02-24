/*
PROGRAMMER: Athip Thirupathi Raj, template taken from Fredrick Wachter
DATE CREATED: 2024-12-28
PURPOSE: Engineering Portfolio of Athip Thirupathi Raj
CONTACT INFO: athipa95@gmail.com
*/

/* -------------------- ---------------------- -------------------- */
/* -------------------- User Defined Variables -------------------- */
/* -------------------- ---------------------- -------------------- */
var pageNames = ["Home", "About Me", "Engineering Experience", "Project Experience", "Inventions and Provisional Patents", "Awards and Media Mentions"];

/* -------------------- ---------------- -------------------- */
/* -------------------- Static Variables -------------------- */
/* -------------------- ---------------- -------------------- */
var pageIndex = 0; // indicated the current page of the user
var totalPages = $(".footerButton").length; // indicates the amount of available pages on the webpage
var sidebarDisplayFlag = 1; // indicates if the sidebar should be displayed
var pageTwoScrollFlag = 1; // indicates if the scrollbar is active on the second page
var resumeButtonDisplayFlag = 1; // indicates if the resume button should be displayed
var cvButtonDisplayFlag = 1; // indicates if the CV button should be displayed
var sidebarDisplayTolerance = 30; // tolerance to decide to display sidebar or not
var resumeButtonDisplayTolerance = 30; // tolerance to decide to display resume button or not
var cvButtonDisplayTolerance = 30; // tolerance to decide to display cv button or not


var platformIndexAdjust = $("#contentPage1").children().length - $(".platform").length - 1; // Adjustment to platform index
var jobIndexAdjust = $("#contentPage2").children().length - $(".job").length - 1; // Adjustment to job index
var projectIndexAdjust = $("#contentPage3").children().length - $(".project").length - 1; // Adjustment to project index
var inventionIndexAdjust = $("#contentPage4").children().length - $(".invention").length - 1; // Adjustment to invention index
var awardIndexAdjust = $("#contentPage5").children().length - $(".award").length - 1; // Adjustment to award index

/* -------------------- ------------- -------------------- */
/* -------------------- Window Resize -------------------- */
/* -------------------- ------------- -------------------- */
windowResize();

$(window).resize(function () { windowResize(); });
function windowResize() {
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();

	$("#intro").css({
		"height": windowHeight + "px"
	});
	$(".page").css({
		"width": windowWidth + "px",
		"height": windowHeight + "px"
	});
	$("#logo").css({
		"top": (windowHeight / 2) + "px",
		"left": (windowWidth / 2) + "px"
	});

	if ((resumeButtonDisplayFlag) && (windowWidth < 875)) {
		$("#resumeButton").addClass("hidden");
		resumeButtonDisplayFlag = 0;
	} else if ((!resumeButtonDisplayFlag) && windowWidth >= 875) {
		$("#resumeButton").removeClass("hidden");
		resumeButtonDisplayFlag = 1;
	}

	if ((cvButtonDisplayFlag) && (windowWidth < 875)) {
		$("#cvButton").addClass("hidden");
		cvButtonDisplayFlag = 0;
	} else if ((!cvButtonDisplayFlag) && windowWidth >= 875) {
		$("#cvButton").removeClass("hidden");
		cvButtonDisplayFlag = 1;
	}

	if ((windowHeight < 800) && (pageTwoScrollFlag == 0)) {
		$("#tint1").addClass("scroll");
		pageTwoScrollFlag = 1;
	} else if ((windowHeight > 800) && (pageTwoScrollFlag == 1)) {
		$("#tint1").removeClass("scroll");
		pageTwoScrollFlag = 0;
	}

	var lastJob = $(".job").eq($(".job").length - 1);
	var jobBottomPosition = lastJob.offset().top + lastJob.height();
	if ((windowHeight - jobBottomPosition - 200) < 0) {
		$("#page2").addClass("scroll");
	}

	offsetPages(pageIndex, windowWidth);
	setIconLocation(null, pageIndex, 1);
	adjustVideoSize_Page1(windowWidth);
}

/* -------------------- -------- -------------------- */
/* -------------------- Function -------------------- */
/* -------------------- -------- -------------------- */
function offsetPages(index, windowWidth) {
	var offset = (-index) * windowWidth;
	for (var i = 0; i < totalPages; i++) {
		$(".page").eq(i).css({
			"left": offset + (windowWidth * i) + "px"
		});
	}
}
function setIconLocation(previousIndex, currentIndex, windowResize) {
	var windowHeight = $(window).height();
	if ((windowResize == 1) && (currentIndex > 0)) {
		$("#logo").css({
			"top": windowHeight - 42 + "px"
		});
	} else if ((previousIndex == 0) && (pageIndex > 0)) {
		$("#logo").css({
			"box-shadow": "none",
			"margin-top": "-75px",
			"margin-left": "-50px",
			"top": windowHeight - 42 + "px",
			"background-color": "rgba(0,0,0,0)"
		});
		$("#mainLogo").css({
			"width": "100px"
		});
	} else if ((previousIndex > 0) && (pageIndex == 0)) {
		$("#logo").css({
			"top": (windowHeight / 2) + "px",
			"box-shadow": "",
			"margin-top": "",
			"margin-left": "",
			"background-color": ""
		});
		$("#mainLogo").css({
			"width": ""
		});
	}
}
function toggleActivePage(previousIndex, currentIndex) {
	$(".footerButton").eq(previousIndex).removeClass("active");
	$(".footerButton").eq(previousIndex).addClass("notActive");
	// $(".footerButton").eq(previousIndex).addClass("icon");

	$(".footerButton").eq(currentIndex).addClass("active");
	$(".footerButton").eq(currentIndex).removeClass("notActive");
	// $(".footerButton").eq(currentIndex).removeClass("icon");

	setIconLocation(previousIndex, currentIndex, 0);
}
function adjustVideoSize_Page1(windowWidth) {
	if (windowWidth <= 1000) {
		$(".video").css({
			"height": ((windowWidth / 2) / 1.333) + "px"
		});
		$("#videoSpacer").css({
			"height": ((windowWidth / 2) / 1.333) + "px"
		});
		$("#showVideo").css({
			"border-radius": "0px"
		});
	} else {
		$(".video").css({
			"height": "375px"
		});
		$("#videoSpacer").css({
			"height": "375px"
		});
		$("#showVideo").css({
			"border-radius": "0px 0px 5px 5px"
		});
	}
}
function toggleSidebarDisplay() {
	if (sidebarDisplayFlag == 0) {
		$("#sidebar").css({
			"right": "-64px"
		});
	} else if (sidebarDisplayFlag == 1) {
		$("#sidebar").css({
			"right": ""
		});
	} else {
		alert("Error (3): Flag was set to incorrect value.");
	}
}
function toggleResumeButtonDisplay() {
	if (resumeButtonDisplayFlag == 0) {
		$("#resumeButton").css({
			"right": "-220px"
		});
	} else if (resumeButtonDisplayFlag == 1) {
		$("#resumeButton").css({
			"right": ""
		});
	} else {
		alert("Error (3): Flag was set to incorrect value.");
	}
}
function toggleCVButtonDisplay() {
	if (cvButtonDisplayFlag == 0) {
		$("#cvButton").css({
			"right": "-157px"
		});
	} else if (cvButtonDisplayFlag == 1) {
		$("#cvButton").css({
			"right": ""
		});
	} else {
		alert("Error (3): Flag was set to incorrect value.");
	}
}
function displayPageName(index) {
	var pageName;
	pageName = pageNames[index];
	$("#footerText").text(pageName);
}

/* -------------------- --------------- -------------------- */
/* -------------------- Click Functions -------------------- */
/* -------------------- --------------- -------------------- */
$(".footerButton").click(function () {
	var windowWidth = $(window).width();
	var previousIndex = pageIndex;
	pageIndex = $(this).index();

	if (previousIndex != pageIndex) {
		offsetPages(pageIndex, windowWidth);
		toggleActivePage(previousIndex, pageIndex);

		if (pageIndex != 0) {
			$("#introText").css({
				"opacity": "0"
			});
		} else if (pageIndex == 0) {
			$("#introText").css({
				"opacity": "1"
			});
		} else {
			alert("Error (1): Current page index is incorrect.");
		}
	}

	displayPageName(pageIndex);
});

/* -------------------- --------------- -------------------- */
/* -------------------- Hover Functions -------------------- */
/* -------------------- --------------- -------------------- */
$(".footerButton").hover(
	function () {
		displayPageName($(this).index());
	}, function () {
		displayPageName(pageIndex);
	}
);

$(".platform, .job, .project, .invention, .award").hover(
	function () {
		const element = $(this);
		const windowWidth = $(window).width();
		const sidebarWidth = $("#sidebar").width();
		const resumeButtonWidth = $("#resumeButton").width();
		const cvButtonWidth = $("#cvButton").width();
		const elementPosition = element.position().left + element.width();

		// Hide buttons if overlapping
		if (elementPosition > (windowWidth - sidebarWidth - sidebarDisplayTolerance)) {
			sidebarDisplayFlag = 0;
			toggleSidebarDisplay();
		}

		if (elementPosition > (windowWidth - resumeButtonWidth - resumeButtonDisplayTolerance)) {
			resumeButtonDisplayFlag = 0;
			toggleResumeButtonDisplay();
		}

		if (elementPosition > (windowWidth - cvButtonWidth - cvButtonDisplayTolerance)) {
			cvButtonDisplayFlag = 0;
			toggleCVButtonDisplay();
		}
	}, function () {
		if (sidebarDisplayFlag == 0) {
			sidebarDisplayFlag = 1;
			toggleSidebarDisplay();
		}
		if (resumeButtonDisplayFlag == 0) {
			resumeButtonDisplayFlag = 1;
			toggleResumeButtonDisplay();
		}
		if (cvButtonDisplayFlag == 0) {
			cvButtonDisplayFlag = 1;
			toggleCVButtonDisplay();
		}

		var inventionIndex = $(this).index() - inventionIndexAdjust;
		$(".background").eq(inventionIndex + $(".platform").length + $(".job").length).css({
			"opacity": ""
		});
		$(".inventionDescription").eq(inventionIndex).css({
			"opacity": ""
		});
	},
	function () {
		// Reset buttons conditionally
		const element = $(this);
		const windowWidth = $(window).width();
		const sidebarWidth = $("#sidebar").width();
		const resumeButtonWidth = $("#resumeButton").width();
		const cvButtonWidth = $("#cvButton").width();
		const elementPosition = element.position().left + element.width();

		if (elementPosition <= (windowWidth - sidebarWidth - sidebarDisplayTolerance)) {
			sidebarDisplayFlag = 1;
			toggleSidebarDisplay();
		}

		if (elementPosition <= (windowWidth - resumeButtonWidth - resumeButtonDisplayTolerance)) {
			resumeButtonDisplayFlag = 1;
			toggleResumeButtonDisplay();
		}

		if (elementPosition <= (windowWidth - cvButtonWidth - cvButtonDisplayTolerance)) {
			cvButtonDisplayFlag = 1;
			toggleCVButtonDisplay();
		}

		// Remove highlight effect
		const indexAdjust = $(".platform").length + $(".job").length + $(".project").length;
		const elementIndex = element.index() - indexAdjust;
		$(".background").eq(elementIndex).css({ "opacity": "" });
		$(".description").eq(elementIndex).css({ "opacity": "" });
	}
);

// Ensure that the platform's content is visible on hover
$(".platform").hover(
	function () {
		// Get the index of the current platform
		let platformIndex = $(this).index() - platformIndexAdjust;

		// Dim the background slightly
		$(".background").eq(platformIndex).css({
			"opacity": "0.5" // Adjust for visibility
		});

		// Make the description content fully visible
		$(".platformDescription").eq(platformIndex).css({
			"opacity": "1"
		});
	},
	function () {
		// Reset the styles when the mouse leaves the platform
		let platformIndex = $(this).index() - platformIndexAdjust;

		$(".background").eq(platformIndex).css({
			"opacity": "1" // Restore original background opacity
		});

		$(".platformDescription").eq(platformIndex).css({
			"opacity": "0" // Hide the description
		});
	}
);

// Ensure that the job's content is visible on hover
$(".job").hover(
	function () {
		// Get the index of the current job
		let jobIndex = $(this).index() - jobIndexAdjust;

		// Dim the background slightly
		$(".background").eq(jobIndex).css({
			"opacity": "0.5" // Adjust for visibility
		});

		// Make the description content fully visible
		$(".jobDescription").eq(jobIndex).css({
			"opacity": "1"
		});
	},
	function () {
		// Reset the styles when the mouse leaves the job
		let jobIndex = $(this).index() - jobIndexAdjust;

		$(".background").eq(jobIndex).css({
			"opacity": "1" // Restore original background opacity
		});

		$(".jobDescription").eq(jobIndex).css({
			"opacity": "0" // Hide the description
		});
	}
);

// Ensure that the project's content is visible on hover
$(".project").hover(
	function () {
		// Get the index of the current project
		let projectIndex = $(this).index() - projectIndexAdjust;

		// Dim the background slightly
		$(".background").eq(projectIndex).css({
			"opacity": "0.5" // Adjust for visibility
		});

		// Make the description content fully visible
		$(".projectDescription").eq(projectIndex).css({
			"opacity": "1"
		});
	},
	function () {
		// Reset the styles when the mouse leaves the project
		let projectIndex = $(this).index() - projectIndexAdjust;

		$(".background").eq(projectIndex).css({
			"opacity": "1" // Restore original background opacity
		});

		$(".projectDescription").eq(projectIndex).css({
			"opacity": "0" // Hide the description
		});
	}
);

// Ensure that the invention's content is visible on hover
$(".invention").hover(
	function () {
		// Get the index of the current invention
		let inventionIndex = $(this).index() - inventionIndexAdjust;

		// Dim the background slightly
		$(".background").eq(inventionIndex).css({
			"opacity": "0.5" // Adjust for visibility
		});

		// Make the description content fully visible
		$(".inventionDescription").eq(inventionIndex).css({
			"opacity": "1"
		});
	},
	function () {
		// Reset the styles when the mouse leaves the invention
		let inventionIndex = $(this).index() - inventionIndexAdjust;

		$(".background").eq(inventionIndex).css({
			"opacity": "1" // Restore original background opacity
		});

		$(".inventionDescription").eq(inventionIndex).css({
			"opacity": "0" // Hide the description
		});
	}
);

// Ensure that the awards's content is visible on hover
$(".award").hover(
	function () {
		// Get the index of the current award
		let awardIndex = $(this).index() - awardIndexAdjust;

		// Dim the background slightly
		$(".background").eq(awardIndex).css({
			"opacity": "0.5" // Adjust for visibility
		});

		// Make the description content fully visible
		$(".awardDescription").eq(awardIndex).css({
			"opacity": "1"
		});
	},
	function () {
		// Reset the styles when the mouse leaves the award
		let awardIndex = $(this).index() - awardIndexAdjust;

		$(".background").eq(awardIndex).css({
			"opacity": "1" // Restore original background opacity
		});

		$(".awardDescription").eq(awardIndex).css({
			"opacity": "0" // Hide the description
		});
	}
);

// Automatically apply lazy loading to all images on the page
$(document).ready(function() {
    $('img').attr('loading', 'lazy');
});

// Mobile Swipe Navigation
let touchstartX = 0;
let touchendX = 0;

function handleGesture() {
    const windowWidth = $(window).width();
    const previousIndex = pageIndex;

    if (touchendX < touchstartX - 50) {
        // Swiped Left -> Go to Next Page
        if (pageIndex < totalPages - 1) pageIndex++;
    }
    if (touchendX > touchstartX + 50) {
        // Swiped Right -> Go to Previous Page
        if (pageIndex > 0) pageIndex--;
    }

    if (previousIndex !== pageIndex) {
        offsetPages(pageIndex, windowWidth);
        toggleActivePage(previousIndex, pageIndex);
        displayPageName(pageIndex);
        // Sync the logo and intro text opacity
        $("#introText").css("opacity", pageIndex === 0 ? "1" : "0");
    }
}

document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleGesture();
});

/* -------------------- --------------- -------------------- */
/* -------------------- Google Tracking -------------------- */
/* -------------------- --------------- -------------------- */
(function (i, s, o, g, r, a, m) {
	i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
		(i[r].q = i[r].q || []).push(arguments)
	}, i[r].l = 1 * new Date(); a = s.createElement(o),
		m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-69516450-3', 'auto');
ga('send', 'pageview');

