/* Customizations for Accessibility */

var is_mobile = Math.min(window.screen.width, window.screen.height) < 768 || navigator.userAgent.indexOf("Mobi") > -1;
// todo: add eventlistener to detect switch between mobile and desktop use

/* MENU */


/* Set menu role for main menu */
var menu_ul = document.getElementById("nv-primary-navigation-top");
menu_ul.setAttribute("role","menu");
var menu_ul_mobile = document.getElementById("nv-primary-navigation-sidebar");
menu_ul_mobile.setAttribute("role","menu");

/* set role for main menu items first tier for li */
var menu_items = document.getElementsByClassName("menu-item");
for (let i = 0; i < menu_items.length; i++) {
  menu_items[i].setAttribute("role","menuitem");
}

/* add role presentation to every link apart from current page */
var links = menu_ul.getElementsByTagName("a");
for(var i = 0; i< links.length; i++) 
{
	if(links[i].hasAttribute("aria-current") == false) {
		links[i].setAttribute("role","presentation");
	}
}


// tag menu closing button
// Using document.querySelector()
// Get the first button element within the div
var curr_lang = document.getElementsByTagName('html')[0].getAttribute('lang');
// given the closing button is the only hamburger (or at least the first)
var button_items = document.getElementsByClassName("hamburger");
for (let i = 0; i < button_items.length; i++) {
	console.log(button_items[i])
	button_items[i].setAttribute("aria-label", (curr_lang == "de-DE") ? "Menü schließen" : "Close menu")
}

if (!is_mobile) {


	// Set menu items with submenus to aria-haspopup="true"
    var subMenus = document.getElementsByClassName("sub-menu"); 
	for ( var i = 0, len = subMenus.length; i < len; i++ ) {
		subMenus[i].parentNode.setAttribute( 'aria-haspopup', 'true' );
		if(curr_lang == 'de-DE'){
			subMenus[i].setAttribute('aria-label','Untermenü');
		} else {
			subMenus[i].setAttribute('aria-label','sub menu');
		}
		
		
		// add eventlistener for keyboard and mouse interaction and toggle expanded status
		subMenus[i].parentNode.setAttribute("aria-expanded","false");
		subMenus[i].parentNode.addEventListener('mouseover',menuMouseOver,true);
		subMenus[i].parentNode.addEventListener('mouseout',menuMouseOut,true);
		subMenus[i].parentNode.addEventListener('focusin',menuMouseOver,true);
		subMenus[i].parentNode.addEventListener('focusout',menuMouseOut,true);
	}


function menuMouseOver() {
		var self = this;
	if(this.getAttribute("aria-expanded")== "false")
		this.setAttribute("aria-expanded","true");
	}

function menuMouseOut() {
		var self = this;
	if(this.getAttribute("aria-expanded")== "true")
		this.setAttribute("aria-expanded","false");
	}
} 


/* Interaction in mobile menu is different */
if(is_mobile) {
	
 
// add current expand status to toggle button in mobile views 
var toggle_submenu_btn = document.getElementsByClassName("caret-wrap navbar-toggle");

toggle_submenu_btn[0].setAttribute("aria-expanded","true");
toggle_submenu_btn[0].addEventListener("click",toggleExpanded, true);

function toggleExpanded() {
	var self = this;
	if(this.getAttribute("aria-expanded")== "false") {
		this.setAttribute("aria-expanded","true");
	}
	else {
		this.setAttribute("aria-expanded","false");
	}
}
}

/** Manual visibility of footer content for language switch **/
var curr_lang = document.getElementsByTagName('html')[0].getAttribute('lang');

