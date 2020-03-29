import React from 'react';
import s from './ProfileInfo.module.css';


const ProfileInfo = () => {
	return  (
      <div>
        <div className={s.bigAvatar}>
          <img src="https://atlantis.nyc3.digitaloceanspaces.com/styled/72025f140f22a3eb32950bbb9d76e68d" />
        </div> 
        <div className={s.descriptionBlock}>
          Ava + description
        </div>
      </div>
		)
}

export default ProfileInfo;