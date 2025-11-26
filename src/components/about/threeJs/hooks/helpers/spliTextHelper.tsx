import SplitType from "split-type";

export default class TextSplit {
  chars: HTMLElement[] | null;

  constructor(className: string) {
    // guarda os caracteres já na inicialização
    this.chars = new SplitType(className).chars;
  }

  insertParagraph(className: string) {
    if (!this.chars) return;

    this.chars.forEach((char) => {
      const charContent = char.textContent;
      char.innerHTML = `<p class="${className}">${charContent}</p>`;
    });
  }
}
