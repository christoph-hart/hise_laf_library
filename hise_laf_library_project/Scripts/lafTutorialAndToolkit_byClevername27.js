
/* --------------------------------------------------------------------------

                                                                         
                   HISE LAF TOOLKIT AND TUTORIAL v1.0.1                  
                                                                         
 Copyright © 2023 Bill Evans and his ferret pals.                        
                                                                         
 Permission is hereby granted, free of charge, to any person obtaining a 
 copy of this software and associated documentation files (the           
 “Software”), to deal in the Software without restriction, including     
 without limitation the rights to use, copy, modify, merge, publish,     
 distribute, sublicense, and/or sell copies of the Software, and to      
 permit persons to whom the Software is furnished to do so, subject to   
 the following conditions:                                               
                                                                         
 The above copyright notice and this permission notice shall be included 
 in all copies or substantial portions of the Software.                  
                                                                         
 THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS 
 OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF              
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  
 IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY    
 CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,    
 TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE       
 SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                                                                         
-----------------------------------------------------------------------------

 This is a toolkit of the UI widgets from my plugin, formatted to teach
 the styling of HISE GUI components. It doubles as a read-to-use widget 
 library for HISE.
 
 For teaching, the code is often more verbose, and the variable 
 names more descriptive, than normal. Additionally, each widget 
 has an introduction explaining its functionality, and most 
 lines are commented. In place of numerical parameters, design values
 are set and explained as separate variables.

 Each widget is presented in all of the states that I designed for it
 on the HISE canvas, so you can experiment with it. Since this is 
 a toolkit for my own plugin, I have included the specific
 customisations I required, and this may be a logical jumping
 off point for your own code.

 Once you've learned the basics, you might want to check out 
 David Healey's standards and practices guide for writing code in HISE.

 Some of these widgets are replacements for HISE widgets, 
 others are logical derivations, and some are quite specific
 to my particular plugin. Together, they provide a comprehensive
 GUI toolset to customise.

 Many of the widgets have more customisable style parameters 
 their HISE counterparts, and here is will you'll see how to 
 alter what you want to change in your own LAFs. In some case, 
 the LAF code is more complex than for simply drawing the
 widget, in order for them to scale properly.

 One of the most common enhancements is the ability to choose the 
 widget's indicator colour. You may wish to have specific instances 
 of the same widget with difference indicator colours. There are many 
 ways to do this. In my own plugin, I use a SWITCH statement inside 
 the LAF function to determine the widget's ID; then, I use CASE 
 statements to specify which specific colours to assign to the 
 indicator colour variable (or any other colours I wish to change.)

 Another common enhancement is mouse-over states. They are usually
 implemented for all of a widget's states. The colour selection is
 performed automatically by using transparency.

 I have adhered to most of the HISE code formatting guidelines, with these
 exceptions based on the nature of this toolkit as a tutorial.
 
 • All comments are formatted with line comments ("/"). This allows
   block comments ("/*") to be used for disabling any contiguous code
   in this toolkit. Block comments are usedfor this header block.
 • Extra line spacing is used to increase readability.
 • K&R in lieu of Allman style indentation to eliminate uneeded vertical 
   space and increase program-flow readability.

 Good luck, and please share any enhancements or corrections on
 the HISE forum. My thanks to David Healey; I recommend his Patreon and 
 course as learning resources.

-------------------------------------------------------------------------- */

////////////////////////////// GETTING STARTED //////////////////////////////
//
// Before you compile, place the fonts you want to use in the Images folder
// of your Project folder. I'd suggest a standard font, and a bold version.
// Then, go to the next section (Toolkit Constants), and replacee the name 
// of the two fonts (medium and bold) with the fonts' files names.
// Then, you're ready to compiles!
//
/////////////////////////////////////////////////////////////////////////////

///////////////////////////// TOOLKIT CONSTANTS /////////////////////////////
//
// ------------- Description
//
// These constants are used for mulitple widgets in the toolkit.
//
/////////////////////////////////////////////////////////////////////////////

// ------------- HISE Constants

// Define HISE Constants.
const WIDGET_STARTX = 0;
const WIDGET_STARTY = 1;
const WIDGET_WIDTH = 2;
const WIDGET_HEIGHT = 3;
const COMPONENT_BGCLOUOR = 0;
const COMPONENT_ITEMCOLOUR1 = 1;
const COMPONENT_ITEMCOLOUR2 = 2;
const COMPONENT_TEXTCOLOUR = 3;

// Define default colors.
const BUTTONWELL_TOPLEFT_GRADIENT_COLOUR = 0xFF28282D;
const BUTTONWELL_BOTTOMRIGHT_GRADIENT_COLOUR = 0xFF474751;
const WIDGETOFF_INDICATOR_COLOUR = 0xFF5A5B5C;

// ------------- Toolkit Default Fonts

// Load the fonts from the "Images" folder in your project folder.
//Engine.loadFontAs("{PROJECT_FOLDER}oxygen.regular.ttf", 'OxygenRegular');
//Engine.loadFontAs("{PROJECT_FOLDER}oxygen.bold.ttf", 'OxygenBold');


// Define the font defaults.
const DEFAULT_MEDIUMFONT = "OxygenRegular";
const DEFAULT_BOLDFONT = "OxygenBold";
const DEFAULT_LABEL_FONTSIZE = 12;
const DEFAULT_SMALL_FONTSIZE = 10;

