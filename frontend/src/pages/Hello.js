import React from "react";
import {
  SectionsContainer,
  Section,
  ScrollToTopOnMount,
  Footer,
} from "react-fullpage";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import CardsFooter from "components/Footers/CardsFooter.js";
import Main01 from "./IndexSections/Main01.js";
import Main02 from "./IndexSections/Main02.js";

class Hello extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  render() {
    let options = {
      activeClass: "active",
      anchors: ["main01", "main02", "main03", "main04"],
      arrowNavigation: true,
      className: "SectionContainer",
      delay: 500,
      navigation: true,
      scrollBar: false,
      sectionClassName: "Section",
      sectionPaddingTop: "0",
      sectionPaddingBottom: "0",
      verticalAlign: true,
    };

    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <ScrollToTopOnMount />
          <SectionsContainer {...options}>
            <Section>
              <Main01 />
            </Section>
            <Section>
              <Main02 />
            </Section>
            <Section>
              <Main01 />
            </Section>
            <Section>
              <Main02 />
            </Section>
            <Footer>
              <CardsFooter />
            </Footer>
          </SectionsContainer>
        </main>
      </>
    );
  }
}

export default Hello;
