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
	$(".footerButton").eq(previousIndex).addClass("icon");

	$(".footerButton").eq(currentIndex).addClass("active");
	$(".footerButton").eq(currentIndex).removeClass("notActive");
	$(".footerButton").eq(currentIndex).removeClass("icon");

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
// $(".platform").hover(
// 	function () {
// 		var windowWidth = $(window).width();
// 		var sidebarWidth = $("#sidebar").width();
// 		var resumeButtonWidth = $("#resumeButton").width();
// 		var cvButtonWidth = $("#cvButton").width();
// 		var platformPosition = $(this).position().left + $(this).width();

// 		if (platformPosition > (windowWidth - sidebarWidth - sidebarDisplayTolerance)) {
// 			sidebarDisplayFlag = 0;
// 			toggleSidebarDisplay();
// 		}

// 		if (platformPosition > (windowWidth - resumeButtonWidth - resumeButtonDisplayTolerance)) {
// 			resumeButtonDisplayFlag = 0;
// 			toggleResumeButtonDisplay();
// 		}

// 		if (platformPosition > (windowWidth - cvButtonWidth - cvButtonDisplayTolerance)) {
// 			cvButtonDisplayFlag = 0;
// 			toggleCVButtonDisplay();
// 		}

// 		var platformIndex = $(this).index() - platformIndexAdjust;
// 		$(".background").eq(platformIndex).css({
// 			"opacity": "0.2"
// 		});
// 		$(".platformDescription").eq(platformIndex).css({
// 			"opacity": "1"
// 		});
// 	}, function () {
// 		if (sidebarDisplayFlag == 0) {
// 			sidebarDisplayFlag = 1;
// 			toggleSidebarDisplay();
// 		}
// 		if (resumeButtonDisplayFlag == 0) {
// 			resumeButtonDisplayFlag = 1;
// 			toggleResumeButtonDisplay();
// 		}
// 		if (cvButtonDisplayFlag == 0) {
// 			cvButtonDisplayFlag = 1;
// 			toggleCVButtonDisplay();
// 		}

// 		var platformIndex = $(this).index() - platformIndexAdjust;
// 		$(".background").eq(platformIndex).css({
// 			"opacity": ""
// 		});
// 		$(".platformDescription").eq(platformIndex).css({
// 			"opacity": ""
// 		});
// 	}
// );
// $(".job").hover(
// 	function () {
// 		var windowWidth = $(window).width();
// 		var sidebarWidth = $("#sidebar").width();
// 		var resumeButtonWidth = $("#resumeButton").width();
// 		var cvButtonWidth = $("#cvButton").width();
// 		var jobPosition = $(this).position().left + $(this).width();

// 		if (jobPosition > (windowWidth - sidebarWidth - sidebarDisplayTolerance)) {
// 			sidebarDisplayFlag = 0;
// 			toggleSidebarDisplay();
// 		}

// 		if (platformPosition > (windowWidth - resumeButtonWidth - resumeButtonDisplayTolerance)) {
// 			resumeButtonDisplayFlag = 0;
// 			toggleResumeButtonDisplay();
// 		}

// 		if (platformPosition > (windowWidth - cvButtonWidth - cvButtonDisplayTolerance)) {
// 			cvButtonDisplayFlag = 0;
// 			toggleCVButtonDisplay();
// 		}

// 		var jobIndex = $(this).index() - jobIndexAdjust;
// 		$(".background").eq(jobIndex + $(".platform").length).css({
// 			"opacity": "0.2"
// 		});
// 		$(".jobDescription").eq(jobIndex).css({
// 			"opacity": "1"
// 		});
// 	}, function () {
// 		if (sidebarDisplayFlag == 0) {
// 			sidebarDisplayFlag = 1;
// 			toggleSidebarDisplay();
// 		}
// 		if (resumeButtonDisplayFlag == 0) {
// 			resumeButtonDisplayFlag = 1;
// 			toggleResumeButtonDisplay();
// 		}
// 		if (cvButtonDisplayFlag == 0) {
// 			cvButtonDisplayFlag = 1;
// 			toggleCVButtonDisplay();
// 		}

// 		var jobIndex = $(this).index() - jobIndexAdjust;
// 		$(".background").eq(jobIndex + $(".platform").length).css({
// 			"opacity": ""
// 		});
// 		$(".jobDescription").eq(jobIndex).css({
// 			"opacity": ""
// 		});
// 	}
// );
// $(".project").hover(
// 	function () {
// 		var windowWidth = $(window).width();
// 		var sidebarWidth = $("#sidebar").width();
// 		var resumeButtonWidth = $("#resumeButton").width();
// 		var cvButtonWidth = $("#cvButton").width();
// 		var projectPosition = $(this).position().left + $(this).width();

// 		if (projectPosition > (windowWidth - sidebarWidth - sidebarDisplayTolerance)) {
// 			sidebarDisplayFlag = 0;
// 			toggleSidebarDisplay();
// 		}

// 		if (platformPosition > (windowWidth - resumeButtonWidth - resumeButtonDisplayTolerance)) {
// 			resumeButtonDisplayFlag = 0;
// 			toggleResumeButtonDisplay();
// 		}

// 		if (platformPosition > (windowWidth - cvButtonWidth - cvButtonDisplayTolerance)) {
// 			cvButtonDisplayFlag = 0;
// 			toggleCVButtonDisplay();
// 		}

