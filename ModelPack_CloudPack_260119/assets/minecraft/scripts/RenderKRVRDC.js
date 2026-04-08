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
	outbase = renderer.registerParts(new Parts("out base", "face", "sys", "driver window", "room window", "door under", "front window", "out end", "cheonjang", "tongro", "sk", "aircon", "dokode"));
	inbase = renderer.registerParts(new Parts("in base", "seonban", "door case", "in badak", "gyedan", "in_doorbyeok", "indoor", "hita", "R_seat", "driver_in", "in end", "roof", "freeseat", "bong", "panel", "obj1"));

	seatF = renderer.registerParts(new Parts("B_seat_F"));
	seatB = renderer.registerParts(new Parts("B_seat_B"));
	
	lightCase = renderer.registerParts(new Parts("light_case"));
	lightFront = renderer.registerParts(new Parts("light_front"));
	lightOther = renderer.registerParts(new Parts("light_other"));
	lightTop = renderer.registerParts(new Parts("light_top"));
	
	LF = renderer.registerParts(new Parts("LF"));
	RF = renderer.registerParts(new Parts("RF"));
	LB = renderer.registerParts(new Parts("LB"));
	RB = renderer.registerParts(new Parts("RB"));
	
	dest1 = renderer.registerParts(new Parts("dest1"));
	dest2 = renderer.registerParts(new Parts("dest2"));
	dest3 = renderer.registerParts(new Parts("dest3"));
	dest4 = renderer.registerParts(new Parts("dest4"));
	dest5 = renderer.registerParts(new Parts("dest5"));
	dest6 = renderer.registerParts(new Parts("dest6"));
	dest7 = renderer.registerParts(new Parts("dest7"));
	dest8 = renderer.registerParts(new Parts("dest8"));
	dest9 = renderer.registerParts(new Parts("dest9"));
	dest10 = renderer.registerParts(new Parts("dest10"));
	dest11 = renderer.registerParts(new Parts("dest11"));
	dest12 = renderer.registerParts(new Parts("dest12"));
	dest13 = renderer.registerParts(new Parts("dest13"));
}

function render(entity, pass, par3)
{
	
	//일단 다른거랑 상관없는거 렌더
	outbase.render(renderer);
	inbase.render(renderer);
	lightCase.render(renderer);
	lightFront.render(renderer);

	//진행방향따라 렌더 다른것
	if (entity == null){
		seatF.render(renderer);
		lightFront.render(renderer);
	}else{
		var direction = entity.getTrainDirection(); //열차 방향
		if (direction == 0) {
			seatF.render(renderer);			
		}
		else
		{
			seatB.render(renderer);
			lightOther.render(renderer);
			lightTop.render(renderer);
		}
		
		var pantostate = TrainState.Pantograph_Down.data;
		if (typeof entity.getVehicleState === 'function') {
			pantostate = entity.getVehicleState(TrainState.getStateType(6));
		} else {
			pantostate = entity.getTrainStateData(6);
		}
		
		if (pantostate != TrainState.Pantograph_Down.data)
		{
			lightTop.render(renderer);
		}
	}
	//밖에있는거 가져오기
	renderDoors(entity);
	renderDesti(entity);
}

function renderDoors(entity) {
	var doorX = 0.0; 
	var doorY = 0.0;
	var doorZ = 0.49;

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