import React, { useState } from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from "../../../assets/images/user.png";
import ProfileDataForm from './profileDataForm';


const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

  let [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />
  }

  const mainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData) => {
    const promise = saveProfile(formData);
    promise.then( 
      () => {
        setEditMode(false);
      }
    )
  }

  return (
    <div>
      <div className={s.bigAvatar}>
        <img src="https://atlantis.nyc3.digitaloceanspaces.com/styled/72025f140f22a3eb32950bbb9d76e68d" />
      </div>
      <div className={s.descriptionBlock}>
        <img src={profile.photos.large || userPhoto} className={s.main} />
        {isOwner && <input type={"file"} onChange={mainPhotoSelected} />}

        {editMode
          ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
          : <ProfileData goToEditMode={() => { setEditMode(true) }} profile={profile} isOwner={isOwner} />}


        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  )
}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return <div>
    {isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
    <div>
      <b>Full name</b>: {profile.fullName}
    </div>
    {profile.lookingForAJob &&
      <div>
        <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
      </div>
    }
    <div>
      <b>My professional skills</b>: {profile.lookingForAJobDescription}
    </div>

    <div>
      <b>About me</b>: {profile.aboutMe}
    </div>
    <div>
      <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
      })}
    </div>
  </div>
}



const Contact = ({ contactTitle, contactValue }) => {
  return <div className={s.contact}>
    <b>{contactTitle}</b>: {contactValue}
  </div>
}

export default ProfileInfo;


