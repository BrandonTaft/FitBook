import { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useHistory } from "react-router-dom";

function GButton({ isAuthorized, setIsAuthorized }) {
    const clientId = "167353375078-4l7svg4p1lb8gtoafo0nq874a6ca221o.apps.googleusercontent.com"
    const history = useHistory();
    // useEffect(() => {
    //     const initClient = () => {
    //           gapi.client.init({
    //           clientId: clientId,
    //           scope: ''
    //         });
    //      };
    //      gapi.load('client:auth2', initClient);
    //  });

     const onSuccess = (res) => {
        console.log('success:', res);
        history.push('/feed')
    };
    const onFailure = (err) => {
        console.log('failed:', err);
    };

    return (
       <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
      />
  );
}
export default GButton