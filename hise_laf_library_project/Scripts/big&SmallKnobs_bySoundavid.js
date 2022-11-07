
// LAF 

const laf = Content.createLocalLookAndFeel();

laf.registerFunction("drawRotarySlider", function(g, obj)
{
	var a = obj.area;
	var thick = 3;
	var thick2 = 2;
	var thick3 = 6.5;
	
	if (obj.text.indexOf("big") != -1)
	{
		g.setColour(Colours.withAlpha(obj.itemColour1, 0.15));
		g.drawEllipse([4, 4, a[2] - 8, a[3] - 8], thick / 3);
		
		g.setColour(obj.textColour);
		g.fillEllipse([4, 7, a[2] - 8, a[3] - 8]);

		g.setColour(obj.bgColour);
		g.fillEllipse([10, 10, a[2] - 20, a[3] - 20]);
		
		g.setColour(obj.itemColour1);
		g.drawEllipse([8, 8, a[2] - 16, a[3] - 16], 3);
		
		g.setGradientFill([0x000000, 0, a[3] / 2, Colours.withAlpha(Colours.black, 0.6), a[3] / 2, a[3]]);
		g.fillEllipse([9, 9, a[2] - 18, a[3] - 18]);
									
		var start = 2;
		var end = start * 2 * obj.valueNormalized - start;
			
		g.rotate(end, [a[2] / 2, a[3] / 2]);
			
		g.setColour(obj.itemColour2);
		g.fillEllipse([a[2] / 2 - thick3 / 2, 12, 8, 8]);
					
	}
	else if (obj.text.indexOf("small") != -1)
	{
		g.setColour(Colours.withAlpha(obj.itemColour1, 0.15));
		g.drawEllipse([4, 4, a[2] - 8, a[3] - 8], thick / 3);
		
		g.setColour(obj.textColour);
		g.fillEllipse([4, 7, a[2] - 8, a[3] - 8]);
		
		g.setColour(obj.bgColour);
		g.fillEllipse([9, 9, a[2] - 18, a[3] - 18]);
		
		g.setColour(obj.itemColour1);
		g.drawEllipse([8, 8, a[2] - 16, a[3] - 16], 3);
		
		g.setGradientFill([0x000000, 0, a[3] / 2, Colours.withAlpha(Colours.black, 0.6), a[3] / 2, a[3]]);
		g.fillEllipse([8, 8, a[2] - 16, a[3] - 16]);
									
		var start = 2;
		var end = start * 2 * obj.valueNormalized - start;
			
		g.rotate(end, [a[2] / 2, a[3] / 2]);
			
		g.setColour(obj.itemColour2);
		g.fillEllipse([a[2] / 2 - thick3 / 2, 10, 6.5, 6.5]);
					
	}

});

