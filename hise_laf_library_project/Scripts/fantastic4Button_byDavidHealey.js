

const Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{
	var a = this.getLocalBounds(0);
	
	g.setGradientFill([this.get("itemColour"), a[2], a[1], this.get("itemColour2"), a[0], a[3]]);
	g.fillRect(a);

	g.setGradientFill([this.get("textColour"), a[2], a[1], Colours.withMultipliedBrightness(this.get("textColour"), 0.8), a[0], a[3]]);
	g.drawRoundedRectangle(a.reduced(15), this.get("borderRadius"), this.get("borderSize"));
	
	g.addNoise({alpha: 0.025, scaleFactor: 2.0, area: a.toArray(), monochromatic: true});
});

const var Button1 = Content.getComponent("Button1");

const laf = Content.createLocalLookAndFeel();
Button1.setLocalLookAndFeel(laf);

laf.registerFunction("drawToggleButton", function(g, obj)
{
	var a = obj.area;
	var disc = Rectangle(a[0], a[1], a[2] * 0.8, a[2] * 0.8).withCentre(a[2] / 2, a[2] / 2);
	
	// Shadow
	var shadowPath = Content.createPath();
	shadowPath.addEllipse(disc);
	
	var shadowColour = Colours.withAlpha(Colours.black, 0.5);
	g.drawDropShadowFromPath(shadowPath, disc, shadowColour, 20, [-5, 7]);
	
	g.setGradientFill([Colours.withMultipliedBrightness(obj.bgColour, 3.0), disc[2], disc[1], obj.bgColour, disc[0], disc[3]]);
	g.fillEllipse(disc);
		
	g.setGradientFill([Colours.withAlpha(Colours.white, 0.5), disc[0] + disc[2] / 2, disc[1] + disc[3] / 2, Colours.withAlpha(Colours.black, 0.1), disc[0] + disc[2] / 2, disc[1], true]);
	g.fillEllipse(disc);
	
	g.setGradientFill([0x0, disc[2] / 2, disc[3] / 2, Colours.withAlpha(Colours.black, 0.05), disc[2], disc[3], true]);
	g.drawEllipse(disc.reduced(2), 4);
	
	g.setColour(obj.textColour);
	g.drawEllipse(disc.reduced(30), 6);
	
	g.drawEllipse(disc.reduced(35), 2);
		
	g.setFont("Oxygen", 125);
	g.drawAlignedText("4", disc.translated(0, -25), "centred");
		
	g.addNoise({alpha: 0.025, scaleFactor: 1.0, area: disc.toArray(), monochromatic: true});
	g.addNoise({alpha: 0.05, scaleFactor: 1.0, area: disc.reduced(30).toArray(), monochromatic: false});
});
