document.addEventListener("DOMContentLoaded", function () {
  const addBtn = document.getElementById("addBtn");
  const removeBtn = document.getElementById("removeBtn");
  const gallery = document.getElementById("gallery");

  let currentImageCount = 4;

  //Вивантаження з локал сторедж
  const savedImages = JSON.parse(localStorage.getItem("galleryImages"));
  if (savedImages && savedImages.length > 0) {
    currentImageCount = savedImages.length;
    savedImages.forEach((imageUrl) => {
      const img = document.createElement("img");
      img.src = imageUrl;
      addToGallery(img);
    });
  }

  // Фетч запит по апі
  function fetchRandomDogImage() {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((data) => {
        const imageUrl = data.message;
        const img = document.createElement("img");
        img.src = imageUrl;
        addToGallery(img);
        saveImagesToLocalStorage();
      })
      .catch((error) => console.error("Помилка вивантаження:", error));
  }
  addBtn.addEventListener("click", function () {
    if (currentImageCount < 1000) {
      fetchRandomDogImage();
      currentImageCount++;
      updateGalleryLayout();
    }
  });
  removeBtn.addEventListener("click", function () {
    if (currentImageCount > 1) {
      removeLastImage();
      currentImageCount--;
      updateGalleryLayout();
      saveImagesToLocalStorage();
    }
  });

  //Додавання
  function addToGallery(img) {
    if (!img.alt) {
      img.alt = "ГАРНА СОБАКА";
    }
    let lastRow = gallery.lastChild;
    if (!lastRow || lastRow.children.length >= 8) {
      lastRow = document.createElement("div");
      lastRow.className = "gallery-row";
      gallery.appendChild(lastRow);
    }
    lastRow.appendChild(img);
    img.addEventListener("click", function () {
      showFullscreenGallery(img);
    });
  }

  // Видалення 
  function removeLastImage() {
    const lastRow = gallery.lastChild;
    if (lastRow) {
      const lastImage = lastRow.lastChild;
      if (lastImage) {
        lastRow.removeChild(lastImage);
      }
      if (lastRow.children.length === 0) {
        gallery.removeChild(lastRow);
      }
    }
  }

  //Оновлення галереї
  function updateGalleryLayout() {
    const images = gallery.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
      images[i].style.width = "150px";
      images[i].style.height = "150px";
    }
    gallery.style.flexDirection = currentImageCount <= 8 ? "row" : "column";
  }

  //Фулскрін
  function showFullscreenGallery(clickedImage) {
    const fullscreenGallery = document.createElement("div");
    fullscreenGallery.className = "fullscreen-gallery";
    document.body.appendChild(fullscreenGallery);

    const exitFullscreenBtn = document.createElement("button");
    exitFullscreenBtn.className = "exit-fullscreen-btn";
    exitFullscreenBtn.innerHTML = "X";
    exitFullscreenBtn.addEventListener("click", function () {
      document.body.removeChild(fullscreenGallery);
    });
    fullscreenGallery.appendChild(exitFullscreenBtn);

    const cloneImg = clickedImage.cloneNode();
    cloneImg.style.width = "500px"; 
    cloneImg.style.height = "500px"; 
    fullscreenGallery.appendChild(cloneImg);
  }
  gallery.addEventListener("click", function (event) {
    const clickedImage = event.target;
    showFullscreenGallery(clickedImage);
  });
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("exit-fullscreen-btn")) {
      document.body.removeChild(document.querySelector(".fullscreen-gallery"));
    }
  });
  //Збереження в лкоал сторедж
  function saveImagesToLocalStorage() {
    const images = [];
    const galleryRows = gallery.getElementsByClassName("gallery-row");
    for (let i = 0; i < galleryRows.length; i++) {
      const rowImages = galleryRows[i].getElementsByTagName("img");
      for (let j = 0; j < rowImages.length; j++) {
        images.push(rowImages[j].src);
      }
    }
    localStorage.setItem("galleryImages", JSON.stringify(images));
  }
});

console.log(localStorage);
