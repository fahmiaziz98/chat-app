import { useState } from "react";

import "./App.css";

import AuthPage from "./AuthPage";
import ChatsPage from "./ChatsPage";


function App() {
  /*
  aplikasi akan menampilkan halaman autentikasi jika pengguna belum masuk,
  dan halaman obrolan jika pengguna telah berhasil masuk.
  */
  const [user, setUser] = useState();

  // Conditional Rendering
  if (!user) {
    return <AuthPage onAuth={(user) => setUser(user)} />;
  } else {
    return <ChatsPage user={user} />;
  }
}

export default App;