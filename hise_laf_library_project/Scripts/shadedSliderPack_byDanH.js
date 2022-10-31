// Local LAF
const locl_laf = Content.createLocalLookAndFeel();

// Table Path
locl_laf.registerFunction("drawTablePath", function(g, obj)
{
    g.setGradientFill([0xFFFF1B1B, 0, 0.2* obj.area[3], 0xA4A10AC9, 1.2*obj.area[2], 0.9* obj.area[3]]);
    g.drawPath(obj.path, obj.area, 3);
    
    g.setGradientFill([0x30FF1B1B, 0, 0.2* obj.area[3], 0x60A10AC9, 1.3*obj.area[2], 1.6* obj.area[3]]);
    
        g.fillPath(obj.path, obj.area);

});

// Table Point
locl_laf.registerFunction("drawTablePoint", function(g, obj)
{
		var radius = 0.5;

		
		g.setGradientFill([0xFFFF1B1B, 0, 0.2* obj.tablePoint[3], 0xFFA10AC9, 1.2*obj.tablePoint[2], 0.9* obj.tablePoint[3]]);
    	
        g.fillEllipse([obj.tablePoint[0]+radius, obj.tablePoint[1]+radius, obj.tablePoint[2]-2*radius, obj.tablePoint[3]-2*radius]);

    
    if(obj.hover)
    {
		g.setColour(0xFFFFFFFF);
		
    	g.fillEllipse([obj.tablePoint[0]+radius, obj.tablePoint[1]+radius, obj.tablePoint[2]-2*radius, obj.tablePoint[3]-2*radius]);
    
    }
});

// Table Ruler
locl_laf.registerFunction("drawTableRuler", function(g, obj)
{
	g.setColour(0x30FF1B1B);
    var x = obj.position * obj.area[2];
    g.drawLine(x, x, 0, obj.area[3], 10.0);
    
    g.setColour(0xA4A10AC9);
    g.drawLine(x, x, 0, obj.area[3], 0.5);
});
