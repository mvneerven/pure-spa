import { config } from "./my-app-config";
import { parseHTML } from "./shared/common";
import { PureSPA } from "./pure-spa";
import { html } from "lit";
import { ref, createRef } from "lit/directives/ref.js";

customElements.define(
  "my-app",
  class MyApp extends PureSPA {
    #h1 = createRef();
    #aside = createRef();

    /**
     * Set app.config structure
     */
    static get config() {
      return config;
    }

    render() {
      return html`
        <header><h1 ${ref(this.#h1)}></h1></header>
        <aside ${ref(this.#aside)}></aside>
        <main>${super.render()}</main>
        <footer>&copy; ${new Date().getFullYear()} Neerventure</footer>
      `;
    }

    firstUpdated() {
      super.firstUpdated();

      this.addMenu();

      this.on("routecomplete", () => {
        this.#h1.value.textContent = this.activeRoute?.name;
      });
    }

    addMenu() {
      const menu = document.createElement("menu");
      for (const page of this.config.pages) {
        const li = parseHTML(
          /*html*/ `<li><a href="${page.path}">${page.name}</a></li>`
        )[0];

        menu.appendChild(li);
      }
      this.#aside.value.appendChild(menu);
    }
  }
);
