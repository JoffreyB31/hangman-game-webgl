import GameFinished from "@/components/GameFinished.vue";
import { shallowMount } from "../customMount";

describe("GameFinished.vue", () => {
  it("should show the correct message when the game is won", () => {
    const wrapper = shallowMount(GameFinished, {
      propsData: { win: true },
    });
    const node = wrapper.find(".game-finished-text");
    expect(node.text()).toEqual("Vous avez gagné");
  });
  it("should show the correct message when the game is lose", () => {
    const wrapper = shallowMount(GameFinished, {
      propsData: { win: false },
    });
    const node = wrapper.find(".game-finished-text");
    expect(node.text()).toEqual("Vous avez perdu");
  });
});
