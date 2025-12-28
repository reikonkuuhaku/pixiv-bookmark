fetch("bookmarks.json")
  .then(res => res.json())
  .then(data => {
    const tagSet = new Set();
    data.forEach(item => item.tags.forEach(t => tagSet.add(t)));

    const select = document.getElementById("tagSelect");
    tagSet.forEach(tag => {
      const opt = document.createElement("option");
      opt.value = tag;
      opt.textContent = tag;
      select.appendChild(opt);
    });

    select.addEventListener("change", () => render(data, select.value));
    render(data, "all");
  });

  let page = 0;
  const PAGE_SIZE = 50;

  function renderPage(data) {
    const start = page * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    data.slice(start, end).forEach(renderItem);
  }

  document.getElementById("next").onclick = () => {
    page++;
    renderPage(data);
  };

function render(data, tag) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  data
    .filter(item => tag === "all" || item.tags.includes(tag))
    .forEach(item => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
      <img src="${item.imageUrl}" referrerpolicy="no-referrer">
      `;
      gallery.appendChild(div);
    });
}