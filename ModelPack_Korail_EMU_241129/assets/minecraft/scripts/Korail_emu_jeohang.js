importPackage(Packages.jp.ngt.ngtlib.util);
importPackage(Packages.jp.ngt.ngtlib.io);
importPackage(Packages.jp.ngt.rtm);
importPackage(Packages.net.minecraft.util);

//include <scripts/sound_o220.js>


function playComplessorSound(su, soundDomain, soundName) {
   //↓섹션끼워넣기
   var entity = su.getEntity();
   var dataMap = entity.getResourceState().getDataMap();
   deadsection(entity, dataMap, 0);
   //↑섹션끼워넣기
   stationAlert(entity, dataMap, 0);
   
    if (su.isComplessorActive()) {
        var count = su.complessorCount();
        var c0 = 50;
        var vol = 1.0;
        if (count < c0) {
            var c1 = c0 * c0;
            vol = -(((count - c0) * (count - c0)) + c1) / c1;
        }
        var pitch = 1.0;
        if (count < c0) {
            pitch = (vol * 0.5) + 0.5;
        }
        su.playSound(soundDomain, soundName, vol, pitch);
    } else {
        su.stopSound(soundDomain, soundName);
    }
}

//include <scripts/pck_plugin/deadsection.js>
//include <scripts/pck_plugin/stationAlert.js>
