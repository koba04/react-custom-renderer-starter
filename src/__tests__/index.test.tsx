import React from "react";
import { ReactDebug } from "../index";

describe("index", () => {
  it("should pass", () => {
    // This test should be failed
    expect(() => ReactDebug.render(<div>foo</div>)).toThrow();
  });
});
