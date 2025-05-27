import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import SobreNosotros from "./components/SobreNosotros";
import Contactanos from "./components/Contactanos";
import "./styles/App.css";


const App = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [showAuthForm, setShowAuthForm] = useState(false);
  const [activePage, setActivePage] = useState("home"); // 'home', 'sobre-nosotros'

  useEffect(() => {
    if (user && typeof user === "object") {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <div>
      {!user ? (
        <>
          <Header
            onAuthClick={() => {
              setUser(null);
              setShowAuthForm(true);
            }}
            onNavigate={(page) => {
              setActivePage(page);
              setShowAuthForm(false);
            }}
          />
          <main>
            {activePage === "home" && <Home />}
            {activePage === "sobre-nosotros" && <SobreNosotros />}
            {activePage === "contacto" && <Contactanos />}
            {showAuthForm && (
              <Auth
                onLogin={(loggedUser) => {
                  setUser(loggedUser);
                  setShowAuthForm(false);
                }}
                onClose={() => setShowAuthForm(false)}
              />
            )}
          </main>
        </>
      ) : (
        <Dashboard
          user={user}
          onLogout={() => {
            setUser(null);
            setShowAuthForm(false);
            setActivePage("home");
          }}
        />
      )}
    </div>
  );
};

export default App;
