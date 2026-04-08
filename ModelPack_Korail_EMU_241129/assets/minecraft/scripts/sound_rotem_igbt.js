importPackage(Packages.jp.ngt.ngtlib.util);
importPackage(Packages.jp.ngt.rtm.sound);
importPackage(Packages.jp.ngt.ngtlib.io);

function onUpdate(su) {
    onUpdate_RSM2(su);
}

//ここから下のプログラムをコピペしてonUpdate(su)にonUpdate_RSM2(su);を記述することで別のスクリプトに移植できます。
//##### 定数 #####

//音量フェードの時間の長さを設定します 単位:tick
var PowerFadeTime = 5;

//音量フェードの開始時間を遅らせます 単位:tick
var PowerFadeDelay = 0;

//トンネル走行音のフェードの時間の長さを設定します 単位:tick
var TunnelFadeTime = 10;

//##### データ #####
var SoundTrackData = [{"pitch":[[0,1.5],[3,1]],"volume":[[0,0],[0.5,0.4],[2.5,1],[3,0.3],[3.5,0]],"isMute":false,"isNotchPower":false,"isNotchOff":false,"isNotchBrake":true,"isFadeMixer":false,"isTunnelFade":null,"fileName":"brake.ogg"},{"pitch":[[4.8,0.367],[20,2]],"volume":[[5,0],[10,0.5],[15,0]],"isMute":false,"isNotchPower":true,"isNotchOff":false,"isNotchBrake":true,"isFadeMixer":false,"isTunnelFade":null,"fileName":"mo01_2.ogg"},{"pitch":[[0,0],[120,1.32],[180,1.58]],"volume":[[0,0],[65,0.2],[100,0.3],[180,0.4]],"isMute":false,"isNotchPower":true,"isNotchOff":false,"isNotchBrake":true,"isFadeMixer":true,"isTunnelFade":null,"fileName":"mo05.ogg"},{"pitch":[[1,1],[180,1]],"volume":[[3,0],[4,0.3],[180,0.1]],"isMute":false,"isNotchPower":false,"isNotchOff":false,"isNotchBrake":true,"isFadeMixer":false,"isTunnelFade":null,"fileName":"rotem_igbt_electric_s.ogg"},{"pitch":[[1,1],[180,1]],"volume":[[0,0.3],[180,0.1]],"isMute":false,"isNotchPower":true,"isNotchOff":false,"isNotchBrake":false,"isFadeMixer":false,"isTunnelFade":null,"fileName":"rotem_igbt_electric.ogg"},{"pitch":[[0,0.98],[17,0.98],[26,1.02],[30,1.14],[34,1.42]],"volume":[[3,0],[4,0.5],[5,0.6],[10,0.4],[30,0.1],[35,0]],"isMute":false,"isNotchPower":false,"isNotchOff":false,"isNotchBrake":true,"isFadeMixer":false,"isTunnelFade":null,"fileName":"rotem_igbt_motor1_s.ogg"},{"pitch":[[0,0.98],[17,0.98],[26,1.02],[30,1.14],[34,1.42]],"volume":[[0.5,0],[2,0.5],[5,0.6],[10,0.4],[30,0.1],[35,0]],"isMute":false,"isNotchPower":true,"isNotchOff":false,"isNotchBrake":false,"isFadeMixer":false,"isTunnelFade":null,"fileName":"rotem_igbt_motor1.ogg"},{"pitch":[[10,0.6],[30,2]],"volume":[[10,0],[12,0.3],[22,0.4],[30,0]],"isMute":false,"isNotchPower":true,"isNotchOff":false,"isNotchBrake":true,"isFadeMixer":false,"isTunnelFade":null,"fileName":"rotem_igbt_motor3.ogg"},{"pitch":[[10,1],[25,1],[35,1.5]],"volume":[[10,0],[15,0.4],[32,0.7],[36,0]],"isMute":false,"isNotchPower":true,"isNotchOff":false,"isNotchBrake":true,"isFadeMixer":false,"isTunnelFade":null,"fileName":"rotem_igbt_motor4.ogg"},{"pitch":[[20,0.7],[30,0.9],[180,3]],"volume":[[9,0],[28,0],[34,0.7],[90,0.2],[180,0]],"isMute":false,"isNotchPower":true,"isNotchOff":false,"isNotchBrake":true,"isFadeMixer":false,"isTunnelFade":null,"fileName":"rotem_igbt_motor5.ogg"},{"pitch":[[0,1],[140,1]],"volume":[[0,0.5],[50,0]],"isMute":false,"isNotchPower":true,"isNotchOff":true,"isNotchBrake":true,"isFadeMixer":false,"isTunnelFade":null,"fileName":"rtm_pck_toshiba_IGBT_loop.ogg"},{"pitch":[[0,0],[120,1.5],[180,1.8]],"volume":[[0,0],[90,0.4],[180,0.6]],"isMute":false,"isNotchPower":true,"isNotchOff":true,"isNotchBrake":true,"isFadeMixer":false,"isTunnelFade":null,"fileName":"Run40.ogg"},{"pitch":[[0,0],[70,1],[180,1.5]],"volume":[[0,0],[10,0.3],[70,1],[180,1.2]],"isMute":false,"isNotchPower":true,"isNotchOff":true,"isNotchBrake":true,"isFadeMixer":false,"isTunnelFade":null,"fileName":"Run60.ogg"},{"pitch":[[36,1],[120,1.6],[180,1.8]],"volume":[[35,0],[80,0.9],[180,1]],"isMute":false,"isNotchPower":true,"isNotchOff":true,"isNotchBrake":true,"isFadeMixer":false,"isTunnelFade":true,"fileName":"RuninTunnel.ogg"}];
var SoundEffectData = {"brakeLow":{"fileName":"rtm_LRT_release0.ogg"},"brakeOff":{"fileName":"rtm_LRT_release.ogg"},"brakeHigh":{"fileName":"brake_ReleaseH.ogg"}};
var SoundData = {"brake.ogg":["sound_Korail_EMU","rotem_igbt.brake"],"mo01_2.ogg":["sound_Korail_EMU","rotem_igbt.mo01_2"],"mo05.ogg":["sound_Korail_EMU","rotem_igbt.mo05"],"rotem_igbt_electric_s.ogg":["sound_Korail_EMU","rotem_igbt.rotem_igbt_electric_s"],"rotem_igbt_electric.ogg":["sound_Korail_EMU","rotem_igbt.rotem_igbt_electric"],"rotem_igbt_motor1_s.ogg":["sound_Korail_EMU","rotem_igbt.rotem_igbt_motor1_s"],"rotem_igbt_motor1.ogg":["sound_Korail_EMU","rotem_igbt.rotem_igbt_motor1"],"rotem_igbt_motor3.ogg":["sound_Korail_EMU","rotem_igbt.rotem_igbt_motor3"],"rotem_igbt_motor4.ogg":["sound_Korail_EMU","rotem_igbt.rotem_igbt_motor4"],"rotem_igbt_motor5.ogg":["sound_Korail_EMU","rotem_igbt.rotem_igbt_motor5"],"rtm_pck_toshiba_IGBT_loop.ogg":["sound_Korail_EMU","rotem_igbt.rtm_pck_toshiba_IGBT_loop"],"Run40.ogg":["sound_Korail_EMU","rotem_igbt.Run40"],"Run60.ogg":["sound_Korail_EMU","rotem_igbt.Run60"],"RuninTunnel.ogg":["sound_Korail_EMU","rotem_igbt.RuninTunnel"],"rtm_LRT_release0.ogg":["sound_Korail_EMU","rotem_igbt.rtm_LRT_release0"],"rtm_LRT_release.ogg":["sound_Korail_EMU","rotem_igbt.rtm_LRT_release"],"brake_ReleaseH.ogg":["sound_Korail_EMU","rotem_igbt.brake_ReleaseH"]};
//##### データ #####

