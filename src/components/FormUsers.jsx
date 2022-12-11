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
    message:"Email is to short",
    value:3,
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
        <input className="form__input" type="email" placeholder="enter your email" {...register("email",validationEmail)} />
        {
          errors.email&& <p>{errors.email.message}</p>
        }
      </div>
      <div className="form__div">
        <label className="form__label" htmlFor="">Password</label>
        <input className="form__input" placeholder="enter your email" type="password" {...register("password")} />
      </div>
      <div className="form__div">
        <label className="form__label" htmlFor="">First_name</label>
        <input className="form__input" placeholder="enter your email" type="text" {...register("first_name")} />
      </div>
      <div className="form__div">
        <label className="form__label" htmlFor="">Last_name</label>
        <input className="form__input" placeholder="enter your email" type="text" {...register("last_name")} />
      </div>
      <div className="form__div">
        <label className="form__label" htmlFor="">Birthday</label>
        <input className="form__input" type="date" {...register("birthday")} />
      </div >
      <button className="form__btn">{update ?"edit user":"new user"}</button>
    </form>
    </div>
  );
};

export default FormUsers;
