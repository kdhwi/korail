var renderClass = "jp.ngt.rtm.render.VehiclePartsRenderer";
importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.jp.ngt.rtm.render);
importPackage(Packages.jp.ngt.rtm.entity.train);
importPackage(Packages.jp.ngt.rtm.entity.train.util);
importPackage(Packages.jp.ngt.rtm.entity.train.util.TrainState);
importPackage(Packages.jp.ngt.rtm.entity.train.util.TrainState.TrainStateType);

function init(par1, par2)
{
	//오브젝트 등록
	//outbase = renderer.registerParts(new Parts("M_under", "handle", "shadow", "M_base"));
	base = renderer.registerParts(new Parts("pan_base", "pan_side", "M_under", "handle", "shadow", "M_base"));
	/*
	lightCase = renderer.registerParts(new Parts("light_case"));
	lightFront = renderer.registerParts(new Parts("light_front"));
	lightOther = renderer.registerParts(new Parts("light_other"));
	lightTop = renderer.registerParts(new Parts("light_top"));
	*/
	LF = renderer.registerParts(new Parts("door_LF"));
	RF = renderer.registerParts(new Parts("door_RF"));
	LB = renderer.registerParts(new Parts("door_LB"));
	RB = renderer.registerParts(new Parts("door_RB"));
	
	pan_down = renderer.registerParts(new Parts("pan_down_top", "pan_down_body"));
	pan_up = renderer.registerParts(new Parts("pan_up_top", "pan_up_body"));
}

function render(entity, pass, par3)
{
	
	//일단 다른거랑 상관없는거 렌더
	base.render(renderer);

	//lightCase.render(renderer);
	//lightFront.render(renderer);
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
	renderDoors(entity);
}

function renderDoors(entity) {
	var doorX = 0.0; 
	var doorY = 0.0;
	var doorZ = 0.6;

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
	return entity.doorMoveR / 60;
}

function  getDoorMovementL(entity)
{
	if(entity == null) {return 0.0;}
	return entity.doorMoveL / 60;
}