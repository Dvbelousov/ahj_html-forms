import tooltip from "./popover";

const container = document.querySelector(".container");

const data = {
  "btn-1": {
    title: "Popover first",
    message: "Message-1",
  },
  "btn-2": {
    title: "Popover second",
    message: "Message-2",
  },
  "btn-3": {
    title: "Popover third",
    message: "Message-3",
  },
  "btn-4": {
    title: "Popover fourth",
    message: "Message-4",
  },
};

container.addEventListener("click", (event) => {
  event.preventDefault();
  const { target } = event;
  const btn = target.closest(".btn");

  if (btn) {
    let popover = btn.querySelector(".popover");
    if (popover) {
      popover.classList.toggle("hidden");
    } else {
      popover = tooltip(data[btn.id], btn);
    }
  }
});
