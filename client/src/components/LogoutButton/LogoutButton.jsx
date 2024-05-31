import { Button, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();
  const logout = async () => {
    setTimeout(() => {
      message.success("Déconnecté !");
      localStorage.clear();
    }, 1000);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <Button style={{ float: "right", marginTop: "18px" }} onClick={logout}>
      Déconnexion
    </Button>
  );
}

export default LogoutButton;