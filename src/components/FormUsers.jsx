import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
const defaultValues ={
    email:"",
    password:"",
    first_name:"",
    last_name:"",
    birthday:""
}
const validationEmail = {
  required:"Email is required",
  minLength:{
    message:"Email is too short",
    value:3,
  }
}
  const validationPassword = {
    required:"Password is required",
    minLength:{
      message:"Password is too short",
      value:8,
    }
  }
  const validationFirstName = {
    required:"First name is required",
    maxLength:{
      message:"First name is too long",
      value:24,
    }
  }
  const validationLastName = {
    required:"Last name is required",
    maxLength:{
      message:"Last name is too long",
      value:24,
    }
  }

const FormUsers = ({ createUser, update,updateUser,isShowForm,hanleChangeShowModal}) => {
  const { handleSubmit, register, reset,formState:{errors} } = useForm();

  const submitForm =(data) =>{
    if(update){
        updateUser(update.id,data)

    }else{
        createUser(data)
    }
    reset(defaultValues)

}
const handleX = ()=>{
  hanleChangeShowModal()
  reset(defaultValues)
}

  useEffect(() => {
    if (!update) {
      return;
    }
    reset(update);
  }, [update]);

  return (
    <div className={`container-form ${isShowForm ?"":"disable-form"}`}>
    <form className="form" onSubmit={handleSubmit(submitForm)}>
    <i onClick={handleX} className='form__x bx bx-x'></i>
        <h2 className="form__title">{update ?"edit user":"New user"}</h2>
      <div className="form__div">
        <label className="form__label" htmlFor="">Email</label>
        <input className={`form__input ${errors.email ?"error__content":""}`} type="email" placeholder="Enter your email" {...register("email",validationEmail)} />
        {
          errors.email&& <p className="erros__form"><i class='bx bxs-error-circle'></i>{errors.email.message}</p>
        }
      </div>
      <div className="form__div">
        <label className="form__label" htmlFor="">Password</label>
        <input className={`form__input ${errors.password?"error__content":""}`} placeholder="Enter your password" type="password" {...register("password",validationPassword)} />
        {
          errors.password&& <p className="erros__form"><i class='bx bxs-error-circle'></i>{errors.password.message}</p>
        }
      </div>
      <div className="form__div">
        <label className="form__label" htmlFor="">First name</label>
        <input className={`form__input ${errors.first_name ?"error__content":""}`} placeholder="Enter your first name" type="text" {...register("first_name",validationFirstName)} />
        {
          errors.first_name&& <p className="erros__form"><i class='bx bxs-error-circle'></i>{errors.first_name.message}</p>
        }
      </div>
      <div className="form__div">
        <label className="form__label" htmlFor="">Last name</label>
        <input className={`form__input ${errors.last_name ?"error__content":""}`}placeholder="Enter your Last name" type="text" {...register("last_name",validationLastName)} />
        {
          errors.last_name&& <p className="erros__form"><i class='bx bxs-error-circle'></i>{errors.last_name.message}</p>
        }
      </div>
      <div className="form__div">
        <label className="form__label" htmlFor="">Birthday</label>
        <input className={`form__input ${errors.birthday ?"error__content":""}`} type="date" {...register("birthday",{required:"Birthday is required"})} />
        {
          errors.birthday&& <p  className="erros__form"> <i class='bx bxs-error-circle'></i>  {errors.birthday.message}</p>
        }
      </div >
      <button className="form__btn">{update ?"edit user":"new user"}</button>
    </form>
    </div>
  );
};

export default FormUsers;
