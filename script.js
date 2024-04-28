document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const resultsBody = document.getElementById("resultsBody");
  const loader = document.getElementById("loader");

  function showLoader() {
    loader.style.display = "block";
  }

  function hideLoader() {
    loader.style.display = "none";
  }

  function fetchData(searchTerm) {
    showLoader();
    fetch(`https://api.proxynova.com/comb?query=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        resultsBody.innerHTML = "";
        data.lines.forEach(line => {
          const [email, password] = line.split(":");
          const tr = document.createElement("tr");
          tr.innerHTML = `<td>${email}</td><td>${password}</td>`;
          resultsBody.appendChild(tr);
        });
        hideLoader();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        hideLoader();
      });
  }

  searchButton.addEventListener("click", function() {
    const searchTerm = searchInput.value.toLowerCase();
    fetchData(searchTerm);
  });

  searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      const searchTerm = searchInput.value.toLowerCase();
      fetchData(searchTerm);
    }
  });
});
