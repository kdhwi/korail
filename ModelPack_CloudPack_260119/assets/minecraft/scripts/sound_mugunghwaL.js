function onUpdate(su){
	var notch = su.getNotch();
	var speed = su.getSpeed();
	var tvol = 1.0;
	var pitch = 1.0;
		
	if(speed >= 10.0){
		tvol = ((speed - 10.0) / 5);
		if(su.inTunnel()){
			su.playSound('sound_cloud2', 'train.rtm_tunnel', tvol, 1.0);
		}else{
			su.stopSound('sound_cloud2', 'train.rtm_tunnel');
		}
	}else{
		su.stopSound('sound_cloud2', 'train.rtm_tunnel');
	}
		
	if(speed >= 2.0){
		var vol = 1.0;
		vol = (speed - 5.0) / 4.0;
		pitch = (speed - 5.0) / 50 + 0.8;
		su.playSound('sound_cloud2', 'train.rtm_mL_nomal', vol, pitch);
	
	}else{
		su.stopSound('sound_cloud2', 'train.rtm_mL_nomal');
	}
}