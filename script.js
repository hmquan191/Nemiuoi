document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".container img");
  let shuffledImages = shuffleArray(
    [...Array(9).keys()].map((i) => `Pictures/InsideOut/${i + 1}_nem.png`)
  ); // Tạo danh sách ảnh đã xáo trộn

  images.forEach((img, index) => {
    img.src = "Pictures/InsideOut/demo.jpg"; // Đặt ảnh ban đầu là demo.jpg

    img.addEventListener("click", () => {
      img.src = shuffledImages[index]; // Đổi ảnh thành ảnh ngẫu nhiên đã xáo trộn
    });
  });
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