///////////////////////////// TEXTLESS BUTTON ///////////////////////////////
//
// ------------- Description
//
// This button is designed to be used for master toggle states. Therefore, 
// it is not meant to ever be disabled, and has no defined disabled LAF. As 
// a master toggle, it has no text legend. It features mouse-over styles 
// for both on and off states.
//
// ------------- Inspector Colour Mapping
//
// This LAF maps the same Colours (in the Inspector) as HISE's button.
//
// bgColour for the border.
// itemColour is the top gradient of the button's surface.
// itemColour2 bottom gradient of the button's surface.
// textColour is unused.
//	
/////////////////////////////////////////////////////////////////////////////

// Create an LAF for the widget.
const LAF_textlessButton = Content.createLocalLookAndFeel();

// Define the LAF function.
LAF_textlessButton.registerFunction("drawToggleButton", function(graphics, widget) {
	
	// ------------- Initialisation
	
	// Create descriptive variables name for the widget's properties.		
	var widgetArea = widget.area;
	var widgetHeight = widget.area[WIDGET_HEIGHT];
	var widgetWidth = widget.area[WIDGET_WIDTH];
	var widgetWIDGET_STARTX = widget.area[WIDGET_STARTX];
	var widgetStartY = widget.area[WIDGET_STARTY];
	
	// Set customisable LAF variables.
	var widgetCornerSize = 4;
	var widgetBorderWidth = 1;
	var widgetIndicatorOffset = 6;
	var widgetWellRadius = 20;
	var widgetOnIndicatorColour = 0xFAE35BFF;
	var wellGradientColourTopLeft = 0xFF29292F;
	var wellGradientColourBottomRight = 0xFF41414B;
	var fillColour;
	
	// ------------- Button Surface
	
	// Dynamically generate varying opacities for various states. Hat 
	// tip to David Healey.
	var opacity = widget.over ? 1.0 - (widget.down * 0.2) : 0.8 - (widget.down * 0.2);
	
	// Create a colour gradient from itemColour1 to itemColour2.
	graphics.setGradientFill([Colours.withAlpha(widget.itemColour1, opacity), widgetWIDGET_STARTX, widgetStartY, Colours.withAlpha(widget.itemColour2, opacity), widgetWIDGET_STARTX, widgetHeight]);
	
	// Draw the surface.
	graphics.fillRoundedRectangle(widgetArea, widgetCornerSize);
	
	// ------------- Button Border
	
	// Set the colour.
	graphics.setColour(widget.bgColour);
	
	// Draw the border.
	graphics.drawRoundedRectangle([widgetWIDGET_STARTX, widgetStartY, widgetWidth, widgetHeight], widgetCornerSize, widgetBorderWidth);

	// ------------- Button Well

	// Create the gradient fill.
	graphics.setGradientFill([wellGradientColourTopLeft, widgetWIDGET_STARTX + ((widgetWidth / 2) - (widgetWellRadius / 2 )), widgetStartY + ((widgetHeight / 2) - (widgetWellRadius / 2)), wellGradientColourBottomRight, widgetWellRadius, widgetWellRadius]);

	// Draw the button well.
	graphics.fillEllipse([widgetWIDGET_STARTX + ((widgetWidth / 2) - (widgetWellRadius / 2 )), widgetStartY + ((widgetHeight / 2) - (widgetWellRadius / 2)), widgetWellRadius, widgetWellRadius]);
	
	// ------------- Button Value Indicator
	
	// Draw the button's indicator circle, with colour dependent on the button's state.
	if (widget.value == true) { 
		
		// Set the colour to the widget's indicator colour (specified in this function).
		fillColour = widgetOnIndicatorColour; 
	
	} else { 

		// Use the default colour for the widget-off state.
		fillColour = WIDGETOFF_INDICATOR_COLOUR;
	}
	
	// Adjust the transparency of the colour to show mouse-over states.
	graphics.setColour(Colours.withAlpha(fillColour, widget.over ? 1.0 : 0.7));
	
	// Draw the button value indicator.
	graphics.fillEllipse([widgetWIDGET_STARTX + ((widgetWidth / 2) - ((widgetWellRadius-widgetIndicatorOffset) / 2)), widgetStartY + ((widgetHeight / 2) - ((widgetWellRadius-widgetIndicatorOffset) / 2)), widgetWellRadius-widgetIndicatorOffset, widgetWellRadius-widgetIndicatorOffset]);	
});

