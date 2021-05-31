import DisplayLetter from "@/components/DisplayLetter.vue";
import { shallowMount } from "./customMount";

describe("DisplayLetter.vue", () => {
  const specialChar = ".";
  const letter = "v";

  it("should hide the letter when visible is false", () => {
    const wrapper = shallowMount(DisplayLetter, {
      propsData: { letter },
    });
    const node = wrapper.find(".display-letter");
    expect(node.text()).toEqual("");
    expect(node.classes()).not.toContain("display-letter-correct");
    expect(node.classes()).not.toContain("display-letter-error");
  });

  it("should show the letter when visible is true", () => {
    const wrapper = shallowMount(DisplayLetter, {
      propsData: { letter, visible: true },
    });
    const node = wrapper.find(".display-letter");
    expect(node.text()).toMatch(letter.toUpperCase());
    expect(node.classes()).not.toContain("display-letter-correct");
    expect(node.classes()).not.toContain("display-letter-error");
  });

  it("should show a special character", () => {
    const wrapper = shallowMount(DisplayLetter, {
      propsData: { letter: specialChar, visible: true },
    });
    const node = wrapper.find(".display-letter");
    expect(node.text()).toMatch(specialChar);
    expect(node.classes()).not.toContain("display-letter-correct");
    expect(node.classes()).not.toContain("display-letter-error");
  });

  it("should show a correct letter when visible and game is finish", () => {
    const wrapper = shallowMount(DisplayLetter, {
      propsData: { letter, visible: true, end: true },
    });
    const node = wrapper.find(".display-letter");
    expect(node.text()).toMatch(letter.toUpperCase());
    expect(node.classes()).toContain("display-letter-correct");
    expect(node.classes()).not.toContain("display-letter-error");
  });

  it("should show an error letter when not visible and game is finish", () => {
    const wrapper = shallowMount(DisplayLetter, {
      propsData: { letter, visible: false, end: true },
    });
    const node = wrapper.find(".display-letter");
    expect(node.text()).toMatch(letter.toUpperCase());
    expect(node.classes()).not.toContain("display-letter-correct");
    expect(node.classes()).toContain("display-letter-error");
  });
});
