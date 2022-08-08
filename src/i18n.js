import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';




i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {  description: {
            part1: 'Home',
          part2: 'Login',
            part3:"Profile"
        },
          Profile: {
            1: "Add Post",
            2: "Name",
            3: "Email",
            4: "Latitude",
            5: "Longitude",
            6:"Del"
          },  Post: {
            1: "Hello",
            2: "Submit",
            3: "To Kow Your Location <strong>Click Here!",
            4: "Description",
            5: "User",
            6:"your co-ordinates are:"
          },
          logout: {
            1:"Logout"
          },
          List: {
            1: "User's Co-ordinates :",
            2: "Title",
            3:"All Posts"
          },
          ForgetPass: {
            1: "Forget Password ?",
            2: "Use Registered Email to receive the link!",
               3: "For Login",
               4:"Click Here!"
          },
          Login: {
            1: "Log in to Multilingual.",
            2: "Welcome Back!",
            3: "Remember Me",
            4: "Log in with Google",
            5: "Don't have an account?",
            6: "Register",
            
          },  SignUP:{
            1:"Register with Multilingual.",
            2: "Welcome",
            3: "or",
            4: "Already Have An Account?",
          
                 }
        }
      },
        hn: {
        translation: {
          description: {
            part1:'घर',
            part2: 'लॉग इन करें',
            part3:"प्रोफ़ाइल",
            },
            Profile: {
            1: "पोस्ट जोड़ें",
            2: "नाम",
            3: "ईमेल",
            4: "अक्षांश",
            5: "देशान्तर",
            6:"मिटाना",
            },
            Post: {
              1: "नमस्ते",
              2: "जमा करें",
              3: "अपनी स्थान जानने के लिए <strong>यहां क्लिक करें!",
              4: "विवरण",
              5: "उपयोगकर्ता",
              6:"आपके निर्देशांक हैं:"
              
            },
            Logout: {
              1:"लॉग आउट",
            },
            List: {
              1: "उपयोगकर्ता के निर्देशांक :",
              2: "पद",
              3:"सभी पोस्ट"
            },
             ForgetPass: {
               1: "पासवर्ड भूल गए",
               2: "लिंक प्राप्त करने के लिए पंजीकृत ईमेल का प्रयोग करें!",
               3: "लॉगिन के लिए ",
               4:"यहां क्लिक करें!"
            },
                 Login: {
            1: "मल्टीलिंगगुअल में लॉग इन करें।",
            2: "वापसी पर स्वागत है!",
            3: "मुझे याद रखें",
                   4: "गूगल लॉगिन",
             5: "खाता नहीं है?",
            6: "पंजीकरण करें",
            },
          SignUP:{
            1:"मल्टीलिंगगुअल के साथ पंजीकरण करें",
            2: "स्वागत है",
            3: "या" ,
            4: "क्या आपके पास पहले से एक खाता मौजूद है?",
            
                 }
        }
      }
    }
  });
  
export default i18n;