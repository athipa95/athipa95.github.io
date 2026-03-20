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
var portfolioButtonDisplayFlag = 1; // indicates if the portfolio button should be displayed
var legendDisplayFlag = 1; // indicates if the legend should be displayed
var sidebarDisplayTolerance = 30; // tolerance to decide to display sidebar or not
var resumeButtonDisplayTolerance = 30; // tolerance to decide to display resume button or not
var cvButtonDisplayTolerance = 30; // tolerance to decide to display cv button or not
var portfolioButtonDisplayTolerance = 30; // tolerance to decide to display portfolio button or not
var legendDisplayTolerance = 30; // tolerance to decide to display legend or not


var platformIndexAdjust = $("#contentPage1").children().length - $(".platform").length - 1; // Adjustment to platform index
var jobIndexAdjust = $("#contentPage2").children().length - $(".job").length - 1; // Adjustment to job index
var projectIndexAdjust = $("#contentPage3").children().length - $(".project").length - 1; // Adjustment to project index
var inventionIndexAdjust = $("#contentPage4").children().length - $(".invention").length - 1; // Adjustment to invention index
var awardIndexAdjust = $("#contentPage5").children().length - $(".award").length - 1; // Adjustment to award index

/* -------------------- ------------- -------------------- */
/* -------------------- Window Resize -------------------- */
/* -------------------- ------------- -------------------- */

