

const var knb_Gains = Content.getAllComponents("knb_Gain");

const var btn_Mutes = Content.getAllComponents("btn_Mute");
const var btn_Solos = Content.getAllComponents("btn_Solo");

const var laf_Knob = Content.createLocalLookAndFeel();
const var laf_Button = Content.createLocalLookAndFeel();

laf_Knob.registerFunction("drawRotarySlider", function(g, obj)
{
    var a = obj.area;
    var x = a[0];
    var y = a[1];
    var w = a[2];
    var h = a[3];

    var knobHeight = 40;
    var labelHeight = 20;

    // Define knob drawing area (top 40 pixels)
    var knobArea = [x, y, w, knobHeight];
    var cx = x + w * 0.5;
    var cy = y + knobHeight * 0.5;
    var r = Math.min(w, knobHeight) * 0.5 - 4;

    var angleStart = Math.PI * 0.75;
    var angleEnd = Math.PI * 2.25;
    var angle = angleStart + (angleEnd - angleStart) * obj.valueNormalized;

    // Drop shadow
    g.setColour(0x40000000);
    g.fillEllipse([cx - r + 2, cy - r + 4, r * 2, r * 2]);

    // Knob face gradient
    g.setGradientFill([
        obj.itemColour1, cx, cy - r,
        obj.itemColour1 | 0x00202020, cx, cy + r,
        true
    ]);
    g.fillEllipse([cx - r, cy - r, r * 2, r * 2]);

    // Rim highlight
    g.setColour(0x22FFFFFF);
    g.drawEllipse([cx - r, cy - r, r * 2, r * 2], 1.0);

    // Glossy overlay
    g.setGradientFill([
        0x66FFFFFF, cx, cy - r,
        0x00FFFFFF, cx, cy + r,
        true
    ]);
    g.fillEllipse([cx - r * 0.95, cy - r * 0.95, r * 1.9, r * 1.9]);

    // Indicator line
    var startDistance = r * 0.15;
    var endDistance = r * 0.93;

    var startX = cx + Math.cos(angle) * startDistance;
    var startY = cy + Math.sin(angle) * startDistance;
    var endX = cx + Math.cos(angle) * endDistance;
    var endY = cy + Math.sin(angle) * endDistance;
	
	var indicatorColour = obj.clicked ? 0xFFFF9900 : 0xFFFFFFFF;  // bright orange or white
	
	g.setColour(indicatorColour);
	g.drawLine(startX, endX, startY, endY, 2.0);
	
	
	
	// === 6. Draw label text in bottom third (if not clicked)
    var textHeight = h / 3;
    var textArea = [x, y + h - textHeight, w, textHeight];
    g.setColour(obj.textColour);
    //g.setFont(12);  // Adjust size as needed
    
    var displayValue = Math.round(obj.value) + obj.suffix;
    var displayText = obj.clicked ? displayValue : obj.text;
    g.drawAlignedText(displayText, textArea, "centred");	
});

for (i in knb_Gains)
{
	i.setLocalLookAndFeel(laf_Knob);
}



laf_Button.registerFunction("drawToggleButton", function(g, obj)
{
    var a = obj.area;
    var x = a[0];
    var y = a[1];
    var w = a[2];
    var h = a[3];
    var r = 6; // corner radius

    var isOn = obj.value == 1;
    var baseColour = isOn ? obj.itemColour2 : obj.itemColour1;
	
// Main fill
g.setColour(baseColour);
g.fillRoundedRectangle([x, y, w, h], r);

// Light direction gradient (for 3D lighting)
g.setGradientFill(isOn ?
    [0x22000000, x, y, 0x00000000, x, y + h, false] : // Inset shadow
    [0x22FFFFFF, x, y, 0x00000000, x, y + h, false]); // Top light
g.fillRoundedRectangle([x, y, w, h], r);

// Glossy top reflection
if (!isOn)
{
    var glossHeight = h * 0.4;
    g.setGradientFill([0x22FFFFFF, x, y, 0x00FFFFFF, x, y + glossHeight, false]);
    g.fillRoundedRectangle([x + 1, y + 1, w - 2, glossHeight], r);
}

    else
    {
        // Raised: light on top, shadow on bottom
        g.setGradientFill([0x22FFFFFF, x, y, 0x22000000, x, y + h, false]);
    }

    g.fillRoundedRectangle([x, y, w, h], r);

    // Draw text
    g.setColour(obj.textColour);
    g.setFont("bold", 14);
    var textArea = [x, y + 1, w, h];  // Shift 1px down
	g.drawAlignedText(obj.text, textArea, "centred");

});


for (i in btn_Mutes)
    i.setLocalLookAndFeel(laf_Button);

for (i in btn_Solos)
    i.setLocalLookAndFeel(laf_Button);
    
