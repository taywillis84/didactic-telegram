(() => {
  const CLASS_NAME = "xss-surface-highlight";

  const editableSelector = [
    "input:not([type='hidden']):not([disabled]):not([readonly])",
    "textarea:not([disabled]):not([readonly])",
    "select:not([disabled])",
    "[contenteditable='']",
    "[contenteditable='true']",
    "[contenteditable='plaintext-only']"
  ].join(",");

  const applyHighlight = (root = document) => {
    root.querySelectorAll(editableSelector).forEach((element) => {
      if (element.classList.contains(CLASS_NAME)) return;
      element.classList.add(CLASS_NAME);
      element.setAttribute(
        "data-input-surface",
        "Potential injection surface (editable field)"
      );
    });
  };

  applyHighlight();

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;

          if (node.matches(editableSelector)) {
            node.classList.add(CLASS_NAME);
            node.setAttribute(
              "data-input-surface",
              "Potential injection surface (editable field)"
            );
          }

          applyHighlight(node);
        });
      }

      if (
        mutation.type === "attributes" &&
        mutation.target instanceof Element &&
        mutation.target.matches(editableSelector)
      ) {
        mutation.target.classList.add(CLASS_NAME);
        mutation.target.setAttribute(
          "data-input-surface",
          "Potential injection surface (editable field)"
        );
      }
    }
  });

  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ["contenteditable", "disabled", "readonly", "type"]
  });
})();
