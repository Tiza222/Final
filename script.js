function formatDueDate(dateString) {
    var today = new Date();
    var dueDate = new Date(dateString);

    var timeDiff = dueDate.getTime() - today.getTime();
    var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff === 0) {
        return "Today";
    } else if (daysDiff === 1) {
        return "Tomorrow";
    } else if (daysDiff === -1) {
        return "Yesterday";
    } else {
        return dateString;
    }
}

function assignTask() {
    var taskInput = document.getElementById("taskInput");
    var dueDate = document.getElementById("dueDate");
    var assignee = document.getElementById("assignee");
    var description = document.getElementById("description");
    var assignFileInput = document.getElementById("assignFileInput");
    var pendingTasks = document.getElementById("pendingTasks");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    var li = document.createElement("li");
    var taskText = document.createElement("span");
    taskText.textContent = taskInput.value + " - Due Date: " + formatDueDate(dueDate.value) + " - Assignee: " + assignee.value;
    li.appendChild(taskText);

    if (description.value.trim() !== "") {
        var desc = document.createElement("p");
        desc.textContent = "Description: " + description.value;
        li.appendChild(desc);
    }

    if (assignFileInput.files.length > 0) {
        var file = assignFileInput.files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
            var img = document.createElement("img");
            img.src = event.target.result;
            img.style.maxWidth = "100px";
            li.appendChild(img);
        };
        reader.readAsDataURL(file);
    }

    var completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.onclick = function() {
        li.classList.add("completed");
        var completedText = document.createElement("span");
        completedText.textContent = "Completed on: " + new Date().toLocaleDateString() + " - Assigned to: " + assignee.value;
        li.appendChild(completedText);
        document.getElementById("completedTasks").appendChild(li);
        li.removeChild(completeBtn); // Remove complete button after completion
        li.removeChild(commentInput); // Remove comment input after completion
        li.removeChild(fileInput); // Remove file input after completion
    };

    var commentInput = document.createElement("textarea");
    commentInput.placeholder = "Add a comment";
    li.appendChild(commentInput);

    var fileInput = document.createElement("input");
    fileInput.type = "file";
    li.appendChild(fileInput);

    li.appendChild(completeBtn);

    pendingTasks.appendChild(li);

    taskInput.value = "";
    dueDate.value = "";
    assignee.value = "";
    description.value = "";
    assignFileInput.value = "";
}
