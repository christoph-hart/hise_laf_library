
const locl_laf = Content.createLocalLookAndFeel();

locl_laf.registerFunction("drawRotarySlider", function(g, obj)
{

// Vertical Line Level Meter Fill
 if (obj.text == "PeakMeterVertFill") 
   	{
	var a = obj.area;
    var bottomTextmargin = 0;
    var thickness = 2;	
    var vertpos = obj.valueNormalized;   
	

	g.setGradientFill([obj.itemColour2, 0, a[3], obj.itemColour1, 0, a[3] - thickness - (a[3]-thickness)*vertpos]);	

	g.fillRoundedRectangle([0, a[3] * (1 - obj.valueNormalized), a[2], a[3]  - a[3] * (1 - obj.valueNormalized)], 0);
		
 	}
 	
 	

// Vertical Line Level Meter Pointer
 else if (obj.text == "PeakMeterVertPointer") 
   	{
	var a = obj.area;
    var bottomTextmargin = 0;
    var thickness = 2;	
    var vertpos = obj.valueNormalized;   
	
     		
	g.setColour(obj.textColour);
	g.fillRoundedRectangle([0, a[3] - thickness - (a[3]-thickness)*vertpos, a[2], thickness], 0.1);	

		
 	} 	
 
});





// Add the UI Elements

const var BG_Panel = Content.addPanel("BG_Panel", 0, 0);
Content.setPropertiesFromJSON("BG_Panel", {"borderSize": 0.0, "borderRadius": 0.0, "itemColour": "4280295456", "itemColour2": "4280295456", "width": 600.0, "height": 600.0 });

const var PeakMeterPnl = Content.addPanel("PeakMeterPnl", 80, 30);
Content.setPropertiesFromJSON("PeakMeterPnl", {"width": 140.0, "height": 340.0, "bgColour": "16777215", "itemColour": "4934475", "itemColour2": "4934475", "textColour": "16777215", "borderSize": 0.0, "borderRadius": 0.0 });

const var PeakMeterFillL = Content.addKnob("PeakMeterFillL", 23, 30);
Content.setPropertiesFromJSON("PeakMeterFillL", {"width": 40.0, "height": 280.0, "text": "PeakMeterVertFill", "itemColour": "1176553415", "itemColour2": "1676492", "bgColour": "1513239", "min": -100.0, "max": 0.0, "middlePosition": -20.0, "parentComponent": "PeakMeterPnl", "enabled": "0", "textColour": "4280338375"});

const var PeakMeterFillR = Content.addKnob("PeakMeterFillR", 79, 30);
Content.setPropertiesFromJSON("PeakMeterFillR", {"width": 40.0, "height": 280.0, "text": "PeakMeterVertFill", "itemColour": "1176553415", "itemColour2": "1676492", "bgColour": "1513239", "min": -100.0, "max": 0.0, "middlePosition": -20.0, "parentComponent": "PeakMeterPnl", "enabled": "0", "textColour": "4280338375"});

const var PeakMeterPointL = Content.addKnob("PeakMeterPointL", 23, 30);
Content.setPropertiesFromJSON("PeakMeterPointL", {"width": 40.0, "height": 280.0, "text": "PeakMeterVertPointer", "itemColour": "1176553415", "itemColour2": "1676492", "bgColour": "2148295", "min": -100.0, "max": 0.0, "middlePosition": -20.0, "parentComponent": "PeakMeterPnl", "enabled": "0", "textColour": "4280338375"});

const var PeakMeterPointR = Content.addKnob("PeakMeterPointR", 79, 30);
Content.setPropertiesFromJSON("PeakMeterPointR", {"width": 40.0, "height": 280.0, "text": "PeakMeterVertPointer", "itemColour": "1176553415", "itemColour2": "1676492", "bgColour": "2148295", "min": -100.0, "max": 0.0, "middlePosition": -20.0, "parentComponent": "PeakMeterPnl", "enabled": "0", "textColour": "4280338375"});



// Assign the Local Look And Feel to the Sliders
PeakMeterFillL.setLocalLookAndFeel(locl_laf);
PeakMeterPointL.setLocalLookAndFeel(locl_laf);
PeakMeterFillR.setLocalLookAndFeel(locl_laf);
PeakMeterPointR.setLocalLookAndFeel(locl_laf);






// Peak Meter

// Add a Simple Gain
const PeakMeterGain = Synth.addEffect(ModuleIds.SimpleGain, "PeakMeterGain", -1);


//Decay Rate - Fill should be faster (Lower value) and Pointer should be slower (Higher value)
const var DECAY_RATE_Fill = 0.75;
const var DECAY_RATE_Pointer = 0.93;

//Current Values
var curLevelLM_Fill = 0.0;
var curLevelRS_Fill = 0.0;

var curLevelLM_Pointer = 0.0;
var curLevelRS_Pointer = 0.0;


//Timer Callback
const var t1 = Engine.createTimerObject();

t1.setTimerCallback(function()
{
//Module Values
  var LevelLM_Fill = PeakMeterGain.getCurrentLevel(1);  
  var LevelRS_Fill = PeakMeterGain.getCurrentLevel(0); 
  var LevelLM_Pointer = PeakMeterGain.getCurrentLevel(1);  
  var LevelRS_Pointer = PeakMeterGain.getCurrentLevel(0); 
  
  
//LM Peak Module Values  
  var peakLevelLM_Fill = Math.max(LevelLM_Fill, LevelLM_Fill);
  
  if (peakLevelLM_Fill > curLevelLM_Fill) curLevelLM_Fill = peakLevelLM_Fill;
  else curLevelLM_Fill *= DECAY_RATE_Fill;



  var peakLevelLM_Pointer = Math.max(LevelLM_Pointer, LevelLM_Pointer);
  
  if (peakLevelLM_Pointer > curLevelLM_Pointer) curLevelLM_Pointer = peakLevelLM_Pointer;
  else curLevelLM_Pointer *= DECAY_RATE_Pointer;
        
        

//RS Peak Module Values  
  var peakLevelRS_Fill = Math.max(LevelRS_Fill, LevelRS_Fill);
  
  if (peakLevelRS_Fill > curLevelRS_Fill) curLevelRS_Fill = peakLevelRS_Fill;
  else curLevelRS_Fill *= DECAY_RATE_Fill;



  var peakLevelRS_Pointer = Math.max(LevelRS_Pointer, LevelRS_Pointer);

  if (peakLevelRS_Pointer > curLevelRS_Pointer) curLevelRS_Pointer = peakLevelRS_Pointer;
  else curLevelRS_Pointer *= DECAY_RATE_Pointer;
  
    
//Decibel Conversion     
  LevelLM_Fill = Engine.getDecibelsForGainFactor(curLevelLM_Fill);  
  LevelRS_Fill = Engine.getDecibelsForGainFactor(curLevelRS_Fill); 
  
  LevelLM_Pointer = Engine.getDecibelsForGainFactor(curLevelLM_Pointer);  
  LevelRS_Pointer = Engine.getDecibelsForGainFactor(curLevelRS_Pointer); 
 
  
  
//Set Values  
  PeakMeterFillL.setValue(LevelLM_Fill);  
  PeakMeterFillR.setValue(LevelRS_Fill); 
  
  PeakMeterPointL.setValue(LevelLM_Pointer);  
  PeakMeterPointR.setValue(LevelRS_Pointer); 
   
});

t1.startTimer(50);

