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
      
   if (renderer.getModelName().indexOf("N") != -1)
   { //-1 : 없다
      main = renderer.registerParts(new Parts('obj1'));
      modl = "N";
   return;
   }
   if (renderer.getModelName().indexOf("__L") != -1){
      main = renderer.registerParts(new Parts('obj1'));
      door = renderer.registerParts(new Parts('obj2'));
      loff = renderer.registerParts(new Parts('L1'));
      lon = renderer.registerParts(new Parts('L2'));
      modl = "L";
      return;
   }
   if (renderer.getModelName().indexOf("__R") != -1){
      main = renderer.registerParts(new Parts('obj3'));
      door = renderer.registerParts(new Parts('obj4'));
      loff = renderer.registerParts(new Parts('L3'));
      lon = renderer.registerParts(new Parts('L4'));
      modl = "R";
      return;
   }

   doorMoveID = 0;
    prevTickID = 1;
}
doorMoveData = {};
prevTickData = {};

var currTick = 0;

//여기부터 : 렌더
function render(entity, pass, par3){
   
   GL11.glPushMatrix();

   if (renderer.getModelName().indexOf("RAIL") != -1){
      GL11.glTranslatef(0.0, 1.0, 0.3);
    }
	main.render(renderer); 
    GL11.glPopMatrix();

   if(entity === null)
    {
        GL11.glPushMatrix();
		   if (renderer.getModelName().indexOf("RAIL") != -1){
      GL11.glTranslatef(0.0, 1.0, 0.3);
    }
      main.render(renderer);   
      
       if (modl != "N") {
            //loff.render(renderer);
            door.render(renderer);
        }
        GL11.glPopMatrix();
      return;
   }

     //※ドアはX軸方向に動くので調整すること
    //設定
   //수치 알아서 조절하십시오.
    var doorMoveDistance = 1; //初期値
    var doorMoveDistanceA = 1.16; //ドアの長さ(m)
    var doorMoveTime = 3.0; //開閉するまでの時間
    var moveFlip = false; //左右反転する ※設定不要

    //直接検知
	var uprail = renderer.getModelName().indexOf("RAIL");
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

    if (modl != "N"){
	   if (doorMove <= 0) {
		       GL11.glPushMatrix();
			      if (uprail != -1){
      GL11.glTranslatef(0.0, 1.0, 0.3);
    }
        loff.render(renderer);
		GL11.glPopMatrix();
    }
	
    else if (0 < doorMove && doorMove < doorMoveDistance) {
		  
        if (0 < doorMove && doorMove <= 0.17
            || 0.34 < doorMove && doorMove <= 0.5
            || 0.67 < doorMove && doorMove <= 0.84) {
				GLHelper.disableLighting();
				 GL11.glPushMatrix();
				    if (uprail != -1){
      GL11.glTranslatef(0.0, 1.0, 0.3);
    }
            lon.render(renderer);
			GL11.glPopMatrix();
			GLHelper.enableLighting();
        }
        else {
			    GL11.glPushMatrix();
				   if (uprail != -1){
      GL11.glTranslatef(0.0, 1.0, 0.3);
    }
            loff.render(renderer);
			GL11.glPopMatrix();
        }
    }
    else if (doorMove >= 1) {
		  GL11.glPushMatrix();
		     if (uprail != -1){
      GL11.glTranslatef(0.0, 1.0, 0.3);
    }
        lon.render(renderer);
		  GL11.glPopMatrix();
    }
   }

  
    
    var doorRender = function (door, Minus, MoveDis) {
        GL11.glPushMatrix();
        GL11.glTranslatef(doorMove * Minus * MoveDis, 0, 0);
       if (modl != "N") { 	      if (uprail != -1){
      GL11.glTranslatef(0.0, 1.0, 0.3);
    }	door.render(renderer);}

        GL11.glPopMatrix();
    }

   //문이 열리네요~~~
    if (modl == "L")
        doorRender(door, flag, doorMoveDistanceA);
    else if (modl == "R")
        doorRender(door, -flag, doorMoveDistanceA);
}

//検知の表示 バールを持つと描画
/*
if (NGTUtilClient.getMinecraft().field_71071_by) {
    var stack = NGTUtilClient.getMinecraft().field_71439_g.field_71071_by.func_70448_g();
    if (stack !== null) {
        if (stack.func_77973_b() === RTMItem.crowbar) {
            spawnParticle(world, "reddust", pos[0] - 1.5 + offset[0], pos[1], pos[2] - 1.5 + offset[2], 0, 0, 0);
            spawnParticle(world, "reddust", pos[0] - 1.5 + offset[0], pos[1], pos[2] + 1.5 + offset[2], 0, 0, 0);
            spawnParticle(world, "reddust", pos[0] + 1.5 + offset[0], pos[1], pos[2] + 1.5 + offset[2], 0, 0, 0);
            spawnParticle(world, "reddust", pos[0] + 1.5 + offset[0], pos[1], pos[2] - 1.5 + offset[2], 0, 0, 0);
        }
    }
}
*/

//importPackage(Packages.jp.ngt.rtm);
function MCVersionChecker() {
    var varsion = RTMCore.VERSION;
    if (varsion.indexOf("1.7.10") >= 0) return "1.7.10";
    else if (varsion.indexOf("2.0") >= 0) return "1.8.9";
    else if (varsion.indexOf("2.1") >= 0) return "1.9.4";
    else if (varsion.indexOf("2.2") >= 0) return "1.10.2";
    else if (varsion.indexOf("2.4") >= 0) return "1.12.2";
    else return "unknown";
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

function spawnParticle(world, name, x, y, z, vx, vy, vz){
	if (RTMCore.VERSION.indexOf("1.7.10") >= 0){
		world.func_72869_a(name, x, y, z, vx, vy, vz);
	} else if (RTMCore.VERSION.indexOf("1.8.9") >= 0){
		world.func_175688_a(EnumParticleTypes.WATER_SPLASH, x, y, z, vx, vy, vz, []);
	} else{
		world.func_175688_a(EnumParticleTypes.func_186831_a(name), x, y, z, vx, vy, vz, []);
	}
}