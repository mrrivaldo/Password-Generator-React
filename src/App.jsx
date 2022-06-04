import { useState } from "react";
import { upperCaseLetters, lowerCaseLetters, Numbers } from "./Chars";
import "./App.css";
import { useSnackbar } from "notistack";
import { Pass_Success, Pass_Fail } from "./notification";
import { FaRegClipboard } from "react-icons/fa";

export default function App() {
  const [password, setPassword] = useState("");
  const [lengthpassword, setLengthPassword] = useState(8);
  const [uppercaseLetters, setUppercase] = useState(false);
  const [lowercaseLetters, setLoweCase] = useState(false);
  const [addNumber, setNumber] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  //GENERATE PASSWORD
  function GeneratePassword() {
    if (!!!uppercaseLetters && !!!lowercaseLetters && !!!addNumber) {
      enqueueSnackbar("Atleast select one checkbox", {
        variant: "error",
      });
    } else {
      let characterGenerate = "";
      if (addNumber) {
        characterGenerate = characterGenerate + Numbers;
      }
      if (uppercaseLetters) {
        characterGenerate = characterGenerate + upperCaseLetters;
      }
      if (lowercaseLetters) {
        characterGenerate = characterGenerate + lowerCaseLetters;
      }
      setPassword(createPassword(characterGenerate));
      enqueueSnackbar("Password generated successfully", {
        variant: "success",
        persist: false,
      });
    }
  }

  const createPassword = (characterGenerate) => {
    let password = "";
    const characterGenerateLength = characterGenerate.length;
    for (let i = 0; i < lengthpassword; i++) {
      const characterIndex = Math.round(
        Math.random() * characterGenerateLength
      );
      password = password + characterGenerate.charAt(characterIndex);
    }
    return password;
  };

  //COPY PASSWORD
  function copyClipboard(password) {
    navigator.clipboard.writeText(password);
  }

  //HANDLE COPY PASSWORD
  function handlePassword(e) {
    if (password === "") {
      enqueueSnackbar(Pass_Fail, {
        variant: "error",
        persist: false,
      });
    } else {
      copyClipboard(password);
      enqueueSnackbar(Pass_Success, {
        variant: "success",
        persist: false,
      });
    }
  }

  return (
    <div className="App">
      <div className="generator-container">
        <div className="generator-header">
          <h3>Password Generator</h3>
          <div className="generator-password">
            <h4> {password}</h4>
            <button className="copy-btn">
              <i onClick={handlePassword}>
                <FaRegClipboard />
              </i>
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="password-strength">Password Length</label>
            <input
              className="pw"
              defaultValue={lengthpassword}
              onChange={(e) => setLengthPassword(e.target.value)}
              type="number"
              id="password-strength"
              name="password-strength"
              max="26"
              min="8"
            />
          </div>
          <div className="form-group">
            <label htmlFor="uppercase-letters"> Add Uppercase Letters </label>
            <input
              checked={uppercaseLetters}
              onChange={(e) => setUppercase(e.target.checked)}
              type="checkbox"
              id="uppercase-letters"
              name="uppercase-letters"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lowercase-letters">Add Lowercase Letters</label>
            <input
              checked={lowercaseLetters}
              onChange={(e) => setLoweCase(e.target.checked)}
              type="checkbox"
              id="lowecase-letters"
              name="lowercase-letters"
            />
          </div>
          <div className="form-group">
            <label htmlFor="add-number">Add Numbers</label>
            <input
              checked={addNumber}
              onChange={(e) => setNumber(e.target.checked)}
              type="checkbox"
              id="add-number"
              name="add-number"
            />
          </div>
          <button onClick={GeneratePassword} className="generator-btn">
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
}
