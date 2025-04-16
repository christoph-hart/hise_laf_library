

// It will be better if the Knob width is more than 90 px


const neumKnbLAF = Content.createLocalLookAndFeel();
	
neumKnbLAF.registerFunction("drawRotarySlider", function(g, obj)
{
var a = obj.area;
var c1 = (obj.hover || obj.clicked) ? obj.textColour : obj.bgColour;
var c2 = 0x0;
	
// Label

g.setColour(c1);
g.setFont("Arial", (12 + 1));
g.drawAlignedText(obj.text, [a[0], a[2] - (a[2] * 0.088888889), a[2], 20], "centred");	



// Neumorphic Shadow - Black	
var pth = Content.createPath();
pth.addEllipse(a);

c1 = Colours.withAlpha(Colours.black, 0.5);
g.drawDropShadowFromPath(pth, [a[0] + (a[2] * 0.133333333), a[1] + (a[2] * 0.173333333), a[2] - (a[2] * 0.266666667), a[2] - (a[2] * 0.255555556)], c1, (a[2] * 0.166666667), [0, (a[2] * 0.122222222)]);


// Neumorphic Shadow - Grey
c1 = Colours.withAlpha(Colours.white, 0.14);	
g.drawDropShadowFromPath(pth, [(a[2] * 12/90), (a[2] * 11/90), a[2] - (a[2] * 24/90), a[2] - (a[2] * 24/90)], c1, (a[2] * 11/90), [0, (a[2] * (-3)/90)]);



// Outer Edge 	
c1 = Colours.withAlpha(Colours.black, 0.5);

g.setGradientFill([c1, 0.5 * a[2], a[1], c2, 0.5 * a[2], a[2]]);
g.fillEllipse([(a[2] * 11.5/90), (a[2] * 11.5/90), a[2] - (a[2] * 23/90), a[2] - (a[2] * 23/90)]);
g.fillEllipse([(a[2] * 11.5/90), (a[2] * 12.5/90), a[2] - (a[2] * 23/90), a[2] - (a[2] * 23/90)]);



// Inner Panel
g.setColour(Colours.withAlpha(obj.itemColour1, 1.0));
g.fillEllipse([(a[2] * 13/90), (a[2] * 13/90), a[2] - (a[2] * 26/90), a[2] - (a[2] * 24/90)]);










// Arc

var offsetX = a[2] * 0.189; 		
var offsetY = a[2] * 0.196; 		
var arcwd = a[2] * 0.622; 			
var arcThickness = a[2] * 0.0018; 	

var K = Content.createPath();
var p1 = Content.createPath();
var range = obj.max - obj.min;
	
var startOffset = 2.5;	
var arcWidth = 1.0 - 2.0 * arcThickness;	
var endOffset = -startOffset + 2.03 * startOffset * obj.valueNormalized;



// Arc Static
p1.addArc([arcThickness / 2, arcThickness / 2, arcWidth + arcThickness, arcWidth + arcThickness], - startOffset , 2.57);

var pathArea = p1.getBounds(arcwd);
pathArea[0] += offsetX;
pathArea[1] += offsetY;

g.setColour(Colours.withAlpha(Colours.white, 0.1));
g.drawPath(p1, pathArea, 70 * arcThickness);
	
	

// Arc Valued
K.addArc([arcThickness / 2, arcThickness / 2, arcWidth + arcThickness, arcWidth + arcThickness], -startOffset - 0.08 , endOffset);   

pathArea = K.getBounds(arcwd);
pathArea[0] += offsetX;
pathArea[1] += offsetY;

c1 = (obj.hover || obj.clicked) ? obj.textColour : obj.itemColour2;

g.setColour(c1);
g.drawPath(K, pathArea, 80 * arcThickness);



// Value
   g.setFont("Arial Bold", (0.1 * a[2] + 3));
   g.drawAlignedText(Engine.doubleToString(obj.value, 1), [0, 0.40 * a[2], a[2], (a[2] * 20/90)], "centred");	
       
   // Suffix
   c1 = Colours.withAlpha(obj.textColour, 0.5);
 	g.setColour(c1);
   g.setFont("Arial", (0.1 * a[2] - 1));
   g.drawAlignedText(obj.suffix, [0, 0.53 * a[2], a[2], (a[2] * 20/90)], "centred");	
   

});	
	
	
	
const var Knob1 = Content.getComponent("Knob1");
Knob1.setLocalLookAndFeel(neumKnbLAF);






	



	