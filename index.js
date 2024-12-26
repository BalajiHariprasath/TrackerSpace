let role = 'viewer';

// Define the subtasks
const subtasks = [
  { id: 1, name: "Yarn Follow up", status: "Not Started", assignee: "Gopi", startDate: "", endDate: "", remarks: "", comments: [] },
  { id: 2, name: "Waving", status: "Not Started", assignee: "Santhosh", startDate: "", endDate: "", remarks: "", comments: [] },
  { id: 3, name: "Clothing", status: "Not Started", assignee: "Basker", startDate: "", endDate: "", remarks: "", comments: [] },
];

// Render subtasks
const renderSubtasks = () => {
  const container = document.getElementById("subtasks");
  container.innerHTML = ""; // Clear previous content

  subtasks.forEach((subtask, index) => {
    const subtaskDiv = document.createElement("div");
    subtaskDiv.className = `subtask ${subtask.status.toLowerCase().replace(/ /g, '-')}`;
    subtaskDiv.innerHTML = `
      <span>${subtask.name}</span>
      <div class="status-bar"></div>
      <span class="status-text">${subtask.status}</span>
    `;
    subtaskDiv.onclick = () => showPopup(index);
    container.appendChild(subtaskDiv);
  });
};

// Show popup
const showPopup = (index) => {
  const subtask = subtasks[index];
  document.getElementById('popup-title').innerText = subtask.name;
  document.getElementById('popup-assignee').innerText = `Assignee: ${subtask.assignee}`;
  document.getElementById('popup-start-date').value = subtask.startDate;
  document.getElementById('popup-end-date').value = subtask.endDate;
  document.getElementById('popup-remarks').value = subtask.remarks;
  document.getElementById('popup-status-select').value = subtask.status;
  document.getElementById('popup').dataset.index = index;

  const commentsList = document.getElementById('comments-list');
  commentsList.innerHTML = "";
  subtask.comments.forEach(comment => {
    const li = document.createElement('li');
    li.innerText = `${comment.timestamp}: ${comment.text}`;
    commentsList.appendChild(li);
  });

  document.querySelector('.popup-overlay').style.display = 'block';
  document.getElementById('popup').style.display = 'block';

  if (role === 'viewer') {
    document.getElementById('popup-status-select').disabled = true;
    document.getElementById('popup-start-date').disabled = true;
    document.getElementById('popup-end-date').disabled = true;
    document.getElementById('popup-remarks').disabled = true;
    document.querySelector('.popup button[onclick="savePopup()"]').style.display = 'none';
  } else {
    document.getElementById('popup-status-select').disabled = false;
    document.getElementById('popup-start-date').disabled = false;
    document.getElementById('popup-end-date').disabled = false;
    document.getElementById('popup-remarks').disabled = false;
    document.querySelector('.popup button[onclick="savePopup()"]').style.display = 'inline-block';
  }
};

// Close popup
const closePopup = () => {
  document.querySelector('.popup-overlay').style.display = 'none';
  document.getElementById('popup').style.display = 'none';
};

// Save popup
const savePopup = () => {
  const index = document.getElementById('popup').dataset.index;
  const subtask = subtasks[index];
  const newStatus = document.getElementById('popup-status-select').value;
  const newStartDate = document.getElementById('popup-start-date').value;
  const newEndDate = document.getElementById('popup-end-date').value;
  const newRemarks = document.getElementById('popup-remarks').value;

  const timestamp = new Date().toLocaleString();
  const commentText = `Status: ${newStatus}, Start Date: ${newStartDate}, End Date: ${newEndDate}, Remarks: ${newRemarks}`;
  subtask.comments.push({ timestamp, text: commentText });

  subtask.status = newStatus;
  subtask.startDate = newStartDate;
  subtask.endDate = newEndDate;
  subtask.remarks = newRemarks;

  if (subtask.status === "Completed" && index + 1 < subtasks.length) {
    subtasks[index + 1].status = "Started";
  }

  closePopup();
  renderSubtasks();
};

// Toggle role
const toggleRole = () => {
  role = role === 'viewer' ? 'admin' : 'viewer';
  document.querySelector('.toggle-button').innerText = `Switch to ${role === 'viewer' ? 'Admin' : 'Viewer'}`;
  renderSubtasks();
};

// Initial rendering
renderSubtasks();
