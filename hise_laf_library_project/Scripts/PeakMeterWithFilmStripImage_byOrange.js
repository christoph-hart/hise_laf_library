
/*

This peak meter is just to show the usage of imagestrip in LAF. The dB values on the image may not match the real values. 

Adjust the frame number and zero dB frame number in the LAF. Also set the height of the FloatingTile to the desired image height.

Adjust the Decay values inside the FloatingTile. 

Also make sure that the background color is full transparent to prevent the glitch.

*/


const laf = Content.createLocalLookAndFeel();

// Load the filmstrip image into the laf
laf.loadImage("{PROJECT_FOLDER}VU_Meter.png", "VUMeter");


// Peak meter floating tile
laf.registerFunction("drawMatrixPeakMeter", function(g, obj)
   {

	var a = obj.area;
	var z_value = 0;
	
	// Total Frames
	var frames = 100;
	
	// Zero dB frmae number
	var zerpnt = 70;
	
	
	for (i = 0; i < 2; i++)
	{
		var z = obj.peaks[i];
		
		// dB is up to 0
       	if (z <= 1.0)
		z_value = Math.round((zerpnt - 1) * z);
				
		
		// dB is between 0 & +3
       	else if (z > 1.0 && z <= 1.413)
		z_value = Math.round((zerpnt - 1) + (frames - zerpnt) * (z - 1.0)/0.413);
		
		
		// dB above +3
		else
		z_value = frames - 1;
			
				
		// Draw the image
		g.drawImage("VUMeter", [i * 150, 0, 128, a[3]], 0, 90 * z_value);					
	}
   	
});



const var FloatingTile1 = Content.getComponent("FloatingTile1");
FloatingTile1.setLocalLookAndFeel(laf);






