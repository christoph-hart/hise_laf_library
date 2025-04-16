

const var knbs_Env = Content.getAllComponents("knb_Env");
const var panelGroups = Content.getAllComponents("pnl_Env");
const var envGroups   = Synth.getAllModulators("Ahdsr");
const var knobGroups = [];

namespace Envelope
{	
	// ----------------------
	// LAF VARIABLES & Colours
	// ----------------------
	const var LineWidthValue   = 2.0;  
	const var BallSizeValue    = 3.0;  
	const var FillEnabled      = 1;    
	const var LineEnabled      = 1;    
	const var BallsEnabled     = 1;    
	
	const var BallStaticColour   = 0xFF6160D3;
	const var BallHoverColour    = 0xFCCFFFFFF;
	const var activeColour1      = 0x956160D3; 
	const var activeHoverColour1 = 0xFCCFFFFFF; 
	const var inactiveColour1    = 0x106160D3; 
	
	// ----------------------
	// Knob Grouping
	// ----------------------
	inline function sortEnvKnobs()
	{
	    local numGroups = parseInt(knbs_Env.length / 8);
	    for (i = 0; i < numGroups; i++)
	    {
	    	local group = [];
	         for (j = 0; j < 8; j++)
	         {
	              group.push(knbs_Env[i * 8 + j]);
	         }
	         knobGroups.push(group);
	    }
	}
	
	sortEnvKnobs();
	
	// ----------------------
	// Global Panel Paint Routine
	// ----------------------
	inline function pnl_EnvPr()
	{
		// Determine group index
		local groupIndex = -1;
		for (i = 0; i < panelGroups.length; i++)
		{
		     if (this == panelGroups[i])
		     {
		          groupIndex = i;
		          break;
		     }
		}
		if (groupIndex == -1)
		     return;

		local w = this.getWidth();
		local h = this.getHeight() - 1;
		local v = this.getValue();
		local offset = BallSizeValue;
		local lineWidth = LineWidthValue;
		local padding = 5;
		local bottomPadding = 20;
		local slot = (w - 2 * padding) / 5;
		local x;
		local db;
		local obj = [];
		local names = ["Attack", "Hold", "Decay", "Sustain", "Release"];
		local knbsOrder = [0, 2, 3, 4, 5];
		local knobs = knobGroups[groupIndex];
		local p = Content.createPath();
		p.clear();
	    
	    // Draw envelope curve 
	    p.startNewSubPath(padding, h - padding - bottomPadding - 0.5);
	    x = slot * v[0] + padding;
	    v[1] > v[4] ?
	         db = (h - 2 * padding - bottomPadding) * (1 - v[1]) + padding :
	         db = (h - 2 * padding - bottomPadding) * (1 - v[4]) + padding;
	    p.quadraticTo(x / 2 + padding / 2, (h - 2 * padding - bottomPadding) * (1 - v[1] * (1 - v[6])) + padding, x, db);
	    obj.push([x, db]);
	    local dbA = db;
	    x += slot * v[2];
	    p.lineTo(x, db);
	    obj.push([x, db]);
	    x += slot * v[3] * 2;
	    db = (h - 2 * padding - bottomPadding) * (1 - v[4]) + padding;
	    local ddb = db - dbA;
	    p.quadraticTo(x - slot * v[3], (db - ddb * (1 - v[7])), x, db);
	    obj.push([x, db]);
	    x = slot * 4 + padding;
	    p.lineTo(x, db);
	    obj.push([x, db]);
	    x += slot * v[5];
	    p.quadraticTo(x - slot * v[5], h - padding - bottomPadding, x, h - padding - bottomPadding - 0.5);
	    obj.push([x, h - padding - bottomPadding]);
	    
	    this.data.objects = obj;
	    local area = p.getBounds(1);
	    
	    g.beginLayer(true);
	    g.fillAll(this.get("bgColour"));
	    g.setColour(this.get("itemColour"));
	    if (FillEnabled)
	         g.fillPath(p, area);
	    g.setColour(this.get("itemColour2"));
	    if (LineEnabled)
	         g.drawPath(p, area, lineWidth);
	    
	    // Draw those balls
	    if (BallsEnabled)
	    {
	         for (i = 0; i < 5; i++)
	         {
	              i == this.data.hover ? g.setColour(BallHoverColour) : g.setColour(BallStaticColour);
	              local bx = obj[i][0] - offset;
	              local by = obj[i][1] - offset;
	              bx = Math.range(bx, padding, w - offset * 2 - padding);
	              by = Math.range(by, padding, h - offset * 2 - padding - bottomPadding);
	              g.drawEllipse([bx, by, offset * 2, offset * 2], 2);
	         }
	    }
	    
	    // Draw label when hovering over control
	    if (this.data.hover != -1)
	    {
	         local suffix;
	         g.setColour(this.get("textColour"));
	         g.setFont("GlobalFont", 12);
	         local paramName = names[this.data.hover];
	         local data = Math.round(knobs[knbsOrder[this.data.hover]].getValue());
	         this.data.hover == 3 ? suffix = " dB" : suffix = " ms";
	         local label = paramName + ": " + data + suffix;
	         g.drawAlignedText(label, [0, h - 20, w, 20], "centredBottom");
	    }
	}
	
