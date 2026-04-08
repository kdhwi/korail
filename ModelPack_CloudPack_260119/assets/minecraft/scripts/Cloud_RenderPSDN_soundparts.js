//여기부터 : 왜 쓰는지는 모르겠는데 일단 있는거
// Thanks to @LunchBug
var renderClass = "jp.ngt.rtm.render.MachinePartsRenderer";
importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.jp.ngt.rtm.render);
importPackage(Packages.jp.ngt.ngtlib.renderer);
importPackage(Packages.jp.ngt.rtm);
importPackage(Packages.jp.ngt.ngtlib.math);
importPackage(Packages.jp.ngt.rtm.entity.train);
importPackage(Packages.net.minecraft.util); //1.7.10-AxisAlignedBB
importPackage(Packages.net.minecraft.util.math); //1.12.2-AxisAlignedBB
importPackage(Packages.jp.ngt.ngtlib.util);
importPackage(Packages.jp.ngt.ngtlib.io);
importPackage(Packages.jp.ngt.rtm.entity.train.parts);
importPackage(Packages.jp.ngt.rtm.modelpack);//modelpackmanager

//여기부터 : 모델 등록
function init(par1, par2) {
      
 main = renderer.registerParts(new Parts("body"));
	 door = renderer.registerParts(new Parts("doorL"));


   doorMoveID = 0;
    prevTickID = 1;
			modelName = par1.getConfig().getName();
		openSoundName = "rtm_cloudPSDOPEN";
		closeSoundName = "rtm_cloudPSDCLOSE";
	setSound("KORpsdsound_1", "rtm_cloudPSDOPEN", "rtm_cloudPSDCLOSE"); 
	setSound("KORpsdsound_2", "rtm_cloudPSDOPEN2", "rtm_cloudPSDOPEN2");
	setSound("KORpsdsound_3", "rtm_cloudPSDOPEN3", "rtm_cloudPSDCLOSE3");
	setSound("KORpsdsound_4", "rtm_cloudPSDOPEN4", "rtm_cloudPSDCLOSE3");
	setSound("KORpsdsound_5", "rtm_cloudPSDOPEN5", "rtm_cloudPSDCLOSE5");
	setSound("KORpsdsound_6", "rtm_cloudPSDOPEN6", "rtm_cloudPSDCLOSE6");
	setSound("KORpsdsound_7", "rtm_cloudPSDOPEN7", "rtm_cloudPSDCLOSE7");
	setSound("KORpsdsound_8", "rtm_cloudPSDOPEN8", "rtm_cloudPSDCLOSE8");

	
}
doorMoveData = {};
prevTickData = {};

var currTick = 0;

function setSound(name, openPath, closePath){
	if(modelName == name){
		openSoundName = openPath;
		closeSoundName = closePath;
	}
}


