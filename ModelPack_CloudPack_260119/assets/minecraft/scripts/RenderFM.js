/* 스크립트 작성은 kodeholic, 파일 원본 holic pack입니다
클라팩 전광판 추가를 위해 사용 */

var renderClass = "jp.ngt.rtm.render.SignalPartsRenderer";
importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.jp.ngt.rtm.render);
var foo = 1;
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
msg11 = renderer.registerParts(new Parts("msg11"));
msg12 = renderer.registerParts(new Parts("msg12"));
lcd = renderer.registerParts(new Parts("lcd"));
}
function render(entity, pass, par3)
{
GL11.glPushMatrix();
renderSignboard(entity);
GL11.glPopMatrix();
}
function renderSignboard(entity)
{
	body.render(renderer);
	
	s = renderer.getSignal(entity);

	switch (s) {
		case 4: // 곧도착
			msg12.render(renderer); // 곧도착
			lcd.render(renderer);
			break;
		case 3: // 접근
			if (foo <= 600) {
				msg05.render(renderer); // 접근
				lcd.render(renderer);
			} else {
				msg06.render(renderer); // 질서계도
				lcd.render(renderer);
			}
			break;
		case 2: // 도착
			if (foo <= 600) {
				msg10.render(renderer); // 열차도착
				lcd.render(renderer);
			} else {
				msg02.render(renderer); // 출입문
				lcd.render(renderer);
			}
			break;
		case 1: // 발차
			if (foo <= 600) {
				msg07.render(renderer); // 열차출발
				lcd.render(renderer);
			} else {
				msg08.render(renderer); // 다음차이용
				lcd.render(renderer);
			}
			break;
		case 5: // 운행중단
			if (foo <= 600) {
				msg09.render(renderer); // 운행중단
				lcd.render(renderer);
			} else {
				msg11.render(renderer); // 다른교통수단
				lcd.render(renderer);
			}
			break;
		case 6: // 조정중
			msg01.render(renderer); // 조정중
			lcd.render(renderer);
			break;
		default: // 평소
			if (foo <= 600) {
				msg04.render(renderer); // 무임승차
				lcd.render(renderer);
			} else {
				msg02.render(renderer); // 출입문
				lcd.render(renderer);
			}
			break;
	}

	if (foo >= 1200) {
		foo = 1;
	} else {
		foo++;
	}
}

/*
01 조정중
02 출입문
03 안전선
04 무임승차
05 열차접근
06 질서계도
07 열차출발
08 다음차이용
09 운행중단
10 열차도착
11 다른교통수단
12 잠시후
*/