//##### onUpdate #####
function onUpdate_RSM2(su) {
    var entity = su.getEntity();
    var dataMap = entity.getResourceState().getDataMap();
    var speed = su.getSpeed();
    var notch = su.getNotch();
    //powerFade
    var powerFade = dataMap.getInt("powerFade");
    var powerFadeDelayTime = dataMap.getInt("powerFadeDelayTime");
    if (notch === 0) powerFadeDelayTime = Math.min(powerFadeDelayTime + 1, PowerFadeDelay);
    else if (speed > 0) powerFadeDelayTime = Math.max(powerFadeDelayTime - 1, 0);
    if (notch > 0 && powerFadeDelayTime === 0) powerFade = Math.min(powerFade + 1, PowerFadeTime);
    else if (notch < 0 && powerFadeDelayTime === 0) powerFade = Math.max(powerFade - 1, -PowerFadeTime);
    else if (powerFadeDelayTime === PowerFadeDelay) powerFade += powerFade < 0 ? 1 : powerFade > 0 ? -1 : 0;
    dataMap.setInt("powerFadeDelayTime", powerFadeDelayTime, 0);
    dataMap.setInt("powerFade", powerFade, 0);
    powerFade = powerFade / PowerFadeTime;
    //tunnelFade
    var isTunnel = su.inTunnel();
    var tunnelFade = dataMap.getInt("tunnelFade");
    if (isTunnel) tunnelFade = Math.min(tunnelFade + 1, TunnelFadeTime);
    else tunnelFade = Math.max(tunnelFade - 1, 0);
    dataMap.setInt("tunnelFade", tunnelFade, 0);
    tunnelFade = tunnelFade / TunnelFadeTime;
    //SoundTrack
    SoundTrackData.forEach(function (trackData) {
        var soundName = trackData.fileName;
        var customPitch = 1;
        var customVolume = 1;
        /* 指定の音源でpitchとvolumeを乗算でカスタムすることができます
        例)
        if (soundName === "run_mo0.ogg") {//soundNameはRSM2での音源の表示名に対応します(拡張子付きファイル名)
            customPitch = 1.0;//ノッチに対して変化を加えるなど
            customVolume = 1.0;
        }
        */
        var sound = new SoundState(su, trackData);
        sound.play(speed, notch, powerFade, tunnelFade, customPitch, customVolume);
    });
    //SoundEffect
    var se = {};
    Object.keys(SoundEffectData).forEach(function (key) {
        var trackData = SoundEffectData[key];
        se[key] = new SoundState(su, trackData);
    });
    //Compressor
    var isCPActive = su.isComplessorActive();
    if (se["cpStart"]) se["cpStart"].playSE(isCPActive, false);
    if (se["cpLoop"]) se["cpLoop"].playSE(isCPActive, true);
    if (se["cpEnd"]) se["cpEnd"].playSE(!isCPActive, false);
    //Brake release
    var prevNotch = dataMap.getInt("prevNotch");
    dataMap.setInt("prevNotch", notch, 0);
    var isPlayBrakeH = prevNotch < notch && prevNotch === -8;
    var isPlayBrakeL = prevNotch <= 0 && prevNotch < notch && prevNotch < -1;
    var isPlayBrakeN = prevNotch < 0 && prevNotch < notch && notch >= 0;
    if (speed < 1) {
        if (se["brakeLow"]) se["brakeLow"].playSEOnce(isPlayBrakeL);
        if (se["brakeOff"]) se["brakeOff"].playSEOnce(isPlayBrakeN);
    }
    if (se["brakeHigh"]) se["brakeHigh"].playSEOnce(isPlayBrakeH);
}

