// client side javascript

class WordCount extends HTMLParagraphElement {
    constructor() {
      // Always call super first in constructor
      super();
  
      // Element functionality written in here
      this.attachShadow({ mode: 'open' });
      let elText = '';
      let wordCountText = '';
      // make the spans
      let wrapper = document.createElement('span');
      let wordCountEl = document.createElement('span');

      // get text from doc
      let datatext = this.getAttribute('data-text');

      elText = this.innerHTML;

      let elTextCount = elText.trim().split(' ').length;

      // add count to word count text
      wordCountText = datatext + `... the paragraph word count is ${elTextCount}`;

      // add text to elements
      wrapper.innerHTML = elText;
      wordCountEl.innerHTML = wordCountText
      this.shadowRoot.append(wrapper);
      this.shadowRoot.append(wordCountEl);
    }
}

customElements.define('word-count', WordCount, { extends: 'p' });