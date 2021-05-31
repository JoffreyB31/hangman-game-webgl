import Play from "@/views/Play.vue";
import { mount } from "./customMount";

describe("Play.vue", () => {
  const word = [..."Jest-Test"];

  it("should hide the letter when visible is false", () => {
    const wrapper = mount(Play);
    wrapper.setData({ word });

    const displayLettersNodes = wrapper.findAll(".display-container-inner div");
    console.log(displayLettersNodes);
    expect(displayLettersNodes.length).toBe(word.length);
  });
});
