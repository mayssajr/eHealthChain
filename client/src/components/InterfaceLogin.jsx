import {React, useState} from "react";
import useEth from "../contexts/EthContext/useEth";
import { useNavigate } from "react-router-dom";

function Interface() {
  const { state: { contract, accounts} } = useEth();
  // const navigate = useNavigate();
  const [inputLogin, setInputLogin] = useState(0);
  const [inputPassword, setInputPassword] = useState(0);
  const navigate = useNavigate();



  

  const login = async () => {
    console.log("les parametres sont",inputLogin )
    console.log("les parametres sont",inputPassword )

    let result = await contract.methods.getRole(inputLogin, inputPassword).call({ from: accounts[0] });
    console.log("le resultat est ",result)

 

    if (result === "Admin")
    {
      navigate("/dashboard");
    }
     else if (result === "Doctor")
     {
      navigate("/doctordashboard");
    }
    else if (result === "Nurse")
     {
      navigate("/nursedashboard");
    }
    else if (result === "Patient"){
      navigate("/patientdashboard");
    }
    
  };

  return (
    <div className="interface"> 
      <h1 className="titre">eHealthCare</h1>     
      <div className="form">
        <h2>Authentication</h2>
        <br />
      

      <label>
        Username :
        
           <input
               className="inputLogin"
               type="text"
               name="uint"
               onChange={(t) => 
				   {
						setInputLogin(t.target.value);
					}}
            />
      </label>
      <br/>
      <label>
          Password :

            <input
               className="inputLogin"
               type="password"
               name="password"
               onChange={(t) => 
				   {
						setInputPassword(t.target.value);
					}}
            />
      </label>
          <button onClick={login} className="custom-button">
            Login 
          </button>
      </div>

    </div>
  );
}
export default Interface;
