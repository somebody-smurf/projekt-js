function loadComments() {
    fetch("/comments")
    .then(res => res.json())
    .then(data => {
        let div = document.getElementById("comments");
        div.innerHTML = "";
        data.forEach(c => {
            div.innerHTML += `<div class="comment"><b>${c.author}</b>: ${c.comment}</div>`;
        });
    });
}

document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    let author = document.getElementById("author").value;
    let comment = document.getElementById("comment").value;

    let newComment = {
        id: Date.now(),
        author: author,
        comment: comment
    };

    fetch("/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment)
    })
    .then(() => {
        document.getElementById("author").value = "";
        document.getElementById("comment").value = "";
        loadComments();
    });
});

loadComments();
