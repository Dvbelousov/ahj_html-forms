export default function tooltip({ title, message }, element) {
  const popoverElement = document.createElement("div");
  popoverElement.classList.add("popover");

  const popoverTitle = document.createElement("div");
  popoverTitle.classList.add("popover-title");
  popoverTitle.textContent = title;
  popoverElement.prepend(popoverTitle);

  const popoverContent = document.createElement("p");
  popoverContent.textContent = message;
  popoverContent.classList.add("popover-content");
  popoverElement.append(popoverContent);

  element.append(popoverElement);

  popoverElement.style.top = `${-popoverElement.offsetHeight - 5}px`;
  const width = Math.abs(popoverElement.offsetWidth - element.offsetWidth) / 2;
  popoverElement.style.right = `${-width}px`;
  return popoverElement;
}