//##### 関数 #####
var SoundState = function (su, trackData) {
    this.su = su;
    this.pitch = trackData.pitch || null;
    this.volume = trackData.volume || null;
    this.isMute = trackData.isMute || null;
    this.isNotchPower = trackData.isNotchPower || null;
    this.isNotchOff = trackData.isNotchOff || null;
    this.isNotchBrake = trackData.isNotchBrake || null;
    this.isFadeMixer = trackData.isFadeMixer || null;
    this.isTunnelFade = trackData.isTunnelFade; // null / true / false
    if (this.isTunnelFade === undefined) this.isTunnelFade = null;
    this.fileName = trackData.fileName;
    this.soundDmain = null;
    this.soundName = null;
    if (SoundData[this.fileName]) {
        this.soundDmain = SoundData[this.fileName][0];
        this.soundName = SoundData[this.fileName][1];
    }
};
SoundState.prototype = {
    getPitch: function (speed) {
        var pitch = interpolate(this.pitch, speed);
        return Math.min(Math.max(pitch, 0.5), 2.0);
    },
    getVolume: function (speed) {
        var volume = interpolate(this.volume, speed);
        if (speed > this.volume[this.volume.length - 1][0]) return 0;
        return Math.min(Math.max(volume, 0), 1.0);
    },
    getMixerVolume: function (notch, volumeFade, tunnelFade) {
        var volume = 1;
        var isNotchPower = this.isNotchPower;
        var isNotchOff = this.isNotchOff;
        var isNotchBrake = this.isNotchBrake;
        //Volume fade
        if (this.isFadeMixer && (isNotchOff !== isNotchPower || isNotchOff !== isNotchBrake)) {
            var notchFade = Number(volumeFade);
            var notchFadeF = Number(1 - Math.abs(notchFade));
            volume *= Math.max(
                Number(isNotchPower && notchFade > 0),
                Number(isNotchOff && notchFadeF > 0),
                Number(isNotchBrake && notchFade < 0)
            );
            volume *= isNotchOff ? Number(notchFadeF) : Number(Math.abs(notchFade));
        }
        else {
            volume *= Math.max(
                Number(isNotchPower && notch > 0),
                Number(isNotchOff && notch === 0),
                Number(isNotchBrake && notch < 0)
            );
        }
        //Tunnnel fade
        if (this.isTunnelFade !== null) {
            if (this.isTunnelFade === true) volume *= Number(tunnelFade);
            else volume *= Number(1 - tunnelFade);
        }
        volume *= Number(!this.isMute);
        return volume;
    },
    play: function (speed, notch, volumeFade, tunnelFade, customPitch, customVolume) {
        if (!this.soundDmain || !this.soundName) return;
        var pitch = this.getPitch(speed) * customPitch;
        var volume = this.getVolume(speed) * this.getMixerVolume(notch, volumeFade, tunnelFade) * customVolume;
        if (volume > 0) {
            this.su.playSound(this.soundDmain, this.soundName, volume, pitch, true);
        }
        else {
            this.su.stopSound(this.soundDmain, this.soundName);
        }
    },
    //条件分岐がtrueのときに再生する(falseで停止)
    playSE: function (condition, isLoop) {
        if (condition) this.su.playSound(this.soundDmain, this.soundName, 1, 1, isLoop);
        else this.su.stopSound(this.soundDmain, this.soundName);
    },
    //1tickだけ再生処理を実行するSEに使用する
    playSEOnce: function (condition) {
        if (condition) {
            this.su.stopSound(this.soundDmain, this.soundName);
            this.su.playSound(this.soundDmain, this.soundName, 1, 1, false);
        }
    }
};
function interpolate(valueList, speed) {
    if (valueList.length === 1) return 0;
    if (speed < valueList[0][0]) return valueList[0][1];
    for (var i = 0; i < valueList.length - 1; i++) {
        var currentSpeed = valueList[i][0];
        var currentValue = valueList[i][1];
        var nextSpeed = valueList[i + 1][0];
        var nextValue = valueList[i + 1][1];
        if (speed >= currentSpeed && speed <= nextSpeed) {
            var ratio = (speed - currentSpeed) / (nextSpeed - currentSpeed);
            return currentValue + (nextValue - currentValue) * ratio;
        }
    }
    return valueList[valueList.length - 1][1];
}