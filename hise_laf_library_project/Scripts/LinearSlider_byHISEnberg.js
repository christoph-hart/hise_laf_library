/* ============================================================
 ==================== LINEAR SLIDER LAF ====================
============================================================ */
const var Slider = Content.getComponent("Slider");
const var LafLinear = Content.createLocalLookAndFeel("LafLinear");
const var COLOUR_INDICATOR = 0xFFFFAE00;

LafLinear.registerFunction("drawLinearSlider", function(g, obj)
{
	var a = obj.area;
	var padding = 30;
	var drawableWidth = a[2] - 2 * padding;
	
    // Fill the slider background
    g.setColour(obj.itemColour1);
    g.fillRoundedRectangle(a, 5.0);

    // Calculate logarithmic frequency value
    var minFreq = 20; 
    var maxFreq = 20000; 
    var frequency = minFreq * Math.pow(maxFreq / minFreq, obj.value);

    // Value Indicator Line
    var lineX = a[0] + padding + drawableWidth * obj.value;
    var lineHeight = a[3];
    g.setColour(COLOUR_INDICATOR);
    g.drawLine(lineX, lineX, a[1] + 25, a[1] + lineHeight, 2.0);

    // Rounded Rectangle for Text
    var textBoxWidth = 57;
    var textBoxHeight = 25;
    var textBoxX = lineX - textBoxWidth / 2;
    var textBoxY = a[1] + padding - textBoxHeight - 5; 
    g.setColour(obj.itemColour2); 
    g.fillRoundedRectangle([textBoxX, textBoxY, textBoxWidth, textBoxHeight], 2.0); 

    // Text Label
    g.setColour(Colours.white);
    var frequencyText;
    if (frequency >= 1000)
    {
        frequencyText = Engine.doubleToString(frequency / 1000, 1) + " kHz"; 
    }
    else
    {
        frequencyText = Math.round(frequency) + " Hz";
    }

    var textPosition = [textBoxX, textBoxY, textBoxWidth, textBoxHeight]; 
    g.drawAlignedText(frequencyText, textPosition, "centred");
});

Slider.setLocalLookAndFeel(LafLinear);



