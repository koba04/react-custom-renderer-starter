import React from "react";
import { ReactJSON, RootContainer } from "../index";

describe("ReactJSON", () => {
  it("should be able to render host components and text", () => {
    const container: RootContainer = {};
    expect(() => {
      ReactJSON.render(
        <div id="foo">
          <p className="paragraph">
            <span>foo</span>
          </p>
        </div>,
        container
      );
      ReactJSON.render(
        <div id="foo" className="bar">
          <p className="paragraph">
            <span className="em">bar</span>
          </p>
        </div>,
        container
      );
    }).not.toThrow();
    expect(ReactJSON.toJSON(container.container)).toMatchSnapshot();
  });

  it("should be able to handle swapping list items", () => {
    const container: RootContainer = {};
    expect(() => {
      ReactJSON.render(
        <ul>
          <li key="a">a</li>
          <li key="b">b</li>
          <li key="c">c</li>
        </ul>,
        container
      );
      ReactJSON.render(
        <ul>
          <li key="b">b</li>
          <li key="a">a</li>
          <li key="c">c</li>
        </ul>,
        container
      );
    }).not.toThrow();
    const json: any = ReactJSON.toJSON(container.container);
    expect(json.children.map(child => child.children[0])).toEqual([
      "b",
      "a",
      "c"
    ]);
    expect(json).toMatchSnapshot();
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
    const container: RootContainer = {};
    expect(() => {
      ReactJSON.render(<App message="Hello" />, container);
      ReactJSON.render(<App message="World" />, container);
    }).not.toThrow();
    expect(ReactJSON.toJSON(container.container)).toMatchSnapshot();
  });

  it("should be able to get logs from a container", () => {
    const container: RootContainer = {};
    ReactJSON.render(<div id="foo">foo</div>, container);
    ReactJSON.render(<div id="foo">foo</div>, container);
    expect(container.container.logs.map(([operation]) => operation)).toEqual([
      "commitMount",
      "commitUpdate"
    ]);
  });
});
