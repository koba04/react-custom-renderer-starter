import React from "react";
import { ReactDebug, RootContainer } from "../index";

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
    const App = (props: { message: string }) => (
      <section>
        <Button text="click" />
        <p>{props.message}</p>
        <MemoizedButton text="memo" />
      </section>
    );
    expect(() => {
      const container = {};
      ReactDebug.render(<App message="Hello" />, container);
      ReactDebug.render(<App message="World" />, container);
    }).not.toThrow();
  });

  it("should be able to get logs from a container", () => {
    const container: RootContainer = {};
    ReactDebug.render(<div id="foo">foo</div>, container);
    ReactDebug.render(<div id="foo">foo</div>, container);
    expect(container.container.logs.map(([operation]) => operation)).toEqual([
      "commitMount",
      "commitUpdate"
    ]);
  });
});