///////////////////////////////// STANDARD BUTTON ///////////////////////////
//
// ------------- Description
//
// This is a drop-in replacement for HISE's standard button. You can simply 
// assign this LAF to your existing button, and it will maintain it's 
// existing style you specified in the Inspector. The customisable LAF 
// variables I've added enable additional control over look and feel for:
//
// • Mouse-over events (all button state configurations).
// • Indicator values (off and on).
// • Disabled state colours (all graphic elements).
//
// ------------- Inspector Colour Mapping
//
// This LAF maps the same Colours (in the Inspector) as HISE's button.
//
// • bgColour for the border.
// • itemColour is the top gradient of the button's's surface.
// • itemColour2 bottom gradient of the button's's surface.
// • textColour is for the text legend.
//
/////////////////////////////////////////////////////////////////////////////
	
	// Create an LAF for the widget.
	const LAF_standardButton = Content.createLocalLookAndFeel ();
	
	// Toggle Button for Sections
	LAF_standardButton.registerFunction("drawToggleButton", function(graphics, widget) {


	// ------------- Initialisation

	// Create descriptive variables name for the widget's properties.
	var widgetArea = widget.area;
	var widgetHeight = widget.area[WIDGET_HEIGHT];
	var widgetWidth = widget.area[WIDGET_WIDTH];
	var widgetWIDGET_STARTX = widget.area[WIDGET_STARTX];
	var widgetStartY = widget.area[WIDGET_STARTY];
	var widgetOn = widget.value;
	
	// Set customisable LAF variables.
	var widgetCornerSize = 4;
	var widgetBorderWidth = 1;
	var widgetWellLeftOffset = 7;
	var widgetWellRadius = 14;
	var widgetIndicatorColour = 0xFF9090FF;
	var widgetIndicatorInset = 5;
	var widgetHorizontalLegendOffset = 4;
	var widgetVerticalTextCentreOffset = -1;
	var surfaceRounding = 4;
	var wellGradientColourTopLeft = 0xFF28282D;
	var wellGradientColourBottomRight = 0xFF474751;
	var fillColour;
	
	// ------------- Button Border
	
	// Draw Border around the button's surface. It's the same regardless 
	// of button's active state.
	graphics.setColour(widget.bgColour);
	graphics.drawRoundedRectangle([widgetWIDGET_STARTX, widgetStartY, widgetWidth, widgetHeight], widgetCornerSize, widgetBorderWidth);
	
	// ------------- Button Well
	
	// Create the button's gradient colours.
	graphics.setGradientFill([wellGradientColourTopLeft, widgetWellLeftOffset, widgetStartY + ((widgetHeight / 2) - (widgetWellRadius / 2)), wellGradientColourBottomRight, widgetWellRadius, widgetWellRadius]);

	//Draw button well.
	graphics.fillEllipse([widgetWellLeftOffset, widgetStartY + ((widgetHeight / 2) - (widgetWellRadius / 2)), widgetWellRadius, widgetWellRadius]);	

	// ------------- Button Surface
	
	 // Choose the colour(s).
	 if (widget.enabled) {	
	 	 
		// If the widget is enabled adjust it's transparency to show the different enabled states.
		var opacity = widget.over ? 1.0 - (widget.down * 0.2) : 0.8 - (widget.down * 0.2);

		// Create the gradient colour scheme.
		graphics.setGradientFill ([Colours.withAlpha (widget.itemColour1, opacity), widgetWIDGET_STARTX, widgetStartY, Colours.withAlpha(widget.itemColour2, opacity), widgetWIDGET_STARTX, widgetHeight]);

	} else {

		// Otherwise, significantly dim the widget.
		graphics.setColour (Colours.withAlpha (widget.itemColour2, 0.5));
	}

	// Draw the surface.
	graphics.fillRoundedRectangle (widgetArea, surfaceRounding);

	// ------------- Indicator Light
	
	// Choose the colour(s).
	if (widget.enabled) {
		
		// If the widget is on, use the indicator colour; otherwise, use the default widget-off colour.
		if (widget.value) { fillColour = widgetIndicatorColour; } else { fillColour = WIDGETOFF_INDICATOR_COLOUR; }
		
		// Set the colour.
		graphics.setColour(Colours.withAlpha (fillColour, widget.over ? 1.0 : 0.7) );
		
	} else {

		// If the button is disabled, use a drkened version of our default disabled indictor colour.
		graphics.setColour(Colours.withAlpha(WIDGETOFF_INDICATOR_COLOUR, 0.5)); 
	}
	
	// Draw the indicator.
	graphics.fillEllipse([widgetWellLeftOffset + (widgetIndicatorInset / 2), widgetStartY + ((widgetHeight / 2) - ((widgetWellRadius-widgetIndicatorInset) / 2)), widgetWellRadius-widgetIndicatorInset, widgetWellRadius-widgetIndicatorInset]);

	// ------------- Text Label
	
	// Set the font.
	graphics.setFont(DEFAULT_MEDIUMFONT, DEFAULT_LABEL_FONTSIZE); 
	
	// Choose the colour.
	if (widget.enabled) {
			
		// If the button is on, use the textColour field. If not, dim this colour slightly using transparency.
		if (widget.value == true) { graphics.setColour (widget.textColour); } else { graphics.setColour(Colours.withAlpha(widget.textColour, 0.65)); }
		
	} else {
	
		// If it's disabled, dim it significntly using transparency.
		graphics.setColour(Colours.withAlpha(widget.textColour, 0.3));
	}
	
	// Draw the text.
	graphics.drawAlignedText(widget.text, [widgetWellLeftOffset + widgetWellRadius + widgetHorizontalLegendOffset, widgetVerticalTextCentreOffset, widgetWidth, widgetHeight], "left");
	
});

