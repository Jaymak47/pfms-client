const style = {
  backgroundColor: "#F8F8F8",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "10px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "40px",
  width: "100%",
};

const phantom = {
  display: "block",
  padding: "10px",
  height: "40px",
  width: "100%",
};

const Footer = () => {
  return (
    <div style={phantom}>
      <div style={style}>
        <p>
          Copyright (c) County Gorvement of ISIOLO. All Rights Reserved.{" "}
          <a href="/homepage">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
