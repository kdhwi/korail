function onUpdate(su){
	var notch = su.getNotch();
	var speed = su.getSpeed();
	
	var m0vol = 0.0;
	var m1vol = 0.0;
	var m11pit = 0.0;
	var m2vol = 0.0;
	var m3vol = 0.0;
	var m13vol = 0.0;
	var m4vol = 0.0;
	var m5vol = 0.0;
	var m6vol = 0.0;
	var m7vol = 0.0;
	var m8vol = 0.0;
	
	var m0pit = 0.0;
	var m1pit = 0.0;
	var m11pit = 0.0;
	var m2pit = 0.0;
	var m3pit = 0.0;
	var m13pit = 0.0;
	var m4pit = 0.0;
	var m5pit = 0.0;
	var m6pit = 0.0;
	var m7pit = 0.0;
	var m8pit = 0.0;
	
	if(speed < 0.1)
	{// 안움직임
		su.stopSound('sound_cloud2', 'train.rtm_igbt_rotem0');
	}
	else
	{// 움직임
		if(notch != 0)
		{// 역행
			if(speed < 18)
			{// 0 ~ 18 ( index0 )
				if(speed < 2)
				{// 0 ~ 2
					m0vol = (speed / 2.352941176470588);
				}
				else if(speed < 10)
				{// 2 ~ 7.6
					m0vol = 0.85;
				}
				else
				{// 7.6 ~ 18
					m0vol = (speed - 10);
					m0vol = (m0vol / 6.117647058823529);
					m0vol = (0.85 - m0vol);
					if(m0vol < 0){ m0vol = 0; }
				}
				if(speed < 4)
				{// 0 ~ 4
					m0pit = 1;
				}
				else if(speed < 18)
				{// 4 ~ 18
					m0pit = (speed - 4);
					m0pit = (m0pit / 37.83783783783784);
					m0pit = (m0pit + 1); 
				}
				su.playSound('sound_cloud2', 'train.rtm_igbt_rotem0', m0vol, m0pit);
			}else{su.stopSound('sound_cloud2', 'train.rtm_igbt_rotem0');}
			
			if(speed > 10)
			{
				if(speed < 30)
				{// 10 ~ 30 ( index1 )
					if(speed < 13.6)
					{// 10 ~ 13.6
						m1vol = (speed - 10);
						m1vol = (m1vol / 3.6);
					}
					else if(speed < 22.6)
					{// 13.6 ~ 22.6
						m1vol = 1;
					}
					else if(speed < 29.8)
					{// 22.6 ~ 29.8
						m1vol = (speed - 22.6);
						m1vol = (m1vol / 7.2);
						m1vol = (1 - m1vol);
						if(m1vol < 0){ m1vol = 0; }
					}
					// 10 ~ 30
					m1pit = (speed - 10);
					m1pit = (m1pit / 40);
					m1pit = (m1pit + 1); 
					su.playSound('sound_cloud2', 'train.rtm_igbt_rotem1', m1vol, m1pit);
				}else{su.stopSound('sound_cloud2', 'train.rtm_igbt_rotem1');}
			}else{su.stopSound('sound_cloud2', 'train.rtm_igbt_rotem1');}
			
			if(speed > 18)
			{
				if(speed < 34)
				{// 18 ~ 34 ( index11 )
					if(speed < 31.2)
					{// 18 ~ 31.2
						m11vol = 0.85;
					}
					else if(speed < 34)
					{// 31.2 ~ 34
						m11vol = (speed - 31.2);
						m11vol = (m11vol / 0.3035714285714286);
						m11vol = (0.85 - m11vol);
						if(m1vol < 0){ m11vol = 0; }
					}
					// 18 ~ 34
					m11pit = (speed - 18);
					m11pit = (m11pit / 45);
					m11pit = (m11pit + 1.2); 
					su.playSound('sound_cloud2', 'train.rtm_igbt_rotem11', m11vol, m11pit);
				}else{su.stopSound('sound_cloud2', 'train.rtm_igbt_rotem11');}
			}else{su.stopSound('sound_cloud2', 'train.rtm_igbt_rotem11');}
			
			if(speed > 30)
			{
				if(speed < 40)
				{// 30 ~ 40 ( index2 )
					if(speed < 31.6)
					{// 30 ~ 31.6
						m2vol = (speed - 30);
						m2vol = (m2vol / 1.6);
					}
					else
					{// 31.6 ~ 40
						m2vol = 1;
					}
					// 30 ~ 40
					m2pit = (speed - 30);
					m2pit = (m2pit * 0.015);
					m2pit = (m2pit + 1); 
					su.playSound('sound_cloud2', 'train.rtm_igbt_rotem2', m2vol, m2pit);
				}else{su.stopSound('sound_cloud2', 'train.rtm_igbt_rotem2');}
			}else{su.stopSound('sound_cloud2', 'train.rtm_igbt_rotem2');}
			
			if(speed > 40)
			{// 40 ~ ( index3 )				
				if(speed < 80)
				{// 40 ~ 80
					
				}
				else
				{// 80 ~
					m3vol = (speed - 80);
					m3vol = (m3vol / 60);
					m3vol = (1 - m3vol);
					if(m3vol < 0){ m3vol = 0; }
				}
				// 40 ~
				m3pit = (speed - 40);
				m3pit = (m3pit * 0.015);
				m3pit = (m3pit + 1); 
				su.playSound('sound_cloud2', 'train.rtm_igbt_rotem3', 1, m3pit);
			}else{su.stopSound('sound_cloud2', 'train.rtm_igbt_rotem3');}
			
			if(speed > 30)
			{
				if(speed < 50)
				{// 30 ~ 50 ( index13 )
					if(speed < 31.6)
					{// 35 ~ 35.2
						m13vol = (speed - 35);
						m13vol = (m13vol / 4.25);
					}
					else if(speed < 48)
					{// 35.2 ~ 48
						m13vol = 0.85;
					}
					else
					{// 48 ~ 50
						m13vol = (speed - 48);
						m13vol = (m13vol * 0.425);
						m13vol = (0.85 - m13vol);
						if(m13vol < 0){ m13vol = 0; }
					}
					if(speed < 40)
					{// 30 ~ 40
						m13pit = (speed - 30);
						m13pit = (m13pit * 0.02);
						m13pit = (m13pit + 1);
					}
					else
					{// 40 ~ 50
						m13pit = 1.2;
					}
					su.playSound('sound_cloud2', 'train.rtm_igbt_rotem13', m13vol, m13pit);
				}else{su.stopSound('sound_cloud2', 'train.rtm_igbt_rotem13');}
			}else{su.stopSound('sound_cloud2', 'train.rtm_igbt_rotem13');}
			
			if(speed > 50)
			{// 40 ~ ( index8 )
				// 40 ~
				m8vol = (speed - 50);
				m8vol = (m8vol / 30);
				// 40 ~
				m8pit = (speed - 40);
				m8pit = (m8pit * 0.005);
				m8pit = (m8pit + 0.7); 
				su.playSound('sound_cloud2', 'train.rtm_igbt_rotem8', m8vol, m8pit);
			}else{su.stopSound('sound_cloud2', 'train.rtm_igbt_rotem8');}
		}
		else if(notch == 0)
		{// 중간에 놋치 빼면
			su.stopSound('sound_cloud2', 'train.rtm_igbt_rotem0');
			su.stopSound('sound_cloud2', 'train.rtm_igbt_rotem1');
			su.stopSound('sound_cloud2', 'train.rtm_igbt_rotem11');
			su.stopSound('sound_cloud2', 'train.rtm_igbt_rotem2');
			su.stopSound('sound_cloud2', 'train.rtm_igbt_rotem3');
			su.stopSound('sound_cloud2', 'train.rtm_igbt_rotem13');
			su.stopSound('sound_cloud2', 'train.rtm_igbt_rotem4');
			su.stopSound('sound_cloud2', 'train.rtm_igbt_rotem5');
			su.stopSound('sound_cloud2', 'train.rtm_igbt_rotem6');
			su.stopSound('sound_cloud2', 'train.rtm_igbt_rotem7');
			su.stopSound('sound_cloud2', 'train.rtm_igbt_rotem8');
		}
	}
}