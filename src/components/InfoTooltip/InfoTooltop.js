/* eslint-disable react-hooks/exhaustive-deps */
import successfully from "../../images/successfully.svg";
import notSuccessful from "../../images/not_successful.svg";
import usePopupClose from "../../hooks/usePopupClose";
import "../InfoTooltip/InfoTooltip.css";
import { ERROR_VALIDATION_MSG, INFO_MSG } from '../../utils/constants';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";


function InfoTooltip({isOpen, onClose, isSuccessful, registrationError, loginError}) {
    const { pathname } = useLocation();
    const [error, setError] = useState(ERROR_VALIDATION_MSG.REGISTRATION_ERROR)
    usePopupClose(isOpen, onClose);

    function registerError(){
        if(pathname === '/signup' && registrationError === ERROR_VALIDATION_MSG.CONFLICT_ERROR){
          setError(ERROR_VALIDATION_MSG.USER_EMAIL_EXIST)
        }
        if(pathname ==='/signin' && loginError === ERROR_VALIDATION_MSG.UNAUTHORIZED_ERROR){
          setError(ERROR_VALIDATION_MSG.INCORRECT_ERROR);
        }
    }
      useEffect(()=>{ 
        registerError();
      
      },[isOpen])
  
    return (
      <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container popup__container_type_infotooltip">
          <button className="popup__close" type="button" onClick={onClose}></button>
          <img 
            className="popup__icon" 
            src={isSuccessful ? successfully : notSuccessful} 
            alt={isSuccessful ? INFO_MSG.SUCSSESS : INFO_MSG.UNSUCSSESS}/>
          <h3 className="popup__heading popup__heading_type_infotooltip">
            {isSuccessful 
              ? `${pathname === '/profile'
                ? INFO_MSG.PROFILE_SUCSSESS
                :INFO_MSG.REGISTRATION_SUCSSESS}`
              : error
            }
          </h3>
        </div>
      </div>
    )
  }
  
  export default InfoTooltip;