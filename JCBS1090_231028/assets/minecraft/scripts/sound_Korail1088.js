function onUpdate(su){
	var notch = su.getNotch();
	var speed = su.getSpeed();
	var bvol = 1.0;
	var tvol = 1.0;
	var pitch = 1.0;
	
	if(speed > 0){
		if(notch > 0){
			su.playSound('sound_jcbs', 'train.rtm_Korail1088_loop', 1.0, 1.0);
			su.stopSound('sound_jcbs', 'train.rtm_Korail1088_break');
		}
		if(notch == 0){
			su.stopSound('sound_jcbs', 'train.rtm_Korail1088_loop');
			su.stopSound('sound_jcbs', 'train.rtm_Korail1088_break');
		}
		if(notch < 0){
			bvol = ((notch * -1.0) / 3);
			su.playSound('sound_jcbs', 'train.rtm_Korail1088_break', bvol, 1.0);
		}
	
		if(speed >= 10.0){
			tvol = ((speed - 10.0) / 5);
			if(su.inTunnel()){
				su.playSound('sound_jcbs', 'train.rtm_tunnel', tvol, 1.0);
			}else{
				su.stopSound('sound_jcbs', 'train.rtm_tunnel');
			}
		}
		
	if(speed >= 2.0){
		var vol = 1.0;
		vol = (speed - 5.0) / 4.0;
		pitch = (speed - 5.0) / 50 + 0.8;
		su.playSound('sound_jcbs', 'train.rtm_Korail1088_wing', vol, pitch);
	}else{
		su.stopSound('sound_jcbs', 'train.rtm_Korail1088_wing');
	}	
	
	}else{
		su.stopSound('sound_jcbs', 'train.rtm_Korail1088_loop');
		su.stopSound('sound_jcbs', 'train.rtm_Korail1088_break');
		su.stopSound('sound_jcbs', 'train.rtm_Korail1088_wing');
	}
}