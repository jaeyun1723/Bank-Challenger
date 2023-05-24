import React from "react";

class Main02 extends React.Component {
  render() {
    return (
      <>
        <section
          className="section section-components pb-0"
          id="section-components"
          style={{
            backgroundImage: `url(${require("../../assets/img/theme/main02.png")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
          }}
        >
          {}
        </section>
      </>
    );
  }
}

export default Main02;
