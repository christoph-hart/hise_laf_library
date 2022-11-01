
const var PanelBG = Content.addPanel("PanelBG", 270, 150);
Content.setPropertiesFromJSON("PanelBG", {
    "width": 50.0,
    "height": 50.0,
    "itemColour": 4285032552,
    "itemColour2": 4278190080,
    "borderRadius": 20.0,
    "borderSize": 9.0,
    "textColour": 0
});


const var PanelAbove = Content.addPanel("PanelAbove", 280, 160);
Content.setPropertiesFromJSON("PanelAbove", {
    "width": 30.0,
    "height": 30.0,
    "itemColour": 4278190080,
    "itemColour2": 4283847250,
    "borderSize": 1.0,
    "borderRadius": 20.0
});





const var Slider_ArcKnob2 = Content.addKnob("Slider_ArcKnob2", 270, 150);
Content.setPropertiesFromJSON("Slider_ArcKnob2", {
    "text": "Arc_Drive",
    "width": 50.0,
    "height": 70.0,
    "max": 100.0,
    "suffix": " %",
    "itemColour2": 4044291995,
    "itemColour": 4291480266,
    "defaultValue": 70.0,
    "bgColour": "520093695"
});





// Local LAF
const locl_laf = Content.createLocalLookAndFeel();


//  Sliders
locl_laf.registerFunction("drawRotarySlider", function(g, obj)
{

// Text Knobs
 if (obj.text == "Vol" || obj.text == "Unison") 
   {
	g.fillAll(obj.itemColour1);
	
	var a = obj.area;
	var val = "";
	
	g.drawAlignedText(Math.round(val) + "" + obj.suffix, [a[0], 0.15*a[3], a[2], a[3]], "centred");
 
    
 }



// Arc Knob
  else if (obj.text == "Arc_Gain" || obj.text == "Arc_Drive" || obj.text == "Arc_Warmth")
    {
    var K = Content.createPath();
    var p1 = Content.createPath();
    var range = obj.max - obj.min;
    
    var startOffset = 2.4;
    var arcThickness = 0.08;
    var arcWidth = 1.0 - 2.0 * arcThickness;
      
    p1.clear();

	var endOffset = -startOffset + 2.0 * startOffset * obj.valueNormalized;
    
    var val = "";

    var a = obj.area;
    var w = obj.area;
    var round = 2;
    var h = a[3];
    
    
// Label Text
	g.setColour(obj.itemColour1);
	g.setFont("Oxygen Regular", 15); 
	g.drawAlignedText(obj.text.replace("Arc_", ""), [a[0], a[3]-a[2], a[2], a[3]], "centred");    
	    
	    
    g.setColour(obj.bgColour);
    p1.addArc([arcThickness / 2, arcThickness / 2, arcWidth + arcThickness, arcWidth + arcThickness], - startOffset , 2.5);

        
    var pathArea = p1.getBounds(obj.area[2]);

        
    g.setColour(obj.bgColour);
    g.drawPath(p1, pathArea, obj.area[2] * arcThickness);

    
    K.addArc([arcThickness / 2, arcThickness / 2, arcWidth + arcThickness, arcWidth + arcThickness], -startOffset - 0.08 , endOffset);   

    
    var pathArea = K.getBounds(obj.area[2]);
    

    g.setColour(obj.itemColour2);
    g.drawPath(K, pathArea, obj.area[2] * arcThickness );

   
    
    if (obj.hover || obj.clicked)
    {

    g.setColour(obj.textColour);	
    g.drawPath(K, pathArea, obj.area[2] * arcThickness );

    }
    
    
    g.rotate(endOffset, [obj.area[2] / 2, obj.area[2] / 2]);
    g.setColour(obj.textColour);
    g.fillRoundedRectangle([obj.area[2] / 2 - obj.area[2] * 0.04, obj.area[2] / 2 - obj.area[2] * 0.5, obj.area[2]  * 0.1, obj.area[2] * 0.13], 0);

} 

});




Slider_ArcKnob2.setLocalLookAndFeel(locl_laf);


