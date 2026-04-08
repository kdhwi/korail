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

/*intervalId = setInterval(function () {
  count++;
  foo++;
  if (foo>= 24) {
		foo = 0;
	} 
  if (count > 168) {
    clearInterval(intervalId);
 
  }
}, 1000);*/
var date = new Date();

			var sec = date.getSeconds(); if(sec >30){sec = sec-30 ;}
			var milisec = date.getMilliseconds();	
			
	var footime = (sec*1000)+ milisec ;
	for(;;){
	if(0 <= footime && footime<=3750) {
				msg01.render(renderer); 
			} 
			else if(3750 < footime && footime <= 7500) {
				msg02.render(renderer);
			}
						else if(7500 < footime && footime <= 11250) {
				msg03.render(renderer); 
			}
						else if(11250 < footime && footime <= 15000) {
				msg04.render(renderer);
			}
						else if(15000 < footime && footime <= 18750) {
				msg05.render(renderer); 
			}
			else if(18750 < footime && footime <= 22500) {
				msg06.render(renderer); 
			}
			else if(22500 < footime && footime <= 26250) {
				msg07.render(renderer); 
			}
						else {
				msg08.render(renderer); 
			}
	break;
		}
	
}

/*
01 
*/