import React from "react";
import { ReactDebug } from "../index";

describe("index", () => {
  it("should pass", () => {
    ReactDebug.render(<div>foo</div>);
  });
});
