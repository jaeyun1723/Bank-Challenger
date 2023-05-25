import React from "react";
import { SectionsContainer, Section, ScrollToTopOnMount } from "react-fullpage";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Main01 from "./IndexSections/Main01.js";
import Main02 from "./IndexSections/Main02.js";
import Main03 from "./IndexSections/Main03.js";
import Main04 from "./IndexSections/Main04.js";
import Main05 from "./IndexSections/Main05.js";
class Hello extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  render() {
    let options = {
      activeClass: "active",
      anchors: ["main01", "main02", "main03", "main04", "main05"],
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
              <Main03 />
            </Section>
            <Section>
              <Main04 />
            </Section>
            <Section>
              <Main05 />
            </Section>
          </SectionsContainer>
        </main>
      </>
    );
  }
}

export default Hello;
