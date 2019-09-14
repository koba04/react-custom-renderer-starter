import React from "react";
import { ReactDebug } from "../index";

describe("index", () => {
  it("should be able to render host components and text", () => {
    expect(() => {
      const container = {};
      ReactDebug.render(<div id="foo">foo</div>, container);
      console.log("========== second render ==============");
      ReactDebug.render(
        <div id="foo" className="bar">
          bar
        </div>,
        container
      );
    }).not.toThrow();
  });

  it("should be able to render composite components", () => {
    const Button = (props: { text: string }) => <button>{props.text}</button>;
    const MemoizedButton = React.memo(Button);
    const App = () => (
      <section>
        <Button text="click" />
        <MemoizedButton text="memo" />
      </section>
    );
    expect(() => {
      const container = {};
      ReactDebug.render(<App />, container);
      ReactDebug.render(<App />, container);
    }).not.toThrow();
  });
});
