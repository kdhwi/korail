var renderClass = "jp.ngt.rtm.render.VehiclePartsRenderer";
importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.jp.ngt.ngtlib.io);
importPackage(Packages.jp.ngt.ngtlib.util);
importPackage(Packages.jp.ngt.ngtlib.renderer);
importPackage(Packages.jp.ngt.rtm.render);
importPackage(Packages.jp.ngt.rtm.entity.train);
importPackage(Packages.jp.ngt.rtm.entity.train.util);
importPackage(Packages.jp.ngt.rtm.entity.train.util.TrainState);
importPackage(Packages.jp.ngt.rtm.entity.train.util.TrainState.TrainStateType);

var cartype = null;

function init(par1, par2)
{
	var filename = renderer.getModelName();
	if(filename.indexOf("_TC") != -1){//Tc차
		cartype = 'TC';
		base = renderer.registerParts(new Parts("TC_seat", "DriverSeat", "TC_in", "TC_myeongam", "light_off", "TC_base", "TC_under")); //오브젝트 목록 니 알아서 잘 적어
		light_front_on = renderer.registerParts(new Parts("light_front_on"));
		light_back_on = renderer.registerParts(new Parts("light_back_on"));
		
	}
	else if(filename.indexOf("_M") != -1){//M차
		cartype = 'M';
		base = renderer.registerParts(new Parts("T_seat", "T_in", "T_myeongam", "T_base", "M_under"));

	}
	else if(filename.indexOf("_P") != -1){//M'차
		cartype = 'P';
		base = renderer.registerParts(new Parts("T_seat", "T_in", "T_myeongam", "T_base", "P_under", "pan_side", "pan_base"));

	    pan_down = renderer.registerParts(new Parts("pan_down_top", "pan_down_body"));
	    pan_up = renderer.registerParts(new Parts("pan_up_top", "pan_up_body"));
	}
	else if(filename.indexOf("_T") != -1){//T차
		cartype = 'T';
		base = renderer.registerParts(new Parts("T_seat", "T_in", "T_myeongam", "T_base", "T_under"));
	}
	else if(filename.indexOf("_MCf") != -1){//Mc1차
		cartype = 'MCf';
		base = renderer.registerParts(new Parts("TC_seat", "DriverSeat", "TC_in", "TC_myeongam", "light_off", "TC_base", "TC_under", "pan_side", "pan_base"));
		light_front_on = renderer.registerParts(new Parts("light_front_on"));
		light_back_on = renderer.registerParts(new Parts("light_back_on"));
		
	}
	else if(filename.indexOf("_MCb") != -1){//Mc2차
		cartype = 'MCb';
		base = renderer.registerParts(new Parts("TC_seat", "DriverSeat", "TC_in", "TC_myeongam", "light_off", "TC_base", "TC_under", "pan_side", "pan_base", "pan_alldown"));
		light_front_on = renderer.registerParts(new Parts("light_front_on"));
		light_back_on = renderer.registerParts(new Parts("light_back_on"));
		
	}
	//오브젝트 등록

	LF = renderer.registerParts(new Parts("Door_L_L"));
	RF = renderer.registerParts(new Parts("Door_R_R"));
	LB = renderer.registerParts(new Parts("Door_L_R"));
	RB = renderer.registerParts(new Parts("Door_R_L"));
	inlight = renderer.registerParts(new Parts("in_light"));
}

