//① JAVA 패키지 가져오기
//include <scripts/pck_importPackage.js>

function onUpdate(su){
	//include <scripts/pck_basicFunction.js>

	//② 구동음 가져오기
	//include <scripts/pck_main/toshiba_GTO.js>

	//③ 플러그인 가져오기 및 실행
	//include <scripts/pck_plugin/deadsection.js>
	deadsection(entity, dataMap, 0);
	//include <scripts/pck_plugin/stationAlert.js>
	stationAlert(entity, dataMap, 0);
	
}
