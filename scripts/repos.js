const username = "eyupUK"; // Replace with your GitHub username
const repoList = document.getElementById("repo-list"); // Move this outside the function
const token = "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"; // Replace with a valid GitHub token

async function fetchRepositories() {
    if (!username) {
        console.error("GitHub username is not defined.");
        return;
    }
    if (!token) {
        console.error("GitHub token is not defined.");
        return;
    }
    if (!repoList) {
        console.error("Repository list element not found.");
        return;
    }
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `token ${token}`, // Add "token" before the token value
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch repositories: ${response.status} ${response.statusText}`);
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