/* To get the JS path for the image, you can right-click on the corresponding element in DevTools and copy the JS path. If something should be changed in the menu, the code must be adapted accordingly. */
/* add some aria tags for screenreader in menu */
if(curr_lang == "de-DE") {
	/* skip image for screen reader and add aria-label for current language */
	var imgElementMenu = document.querySelector("#menu-item-1062-en > div > a > img");
	var aTag = document.querySelector("#menu-item-1062-en > div > a");
	aTag.setAttribute("aria-label", "Switch to English");
	imgElementMenu.setAttribute("aria-hidden", "true");

	
	/* add additional reading information for sub menu */
	var caretWraps = document.querySelectorAll('.caret-wrap');
	caretWraps.forEach(function(caretWrap) {
	  var menuLink = caretWrap.parentNode.querySelector('a');
	  var menuTitle = menuLink.querySelector('.menu-item-title-wrap').textContent;
	  var ariaLabel = caretWrap.getAttribute('aria-label');
	  caretWrap.setAttribute('aria-label', ' Öffne Untermenü für Menü-Eintrag ' + menuTitle);
	});
}
if(curr_lang == "en-US") {
	/* skip image for screen reader and add aria-label for current language */
	var imgElementMenu = document.querySelector("#menu-item-1129-de > div > a > img");
	var aTag = document.querySelector("#menu-item-1129-de > div > a");
	aTag.setAttribute("aria-label", "Switch to German");
	imgElementMenu.setAttribute("aria-hidden", "true");
	
	/* add additional reading information for sub menu */
	var caretWraps = document.querySelectorAll('.caret-wrap');
	caretWraps.forEach(function(caretWrap) {
	  var menuLink = caretWrap.parentNode.querySelector('a');
	  var menuTitle = menuLink.querySelector('.menu-item-title-wrap').textContent;
	  var ariaLabel = caretWrap.getAttribute('aria-label');
	  caretWrap.setAttribute('aria-label', ' Open sub menu for menu item ' + menuTitle);
	});
}


// hide english footer elements when german is selected 
// every footer widget has to be disabled separatly
if(curr_lang == "de-DE") {
	document.getElementById("declarations_footer_en").style.display = "none";
	document.getElementById("footer_researcher_en").style.display = "none";
	document.getElementById("footer_bmas_en").style.display = "none";
		document.getElementById("footer_address_en").style.display = "none";
}
if(curr_lang == "en-US") {
	document.getElementById("declarations_footer_de").style.display = "none";
	document.getElementById("footer_researcher_de").style.display = "none";
	document.getElementById("footer_bmas_de").style.display = "none";
		document.getElementById("footer_address_de").style.display = "none";
}

/* title style */
document.addEventListener('DOMContentLoaded', function() {
  var heading = document.querySelector('h1');
  var text = heading.innerText;
  var lines = text.split('\n');
  
  var formattedText = '';
  lines.forEach(function(line) {
    var lineWithBackground = '<span style="background-color: #276C3A; padding: 2px; line-height: 1.5; color: white;">' + line + '</span>';
    formattedText += lineWithBackground + '<br>';
  });
  
  heading.innerHTML = formattedText;
	
	var elements = document.querySelectorAll('.wp-block-file__button');
    elements.forEach(function(element) {
        var wrapperDiv = document.createElement('div');
        wrapperDiv.classList.add('wp-block-button', 'is-style-secondary');
        element.parentNode.insertBefore(wrapperDiv, element);
        wrapperDiv.appendChild(element);

        // Add classes to the <a> element
        element.classList = '';
        element.classList.add('wp-block-button__link', 'has-nv-dark-bg-color', 'has-nv-text-dark-bg-background-color', 'has-text-color', 'has-background', 'wp-element-button');
    });
    var elements = document.querySelectorAll('a[href*="Flyer"]');
	elements.forEach(function(element) {
        if (curr_lang == "en-US") {
			element.textContent = "Download flyer";
        } else if (curr_lang == "de-DE") {
			element.textContent = "Flyer herunterladen";
        }
    });
});


/* change the font size for all posts */
jQuery(document).ready(function($) {

  var headings = $('.nv-post-cover .title.entry-title');

  headings.css('font-size', '3rem');

});

/* make whole posts clickable */
jQuery(document).ready(function($) {
    $('.pgafu-post-grid').click(function() {
        window.location = $(this).find("a").attr("href"); 
        return false;
    });
});



