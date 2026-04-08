/* 스크립트 작성은 kodeholic, 파일 원본 holic pack입니다
클라팩 전광판 추가를 위해 사용 */

var renderClass = "jp.ngt.rtm.render.MachinePartsRenderer";
importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.jp.ngt.rtm.render);

function init(par1, par2)
{
body = renderer.registerParts(new Parts("body"));
msg01 = renderer.registerParts(new Parts("msg01"));
msg02 = renderer.registerParts(new Parts("msg02"));
msg03 = renderer.registerParts(new Parts("msg03"));
msg04 = renderer.registerParts(new Parts("msg04"));
msg05 = renderer.registerParts(new Parts("msg05"));
msg06 = renderer.registerParts(new Parts("msg06"));
msg07 = renderer.registerParts(new Parts("msg07"));
msg08 = renderer.registerParts(new Parts("msg08"));
msg09 = renderer.registerParts(new Parts("msg09"));
msg10 = renderer.registerParts(new Parts("msg10"));

}
function render(entity, pass, par3)
{
GL11.glPushMatrix();
GL11.glTranslatef(2.0, 0.0, 0.0);
	if (renderer.getModelName().indexOf("RAIL") != -1){
			GL11.glTranslatef(2.0, 0.0, 0.3);
	}
renderSignboard(entity);

GL11.glPopMatrix();
}
function renderSignboard(entity)
{
	body.render(renderer);
			var date = new Date();

			var sec = date.getSeconds(); if(sec >30){sec = sec-30 ;}
	
//intervalId = setInterval(function () {}
	
	var foo = sec
	for(;;){
			if(0 <= foo && foo <= 3) {
				msg01.render(renderer); 
			} 
			else if(3 < foo && foo <= 6) {
				msg02.render(renderer);
			}
						else if(6< foo && foo <= 9) {
				msg03.render(renderer); 
			}
						else if(9 < foo && foo <= 12) {
				msg04.render(renderer);
			}
						else if(12 < foo && foo <= 15) {
				msg05.render(renderer); 
			}
			else if(15 < foo && foo <= 18) {
				msg06.render(renderer); 
			}
			else if(18 < foo && foo <= 21) {
				msg07.render(renderer); 
			}
						else if(21 < foo && foo <= 24) {
				msg08.render(renderer); 
			}
						else if(24 < foo && foo <= 27) {
				msg09.render(renderer); 
			}
						else {
				msg10.render(renderer); 
			}
	break;
	
		}

	
}