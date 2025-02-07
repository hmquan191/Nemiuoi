document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".container img");
  const promptText = document.querySelector(".prompt");

  // Notification box elements
  const notificationBox = document.createElement("div");
  notificationBox.classList.add("notification-box");
  notificationBox.innerHTML = `
    <p class="message"></p>
    <p class="timer"></p>
    <button class="ok-btn">OK</button>
  `;
  document.body.appendChild(notificationBox);

  const messageText = notificationBox.querySelector(".message");
  const timerText = notificationBox.querySelector(".timer");
  const okButton = notificationBox.querySelector(".ok-btn");

  // Danh sách ảnh và câu chữ tương ứng
  const imagePhrases = {
    "1_nem.png":
      "1. Buồn bã (Sadness) 💙 – Có những ngày tâm trạng trùng xuống và bạn chẳng muốn làm gì cả. Đó là một phần của cuộc sống, và bạn không cần phải che giấu cảm xúc ấy. Hãy cho phép bản thân cảm nhận, nhưng đừng để nó nhấn chìm bạn. Dù hôm nay có thế nào, ngày mai vẫn là một cơ hội mới để bạn tiếp tục hành trình của mình!",
    "2_nem.png":
      "2. Chán ghét (Disgust) 💚 – Không phải mọi thứ đều phù hợp với bạn, và điều đó hoàn toàn ổn. Hãy tin vào cảm giác của chính mình, lắng nghe trực giác và tránh xa những điều khiến bạn khó chịu. Thay vào đó, hãy bao quanh mình bằng những thứ khiến bạn vui vẻ và thoải mái – vì bạn xứng đáng với những gì tốt đẹp hơn!",
    "3_nem.png":
      "3. Chán chường (Ennui) 💜 – Có những ngày mọi thứ thật nhạt nhẽo và vô vị, nhưng cảm giác này không kéo dài mãi đâu. Đôi khi chỉ cần thay đổi một thói quen nhỏ, thử một điều mới, hoặc đơn giản là bước ra ngoài và cảm nhận thế giới cũng đủ để làm mới tâm trạng. Cuộc sống luôn có điều thú vị đang chờ bạn khám phá!",
    "4_nem.png":
      "4. Ghen tị (Envy) 💙 – Thật dễ để so sánh mình với người khác, nhưng bạn hãy nhớ rằng mỗi người có một hành trình riêng. Thành công hay hạnh phúc của ai đó không có nghĩa là bạn bị bỏ lại phía sau. Hãy tập trung vào con đường của mình, nuôi dưỡng những điều bạn yêu thích, vì bạn cũng có giá trị và ánh sáng riêng!",
    "5_nem.png":
      "5. Giận dữ (Anger) ❤️ – Tức giận là một cảm xúc tự nhiên và không có gì sai khi cảm thấy như vậy. Nhưng thay vì để nó chi phối bạn, hãy thử tìm một cách tích cực để giải tỏa – viết ra suy nghĩ của mình, đi dạo hoặc đơn giản là hít thở thật sâu. Bạn có quyền cảm thấy giận, nhưng cũng có quyền chọn cách phản ứng một cách lành mạnh hơn!",
    "6_nem.png":
      "6. Lo âu (Anxiety) 🧡 – Có những ngày mọi thứ dường như rối ren và quá sức, nhưng bạn mạnh mẽ hơn bạn nghĩ rất nhiều. Hãy hít thở thật sâu, cho bản thân một chút thời gian và tiến từng bước nhỏ. Không cần phải vội vàng, vì mỗi bước bạn đi đều đáng giá!",
    "7_nem.png":
      "7. Sợ hãi (Fear) 💜 – Nỗi sợ không có nghĩa là bạn yếu đuối, mà là dấu hiệu của sự quan tâm và ý thức về những gì quan trọng với bạn. Đừng để nó cản bước, hãy thử đối diện nó một cách nhẹ nhàng. Khi bạn dám bước qua ranh giới của mình, bạn sẽ nhận ra rằng mình mạnh mẽ hơn rất nhiều!",
    "8_nem.png":
      "8. Hạnh phúc (Joy) 💛 – Niềm vui không phải lúc nào cũng là những điều to lớn, mà đôi khi chỉ là một cái ôm, một cốc trà ấm hay một khoảnh khắc yên bình. Hãy cho phép bản thân tận hưởng những niềm vui nhỏ bé ấy, vì chúng là những viên gạch xây nên hạnh phúc thật sự!",
    "9_nem.png":
      "9. Xấu hổ (Embarrassment) 💖 – Ai cũng có những khoảnh khắc vụng về hay lúng túng, và điều đó hoàn toàn bình thường. Đừng để một phút bối rối định nghĩa con người bạn. Hãy mỉm cười, vì chính những điều chưa hoàn hảo mới làm bạn trở nên đặc biệt và đáng yêu theo cách riêng!",
    "10_nem.png":
      "10. Secret!!!: Yêu thương (Love) 💗 – Tình yêu không chỉ là những khoảnh khắc ngọt ngào mà còn là sự kiên nhẫn, thấu hiểu và chấp nhận cả những điều chưa hoàn hảo. Yêu thương không có nghĩa là lúc nào cũng rực rỡ, mà còn là khi bạn sẵn sàng ở bên ai đó trong những ngày tăm tối nhất. Và đừng quên, tình yêu không chỉ đến từ người khác – hãy học cách yêu thương chính mình, dịu dàng với những sai lầm của bản thân và trân trọng từng điều nhỏ bé làm nên con người bạn",
  };

  let allImages = Object.keys(imagePhrases); // Danh sách toàn bộ ảnh
  let shuffledImages = shuffleArray(allImages).slice(0, 9); // Xáo trộn ảnh ban đầu
  let hasClicked = false; // Kiểm soát lượt chọn

  function resetGame() {
    hasClicked = false;
    shuffledImages = shuffleArray(allImages).slice(0, 9); // Xáo trộn lại ảnh

    images.forEach((img, index) => {
      img.src = "Pictures/InsideOut/box.png"; // Reset về hộp quà
      img.dataset.image = shuffledImages[index]; // Gán lại ảnh tương ứng
      img.style.pointerEvents = "auto"; // Bật lại sự kiện click
    });

    promptText.textContent = "Bạn có thể chọn một hộp quà!"; // Reset hướng dẫn
  }

  function startCountdown() {
    let timeLeft = 3; // nho sua lai
    timerText.textContent = `⏳ ${timeLeft}s`;
    okButton.style.display = "none"; // Ẩn nút OK ban đầu

    let countdownInterval = setInterval(() => {
      timeLeft--;
      timerText.textContent = `⏳ ${timeLeft}s`;

      if (timeLeft === 0) {
        clearInterval(countdownInterval);
        timerText.textContent = "";
        okButton.style.display = "inline-block"; // Hiện nút OK
      }
    }, 1000);
  }

  function showNotification(message, index) {
    messageText.textContent = message;
    notificationBox.style.display = "block"; // Hiện thông báo
    notificationBox.style.position = "fixed"; // Đặt vị trí cố định

    if (window.innerWidth >= 1505) {
      // Khi width >= 1505px, giữ nguyên như ban đầu
      if (index % 3 === 1) {
        notificationBox.style.left = "75%";
      } else {
        notificationBox.style.left = "50%";
      }
    } else if (window.innerWidth >= 1042 && window.innerWidth <= 1504) {
      // Khi width từ 1042 đến 1504px
      if ([1, 3, 5, 7, 9].includes(index)) {
        notificationBox.style.left = "25%"; // Lệch phải
      } else {
        notificationBox.style.left = "75%"; // Lệch trái
      }
    } else if (window.innerWidth > 735) {
      // Khi width > 735px nhưng nhỏ hơn 1042px
      if (index % 3 === 1) {
        notificationBox.style.left = "75%";
      } else {
        notificationBox.style.left = "50%";
      }
    }

    startCountdown();
  }

  images.forEach((img, index) => {
    img.src = "Pictures/InsideOut/box.png"; // Ảnh ban đầu là hộp quà
    img.dataset.image = shuffledImages[index]; // Gán tên ảnh tương ứng

    img.addEventListener("click", () => {
      if (hasClicked) return; // Nếu đã click rồi thì không cho chọn nữa
      hasClicked = true;

      let imageName = img.dataset.image;
      img.src = `Pictures/InsideOut/${imageName}`; // Hiển thị ảnh thật
      promptText.textContent = ""; // Ẩn hướng dẫn

      images.forEach((other) => (other.style.pointerEvents = "none")); // Khóa tất cả hộp
      showNotification(imagePhrases[imageName], index); // Hiện notification

      okButton.addEventListener("click", () => {
        notificationBox.style.display = "none"; // Đóng hộp thông báo
        resetGame(); // Reset game sau khi nhấn OK
      });
    });
  });

  resetGame(); // Chạy game lần đầu
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

document.addEventListener("DOMContentLoaded", () => {
  const generateButton = document.getElementById("generateButton");
  const memeCard = document.getElementById("memeCard");

  const numberPicture = 34; // cap nhat theo so anh dang co;

  generateButton.addEventListener("click", () => {
    const randomNumber = Math.floor(Math.random() * numberPicture) + 1;
    // nho sua dinh dang anh
    const randomImagePath = `./Pictures/Meme/${randomNumber}_nem.png`;

    // Set image source

    memeCard.src = randomImagePath;
    memeCard.style.display = "inline-block";

    memeCard.onerror = () => {
      console.error(`Image not found: ${randomImagePath}`);
      memeCard.src = ""; // Clear the src to avoid showing a broken image icon
      memeCard.alt = "Image not available";
      memeCard.style.display = "none";
    };
  });
});
