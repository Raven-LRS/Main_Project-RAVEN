import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
 
  return (
    <>
      <Header></Header>

      <div style={{ flexDirection: "row" }}>
        <button className="navbutton" onClick={() => navigate("/Home")}>
          Home
        </button>
        <button className="navbutton" onClick={() => navigate("/Dashboard")}>
          Dashboard
        </button>
        <button className="navbutton" onClick={() => navigate("/Nft")}>
          NFT Profile
        </button>

        <button className="navbutton" onClick={() => navigate("/Metadata")}>
          Create NFT
        </button>
        <button className="navbutton" onClick={() => navigate("/Splitmerge")}>
          Split/Merge
        </button>
      </div>
      <Outlet />
    </>
  );
}

export default App;
