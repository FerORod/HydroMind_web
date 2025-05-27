// components/Auth.js
import React, { useState } from "react";
import { database, ref, set, get } from "../config/firebaseConfig";
import "../styles/App.css";

const Auth = ({ onLogin, onClose }) => {
  const [inputUserOrEmail, setInputUserOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const userRef = ref(database, `users/${inputUserOrEmail}`);
        const snapshotByUser = await get(userRef);

        if (!snapshotByUser.exists()) {
          const usersRef = ref(database, "users");
          const snapshotAll = await get(usersRef);
          if (!snapshotAll.exists()) throw new Error("No hay usuarios registrados");

          const users = snapshotAll.val();
          let foundUser = null;
          let foundUsername = null;

          for (const [username, data] of Object.entries(users)) {
            if (data.email === inputUserOrEmail) {
              foundUser = data;
              foundUsername = username;
              break;
            }
          }

          if (!foundUser) throw new Error("Usuario o correo no encontrado");
          if (foundUser.password !== password) throw new Error("Contraseña incorrecta");

          onLogin({ ...foundUser, user: foundUsername });
          alert("Inicio de sesión exitoso");
        } else {
          const userData = snapshotByUser.val();
          if (userData.password !== password) throw new Error("Contraseña incorrecta");

          onLogin({ ...userData, user: inputUserOrEmail });
          alert("Inicio de sesión exitoso");
        }
      } else {
        if (!registerUsername || !registerEmail) {
          throw new Error("Debes ingresar un usuario y correo válidos.");
        }

        const userRef = ref(database, `users/${registerUsername}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          throw new Error("El nombre de usuario ya está registrado.");
        }

        const allUsersRef = ref(database, "users");
        const allUsersSnap = await get(allUsersRef);

        if (allUsersSnap.exists()) {
          const users = allUsersSnap.val();
          const emailExists = Object.values(users).some(
            (u) => u.email === registerEmail
          );

          if (emailExists) {
            throw new Error("El correo electrónico ya está registrado.");
          }
        }

        await set(userRef, {
          email: registerEmail,
          password,
          sensors: {
            sensor_1: {
              type: "waterFlow",
              measurement: {}
            }
          }
        });

        alert("Usuario registrado exitosamente");
        setIsLogin(true);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-form">
        <button className="auth-close" onClick={onClose}>✕</button>
        <h2>{isLogin ? "Iniciar Sesión" : "Registrarse"}</h2>
        <form onSubmit={handleSubmit}>
          {isLogin ? (
            <input
              type="text"
              placeholder="Usuario o correo"
              value={inputUserOrEmail}
              onChange={(e) => setInputUserOrEmail(e.target.value)}
              required
            />
          ) : (
            <>
              <input
                type="text"
                placeholder="Usuario"
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Correo"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
              />
            </>
          )}
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">
            {isLogin ? "Ingresar" : "Crear Cuenta"}
          </button>
        </form>
        <button className="switch-mode" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