function render(entity, pass, par3)
{
  	if(cartype == 'TC'){
        if(renderer.currentMatId < 23 && (pass == RenderPass.NORMAL.id || pass == RenderPass.TRANSPARENT.id)){
         base.render(renderer);
         if(entity != null)   renderDoors(entity);
        }
        else if(  pass == RenderPass.NORMAL.id || pass == RenderPass.TRANSPARENT.id){
         GLHelper.setLightmapMaxBrightness();
         base.render(renderer);
          if(entity != null){
            renderDoors(entity);

            if(typeof entity.getVehicleState === 'function'){
               var lightstatus = entity.getVehicleState(TrainState.getStateType(5));
               var direction =  entity.getVehicleState(TrainState.getStateType(10));
            }
            else{
               var lightstatus = entity.getTrainStateData(5);
               var direction =  entity.getTrainStateData(10);
            }
			GL11.glPushMatrix();
				GLHelper.disableLighting();
				if(lightstatus == 1){
					if(direction == 0)
						light_front_on.render(renderer);
					else
						light_back_on.render(renderer);
				}
				else if(lightstatus == 2){
					light_front_on.render(renderer);
					light_back_on.render(renderer);
				}
				GLHelper.enableLighting();
			GL11.glPopMatrix();
         }
        GLHelper.disableLighting();
		if(entity != null)   inlight.render(renderer);
	  	}
		GLHelper.enableLighting();
	}//
  	else if(cartype == 'M'){
	  	if(renderer.currentMatId < 18 && (pass == RenderPass.NORMAL.id || pass == RenderPass.TRANSPARENT.id)){
			base.render(renderer);
			if(entity != null)   renderDoors(entity);
	  	}
	  	else if(  pass == RenderPass.NORMAL.id || pass == RenderPass.TRANSPARENT.id){
			GLHelper.setLightmapMaxBrightness();
			base.render(renderer);
		 	if(entity != null)   renderDoors(entity);
		if(renderer.currentMatId > 24)
			GLHelper.disableLighting();
			if(entity != null)   inlight.render(renderer);
	  	}
		GLHelper.enableLighting();
	}//
	else if(cartype == 'T'){
	  	if(renderer.currentMatId < 18 && (pass == RenderPass.NORMAL.id || pass == RenderPass.TRANSPARENT.id)){
			base.render(renderer);
			if(entity != null)   renderDoors(entity);
	  	}
	  	else if(  pass == RenderPass.NORMAL.id || pass == RenderPass.TRANSPARENT.id){
			GLHelper.setLightmapMaxBrightness();
			base.render(renderer);
		 	if(entity != null)   renderDoors(entity);
		if(renderer.currentMatId > 24)
			GLHelper.disableLighting();
			if(entity != null)   inlight.render(renderer);
	  	}
		GLHelper.enableLighting();
	}//
	  	else if(cartype == 'P'){
	  	if(renderer.currentMatId < 20 && (pass == RenderPass.NORMAL.id || pass == RenderPass.TRANSPARENT.id)){
			base.render(renderer);
			if(entity != null)   renderDoors(entity);
	  	}
	  	else if(  pass == RenderPass.NORMAL.id || pass == RenderPass.TRANSPARENT.id){
			GLHelper.setLightmapMaxBrightness();
			base.render(renderer);
		 	if(entity != null)   renderDoors(entity);
		if(renderer.currentMatId > 26)
			GLHelper.disableLighting();
			if(entity != null)   inlight.render(renderer);
	  	}
		GLHelper.enableLighting();
			if(entity == null){
		pan_up.render(renderer);
	    }
	     else{
		var pantostate = TrainState.Pantograph_Down.data;
		if (typeof entity.getVehicleState === 'function') {
			pantostate = entity.getVehicleState(TrainState.getStateType(6));
		} else {
			pantostate = entity.getTrainStateData(6);
		}
		
		if (pantostate != TrainState.Pantograph_Down.data){
			pan_up.render(renderer);
		}
		else{
			pan_down.render(renderer);
		}
		
	}
	}//작업한거
		else if(cartype == 'MCf'){
        if(renderer.currentMatId < 25 && (pass == RenderPass.NORMAL.id || pass == RenderPass.TRANSPARENT.id)){
         base.render(renderer);
         if(entity != null)   renderDoors(entity);
        }
        else if(  pass == RenderPass.NORMAL.id || pass == RenderPass.TRANSPARENT.id){
         GLHelper.setLightmapMaxBrightness();
         base.render(renderer);
          if(entity != null){
            renderDoors(entity);

            if(typeof entity.getVehicleState === 'function'){
               var lightstatus = entity.getVehicleState(TrainState.getStateType(5));
               var direction =  entity.getVehicleState(TrainState.getStateType(10));
            }
            else{
               var lightstatus = entity.getTrainStateData(5);
               var direction =  entity.getTrainStateData(10);
            }
			GL11.glPushMatrix();
				GLHelper.disableLighting();
				if(lightstatus == 1){
					if(direction == 0)
						light_front_on.render(renderer);
					else
						light_back_on.render(renderer);
				}
				else if(lightstatus == 2){
					light_front_on.render(renderer);
					light_back_on.render(renderer);
				}
				GLHelper.enableLighting();
			GL11.glPopMatrix();
         }
        GLHelper.disableLighting();
		if(entity != null)   inlight.render(renderer);
	  	}
		GLHelper.enableLighting();
	}//작업한거
		else if(cartype == 'MCb'){
        if(renderer.currentMatId < 25 && (pass == RenderPass.NORMAL.id || pass == RenderPass.TRANSPARENT.id)){
         base.render(renderer);
         if(entity != null)   renderDoors(entity);
        }
        else if(  pass == RenderPass.NORMAL.id || pass == RenderPass.TRANSPARENT.id){
         GLHelper.setLightmapMaxBrightness();
         base.render(renderer);
          if(entity != null){
            renderDoors(entity);

            if(typeof entity.getVehicleState === 'function'){
               var lightstatus = entity.getVehicleState(TrainState.getStateType(5));
               var direction =  entity.getVehicleState(TrainState.getStateType(10));
            }
            else{
               var lightstatus = entity.getTrainStateData(5);
               var direction =  entity.getTrainStateData(10);
            }
			GL11.glPushMatrix();
				GLHelper.disableLighting();
				if(lightstatus == 1){
					if(direction == 0)
						light_front_on.render(renderer);
					else
						light_back_on.render(renderer);
				}
				else if(lightstatus == 2){
					light_front_on.render(renderer);
					light_back_on.render(renderer);
				}
				GLHelper.enableLighting();
			GL11.glPopMatrix();
         }
        GLHelper.disableLighting();
		if(entity != null)   inlight.render(renderer);
	  	}
		GLHelper.enableLighting();
	}//작업한거
}

