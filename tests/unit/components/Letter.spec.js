import Letter from "@/components/Letter.vue";
import { shallowMount } from "../customMount";

describe("Letter.vue", () => {
  const letter = "v";

  it("should display the letter", () => {
    const wrapper = shallowMount(Letter, {
      propsData: { letter },
    });
    const node = wrapper.find(".letter");
    expect(node.text()).toEqual(letter.toUpperCase());
    expect(node.classes()).not.toContain("letter-active");
    expect(node.classes()).not.toContain("letter-error");
  });

  it("should display an active letter ", () => {
    const wrapper = shallowMount(Letter, {
      propsData: { letter, active: true },
    });
    const node = wrapper.find(".letter");
    expect(node.text()).toEqual(letter.toUpperCase());
    expect(node.classes()).toContain("letter-active");
    expect(node.classes()).not.toContain("letter-error");
  });

  it("should display the letter with an error", () => {
    const wrapper = shallowMount(Letter, {
      propsData: { letter, error: true },
    });
    const node = wrapper.find(".letter");
    expect(node.text()).toEqual(letter.toUpperCase());
    expect(node.classes()).not.toContain("letter-active");
    expect(node.classes()).toContain("letter-error");
  });
});
