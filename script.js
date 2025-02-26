async function loadVideos() {
    const videoContainer = document.getElementById("video-container");
    try {
        const response = await fetch("/api/videos");
        const data = await response.json();
        data.forEach(file => {
            const videoItem = document.createElement("div");
            videoItem.classList.add("video-item");
            videoItem.innerHTML = `
                <video controls>
                    <source src="${file.url}" type="video/mp4">
                    Ваш браузер не поддерживает видео.
                </video>
                <select onchange="updateCategory('${file.file_id}', this.value)">
                    <option value="Main">Main</option>
                    <option value="Secondary">Secondary</option>
                    <option value="Filler">Filler</option>
                </select>
            `;
            videoContainer.appendChild(videoItem);
        });
    } catch (error) {
        console.error("Ошибка загрузки видео: ", error);
    }
}

async function updateCategory(fileId, category) {
    try {
        await fetch("/api/update_category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ file_id: fileId, category: category })
        });
    } catch (error) {
        console.error("Ошибка обновления категории: ", error);
    }
}

loadVideos();
