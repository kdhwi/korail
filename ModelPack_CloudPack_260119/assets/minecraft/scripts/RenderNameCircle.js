var renderClass = "jp.ngt.rtm.render.MachinePartsRenderer";
importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.jp.ngt.ngtlib.renderer);
importPackage(Packages.jp.ngt.rtm.render);

function init(par1, par2) {
	if (renderer.getModelName().indexOf("__L") != -1){
		main = renderer.registerParts(new Parts('main'));
		drag = renderer.registerParts(new Parts('dragL'));
		circle = renderer.registerParts(new Parts("circle"));
		bisang = renderer.registerParts(new Parts("bisang"));
		modl = "L";
		return;
	}
	if (renderer.getModelName().indexOf("__R") != -1){
		main = renderer.registerParts(new Parts('main'));
		drag = renderer.registerParts(new Parts('dragR'));
		circle = renderer.registerParts(new Parts("circle"));
		bisang = renderer.registerParts(new Parts("bisang"));
		modl = "R";
		return;
	}
}


function render(entity, pass, par3, color) {
	GL11.glPushMatrix();
	   GL11.glTranslatef(2.0, 0.0, 0.0);

	  if (pass == 0) {
        var color = renderer.getColor(entity);
        if (color <= 0) {
            color = 0xFFFFFF;
        }
    drag.render(renderer);
	main.render(renderer);
	
if (renderer.getModelName().indexOf("RAIL") != -1){
		bisang.render(renderer);
	}
	{  
        NGTRenderHelper.setColor(color);
        circle.render(renderer);
        NGTRenderHelper.setColor(0xFFFFFF);
    }
}	
GL11.glPopMatrix();



}