// 		var projectIndex = $(this).index() - projectIndexAdjust;
// 		$(".background").eq(projectIndex + $(".platform").length + $(".job").length).css({
// 			"opacity": "0.2"
// 		});
// 		$(".projectDescription").eq(projectIndex).css({
// 			"opacity": "1"
// 		});
// 	}, function () {
// 		if (sidebarDisplayFlag == 0) {
// 			sidebarDisplayFlag = 1;
// 			toggleSidebarDisplay();
// 		}
// 		if (resumeButtonDisplayFlag == 0) {
// 			resumeButtonDisplayFlag = 1;
// 			toggleResumeButtonDisplay();
// 		}
// 		if (cvButtonDisplayFlag == 0) {
// 			cvButtonDisplayFlag = 1;
// 			toggleCVButtonDisplay();
// 		}

// 		var projectIndex = $(this).index() - projectIndexAdjust;
// 		$(".background").eq(projectIndex + $(".platform").length + $(".job").length).css({
// 			"opacity": ""
// 		});
// 		$(".projectDescription").eq(projectIndex).css({
// 			"opacity": ""
// 		});
// 	}
// );

// $(".invention").hover(
// 	function () {
// 		var windowWidth = $(window).width();
// 		var sidebarWidth = $("#sidebar").width();
// 		var resumeButtonWidth = $("#resumeButton").width();
// 		var cvButtonWidth = $("#cvButton").width();
// 		var inventionPosition = $(this).position().left + $(this).width();

// 		if (inventionPosition > (windowWidth - sidebarWidth - sidebarDisplayTolerance)) {
// 			sidebarDisplayFlag = 0;
// 			toggleSidebarDisplay();
// 		}

// 		if (platformPosition > (windowWidth - resumeButtonWidth - resumeButtonDisplayTolerance)) {
// 			resumeButtonDisplayFlag = 0;
// 			toggleResumeButtonDisplay();
// 		}

// 		if (platformPosition > (windowWidth - cvButtonWidth - cvButtonDisplayTolerance)) {
// 			cvButtonDisplayFlag = 0;
// 			toggleCVButtonDisplay();
// 		}

// 		var inventionIndex = $(this).index() - inventionIndexAdjust;
// 		$(".background").eq(inventionIndex + $(".platform").length + $(".job").length).css({
// 			"opacity": "0.2"
// 		});
// 		$(".inventionDescription").eq(inventionIndex).css({
// 			"opacity": "1"
// 		});
// 	}, function () {
// 		if (sidebarDisplayFlag == 0) {
// 			sidebarDisplayFlag = 1;
// 			toggleSidebarDisplay();
// 		}
// 		if (resumeButtonDisplayFlag == 0) {
// 			resumeButtonDisplayFlag = 1;
// 			toggleResumeButtonDisplay();
// 		}
// 		if (cvButtonDisplayFlag == 0) {
// 			cvButtonDisplayFlag = 1;
// 			toggleCVButtonDisplay();
// 		}

// 		var inventionIndex = $(this).index() - inventionIndexAdjust;
// 		$(".background").eq(inventionIndex + $(".platform").length + $(".job").length).css({
// 			"opacity": ""
// 		});
// 		$(".inventionDescription").eq(inventionIndex).css({
// 			"opacity": ""
// 		});
// 	}
// );

$(".platform, .job, .project, .invention").hover(
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

		// Highlight effect
		const indexAdjust = $(".platform").length + $(".job").length + $(".project").length;
		const elementIndex = element.index() - indexAdjust;
		$(".background").eq(elementIndex).css({ "opacity": "0.2" });
		$(".description").eq(elementIndex).css({ "opacity": "1" });
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

$("#sidebar").hover(
	function () {
		// Always show the sidebar when hovering over it
		sidebarDisplayFlag = 1;
		toggleSidebarDisplay();
	},
	function () {
		// Allow normal sidebar behavior when leaving the hover
		if (!$(".platform:hover, .job:hover, .project:hover, .invention:hover").length) {
			sidebarDisplayFlag = 0;
			toggleSidebarDisplay();
		}
	}
);

// window.addEventListener('scroll', function () {
// 	var scrollPosition = window.scrollY;
// 	var windowHeight = window.innerHeight;

// 	document.getElementById('intro').style.opacity =
// 		Math.max(0, 1 - scrollPosition / windowHeight);
// 	document.getElementById('page1').style.opacity =
// 		Math.max(0, Math.min(1, (scrollPosition - windowHeight) / windowHeight));
// 	document.getElementById('page2').style.opacity =
// 		Math.max(0, Math.min(1, (scrollPosition - windowHeight) / windowHeight));
// 	document.getElementById('page3').style.opacity =
// 		Math.max(0, Math.min(1, (scrollPosition - windowHeight) / windowHeight));
// 	document.getElementById('page4').style.opacity =
// 		Math.max(0, Math.min(1, (scrollPosition - windowHeight) / windowHeight));
// });


// /* -------------------- ----------------------- -------------------- */
// /* -------------------- Contact Form Submission -------------------- */
// /* -------------------- ----------------------- -------------------- */
// $("#contentPage3").submit(function (e) {
// 	e.preventDefault();
// 	$.ajax({
// 		url: "https://formspree.io/f/mjkkeweq",
// 		method: "POST",
// 		data: { name: $("#userName").val(), _replyto: $("#userEmail").val(), message: $("#userMessage").val() },
// 		dataType: "json"
// 	});

// 	setTimeout(function () {
// 		clearForm();
// 	}, 1000);
// });

// function clearForm() {
// 	var elems = document.getElementsByTagName("input");
// 	var l = elems.length - 1;
// 	for (var i = 0; i < l; ++i) {
// 		elems[i].value = "";
// 	}
// 	$("textarea").val("");

// 	alert("Contact request sent.");
// }

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


