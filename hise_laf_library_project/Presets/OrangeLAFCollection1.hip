Processor 
Type SynthChain ID OrangeLAFCollection1 Bypassed Gain 	      �?Balance 	        VoiceLimit 	      P@KillFadeTime 	      4@IconColour 0 packageName  BuildVersion �  EditorStates BodyShown 0 Visible 1 Solo 0 Folded 1  ChildProcessors  Processor Type MidiProcessorChain ID Midi Processor Bypassed EditorStates BodyShown 1 Visible 0 Solo 0  ChildProcessors  Processor Type ScriptProcessor ID Interface Bypassed Script Content.makeFrontInterface(600, 400);

/** This file contains all "portable" code. */
include("orange/laf_collection_1.js");

/** The dummy UI definitions that are part of the example can be put into the example .hip. */
const var Slider_VolumeText = Content.getComponent("Slider_VolumeText");
const var Slider_UnisonText = Content.getComponent("Slider_UnisonText");
const var Slider_PanText = Content.getComponent("Slider_PanText");
const var Slider_Horizontal1 = Content.getComponent("Slider_Horizontal1");
const var Slider_Horizontal2 = Content.getComponent("Slider_Horizontal2");
const var Slider_ArcKnob1 = Content.getComponent("Slider_ArcKnob1");
const var Slider_ArcKnob2 = Content.getComponent("Slider_ArcKnob2");
const var Slider_ArcKnob3 = Content.getComponent("Slider_ArcKnob3");
const var Button_Power = Content.getComponent("Button_Power");
const var Button_Magic = Content.getComponent("Button_Magic");

Slider_VolumeText.setLocalLookAndFeel(locl_laf);
Slider_UnisonText.setLocalLookAndFeel(locl_laf);
Slider_PanText.setLocalLookAndFeel(locl_laf);
Slider_Horizontal1.setLocalLookAndFeel(locl_laf);
Slider_Horizontal2.setLocalLookAndFeel(locl_laf);
Slider_ArcKnob1.setLocalLookAndFeel(locl_laf);
Slider_ArcKnob2.setLocalLookAndFeel(locl_laf);
Slider_ArcKnob3.setLocalLookAndFeel(locl_laf);
Button_Power.setLocalLookAndFeel(locl_laf);
Button_Magic.setLocalLookAndFeel(locl_laf);

function onNoteOn()
{
	
}
 function onNoteOff()
{
	
}
 function onController()
{
	
}
 function onTimer()
{
	
}
 function onControl(number, value)
{
	
}
  EditorStates BodyShown 1 Visible 1 Solo 0 contentShown 1 onInitOpen 1  ChildProcessors   Content  
Control type ScriptSlider id Slider_VolumeText value 	         Control type ScriptSlider id Slider_UnisonText value 	   @3�S@ Control type ScriptSlider id Slider_PanText value 	         Control type ScriptSlider id Slider_Horizontal1 value 	    ��G@ Control type ScriptSlider id Slider_Horizontal2 value 	    ��N@ Control type ScriptSlider id Slider_ArcKnob1 value 	   �GAO@ Control type ScriptSlider id Slider_ArcKnob2 value 	     �Q@ Control type ScriptSlider id Slider_ArcKnob3 value 	   �zTD@ Control type ScriptButton id Button_Power value 	      �? Control type ScriptButton id Button_Magic value 	      �? UIData  ContentProperties DeviceType 	Desktop Component 
type ScriptPanel id 
BG_Panel x 	        y 	        borderSize 	        borderRadius 	        itemColour 4280295456 itemColour2 4280295456 width 	     ��@height 	     ��@ Component type ScriptSlider id Slider_VolumeText x 	      $@y 	     �Q@text Vol width 	      N@height 	      I@min 	      Y�max 	        middlePosition 	      4�suffix  dB itemColour2 2432696319 itemColour 0  Component type ScriptSlider id Slider_UnisonText x 	     �V@y 	     �Q@text Unison width 	      N@height 	      I@max 	      Y@suffix  % itemColour2 2432696319 itemColour 0  Component type ScriptSlider id Slider_PanText x 	     @e@y 	     �Q@text Pan width 	      N@height 	      I@max 	      Y@itemColour2 2432696319 min 	      Y�middlePosition 	        itemColour 0  Component type ScriptSlider id Slider_Horizontal1 x 	      :@y 	     �b@text Horizontal width 	     �Z@height 	      I@max 	      Y@suffix  % itemColour2 2432696319 itemColour 4281282351 defaultValue 	     �Q@bgColour 4281282351  Component type ScriptSlider id Slider_Horizontal2 x 	      <@y 	     �i@text Horizontal width 	     �e@height 	      I@max 	      Y@suffix  % itemColour2 4293783021 itemColour 4282289322 defaultValue 	     �Q@bgColour 4282289322  Component type ScriptSlider id Slider_ArcKnob1 x 	     �m@y 	     �a@text 
Arc_Gain width 	      D@height 	      N@max 	      Y@suffix  % itemColour2 2432696319 itemColour 1442840575 defaultValue 	     �Q@ Component type ScriptSlider id Slider_ArcKnob2 x 	     �r@y 	     �a@text Arc_Drive width 	      D@height 	      N@max 	      Y@suffix  % itemColour2 4044275199 itemColour 1442840575 defaultValue 	     �Q@bgColour 520093695  Component type ScriptSlider id Slider_ArcKnob3 x 	      v@y 	     �]@text Arc_Warmth width 	     �R@height 	     �Z@max 	      Y@suffix  % itemColour2 4060051982 itemColour 3086973454 defaultValue 	     �Q@bgColour 771751935  Component 
type ScriptButton id Button_Power x 	     �~@y 	     �l@text Power width 	     �S@itemColour2 4218186603 itemColour 4283321934 height 	      ;@textColour 4044275199  Component type ScriptButton id Button_Magic x 	     `}@y 	      N@text 	Gandalf width 	      Y@itemColour2 4216476242 itemColour 4281940281 height 	     @`@textColour 4060024509 bgColour 4294917632  Processor Type ModulatorChain ID GainModulation Bypassed Intensity 	      �?EditorStates BodyShown 1 Visible 0 Solo 0  ChildProcessors   Processor Type ModulatorChain ID PitchModulation Bypassed Intensity 	        EditorStates BodyShown 1 Visible 0 Solo 0  ChildProcessors   Processor Type EffectChain ID FX Bypassed EditorStates BodyShown 1 Visible 0 Solo 0  ChildProcessors   RoutingMatrix NumSourceChannels    Channel0     Send0 ����Channel1    Send1 ���� macro_controls  macro name 	Macro 1 value 0.0 midi_cc -1  macro name 	Macro 2 value 0.0 midi_cc -1  macro name 	Macro 3 value 0.0 midi_cc -1  macro name 	Macro 4 value 0.0 midi_cc -1  macro name 	Macro 5 value 0.0 midi_cc -1  macro name 	Macro 6 value 0.0 midi_cc -1  macro name 	Macro 7 value 0.0 midi_cc -1  macro name 	Macro 8 value 0.0 midi_cc -1  MidiAutomation   MPEData Enabled  