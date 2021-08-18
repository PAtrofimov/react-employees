import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Position, ServerResponse } from '../../app/types';
import { useInput } from '../../app/validations';
import { fetchPositions } from '../users/usersAPI';
import { registerUserAsync } from '../users/usersSlice';
import Modal from './Modal';

export default function Registration() {

  const [positions, setPositions] = useState<Position[]>([]);
  const [position, setPosition] = useState<Position | null>(null);
  const [serverResponse, setServerResponse] = useState<ServerResponse | null>(null);
  const name = useInput({ field: "name", value: "", ref: null }, useMemo(() => ({ isEmpty: true, minLength: 1, maxLength: 60 }), []));
  const email = useInput({ field: "email", value: "", ref: null }, useMemo(() => ({ isEmpty: true, isEmail: true }), []));
  const phone = useInput({ field: "phone", value: "", ref: null }, useMemo(() => ({ isEmpty: true, isPhone: true }), []));
  const fileInput = useRef<HTMLInputElement>(null);
  const photo = useInput({ field: "photo", value: "", ref: fileInput }, useMemo(() => ({ isEmpty: true, maxSize: true, fileType: true, fileRezolution: true }), []));
  const photoUrl = useRef<String>("");
  const [isFormValid, setFormValid] = useState<boolean>(false);
  const [isModal, setModal] = React.useState(false);
  const onClose = () => setModal(false);

  const handlePhoto = (e: any) => {
    if (!fileInput || !fileInput.current || !fileInput.current.files || !fileInput.current.files[0]) {
      return;
    }
    photoUrl.current = fileInput.current.files[0].name;
    photo.onChange(e);
  }

  useEffect(() => {
    const isFormError = () => {
      const fields = [name, phone, photo, email];
      const result = fields.filter(el => el.isDirty).some(el => Object.entries(el.message).find(([key, value]: any) => value.fails) !== undefined);
      return result;
    }

    if (isFormError() || serverResponse?.success) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [name, phone, photo, email, serverResponse])

  const handleRegister = (e: any) => {
    e.preventDefault();
    if (name && email && photo && position && phone) {
      const formData = new FormData();
      formData.append('position_id', position?.id);
      formData.append('position', position?.name);
      formData.append('name', name.value);
      formData.append('email', email.value);
      formData.append('phone', phone.value);
      if (fileInput.current && fileInput.current.files) {
        formData.append('photo', fileInput.current.files[0]);
      }

      dispatch(registerUserAsync(formData)).unwrap()
        .then((originalPromiseResult) => {
          if (originalPromiseResult?.status) {
            name.setValueHandle('');
            email.setValueHandle('');
            phone.setValueHandle('');
            photo.setValueHandle('');
            photoUrl.current = "";
            setServerResponse(originalPromiseResult?.status);
            setModal(true);
          }

        })
        .catch((rejectedValueOrSerializedError) => {
          console.log({ rejectedValueOrSerializedError });
          if (rejectedValueOrSerializedError?.status) {
            setServerResponse(rejectedValueOrSerializedError.status);
            setModal(true);
          }
        });

    };
  }

  const getClientErrors = (el: any) => {
    if (el.isDirty) {
      return Object.entries(el.message).filter(([key, value]: [string, any]) => value.fails);
    }
    return [];
  }

  const showClientErrors = (el: any) => {
    return getClientErrors(el).map(([key, value]: [string, any]) =>
      (<p className="assistive-text assistive-text--error" key={key}>{value.text}</p>));
  }

  const getServerErrors = (el: string) => {
    if (serverResponse && serverResponse.fails) {
      return Object.entries(serverResponse.fails)
        .filter(([key, value]) => (el === key))
        .map(([key, value]) => value);
    }
    return [];
  }

  const showServerErrors = (el: string) => {
    const result = getServerErrors(el);
    return result.map((it: string | string[] | undefined, index: number) => {
      const text = Array.isArray(it) ? it.join('\n') : it;
      return (<p className="assistive-text assistive-text--error" key={index}>{text}</p>);
    })
  }

  useEffect(() => {
    fetchPositions().then((data: Position[]) => {
      setPositions(data);
      if (data.length > 0) {
        setPosition(data[0]);
      }
    }).catch((e) => {
      console.log(e.message);
    });
  }, []);

  const dispatch = useAppDispatch();
  return (
    <div className="register" id="register">
      <div className="container">
        <section className="register__section">
          <h1 className="register__title heading1">Register to get a work</h1>
          {serverResponse && serverResponse.message && (<Modal visible={isModal} title={(serverResponse.success) ? "Congratulations" : "Oops"} content={serverResponse.message} btn_caption={(serverResponse.success) ? "Great" : "Try again"} onClose={onClose} />)}
          <form action="#" className="register__form">
            <p className="register__attention">
              Attention! After successful registration and alert, update the
              list of users in the block from the top
            </p>

            <div className="register__inputs">
              <div className={(getClientErrors(name).length > 0 || getServerErrors('name').length > 0) ? "register__input input input-error" : "register__input input"}>
                <label htmlFor="user">Name:</label>
                <p>
                  <input
                    type="text"
                    id="user"
                    name="user"
                    value={name.value}
                    onChange={(e) => { name.onChange(e); }}
                    onBlur={(e) => { name.onBlur(e); }}
                    placeholder="Your name"
                  />
                </p>

                {showClientErrors(name)}
                {showServerErrors('name')}
              </div>
              <div
                className={(getClientErrors(email).length > 0 || getServerErrors('email').length > 0) ? "register__input input input-error" : "register__input input"}
              >
                <label htmlFor="email">Email:</label>
                <p>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email.value}
                    onChange={(e) => { email.onChange(e); }}
                    onBlur={(e) => { email.onBlur(e); }}
                    placeholder="Your email"
                  />
                </p>
                {showClientErrors(email)}
                {showServerErrors('email')}
              </div>

              <div className={(getClientErrors(phone).length > 0 || getServerErrors('phone').length > 0) ? "register__input input input-error" : "register__input input"}>
                <label htmlFor="tel">Phone number:</label>
                <p>
                  <input
                    type="tel"
                    id="tel"
                    name="tel"
                    value={phone.value}
                    onChange={(e) => { phone.onChange(e); }}
                    onBlur={(e) => { phone.onBlur(e); }}
                    pattern="\+380\s\d{2}\s\d{3}\s\d{2}\s\d{2}"
                    placeholder="+380 XX XXX XX XX"
                  />
                </p>
                <p className="assistive-text">
                  Enter a phone number in international format
                </p>
                {showClientErrors(phone)}
                {showServerErrors('phone')}
              </div>

              <div className="register__input radiobtn">
                <p>Select your position:</p>
                {positions.map((pos) => {
                  let checked = position?.name === pos.name;

                  return (<p key={pos.id}>
                    <input
                      type="radio"
                      name="position"
                      id={pos.id}
                      checked={checked}
                      value={pos.name}
                      onChange={(e) => {
                        const { id, value } = e.target;
                        setPosition({ id, name: value })
                      }}
                      className="custom-radio"
                    />
                    <label htmlFor={pos.id}>{pos.name}</label>
                  </p>);
                })}
                {showServerErrors('position_id')}

              </div>

              <div className="register__input upload__file">
                <p>Photo:</p>
                <label
                  className={((getClientErrors(photo).length > 0 || getServerErrors('photo').length > 0) ? "upload__label upload__error" : "upload__label ")}
                  htmlFor="main_input_file"
                  onBlur={(e) => { photo.onBlur(e); }}
                >
                  <input
                    name="file"
                    type="file"
                    className="main_input_file visually-hidden"
                    id="main_input_file"
                    ref={fileInput}
                    onChange={handlePhoto}
                    accept=".jpg, .jpeg"
                  />
                  <input
                    className="f_name"
                    type="text"
                    id="f_name"
                    value={String(photoUrl.current)}
                    placeholder="Upload your photo"
                    readOnly
                  />
                  <div className="upload__btn" >Browse</div>
                </label>
                {showClientErrors(photo)}
                {showServerErrors('photo')}
              </div>
            </div>
            <div className="register__actions">
              <button className="register__link btn" onClick={handleRegister} disabled={!isFormValid}>Sign up now</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

