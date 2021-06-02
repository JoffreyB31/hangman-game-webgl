import Play from "@/views/Play.vue";
import { mount } from "./customMount";

describe("Play.vue", () => {
  const word = [..."Jest-Test"];

  it("should initialize the game properly", async () => {
    const wrapper = mount(Play);
    await wrapper.setData({ word, loading: false });

    const displayLettersNodes = wrapper.findAll(".display-container-inner .display-letter");
    expect(displayLettersNodes.length).toBe(word.length);
    expect(displayLettersNodes.at(0).text()).toEqual("");
    expect(displayLettersNodes.at(1).text()).toEqual("");
    expect(displayLettersNodes.at(2).text()).toEqual("");
    expect(displayLettersNodes.at(3).text()).toEqual("");
    expect(displayLettersNodes.at(4).text()).toEqual("-");
    expect(displayLettersNodes.at(4).classes()).toContain("display-letter-special");
    expect(displayLettersNodes.at(5).text()).toEqual("");
    expect(displayLettersNodes.at(6).text()).toEqual("");
    expect(displayLettersNodes.at(7).text()).toEqual("");
    expect(displayLettersNodes.at(8).text()).toEqual("");

    const stateNode = wrapper.find(".state-container");
    expect(stateNode.text()).toEqual("Erreurs restantes : 7");

    const keyboardNodes = wrapper.findAll(".game-container .keyboard-container div");
    expect(keyboardNodes.length).toBe(26);
  });
});