//////////////////////////////////// CHECKBOX ///////////////////////////////
//
// ------------- Description
//
// HISE's UI toolkit doesn't have a checkbox, but you can make one easily 
// enough from a HISE button using LAF. The customisable LAF variables I've 
// added enable additional control over look and feel for:
//
// • Mouse-over events (all button state configurations).
// • Indicator values (off and on).
// • Disabled state colours (all graphic elements).
//
// ------------- Inspector Colour Mapping
//
// This LAF maps the same Colours (in the Inspector) as HISE's button.
//
// • bgColour for the border.
// • itemColour is the surface.
// • itemColour2 is ignored; in the HISE button, this is used for a gradient. 
// • textColour is for text legend.
//
/////////////////////////////////////////////////////////////////////////////

// Create an LAF for the widget.
const LAF_Checkbox = Content.createLocalLookAndFeel();

// Define the look and feel function.
LAF_Checkbox.registerFunction("drawToggleButton", function(graphics, widget) {

	// ------------- Initialisation

	// Create descriptive variables name for the widget's properties.
	var widgetArea = widget.area;
	var widgetHeight = widget.area[WIDGET_HEIGHT];
	var widgetWidth = widget.area[WIDGET_WIDTH];
	var widgetWIDGET_STARTX = widget.area[WIDGET_STARTX];
	var widgetStartY = widget.area[WIDGET_STARTY];
	
	// Set customisable LAF variables.
	var widgetCornerSize = 2;
	var widgetBorderWidth = 1;
	var widgetIndicatorColour = 0xFAFFBA20;
	var widgetIndicatorInset = 3;
	var widgetHorizontalLegendOffset = 6;
	
	// ------------- Filled Box Drawing
	
	// Set the colour of the checkbox. Use transparency to change 
	// the brightness if the mouse is over it.
	graphics.setColour (Colours.withAlpha (widget.itemColour1, widget.over ? 1.0 : 0.8));
	
	// Draw the filled box. We use height twice because the 
	// button itself is a rectangle, but we want to draw a box.
	graphics.fillRoundedRectangle ([widgetWIDGET_STARTX, widgetStartY, widgetHeight, widgetHeight], widgetCornerSize);
	
	// ------------- Border
	
	// Set the colour of the border.
	graphics.setColour(widget.bgColour);
	
	// Draw the border. Once again, we use height twice because the 
	// button itself is a rectangle, but we want to draw a box.
	graphics.drawRoundedRectangle ([widgetWIDGET_STARTX, widgetStartY, widgetHeight, widgetHeight], widgetCornerSize, widgetBorderWidth);
	
	// ------------- Value Indicator
	
	// If the checkbox is checked, draw an indicator.
	if (widget.value == true) {
	
		// Set the colour of the checkbox. Use transparency to change the 
		// brightness if the mouse is over it.
		graphics.setColour (Colours.withAlpha (widgetIndicatorColour, widget.over ? 1.0 : 0.8));
		
		// Draw the value indicator, inset from the checkbox.
		graphics.fillRoundedRectangle ([widgetWIDGET_STARTX + widgetIndicatorInset, widgetStartY + widgetIndicatorInset, widgetHeight - (2 * widgetIndicatorInset), widgetHeight - (2 * widgetIndicatorInset)], widgetCornerSize);
	}
	
	// ------------- Text Label
	
	// Draw the text label only if there is one.
	if (widget.text != "")	{
		
		// Set the font face and size.
		graphics.setFont (DEFAULT_MEDIUMFONT, DEFAULT_LABEL_FONTSIZE);
		
		// Set the font colour.
		graphics.setColour (widget.textColour);
		
		// Draw the text, centrered vertically, offset from the checkbox, 
		// and left-justified.
		graphics.drawAlignedText (widget.text, [widgetHeight + widgetHorizontalLegendOffset, widgetStartY, widgetWidth - widgetHeight, widgetHeight], "left");
	}
});

//////////////////////////// STANDARD KNOB //////////////////////////////////
//
// This is a drop-in replacement for HISE's standard knob. You can simply 
// assign this LAF to your existing slider, and it will maintain it's 
// existing style you specified in the Inspector. The customisable LAF 
// variables I've added additional control over look and feel for:
//
// • Mouse-over events (all button state configurations).
// • Indicator values (off and on).
// • Separate colours for the text legend and value.
// • Disabled state colours (all graphic elements).
//
// ------------- Inspector Colour Mapping
//
// This LAF maps the same Colours (in the Inspector) as HISE's slider.
//
// • bgColour for the border.
// • itemColour is the top gradient of the knob surface.
// • itemColour2 bottom gradient of the knob surface.
// • textColour is the text legend.
//
/////////////////////////////////////////////////////////////////////////////

// ------------- Basic Operations

// Create an LAF for the widget.
const LAF_StandardKnob = Content.createLocalLookAndFeel();