function renderPantograph(entity){
	var pantostate = TrainState.Pantograph_Down.data;
        if(typeof entity.getVehicleState === 'function')
            pantostate = entity.getVehicleState(TrainState.getStateType(6));
		else
            pantostate = entity.getTrainStateData(6);
               
        if(pantostate != TrainState.Pantograph_Down.data)
            pan_up.render(renderer);
        else
            pan_down.render(renderer);
}

function renderDoors(entity) {
	var doorX = 0.0; 
	var doorY = 0.0;
	var doorZ = 0.71;

	var sig = sigmoid(getDoorMovementR(entity));

	GL11.glPushMatrix();
	GL11.glTranslatef(doorX * sig, doorY * sig, doorZ * sig);
	RF.render(renderer);
	GL11.glPopMatrix();

	GL11.glPushMatrix();
	GL11.glTranslatef(doorX * sig, doorY * sig, doorZ * sig * -1);
	RB.render(renderer);
	GL11.glPopMatrix();

	sig = sigmoid(getDoorMovementL(entity));
	GL11.glPushMatrix();
	GL11.glTranslatef(doorX * sig, doorY * sig, doorZ * sig);
	LF.render(renderer);
	GL11.glPopMatrix();

	GL11.glPushMatrix();
	GL11.glTranslatef(doorX * sig, doorY * sig, doorZ * sig * -1);
	LB.render(renderer);
	GL11.glPopMatrix();
}
/*
function renderDesti(entity) {
	
	if (entity == null){
		dest5.render(renderer);
	}
	else
	{
		var dest = 0;
		if (typeof entity.getVehicleState === 'function') {
			dest = entity.getVehicleState(TrainState.getStateType(8));
		} else {
			dest = entity.getTrainStateData(8);
		}

		var code = "dest" + (dest + 1) + ".render(renderer);";
		eval(code);
	}
}
*/
function sigmoid(par1) {
	if(par1 == 1.0 || par1 == 0.0)
	{
		return par1;
	}

	var f0 = (par1 - 0.5) * 5.0;
	var f1 = f0 / Math.sqrt(1.0 + f0 * f0);
	return (f1 + 1.0) * 0.5;
}

function getDoorMovementR(entity)
{
	if(entity == null) {return 0.0;}
	return entity.doorMoveR / 71;
}

function  getDoorMovementL(entity)
{
	if(entity == null) {return 0.0;}
	return entity.doorMoveL / 71;
}