
const var SLIDER = Content.getComponent("SLIDER");

const knblaf = Content.createLocalLookAndFeel();
knblaf.registerFunction("drawLinearSlider", function(g, obj)
{
	var a = obj.area;
	var handle = a[2]/6;
	var n = (a[2] - handle) / a[2];
	var v = obj.valueNormalized * n;
	
	//	bg
	g.setColour(Colours.black);
	g.fillRoundedRectangle(a, a[3]*0.5);
	
	//	
	g.setColour(Colours.lightgrey);
	g.fillRoundedRectangle([0, 0, a[2]*v + handle, a[3]], a[3]*0.5);
	
	//	handle
	g.setColour(Colours.whitesmoke);
	g.fillRoundedRectangle([a[2]*v, 0, handle, a[3]], a[3]*0.5);
	
	//	text value
	g.setColour(Colours.black);
	g.drawAlignedText(Engine.doubleToString(obj.value, 2), [a[2]*v, 0, handle, a[3]], "centred");
});

SLIDER.setLocalLookAndFeel(knblaf);