// Register and define the drawing function for the knob.
LAF_StandardKnob.registerFunction ("drawRotarySlider", function (graphics,widget) {
	
	// ------------- Initialisation
	
	// Create descriptive variables name for the widget's properties.
	var widgetArea = widget.area;
	var widgetHeight = widget.area [WIDGET_HEIGHT];
	var widgetWidth = widget.area [WIDGET_WIDTH];
	var widgetWIDGET_STARTX = widget.area [WIDGET_STARTX];
	var widgetStartY = widget.area [WIDGET_STARTY];
		
	// Set customisable LAF variables.
	var widgetIndicatorColour = 0xFF00FF00;
	var enabledKnobwidgetValueColour = 0XFF838387;
	var disabledKnobwidgetValueColour= 0xFF424246;
	var widgetKnobActiveColour = 0xFFC1C1C2;
	var widgetKnobMargin = widgetHeight/4;
	var widgetHorizontalTextOffset = widgetHeight;
	var widgetLegendTextVerticalOffset = -8;
	var widgetValueTextVerticalOffset = 6;
	var widgetOffsetAdjustment = 0.08;
	var numberOfDecimalPlaces = 0;
	var opacity;

	// ------------- Knob Surface
	
	// Specify and store the knob's desired surface in an array.
	var KnobSurfaceArea = [widgetKnobMargin, widgetKnobMargin, widgetHeight - (2 * widgetKnobMargin), widgetHeight - ( 2* widgetKnobMargin)];

	// Set the knob surface's colour information.
	if (widget.enabled) {
		
		// If the the widget is enabled, and the mouse is over it or 
		// its been clicked, then set opacity to 100%; otherwise set 
		// it to 80%.
		if ( widget.hover || widget.clicked) { opacity = 1.0; } else { opacity = 0.8; }	
	
		// Create a colour gradient from itemColour1 to itemColour2 with 
		// whatever opacity was set.
		graphics.setGradientFill ([Colours.withAlpha(widget.itemColour1, opacity), widgetKnobMargin / 2, widgetKnobMargin / 2, Colours.withAlpha(widget.itemColour2, opacity), widgetHeight-widgetKnobMargin, widgetHeight-widgetKnobMargin]);
		
	} else {
	
		// If the widget isn't enabled, make the widget a dark, unform 
		// colour indicating that it is disabled. Don't show 
		// mouse-over changes.
		graphics.setColour (Colours.withAlpha (widget.itemColour2, 0.5));
	}
	
	// Draw the knob.
	graphics.fillEllipse (KnobSurfaceArea);
	
	// ------------- Knob Text Legend
	
	// Set the text colour.
	if (widget.enabled) {
	
		// If the widget is enabled, use the textColour field from the 
		// Inspector.
		graphics.setColour (widget.textColour);

	} else {

		// Otherwise, use our default colour for disabled legend text.
		graphics.setColour (WIDGETOFF_INDICATOR_COLOUR);
	}
	
	// Set the font and size.
	graphics.setFont (DEFAULT_BOLDFONT, DEFAULT_LABEL_FONTSIZE); 

	// Draw the text.
	graphics.drawAlignedText (widget.text, [widgetWIDGET_STARTX + widgetHorizontalTextOffset, widgetLegendTextVerticalOffset, widgetHeight + widgetHorizontalTextOffset, widgetHeight], "left");    
	
	// ------------- Knob text Value
	
	// Set the fobt face and size.
	graphics.setFont (DEFAULT_MEDIUMFONT, DEFAULT_SMALL_FONTSIZE); 
	
	if (widget.enabled) {
		
		// If the widget is enabled, use the enabled value colour.
		graphics.setColour (enabledKnobwidgetValueColour);

	} else {
		
		// Otherwise, use the default disabled value colour.
		graphics.setColour (disabledKnobwidgetValueColour);
	}
	
	// Format the value string to a consistent number of decimal places.
	var ConcatenatedValue = Engine.doubleToString (widget.value,numberOfDecimalPlaces) + widget.suffix;
	
	// Draw the text.
	graphics.drawAlignedText (ConcatenatedValue, [widgetWIDGET_STARTX + widgetHorizontalTextOffset, widgetValueTextVerticalOffset, widgetHeight+widgetHorizontalTextOffset, widgetHeight], "left");    
	
	// ------------- Value Arc
	//
	// The math here is basically voodoo. Part of the reason it's complex 
	// is so every graphic element scales correctly when you resize the 
	// widget. The value arc is the widget's value indicator.
	
	// Create an empty path for drawing the arc.
	var pathSemiCircle = Content.createPath();
	
	// Use the widget's minimum and maximum values (set in the Inspector) 
	// to set the range for the path.		
	var ValueRange = widget.max - widget.min;
	
	// Define the (graphical) offsets for where the path begins and ends.
	var startOffset = 2.4;
	var endOffset = -startOffset + 2.0 * startOffset * widget.valueNormalized;
	if ((widget.min < 0) && (widget.max > 0)) startOffset = - 0.08;
	
	// Specify a thickness (stroke) for the arc.
	var arcThickness = 0.02;
	
	// Based on the thickness, compute the arc's width.
	var arcWidth = 1.0 - 2.0 * arcThickness;
	
	// I…don't remember what this is for.
	var ArcOffset = 0.1;
		   
	// Add the arc to the path.
	pathSemiCircle.addArc ([arcThickness / 2 + ArcOffset, arcThickness / 2 + ArcOffset, arcWidth + arcThickness - ArcOffset*2, arcWidth + arcThickness - ArcOffset*2], -startOffset - widgetOffsetAdjustment, endOffset + widgetOffsetAdjustment);   
	
	// The path area is…let's just keep going.   
    var pathArea = pathSemiCircle.getBounds (widgetHeight);  
	
	// Set the colour information.
	if (widget.enabled) {	

		// If the the widget is enabled, and the mouse is over it or its 
		// been clicked, then set opacity to 100%; otherwise set it to 80%. 
		if (widget.hover || widget.clicked) { opacity = 1.0; } else { opacity = 0.8; }

		// Set the colour with whatever we set the opacity to.
		graphics.setColour (Colours.withAlpha(widgetIndicatorColour, opacity));
		
	} else {

		// If the widget isn't enabled, make the indicator a darker version of
		// indicator-off colour.
		graphics.setColour (Colours.withAlpha(WIDGETOFF_INDICATOR_COLOUR, 0.5));
	}
	
    // Draw the arc. Finaly.
    graphics.drawPath (pathSemiCircle, pathArea, widgetWidth * arcThickness);

	// ------------- Value Pointer
	//
	// This is the dot on the knob that shows its relative value to the 
	// value arc.

    // Rotate the indicator so it follows the arc.
    graphics.rotate (endOffset, [widgetHeight / 2, widgetHeight / 2]);

	// Set its colour.
    if (widget.enabled) {

	    // If the widget is enabled, use the widget's text colour.
    	graphics.setColour (widget.textColour);

    } else {

	    // Otherwise use a darkened version. 
    	graphics.setColour (Colours.withAlpha(widget.textColour, 0.5));
    }
    
    // Draw the indicator.
    graphics.fillRoundedRectangle ([widgetHeight / 2 - widgetHeight * -0.01, widgetHeight / 2 - widgetHeight * 0.295, widgetHeight  * 0.03, widgetHeight * 0.03], 3);
});

