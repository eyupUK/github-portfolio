const username = "eyupUK"; // Replace with your GitHub username
    const repoList = document.getElementById("repo-list");
    const token = ""; // Replace with your GitHub token

    async function fetchRepositories() {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`, {
          headers: {
            Authorization: `token ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        const repos = await response.json();
        displayRepositories(repos);
      } catch (error) {
        console.error(error);
        repoList.innerHTML = "<p>Failed to load repositories. Please try again later.</p>";
      }
    }

    function displayRepositories(repos) {
      repoList.innerHTML = repos
        .map(
          (repo) => `
          <div class="repo-card">
            <h3>${repo.name}</h3>
            <p>${repo.description || "No description available"}</p>
            <a href="${repo.html_url}" target="_blank">View Repository</a>
          </div>
        `
        )
        .join("");
    }

    fetchRepositories();