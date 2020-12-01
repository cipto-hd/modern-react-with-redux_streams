import { useCallback, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

const GoogleAuth = ({ isSignedIn, signIn, signOut }) => {
  const auth = useRef();

  const onAuthChange = useCallback(
    (isSignedInLocal) => {
      if (isSignedInLocal) {
        signIn(auth.current.currentUser.get().getId());
      } else {
        signOut();
      }
    },
    [signIn, signOut]
  );

  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "36440547359-jdvnstj50f0p9niat72bepn0ocujfdk9.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          auth.current = window.gapi.auth2.getAuthInstance();
          onAuthChange(auth.current.isSignedIn.get());
          auth.current.isSignedIn.listen(onAuthChange);
        });
    });
  }, [onAuthChange]);

  const onSignInClick = () => auth.current.signIn();

  const onSignOutClick = () => auth.current.signOut();

  const renderAuthButton = (isSignedInLocal) => {
    if (isSignedInLocal === null) {
      return null;
    } else if (isSignedInLocal) {
      return (
        <button onClick={onSignOutClick} className="ui red google button">
          <i className="google icon"></i>Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={onSignInClick} className="ui red google button">
          <i className="google icon"></i>Sign In
        </button>
      );
    }
  };

  return <div>{renderAuthButton(isSignedIn)}</div>;
};

const mapStateToProps = (state) => ({ isSignedIn: state.auth.isSignedIn });

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