	// ----------------------
	// Global Panel Mouse Callback Routine
	// ----------------------
	inline function pnl_EnvMc()
	{   
		// Determine group index based on the current panel (this)
		local groupIndex = -1;
		for (i = 0; i < panelGroups.length; i++)
		{
		     if (this == panelGroups[i])
		     {
		          groupIndex = i;
		          break;
		     }
		} 
	    local w = this.getWidth();
	    local h = this.getHeight();
	    local v = this.getValue();
	    local sens = 200;
	    local padding = 5;
	    local bottomPadding = 20;
	    
	    
	    if (groupIndex == -1)
	         return;
	         
	    if (event.hover && !event.drag)
	    {
	         local closest = 1000.0;
	         local objIdx;
	         this.data.mouseX = event.x;
	         this.data.mouseY = event.y;
	         local tdo = this.data.objects;
	         for (i = 0; i < 5; i++)
	         {
	              local diffX = Math.abs(parseInt(tdo[i][0]) - parseInt(event.x));
	              if (diffX < closest)
	              {
	                   closest = diffX;
	                   objIdx = i;
	              }
	              else if (diffX == closest)
	              {
	                   if (Math.abs(tdo[i][1] - parseInt(event.y)) < Math.abs(tdo[objIdx][1] - parseInt(event.y)))
	                        objIdx = i;
	                   else if (objIdx == 0)
	                        objIdx = 1;
	              }
	         }
	         this.data.hover = objIdx;
	         this.repaint();
	    }
	    else if (!event.hover)
	    {
	         this.data.hover = -1;
	         this.repaint();
	    }
	    
	    if (event.clicked || event.drag)
	    {
	         if (event.clicked)
	         {
	              local KnbValues = [];
	              // Get the knobs for the current group
	              local knobs = knobGroups[groupIndex];
	              for (i = 0; i < knobs.length; i++)
	              {
	                   KnbValues.push(knobs[i].getValueNormalized());
	              }
	              this.data.values = KnbValues;
	         }
	         
	         switch (this.data.hover)
	         {
	              case 0:
	                   if (event.shiftDown || event.rightClick)
	                   {
	                        knobGroups[groupIndex][6].setValueNormalized(this.data.values[6] + event.dragX/sens);
	                        knobGroups[groupIndex][6].changed();
	                   }
	                   else
	                   {
	                        knobGroups[groupIndex][0].setValueNormalized(this.data.values[0] + event.dragX/sens);
	                        knobGroups[groupIndex][1].setValueNormalized(this.data.values[1] - event.dragY/sens);
	                        knobGroups[groupIndex][0].changed();
	                        knobGroups[groupIndex][1].changed();
	                   }
	                   break;
	              case 1:
	                   knobGroups[groupIndex][2].setValueNormalized(this.data.values[2] + event.dragX/sens);
	                   knobGroups[groupIndex][2].changed();
	                   break;
	              case 2:
	                   if (event.shiftDown)
	                   {
	                        knobGroups[groupIndex][7].setValueNormalized(this.data.values[7] + event.dragX/sens);
	                        knobGroups[groupIndex][7].changed();
	                   }
	                   else
	                   {
	                        knobGroups[groupIndex][3].setValueNormalized(this.data.values[3] + event.dragX/sens);
	                        knobGroups[groupIndex][3].changed();
	                   }
	                   break;
	              case 3:
	                   knobGroups[groupIndex][4].setValueNormalized(this.data.values[4] - event.dragY/sens);
	                   knobGroups[groupIndex][4].changed();
	                   break;
	              case 4:
	                   knobGroups[groupIndex][5].setValueNormalized(this.data.values[5] + event.dragX/sens);
	                   knobGroups[groupIndex][5].changed();
	                   break;
	         }
	    }
	}
	
	// ----------------------
	// Global Knob Control Callback
	// ----------------------
	inline function onAHDSRKnbsControl(component, value)
	{
		local groupIndex = -1;

		// Determine which group contains the triggering knob.
		for (i = 0; i < knobGroups.length; i++)
		{
		     for (j = 0; j < knobGroups[i].length; j++)
		     {
		          if (knobGroups[i][j] == component)
		          {
		               groupIndex = i;
		               break;
		          }
		     }
		     if (groupIndex != -1)
		          break;
		}
		if (groupIndex == -1)
		     return;
	   
	    local knobs = knobGroups[groupIndex];
	    local envelope = envGroups[groupIndex];
	    local panel = panelGroups[groupIndex];
	    local attributes = [2,3,4,5,6,7,8,9];
	    local panelValues = [];
	         
	    // Assign the controls     
	    for (k = 0; k < 8; k++)
	    {
	         envelope.setAttribute(attributes[k], knobs[k].getValue());
	         panelValues.push(knobs[k].getValueNormalized());
	    }
	    panel.setValue(panelValues);
	    panel.changed();
	}
	
	// ----------------------
	// Assign the Global Panel Callbacks to Each Panel
	// ----------------------
	for (i = 0; i < panelGroups.length; i++)
	{
	    panelGroups[i].setPaintRoutine(function(g)
	    {
	         pnl_EnvPr();
	    });
	    panelGroups[i].setMouseCallback(function(event)
	    {
			pnl_EnvMc();
	    });
	}
	
	// ----------------------
	// Assign the Knob Control Callback to All Knobs in Each Group
	// ----------------------
	for (i = 0; i < knobGroups.length; i++)
	{
	    for (j = 0; j < knobGroups[i].length; j++)
	    {
	         knobGroups[i][j].setControlCallback(onAHDSRKnbsControl);
	    }
	}
}


