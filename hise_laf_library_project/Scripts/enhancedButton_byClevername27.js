
////////////////// CONSTANTS //////////////////

const var CONST_LABEL_Backbground = 0;

const CONST_WellGradientTop = 0xFF000000;
const CONST_WellGradientBottom = 0xFF484B52;

const CONST_BorderColour = 0xFFFFFFFF; // 0xFF939399 // #FF212126

const CONST_DisabledIndicatorColour = 0xff5a5b5c;
const CONST_DisabledSurfaceColour = 0xFF191a1d;
const CONST_DisabledButtonTextColour = 0xFF94949a;

const CONST_InactiveSurfaceColour = 0xFF191A1D;
const CONST_InactiveButtonTextColour = 0xFF4B4B4F;
const CONST_InactiveIndicatorColour = 0xFF191A1D;
const STARTX = 0;
const STARTY = 1;
const WIDTH = 2;
const HEIGHT = 3;

var CONST_SmallButtonFontSize = 10;

////////////////// LOOK AND FEEL DEFINITION //////////////////

var LAF_SmallToggleButton = Content.createLocalLookAndFeel();

// Toggle Button for Sections
LAF_SmallToggleButton.registerFunction("drawToggleButton", function(g, obj)
{
	// Get a more descriptive name for the button's area.
	var WidgetArea = obj.area;
	
	// Is the button enabled?
	var ButtonActive = obj.enabled;
	
	// ------------- Button Border
	
	// Draw Border around the button surface. It's the same regardless of button's active state.
	g.setColour(BorderColour);
	g.drawRoundedRectangle([WidgetArea[STARTX], WidgetArea[STARTY], WidgetArea[WIDTH], WidgetArea[HEIGHT]], 4, 1);
	
	// ------------- Button Well
	
	//	Draw button well. It's the same regardless of button's active state.
	g.setGradientFill([CONST_WellGradientTop, WidgetArea[STARTX], WidgetArea[STARTY], CONST_SurfaceGradientBottom, WidgetArea[STARTX], WidgetArea[HEIGHT]]);
	g.fillEllipse([WidgetArea[STARTX] + 5, WidgetArea[STARTY] + WidgetArea[HEIGHT] / 2 - 7, 14, 14]);
	
	// ------------- Button Surface
	
	 // Choose the colour(s).
	 if (ButtonActive) {
		var opacity = obj.over ? 1.0 - (obj.down * 0.2) : 0.8 - (obj.down * 0.2);
		g.setGradientFill([Colours.withAlpha(obj.itemColour1, opacity), WidgetArea[STARTX], WidgetArea[STARTY], Colours.withAlpha(obj.itemColour2, opacity), WidgetArea[STARTX], WidgetArea[HEIGHT]]);
	} else {
		g.setColour(CONST_InactiveSurfaceColour);
	}

	// Draw the surface.
	g.fillRoundedRectangle(WidgetArea, 4);

	// ------------- Indicator Light
	
	// Choose the colour(s).
	if (ButtonActive) {
		if (obj.value) { var fillColour = obj.bgColour; } else { var fillColour = CONST_DisabledIndicatorColour; }
		g.setColour(Colours.withAlpha(fillColour, obj.over ? 1.0 : 0.7));
	} else {
		g.setColour(CONST_InactiveIndicatorColour);
	}
	
	// Draw the indicator.
	g.fillEllipse([WidgetArea[STARTX] + 8, WidgetArea[STARTY] + WidgetArea[HEIGHT] / 2 - 4, 8, 8]);
	
	// ------------- Text Label
	
	// Set the font.
	g.setFont("Oxygen Regular", 10); 
	
	if (ButtonActive) {
		if (obj.value == true) { g.setColour(obj.textColour); } else { g.setColour(CONST_DisabledButtonTextColour); }
	} else {
		g.setColour(CONST_InactiveButtonTextColour);
	}
	
	// Draw the text.
	g.drawAlignedText(obj.text, [25,1, WidgetArea[WIDTH], WidgetArea[HEIGHT]], "left");
});

///////////////// BUTTON DEFINITION ///////////////// 

// Get pointer to the button.
var BUTTON_HappyFunTime = Content.getComponent("BUTTON_HappyFunTime");

// Register the callback function for when the button is pressed.
BUTTON_HappyFunTime.setControlCallback(onButton);

// Define the callback function.
inline function onButton(component, value) {

	// Whatever you want the button to do goes here.
	
}; 

// Set our toggle drawing routine for this button.
BUTTON_HappyFunTime.setLocalLookAndFeel(LAF_SmallToggleButton);


