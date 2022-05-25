import { AuthStatus } from "../auth/AuthStatus";

export const Home = () => {
    return (
      <>
        <h1>Főoldal</h1>
        <AuthStatus/>
      </>
    );
  };