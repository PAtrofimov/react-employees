import React, { useState, useEffect } from 'react';

export const useValidations = (valueProps: any, validations: {}) => {

   const [message, setMessage] = useState({} as any);
   const { value, field = "", ref = null } = valueProps;

   const validateEmail = (email: string) => {
     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(String(email).toLowerCase());
   }

   const validatePhone = (phone: string) => {
     const re = /\+380\s*\d{2}\s*\d{3}\s*\d{2}\s*\d{2}/;
     return re.test(String(phone).toLowerCase());
   }

   const validateFileSize = (ref: any) => {

     if (!ref || !ref.current || !ref.current.files) {
       return Promise.resolve(null);
     }
     const file = ref.current.files[0];
     const size = Math.trunc(file?.size * 100 / 1048576) / 100;

     if (size > 5) {
       return false;
     }
     return true;
   }

   const validateFileType = (ref: any) => {


     if (!ref || !ref.current || !ref.current.files) {
       return Promise.resolve(null);
     }

     const file = ref.current.files[0];
     const fileTypes = [
       'image/jpeg',
       'image/jpg'
     ]

     for (let i = 0; i < fileTypes.length; i++) {
       if (file?.type === fileTypes[i]) {
         return true;
       }
     }

     return false;

   }

   function imageSize(file: any) {

     if (!file) {
       return Promise.resolve(null);
     }

     const reader = new FileReader();

     //Read the contents of Image File.
     reader.readAsDataURL(file);
     const img = document.createElement("img");
     const promise = new Promise((resolve, reject) => {

       reader.onload = (e: any) => {

         img.onload = () => {
           // Natural size is the actual image size regardless of rendering.
           // The 'normal' `width`/`height` are for the **rendered** size.
           const width = img.naturalWidth;
           const height = img.naturalHeight;
           resolve({ width, height });
         };

         // Reject promise on error
         img.onerror = reject;
         // Setting the source makes it start downloading and eventually call `onload`
         img.src = e.target.result;
       }
     });

     return promise;
   }

   useEffect(() => {
     const validateImageRezolution = async (ref: any) => {

       if (!ref || !ref.current || !ref.current.files) {
         return Promise.resolve(null);
       }
       const file = ref.current.files[0];
       const imageDimensions: any = await imageSize(file);

       if (imageDimensions && (imageDimensions?.width < 70 || imageDimensions?.height < 70)) {
         return false;
       }

       return true;
     }
     Object.entries(validations).forEach(([key, validation]: [string, any]) => {
       switch (key) {
         case 'isEmpty': {
           const fails = value.length === 0;
           setMessage((message: any) => ({ ...message, isEmpty: { fails, text: `The ${field} field is required.` } }));

           break;
         }
         case 'minLength': {
           const fails = value.length < +validation && value.length > 0;
           setMessage((message: any) => ({ ...message, minLength: { fails, text: `The ${field} must be at least 2 characters` } }));
           break;
         }
         case 'maxLength': {
           const fails = value.length > +validation;
           setMessage((message: any) => ({ ...message, maxLength: { fails, text: `The ${field} must not be more ${value.length} characters` } }));
           break;
         }
         case 'isEmail': {
           const fails = value.length > 0 && !validateEmail(value);
           setMessage((message: any) => ({ ...message, isEmail: { fails, text: `The email must be a valid email address.` } }));
           break;
         }
         case 'isPhone': {
           const fails = value.length > 0 && !validatePhone(value);
           setMessage((message: any) => ({ ...message, isPhone: { fails, text: `The phone number is invalid.` } }));
           break;
         }
         case 'maxSize': {
           const fails = value.length > 0 && !validateFileSize(ref);
           setMessage((message: any) => ({ ...message, maxSize: { fails, text: `The photo may not be greater than 5 Mbytes.` } }));

           break;
         }
         case 'fileType': {
           const fails = value.length > 0 && !validateFileType(ref);
           setMessage((message: any) => ({ ...message, fileType: { fails, text: 'The image is invalid!' } }));

           break;
         }
         case 'fileRezolution': {

           validateImageRezolution(ref).then((result) => {
             const fails = value.length > 0 && !result;
             setMessage((message: any) => ({ ...message, fileRezolution: { fails, text: 'The image rezolution is invalid!' } }));

           });

           break;
         }
         default:
           break;
       }

     });

   }, [value, ref, field, validations]);

   return {
     message
   }
 }
 export const useInput = (valueProps: any, validations: {}) => {

   const [value, setValue] = useState(valueProps.value);
   const [isDirty, setDirty] = useState(false);
   const valid = useValidations({ ...valueProps, value }, validations);
   const onChange = (e: any) => {
     setValue(e.target.value);
   }

   const setValueHandle = (val: any) => {
     setValue(val);
     setDirty(false);
   }

   const onBlur = (e: any) => {
     setDirty(true);
   }

   return {
     value, onChange, onBlur, ...valid, isDirty, setValueHandle
   }
 }


//  const getClientErrors = (el: any) => {
//    if (el.isDirty) {
//      return Object.entries(el.message).filter(([key, value]: [string, any]) => value.fails);
//    }
//    return [];
//  }

//  export const showClientErrors = (el: any) => {
//    return getClientErrors(el).map(([key, value]: [string, any]) => {
//    return (<p className="assistive-text assistive-text--error" key={key}>{value.text}</p>)});
//  }

//  export const getServerErrors = (el: string, response: any) => {
//    if (response && response.fails) {
//      return Object.entries(response.fails)
//        .filter(([key, value]) => (el === key))
//        .map(([key, value]) => value);
//    }
//    return [];
//  }

//  export const showServerErrors = (el: string, response: any) => {
//     return getServerErrors(el, response).map((it: string | string[] | undefined, index: number) => {
//      const text = Array.isArray(it) ? it.join('\n') : it;
//      return (<p className="assistive-text assistive-text--error">{text}</p>);
//    })
//  }
