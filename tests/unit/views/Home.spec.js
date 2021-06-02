import Home from "@/views/Home.vue";
import { shallowMount } from "../customMount";

describe("Home.vue", () => {
  it("should display the home correctly", () => {
    const wrapper = shallowMount(Home);
    const titleNode = wrapper.find(".home-title");
    expect(titleNode.text()).toEqual("Jeu du pendu");

    const playNode = wrapper.find(".app-button");
    expect(playNode.text()).toEqual("Jouer");
  });
});
