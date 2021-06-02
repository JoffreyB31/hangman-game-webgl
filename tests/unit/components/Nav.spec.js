import Nav from "@/components/Nav.vue";
import { shallowMount } from "../customMount";

describe("Nav.vue", () => {
  it("should have 2 locales buttons", () => {
    const wrapper = shallowMount(Nav);
    const nodes = wrapper.findAll(".locale-switcher span");
    expect(nodes.length).toBe(2);

    const frNode = nodes.at(0);
    expect(frNode.text()).toEqual("Français");
    expect(frNode.classes()).toContain("locale-active");

    const enNode = nodes.at(1);
    expect(enNode.text()).toEqual("English");
    expect(enNode.classes()).not.toContain("locale-active");
  });
});
