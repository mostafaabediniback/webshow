import AppRoutes from "./routes/AppRoutes";
import AuthNavigationEffects from "./routes/AuthNavigationEffects";

function App() {
  return (
    <>
      <AuthNavigationEffects />
      <AppRoutes />
    </>
  );
}

export default App;