////////////////////////////////// RADIO BUTTON /////////////////////////////
//
// ------------- Description
//
// This radio button is designed to be used in rectangluar design blocks. 
// Add a panel to your object model, and attach all the radio buttons 
// inside. You can then move all the radio buttons as one unit. You can also 
// add a border by making the panel larger than the area of the radio 
// buttons. This backing panel has no LAF (because it doesn't need one.) 
// The customisable  LAF enable additional control over look and feel for:
//
// • Mouse-over events (all button state configurations).
// • Indicator values (off and on).
// • Disabled state colours (all graphic elements).
//
// ------------- Inspector Colour Mapping
//
// This LAF maps the same Colours (in the Inspector) as HISE's button.
//
// • bgColour is not used, since the radio buttons don't have borders.
// • itemColour is for the button surface.
// • itemColour2 is unused.
// • textColour is for the text legend.
//
/////////////////////////////////////////////////////////////////////////////

// Create an LAF for the widget.
const LAF_radioButton = Content.createLocalLookAndFeel();

// Toggle Button for Sections
LAF_radioButton.registerFunction("drawToggleButton", function(graphics, widget) {
	
	// ------------- Initialisation
	
	// Create descriptive variables name for the widget's properties.
	var widgetArea = widget.area;
	var widgetHeight = widget.area [WIDGET_HEIGHT];
	var widgetWidth = widget.area [WIDGET_WIDTH];
	var widgetWIDGET_STARTX = widget.area [WIDGET_STARTX];
	var widgetStartY = widget.area [WIDGET_STARTY];
	var widgetOn = widget.value;
	
	// Set customisable LAF variables.
	var widgetCornerSize = 4;
	var widgetBorderWidth = 1;
	var widgetWellLeftOffset = 5;
	var widgetWellRadius = 14;
	var widgetIndicatorColour = 0xFFF6FF00;
	var widgetIndicatorInset = 8;
	var widgetHorizontalLegendOffset = 3;
	var widgetVerticalTextCentreOffset = -1;
	var opacity;
	var fillColour;

	// ------------- Button Well
	
	// Draw button well. It's the same regardless of button's active state.
	graphics.setGradientFill([CONST_BUTTONWELL_TOPGRADIENT_COLOUR, widgetWIDGET_STARTX, widgetStartY, CONST_SurfaceGradientBottom, widgetWIDGET_STARTX, widgetHeight]);
	graphics.fillEllipse([widgetWIDGET_STARTX + widgetWellLeftOffset, widgetStartY + (widgetHeight / 2) - (widgetWellRadius/2), widgetWellRadius, widgetWellRadius]);
	
	// ------------- Button Surface
	
	// Set the colour information.
	if (widget.enabled) {		

		// Set the colour with whatever we set the opacity to.
		graphics.setColour(widget.itemColour1);		

	} else {

		// Otherwise, use transparency to darken it more.
		graphics.setColour(Colours.withAlpha(widget.itemColour1, 0.40));
	}

	// Draw the surface without a border.
	graphics.fillRoundedRectangle(widgetArea, 0);

	// ------------- Indicator Light
	
	// Choose the colour(s).
	if (widget.enabled) {

		// Choose a colour depending on if the button is on.
		if (widget.value) { fillColour = widgetIndicatorColour; } else { fillColour = WIDGETOFF_INDICATOR_COLOUR; }
		
		// Set the colour.
		graphics.setColour(Colours.withAlpha(fillColour, widget.over ? 1.0 : 0.8));

	} else {

		// If the button is disabled, use a drkened version of our default disabled indictor colour.
		graphics.setColour(Colours.withAlpha(WIDGETOFF_INDICATOR_COLOUR, 0.5)); 
	}
	
	// Draw the indicator.
	graphics.fillEllipse([widgetWIDGET_STARTX + widgetIndicatorInset, widgetStartY + (widgetHeight / 2) - (widgetIndicatorInset/2), widgetIndicatorInset, widgetIndicatorInset]);
	
	// ------------- Text Label
	
	// Set the font.
	graphics.setFont(DEFAULT_MEDIUMFONT, DEFAULT_LABEL_FONTSIZE); 
	
	if (widget.enabled) {
		
		// If widget is enabled, use transparency to show the on or off state.
		graphics.setColour(Colours.withAlpha(widget.textColour, widget.value ? 1.0 : 0.5));
	
	} else {
		
		// Otherwise, use transparency to darken it more.
		graphics.setColour(Colours.withAlpha(widget.textColour, 0.25));
	}
	
	// Draw the text.
	graphics.drawAlignedText(widget.text, [widgetWellLeftOffset + widgetWellRadius + widgetHorizontalLegendOffset,widgetVerticalTextCentreOffset, widgetWidth, widgetHeight], "left");
});

