import React from "react";
import "./home.css";
import homeBackground from "../../assets/home.png";
import logo from '../../assets/logo.png';
import { useNavigate } from "react-router-dom";

function Home() {
  const title = ["Connect", "Share", "Relief", "Feel"];
  const [count, setCount] = React.useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    var c = count;
    setInterval(() => {
      if (c > 2) {
          c =0;
        setCount(c);
      } else {
          c = c +1;
        setCount(c);
      }
    }, 2000);
  }, []);


  return (
    <div className="homeContainer">
      <img src={logo} className="homeLogo" />
      <div className="homeTitleBox">
        <p className="homeTitle">
          A <br />
          Social Space <br /> to <span>{title[count]}</span>
        </p>
        <p className="homeTitleMobile">
          A Social Space to <br /> <span>{title[count]}</span>
        </p>
        <p className="homeButton" onClick={() => navigate("/auth")}>{`Brew it  -->`}</p>
      </div>
      <img src={homeBackground} className="homeBackground" />
    </div>
  );
}

export default Home;
