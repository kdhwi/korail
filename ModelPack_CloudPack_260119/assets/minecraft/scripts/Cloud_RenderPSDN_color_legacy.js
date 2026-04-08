//여기부터 : 왜 쓰는지는 모르겠는데 일단 있는거
var renderClass = "jp.ngt.rtm.render.MachinePartsRenderer";
importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.jp.ngt.ngtlib.renderer);
importPackage(Packages.jp.ngt.rtm.render);

//여기부터 : 모델 등록
function init(par1, par2) {
		
		if (renderer.getModelName().indexOf("N") != -1){ //-1 : 없다
		main = renderer.registerParts(new Parts('obj1'));
		colorline = renderer.registerParts(new Parts('color'));
		modl = "N";
		return;
	}
	if (renderer.getModelName().indexOf("__L") != -1){
		main = renderer.registerParts(new Parts('obj1'));
		door = renderer.registerParts(new Parts('obj2'));
		loff = renderer.registerParts(new Parts('L1'));
		lon = renderer.registerParts(new Parts('L2'));
		colorline = renderer.registerParts(new Parts('colorL'));
		modl = "L";
		return;
	}
	if (renderer.getModelName().indexOf("__R") != -1){
		main = renderer.registerParts(new Parts('obj3'));
		door = renderer.registerParts(new Parts('obj4'));
		loff = renderer.registerParts(new Parts('L3'));
		lon = renderer.registerParts(new Parts('L4'));
		colorline = renderer.registerParts(new Parts('colorR'));
		modl = "R";
		return;
	}
}

//여기부터 : 렌더
function render(entity, pass, par3, color){
	
	GL11.glPushMatrix();
	if (renderer.getModelName().indexOf("RAIL") != -1){
			GL11.glTranslatef(0.0, 1.0, 0.3);
	}

	main.render(renderer);	
  var color = renderer.getColor(entity);
        if (color <= 0) {
            color = 0xD9D9D9;
        }
		{  
        NGTRenderHelper.setColor(color);
        colorline.render(renderer);
        NGTRenderHelper.setColor(0xFFFFFF);
		
    }
	GL11.glPopMatrix();
	
	GL11.glPushMatrix();
	if (modl != "N"){
		var mpo = renderer.getMovingCount(entity);
		 var doorSpeed = 1.475;
			 var doorLength = 1.16;
			 var doorRLength = -1.16;
		if (renderer.getLightState(entity) != 0){ //라이트
			loff.render(renderer);
		}else{
			lon.render(renderer);
		}
		
		if (modl == "L"){ //도어
			move = mpo * (
            doorLength) * doorSpeed ;
		}
		if (modl == "R"){
			move = mpo * (
            doorRLength) * doorSpeed ;
		}
	   if (doorLength > 0) {
            if (move > doorLength) {
                move = doorLength;
            }
        }
        else if (doorLength < 0) {
            if (move < doorLength) {
                move = doorLength;
            }
        }
		   if (doorRLength < 0) {
            if (move <doorRLength) {
                move = doorRLength;
            }
        }
        else if (doorRLength >0) {
            if (move > doorRLength) {
                move = doorRLength;
            }
        }
		GL11.glTranslatef(move + 0.0, 0.0, 0.0);
		door.render(renderer);
	}
	   
	
	
GL11.glPopMatrix();
}

//HolicPack 스크립트 참고해서 작성 속도제어는 hi03님 스크립트 참고