// Force the Home background to be active immediately on load
$(document).ready(function () {
	$(".bg-layer").removeClass("active"); // Clear any browser-cached classes
	$("#bg0").addClass("active"); // Lock in the Galaxy_1.avif for Home
});

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

	if ((portfolioButtonDisplayFlag) && (windowWidth < 875)) {
		$("#portfolioButton").addClass("hidden");
		portfolioButtonDisplayFlag = 0;
	} else if ((!portfolioButtonDisplayFlag) && windowWidth >= 875) {
		$("#portfolioButton").removeClass("hidden");
		portfolioButtonDisplayFlag = 1;
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
	// Only slide pages if the screen is wider than 800px (PC/Inner Fold)
	if (windowWidth > 800) {
		var offset = (-index) * windowWidth;
		for (var i = 0; i < totalPages; i++) {
			$(".page").eq(i).css({
				"left": offset + (windowWidth * i) + "px",
				"position": "absolute" // Keep original sliding logic
			});
		}
	} else {
		// Reset positions for vertical stacking on mobile
		$(".page").css({
			"left": "0",
			"position": "relative",
			"width": "100%",
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
function togglePortfolioButtonDisplay() {
	if (portfolioButtonDisplayFlag == 0) {
		$("#portfolioButton").css({
			"right": "-180px"
		});
	} else if (portfolioButtonDisplayFlag == 1) {
		$("#portfolioButton").css({
			"right": ""
		});
	} else {
		alert("Error (3): Flag was set to incorrect value.");
	}
}
function toggleLegendDisplay() {
	if (legendDisplayFlag == 0) {
		$("#siteLegend").css({
			"left": "-160px", // Slides it fully off-screen to the left
			"opacity": "0"
		});
	} else if (legendDisplayFlag == 1 && pageIndex !== 0) {
		$("#siteLegend").css({
			"left": "", // Returns to original position
			"opacity": "1"
		});
	}
}

function displayPageName(index) {
	var pageName;
	pageName = pageNames[index];
	$("#footerText").text(pageName);
}

// Function to handle legend visibility based on page
function updateLegendVisibility(index, windowWidth) {
	if (windowWidth > 800) {
		if (index === 0) {
			// Hide on Home Page
			$("#siteLegend").css({ "opacity": "0", "pointer-events": "none", "left": "-160px" });
		} else {
			// Show on all other pages
			$("#siteLegend").css({ "opacity": "1", "pointer-events": "auto", "left": "10px" });
		}
	}
}

/* -------------------- --------------- -------------------- */
/* -------------------- Click Functions -------------------- */
/* -------------------- --------------- -------------------- */
$(".footerButton").click(function () {
	var windowWidth = $(window).width();
	var previousIndex = pageIndex;
	var index = $(this).index(); // The button the user just tapped

	if (windowWidth <= 800) {
		// MOBILE: Instant UI sync + Smooth Scroll
		pageIndex = index; // Update the global tracker immediately
		toggleActivePage(previousIndex, pageIndex);
		displayPageName(pageIndex);

		const targetPage = $(".page").eq(index);
		$("html, body, main").animate({
			scrollTop: targetPage.offset().top - 60
		}, 800);

	} else {
		// PC: Standard Slider Logic
		pageIndex = index;
		if (previousIndex != pageIndex) {
			offsetPages(pageIndex, windowWidth);
			toggleActivePage(previousIndex, pageIndex);
			displayPageName(pageIndex);

			// Intro Text Opacity logic
			$("#introText").css("opacity", pageIndex === 0 ? "1" : "0");
			updateLegendVisibility(index, windowWidth);
		}
	}

	// Universal Background Switch
	$(".bg-layer").removeClass("active");
	$(".bg-layer").eq(pageIndex).addClass("active");
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
		const portfolioButtonWidth = $("#portfolioButton").width();
		const legendWidth = $("#siteLegend").outerWidth();
		const elementPosition = element.position().left + element.width();
		const cardLeftEdge = element.position().left;

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

		if (elementPosition > (windowWidth - portfolioButtonWidth - portfolioButtonDisplayTolerance)) {
			portfolioButtonDisplayFlag = 0;
			togglePortfolioButtonDisplay();
		}

		if (cardLeftEdge < (legendWidth + legendDisplayTolerance)) {
			legendDisplayFlag = 0;
			toggleLegendDisplay();
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
		if (portfolioButtonDisplayFlag == 0) {
			portfolioButtonDisplayFlag = 1;
			togglePortfolioButtonDisplay();
		}
		if (legendDisplayFlag == 0) {
			legendDisplayFlag = 1;
			toggleLegendDisplay();
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
		const portfolioButtonWidth = $("#portfolioButton").width();
		const legendWidth = $("#siteLegend").outerWidth();
		const elementPosition = element.position().left + element.width();
		const cardLeftEdge = element.position().left;

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

		if (elementPosition <= (windowWidth - portfolioButtonWidth - portfolioButtonDisplayTolerance)) {
			portfolioButtonDisplayFlag = 1;
			togglePortfolioButtonDisplay();
		}

		if (cardLeftEdge >= (legendWidth + legendDisplayTolerance)) {
			legendDisplayFlag = 1;
			toggleLegendDisplay();
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
$(document).ready(function () {
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

		// Switch Background Layers on Swipe
		$(".bg-layer").removeClass("active");
		$(".bg-layer").eq(pageIndex).addClass("active");

		// Sync the logo and intro text opacity
		$("#introText").css("opacity", pageIndex === 0 ? "1" : "0");
	}
}

// Tap-to-Expand Logic for Mobile
$(".platform, .job, .project, .invention, .award").on("click", function (e) {
	if ($(window).width() <= 800) {
		const card = $(this);
		const isExpanded = card.hasClass("expanded");

		// Close any other open cards first to mimic "mouse leave"
		$(".expanded").removeClass("expanded");

		if (!isExpanded) {
			card.addClass("expanded");
			// The following logic mirrors your PC hover functions exactly
			card.find(".background").css("opacity", "0.5");
			card.find("[class*='Description']").css("opacity", "1");
			card.find(".linksBar").css("opacity", "1");
		} else {
			// "Un-tap" to mimic mouse leave
			card.find(".background").css("opacity", "1");
			card.find("[class*='Description']").css("opacity", "0");
			card.find(".linksBar").css("opacity", "0");
		}
	}
});

document.addEventListener('touchstart', e => {
	touchstartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
	touchendX = e.changedTouches[0].screenX;
	handleGesture();
});

// Intersection Observer to update UI on scroll
const observerOptions = {
	root: null,
	rootMargin: '-25% 0px -25% 0px', // Triggers when the section is in the center 50% of screen
	threshold: 0
};

const observer = new IntersectionObserver((entries) => {
	if ($(window).width() <= 800) {
		entries.forEach(entry => {
			// Trigger as soon as the section enters the center detection zone
			if (entry.isIntersecting) {
				const index = $(".page").index(entry.target);
				const previousIndex = pageIndex;

				updateLegendVisibility(index, $(window).width());

				if (pageIndex !== index) {
					pageIndex = index;

					// Sync UI and Background
					toggleActivePage(previousIndex, pageIndex);
					displayPageName(pageIndex);

					$(".bg-layer").removeClass("active");
					$(".bg-layer").eq(pageIndex).addClass("active");
				}
			}
		});
	}
}, observerOptions);

// Tell the observer to watch all pages
document.querySelectorAll('.page').forEach(page => {
	observer.observe(page);
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