///////////////////////////////// COMBO BOX /////////////////////////////////
//
// ------------- Description
//
// This is not a LAF function; it's a regular function to style and enable
// HISE's standard comboboxes. Using an LAF would be a more elegant approach
// as purely a toolkit, but in my plugin, there's other things to do in
// this function.
//
// To use the function, pass a reference to the combobox you wish to enable 
// or disable to this function (as the first parameter) and whether you want 
// to enable or disable it (as the second  paramater). See the examples at 
// the end of this file for how to do this. 
//
// Please note that in addition to providing the styling for enabled and 
// disabled states, this function also enables and disables the component
// itself.
//
// ------------- Inspector Colour Mapping
//
// This LAF maps the same Colours (in the Inspector) as HISE's combobox.
//
// • bgColour for the border.
// • itemColour is the top gradient of the combobox surface.
// • itemColour2 bottom gradient of the combobox surface.
// • textColour is the text legend.
//
/////////////////////////////////////////////////////////////////////////////

inline function EnableComboBox (widget, makeEnabled) {
	
	// ------------- Initialisation
	
	if (makeEnabled == true) {
	
		// If we're enabling the widget, set it's HISE state to enabled.
		widget.set("enabled", true);
		
		// Set its colours to the ones in the HISE Inspector.
		widget.setColour(1, widget.get("itemColour"));
		widget.setColour(2, widget.get("itemColour2"));
		widget.setColour(3, widget.get("textColour"));

	} else {
	
		// Otherwise, we're enabling the widget, so set it's HISE state to 
		// disabled.
		widget.set("enabled", false);
	
		// Set its colours to darker versions (50% transparency)of the ones 
		// in the HISE Inspector. We use transparency so your overall colours 
		// scheme is maintained.
		widget.setColour(1, (Colours.withAlpha(widget.get("itemColour"), 0.5)));
		widget.setColour(2, (Colours.withAlpha(widget.get("itemColour2"), 0.5)));
		widget.setColour(3, (Colours.withAlpha(widget.get("textColour"), 0.5)));
	}
};


/////////////////////////////// FERRET widget ///////////////////////////////
//
// There is no ferret widget. I'm not even sure what that would be. I guess 
// it would…maybe steal all the keys from your keyboard and hide them
// somewhere.
//
/////////////////////////////////////////////////////////////////////////////

///////////////////////////// CIRCULAR GLYPH BUTTON /////////////////////////
//
// ------------- Description
//
// This button is used for specific functionality in my plugin. You can 
// easily customise to your own needs. Unlike the other widgets in this 
// toolkit, the Circular Glyph button is comprised of two different elements: 
// a HISE button (in the shape of a circle), and a HISE label that is intended 
// to be a single glyph (inside the circle). 
// 
// In the included example, I'm using a numberical glyph. In my plugin, I 
// use a pictogram font, and that is real intention of this widget: a 
// circular icon button. To specify the glyph character, type the character 
// into the Label's value field. 
// 
// To set up this button, you must create both widgets (Button and Label). 
// Type the ID of the Label (i.e., the Label's first field in the Inspector)
// into the "text" field of the Button.
//
// The Circle Button, like the Textless Button in this toolkit, is intended 
// as a top-level widget; as such, it has no disabled state. It has no 
// mouse-over states – this is an artistic decision, and you can certainly 
// implement your own using the approaches for other widgets in this 
// toolkit.
//
// ------------- Inspector Colour Mapping
//
// This LAF maps the same Colours (in the Inspector) as HISE's combobox.
//
// • bgColour for the border.
// • itemColour is the circle's surface colour.
// • itemColour2 is unused (because there's no gradient).
// • textColour is unused (because the text glyph is created using the label.
// • Set the opacity to 0%.
//
// For the Label, there is no LAF, so whatever you specify in the Inspector for it
// will be directly applied.
//
// • bgColour is unused; set to 0% opacity).
// • itemColour is unused; set to 0% opacity).
// • itemColour2 is unused; set to 0% opacity).
// • textColour is the glyph's colour.
//
/////////////////////////////////////////////////////////////////////////////

// Create an LAF for the widget.
const LAF_CircleButton = Content.createLocalLookAndFeel();

