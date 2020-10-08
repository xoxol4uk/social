import React, { useState, useEffect } from 'react';
import s from './ProfileInfo.module.css';


const ProfileStatusWithHooks = (props) => {

  /*let stateWithSetState = useState(true); //отдает массив с двумя элементами
  let editMode = stateWithSetState[0]; //первый элемент – это само значение
  let setEditMode = stateWithSetState[1]; //второй элемент – это функция для изменения
  */


  let [editMode, setEditMode] = useState(false); //деструктивное присваивание для более короткой записи
  let [status, setStatus] = useState(props.status); //при работе с хуками приходится для каждого свойства стейта так делать

  useEffect(() => {
    setStatus(props.status)
  }, [props.status])



  const activateEditMode = () => {
    setEditMode(true);
  }

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  }

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  }

  return (
    <div>
      {!editMode &&
        <div>
          <b>Status</b>:<span onDoubleClick={activateEditMode}>{props.status || "------"}</span>
        </div>
      }
      {editMode &&
        <div>
          <input onChange={onStatusChange}
            autoFocus={true}
            onBlur={deactivateEditMode}
            value={status} />
        </div>
      }
    </div>
  )
}

export default ProfileStatusWithHooks;


