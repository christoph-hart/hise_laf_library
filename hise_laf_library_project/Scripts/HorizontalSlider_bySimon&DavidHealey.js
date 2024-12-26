const Knob1 = Content.getComponent("Knob1");

const lafSlider = Content.createLocalLookAndFeel();
Knob1.setLocalLookAndFeel(lafSlider);

lafSlider.registerFunction("drawLinearSlider", function(g, obj)
{
	var a = obj.area;
	var lineThickness = 1;
	
	g.setColour(obj.bgColour);
	
	var ellipseArea = [Math.range(a[2] * obj.valueNormalized + lineThickness * 1.2 / 2, 0, a[2] - a[3] + lineThickness * 0.6), a[1] + lineThickness * 1.2 / 2, a[3] - lineThickness * 1.2, a[3] - lineThickness * 1.2];
	
	g.drawLine(ellipseArea[0] + ellipseArea[2], a[2], a[3] / 2 - lineThickness / 2 / 2, a[3] / 2 - lineThickness / 2 / 2, lineThickness / 2);
	g.drawLine(a[0], ellipseArea[0], a[3] / 2 - lineThickness / 4, a[3] / 2 - lineThickness / 4, lineThickness);

	g.setColour(Colours.withMultipliedAlpha(obj.itemColour1, obj.hover));
	g.fillEllipse(ellipseArea);

	g.setColour(obj.itemColour2);
	g.drawEllipse(ellipseArea, lineThickness * 1.2);
});

const Knob2 = Content.getComponent("Knob2");

const lafSliderWidthText = Content.createLocalLookAndFeel();
Knob2.setLocalLookAndFeel(lafSliderWidthText);

lafSliderWidthText.registerFunction("drawLinearSlider", function(g, obj)
{
	var a = [obj.area[0], obj.area[1], obj.area[2], obj.area[3] / 2];
	var lineThickness = 1;
	
	g.setColour(obj.bgColour);

	var ellipseArea = [Math.range(a[2] * obj.valueNormalized + lineThickness * 1.2 / 2, 0, a[2] - a[3] + lineThickness * 0.6), a[1] + lineThickness * 1.2 / 2, a[3] - lineThickness * 1.2, a[3] - lineThickness * 1.2];
	
	g.drawLine(ellipseArea[0] + ellipseArea[2], a[2], a[3] / 2 - lineThickness / 2 / 2, a[3] / 2 - lineThickness / 2 / 2, lineThickness / 2);
	g.drawLine(a[0], ellipseArea[0], a[3] / 2 - lineThickness / 4, a[3] / 2 - lineThickness / 4, lineThickness);

	g.setColour(Colours.withMultipliedAlpha(obj.itemColour1, obj.hover));
	g.fillEllipse(ellipseArea);

	g.setColour(obj.itemColour2);
	g.drawEllipse(ellipseArea, lineThickness * 1.2);
	
	g.setColour(obj.textColour);
	g.setFont("Oxygen", 12);	
	g.drawAlignedText(obj.hover ? obj.valueAsText : obj.text, obj.area, "centredBottom");
});



