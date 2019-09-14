import React from "react";
import { ReactDebug } from "../index";

describe("index", () => {
  it("should pass", () => {
    const container = {};
    expect(() =>
      ReactDebug.render(<div id="foo">foo</div>, container)
    ).not.toThrow();
    console.log("========== second render ==============");
    expect(() =>
      ReactDebug.render(
        <div id="foo" className="bar">
          bar
        </div>,
        container
      )
    ).not.toThrow();
  });
});