//여기부터 : 렌더
function render(entity, pass, par3){
   
   GL11.glPushMatrix();
	main.render(renderer); 
    GL11.glPopMatrix();

   if(entity === null)
    {
        GL11.glPushMatrix();
      main.render(renderer);   
        GL11.glPopMatrix();
      return;
   }

     //※ドアはX軸方向に動くので調整すること
    //設定
   //수치 알아서 조절하십시오.
    var doorMoveDistance = 1; //初期値
    var doorMoveDistanceA = 1.16; //ドアの長さ(m)
    var doorMoveTime = 3.00; //開閉するまでの時間
    var moveFlip = false; //左右反転する ※設定不要

    //直接検知
    var yaw = renderer.getYaw(entity);
	var flag = moveFlip ? -1 : 1;
	var vector = new Vec3(0, 0, 0).rotateAroundY(yaw);
	var offset = [vector.getX(), vector.getY(), vector.getZ()];
	var pos = getPosTileEntity(entity);
	var entityId = pos.join(":");
	var doorMovement = doorMoveDistance / (doorMoveTime * 20);
	var doorMove = doorMoveData[entityId];
    if (doorMoveData[entityId] === undefined) doorMove = 0;
	if (doorMove < 0)  doorMove = 0; 
	if (doorMove > 1)  doorMove = 1; 	
    var shouldUpdate = updateTick(entity, pass);
if (RTMCore.VERSION.indexOf("1.7.10") >= 0){
		var searchAABB = AxisAlignedBB.func_72330_a(
			pos[0] - 2.0 + offset[0], 
			pos[1] - 1, 
			pos[2] - 2.0 + offset[2], 
			pos[0] + 2.0 + offset[0], 
			pos[1] + 1, 
			pos[2] + 2.0 + offset[2]
		);
	} else{
		var searchAABB = new AxisAlignedBB(
			pos[0] - 2.0 + offset[0], 
			pos[1] - 1, 
			pos[2] - 2.0 + offset[2], 
			pos[0] + 2.0 + offset[0], 
			pos[1] + 1, 
			pos[2] + 2.0 + offset[2]
		);
	}
var world = entity.func_145831_w();
	var entityList1 = world.func_72872_a(EntityTrainBase.class, searchAABB); //List型
	var entityList2 = world.func_72872_a(EntityBogie.class, searchAABB); //List型
	var entityList3 = world.func_72872_a(EntityFloor.class, searchAABB); //List型
	var target = null;
	if (entityList1.size() > 0) target = entityList1.get(0);
	if (entityList2.size() > 0) target = entityList2.get(0).getTrain();
	if (entityList1.size() === 0 &&
		entityList2.size() === 0 &&
		entityList3.size() > 0){
		target = entityList3.get(0).getVehicle();
	}
    var doorState = 0;
    if (target !== null) {
        doorState = target.getTrainStateData(4);
    }
    if (shouldUpdate) {
        if (doorState > 0) {
            if (doorMove < doorMoveDistance) doorMove += doorMovement;
        } else {
            if (doorMove > 0) doorMove -= doorMovement;
        }
    }
    doorMoveData[entityId] = doorMove;

	if (0 < doorMove && doorMove < doorMoveDistance) {
 	if ( 0.05 > doorMove || doorMove > 0.95) {
      if (doorState != 0 && 0.0186 > doorMove) { var path = openSoundName
		  playSound(entity, new ResourceLocation("sound_cloud2", path), 1, 1); }
         if (doorState == 0 && 0.9814 < doorMove )  { var path = closeSoundName
		 playSound(entity, new ResourceLocation("sound_cloud2", path), 1, 1);}
						
        }

        }
    
  
    
    var doorRender = function (door, Minus, MoveDis) {
        GL11.glPushMatrix();
        GL11.glTranslatef(doorMove * Minus * MoveDis, 0, 0);
 	door.render(renderer);

        GL11.glPopMatrix();
    }

   //문이 열리네요~~~
        doorRender(door, flag, doorMoveDistanceA);

}

function updateTick(entity, pass){
	var pos = getPosTileEntity(entity);
	var matId = renderer.currentMatId;
	var entityId = pos.join(":");
	var tick = renderer.getTick(entity);
	var prevTick = prevTickData[entityId];
	prevTickData[entityId] = tick;
	return prevTick !== tick && pass === 0 && matId === 0;
}

function getPosTileEntity(tileEntity){
	var value = [];
	if (RTMCore.VERSION.indexOf("1.7.10") >= 0){
		value = [tileEntity.field_145851_c + 0.5, 
		tileEntity.field_145848_d, 
		tileEntity.field_145849_e + 0.5];
	} else{
		var pos = tileEntity.func_174877_v();
		value = [pos.func_177958_n() + 0.5, 
		pos.func_177956_o(), 
		pos.func_177952_p() + 0.5];
	}
	return value;
}

function playSound(entity, path, volume, pitch){
	if(!entity) return;
	if(RTMCore.VERSION.indexOf("1.7.10") >= 0){
		RTMCore.proxy.playSound(entity, path, volume, pitch);
	}else{
		RTMCore.proxy.playSound(entity, ModelPackManager.INSTANCE.getResource("sound_cloud2","sounds/train/"+path+".ogg"), volume, pitch);
	}
}