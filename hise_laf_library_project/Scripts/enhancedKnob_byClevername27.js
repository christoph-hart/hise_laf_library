
const STARTX = 0;
const STARTY = 1;
const WIDTH = 2;
const HEIGHT = 3;

const CONST_SurfaceGradientTop = 0xFF000000;
const CONST_SurfaceGradientBottom = 0xFF484B52;
const CONST_BorderColour = 0xFF939399;
const CONST_DisabledIndicatorColour = 0xff5a5b5c;
const CONST_DisabledSurfaceColour = 0xFF191a1d;
const CONST_DisabledButtonTextColour = 0xFF94949a;

const CONST_SmallButtonFontSize = 12;


////////////////// KNOB LOOK AND FEEL //////////////////

// Create a look and feel function.
const LAF_StandardKnob = Content.createLocalLookAndFeel();

// Register and define the drawing function for the knob.
LAF_StandardKnob.registerFunction("drawRotarySlider", function(Style,Widget)
{
	// Get the area of the widget (not just the knob).
	var Area = Widget.area;
	var KnobHeight = Area[HEIGHT];
	var KnobWidth = Area[HEIGHT];
	
	// Get the knob's circumference.
	var KnobSurfaceArea = [12, 12, Area [HEIGHT]-24, Area[HEIGHT]-24];

	// Draw the knob's surface.
	Style.setGradientFill([Widget.itemColour1, Area [HEIGHT]/2, 0, Widget.itemColour2, Area [HEIGHT]/2, Area[HEIGHT]]);
	Style.fillEllipse(KnobSurfaceArea);
 
	// Draw the knob's label.
	var LabelOffset = Area[HEIGHT];
	Style.setColour(Widget.textColour);
	Style.setFont("Oxygen Bold", 12); 
	Style.drawAlignedText(Widget.text, [Area[STARTX] + LabelOffset, Area[HEIGHT]-Area [HEIGHT] -8, Area [HEIGHT]+LabelOffset, Area[HEIGHT]], "left");    
	Style.setFont("Oxygen Regular", 10); 
	Style.setColour(0XFF838387);
	var KnobValue = Widget.value;
	var ConcatenatedValue = Engine.doubleToString(KnobValue,2) +  Widget.suffix;
	Style.drawAlignedText(ConcatenatedValue, [Area[STARTX] + LabelOffset, Area[HEIGHT]-Area [HEIGHT] +6, Area [HEIGHT]+LabelOffset, Area[HEIGHT]], "left");    
   
    // Draw the arc, which is the value indicator circle around the knob.
    var K = Content.createPath();
	var ValueRange = Widget.max - Widget.min;
    var startOffset = 2.4;
    var arcThickness = 0.02;
    var arcWidth = 1.0 - 2.0 * arcThickness;
	var endOffset = -startOffset + 2.0 * startOffset * Widget.valueNormalized;
    var val = "";
    var ArcOffset = 0.1;

	// Check if this is a centred knob.
	if ( (Widget.min < 0) && (Widget.max > 0) ) { startOffset = 0.08; }

	K.addArc([arcThickness / 2 + ArcOffset, arcThickness / 2 + ArcOffset, arcWidth + arcThickness - ArcOffset*2, arcWidth + arcThickness - ArcOffset*2], -startOffset - 0.08, endOffset + 0.08);   
    var pathArea = K.getBounds(Widget.area[HEIGHT]);  
	
	// Set the arc's standard colour.
	Style.setColour (Widget.bgColour);

	// Draw the arc.
    Style.drawPath(K, pathArea, Widget.area[WIDTH] * arcThickness);

	// Change the colour if there's a mouse-over or the knob is being turned.
    if (Widget.hover || Widget.clicked) {
	    Style.setColour(0xFFC1C1C2);	
	    Style.drawPath(K, pathArea, Widget.area[WIDTH] * arcThickness );
    }
    
    // Draw the value indicator.
    Style.rotate(endOffset, [Widget.area[HEIGHT] / 2, Widget.area[HEIGHT] / 2]);
    Style.setColour(Widget.textColour);
    Style.fillRoundedRectangle([Widget.area[HEIGHT] / 2 - Widget.area[HEIGHT] * -0.01, Widget.area[HEIGHT] / 2 - Widget.area[HEIGHT] * 0.295, Widget.area[HEIGHT]  * 0.03, Widget.area[HEIGHT] * 0.03], 3);
});

////////////////// KNOB DECLARATION //////////////////

// Define the callback function for when the knob is turned.
const var knbHappy = Content.getComponent("knbHappy");

// Assign the look and feel to the knob.
knbHappy.setLocalLookAndFeel(LAF_StandardKnob);