// Register and define the drawing function for the button component.
LAF_CircleButton.registerFunction("drawToggleButton", function(graphics, widget) {

// ------------- Initialisation
	
	// Get a more descriptive name for the button's area.
	var widgetArea = widget.area;
	var widgetHeight = widget.area[WIDGET_HEIGHT];
	var widgetWidth = widget.area[WIDGET_WIDTH];
	var widgetWIDGET_STARTX = widget.area[WIDGET_STARTX];
	var widgetStartY = widget.area[WIDGET_STARTY];
	var widgetCircleDiameter = 40;
	var widgetCircleMargin = 2;
	
	// ------------- Button
	
	// Set the border's colour.
	graphics.setColour(widget.bgColour);
	
	// Draw the border.
	graphics.fillEllipse([0, 0, widgetCircleDiameter,widgetCircleDiameter]);
	
	// Set the surface's colour.
	graphics.setColour(widget.itemColour1);
	
	// Draw the surface.
	graphics.fillEllipse([widgetCircleMargin,widgetCircleMargin, (widgetCircleDiameter - (2 * widgetCircleMargin)), (widgetCircleDiameter - (2 * widgetCircleMargin))]);

	// ------------- Glyph

	// Get the ID of the Label component containing the glyph we want
	// to use for our button. We get it from the text field of the button. 
	// (You must first write the Label's ASC ID in this field.)
	var glyphID = widget.text;

	// Get a reference to the Label.
	var glyph = Content.getComponent(glyphID);

	// Get the Label's text colour.
	var textColour = glyph.get("textColour");

	if (widget.value == true) {
		
		// If the button is on, use no tranparency for the colour.
		glyph.setColour(3,Colours.withAlpha(textColour, 1.0));
		
	} else {
		
		// Otherwise, use 40% opacity. This will dim the the glyph.
		glyph.setColour(3,Colours.withAlpha(textColour, 0.4));	
	}	
});

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
//                       LAF TUTORIAL TOOLKIT EXAMPLES                     //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////

// Create the HISE canvas
Content.makeFrontInterface(549, 600);

// ================================ KNOBS ===================================

// Get references to the widgets.
const var knbStandard1 = Content.getComponent("knob1");
const var knbStandard2 = Content.getComponent("knob2");

// Style the widgets.
knbStandard1.setLocalLookAndFeel(LAF_StandardKnob);
knbStandard2.setLocalLookAndFeel(LAF_StandardKnob);

// ============================== COMBOBOXES ================================

const var cmbStandard1 = Content.getComponent("combobox1");
const var cmbStandard2 = Content.getComponent("combobox2");

EnableComboBox (cmbStandard1,true);
EnableComboBox (cmbStandard2,false);

// ============================ STANDARD BUTTONS ============================

// Get references to the widgets.
const var btnStandard1 = Content.getComponent("standardButton1");
const var btnStandard2 = Content.getComponent("standardButton2");
const var btnStandard3 = Content.getComponent("standardButton3");

// Style the widgets.
btnStandard1.setLocalLookAndFeel(LAF_standardButton);
btnStandard2.setLocalLookAndFeel(LAF_standardButton);
btnStandard3.setLocalLookAndFeel(LAF_standardButton);

// ============================ TEXTLESS BUTTONS ============================

// Get references to the widgets.
const var btnTextless1 = Content.getComponent("textlessButton1");
const var btnTextless2 = Content.getComponent("textlessButton2");

// Style the widgets.
btnTextless1.setLocalLookAndFeel(LAF_textlessButton);
btnTextless2.setLocalLookAndFeel(LAF_textlessButton);

// =============================== CHECKBOXES ===============================

// Get references to the widgets.
const var btnCheckbox1 = Content.getComponent("checkbox1");
const var btnCheckbox2 = Content.getComponent("checkbox2");

// Style the widgets.
btnCheckbox1.setLocalLookAndFeel(LAF_Checkbox);
btnCheckbox2.setLocalLookAndFeel(LAF_Checkbox);

// ============================ RADIO BUTTONS ===============================

// ------------- Enabled Radio Panel

// Get references to the widgets.
const var btnRadio1 = Content.getComponent("radioButton1");
const var btnRadio2 = Content.getComponent("radioButton2");
const var btnRadio3 = Content.getComponent("radioButton3");
const var btnRadio4 = Content.getComponent("radioButton4");

// Style the widgets.
btnRadio1.setLocalLookAndFeel(LAF_radioButton);
btnRadio2.setLocalLookAndFeel(LAF_radioButton);
btnRadio3.setLocalLookAndFeel(LAF_radioButton);
btnRadio4.setLocalLookAndFeel(LAF_radioButton);

// ------------- Disabled Radio Panel

// Get references to the widgets.
const var btnRadio5 = Content.getComponent("radioButton5");
const var btnRadio6 = Content.getComponent("radioButton6");
const var btnRadio7 = Content.getComponent("radioButton7");
const var btnRadio8 = Content.getComponent("radioButton8");

// Style the widgets.
btnRadio5.setLocalLookAndFeel(LAF_radioButton);
btnRadio6.setLocalLookAndFeel(LAF_radioButton);
btnRadio7.setLocalLookAndFeel(LAF_radioButton);
btnRadio8.setLocalLookAndFeel(LAF_radioButton);

// ========================== CIRCLE GLYPH BUTTONS ==========================

// Get widget references.
const var btnCircle1 = Content.getComponent("circleButton1");
const var btnCircle2 = Content.getComponent("circleButton2");

// Style the button.
btnCircle1.setLocalLookAndFeel(LAF_CircleButton);
btnCircle2.setLocalLookAndFeel(LAF_CircleButton);

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
//                      END OF HISE LAF TOOLKIT AND TUTORIAL               //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
