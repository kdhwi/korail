//여기부터 : 왜 쓰는지는 모르겠는데 일단 있는거
var renderClass = "jp.ngt.rtm.render.MachinePartsRenderer";
importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.jp.ngt.ngtlib.renderer);
importPackage(Packages.jp.ngt.rtm.render);

//여기부터 : 모델 등록
function init(par1, par2) {
	main = renderer.registerParts(new Parts('obj1'));
		door = renderer.registerParts(new Parts('obj2'));
		loff = renderer.registerParts(new Parts('L1'));
		lon = renderer.registerParts(new Parts('L2'));
		doorR = renderer.registerParts(new Parts('obj4'));
		return;
}

//여기부터 : 렌더
function render(entity, pass, par3){
	
	GL11.glPushMatrix();
	if (renderer.getModelName().indexOf("RAIL") != -1){
			GL11.glTranslatef(0.0, 1.0, 0.3);
	}

	main.render(renderer);	

	GL11.glPopMatrix();
	
	GL11.glPushMatrix();
		var mpo = renderer.getMovingCount(entity);
		 var doorSpeed = 1.475;
			 var doorLength = 1.16;
			 var doorRLength = -1.16;
		if (renderer.getLightState(entity) != 0){ //라이트
			loff.render(renderer);
		}else{
			lon.render(renderer);
		}
	  GL11.glPopMatrix();
	  
		function doorRender (entity) {
        GL11.glPushMatrix();
       move = mpo * (doorLength) * doorSpeed ;
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
		GL11.glTranslatef(move + 0.0, 0.0, 0.0);
       	 	door.render(renderer);

        GL11.glPopMatrix();
    }
	
	   function doorRRender(entity) {
        GL11.glPushMatrix();
        move = mpo * ( doorRLength) * doorSpeed ;
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
     	 	doorR.render(renderer);

        GL11.glPopMatrix();
    }

        doorRender(entity);
        doorRRender(entity);
		
		

}

//HolicPack 스크립트 참고해서 작성 속도제어는 hi03님 스크립트 참고