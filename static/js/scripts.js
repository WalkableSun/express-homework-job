function getRecipes() {
  document.querySelector(".recipes").innerHTML = ``;
  fetch(`api/recipes`)
    .then((response) => response.json())
    .then((recipes) => renderRecipes(recipes));
}

function renderRecipes(recipes) {
  recipes.forEach((recipe) => {
    let recipeEl = document.createElement("div");
    recipeEl.innerHTML = `
      <img src="img/${recipe.image}" />
      <h3><a href="detail.html?recipe=${recipe._id}">${recipe.title}</a></h3>
      <p>${recipe.description}</p>
      <button class="delete" data-id=${recipe._id} >Delete</button>
    `;
    document.querySelector(".recipes").append(recipeEl);
  });
}

function addRecipe(event) {
  event.preventDefault();
  const { title, image, description } = event.target;
  const recipe = {
    title: title.value,
    image: image.value,
    description: description.value,
  };

  fetch("api/recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  })
    // .then((response) => response.json())
    .then(getRecipes);
}

function deleteRecipe(event) {
  fetch(`api/recipes/${event.target.dataset.id}`, {
    method: "DELETE",
  }).then(location.reload());
}

function handleClicks(event) {
  if (event.target.matches("[data-id]")) {
    deleteRecipe(event);
  }
}

document.getElementById("importButton").addEventListener("click", function () {
  fetch("api/import", { method: "POST" })
    .then((response) => {
      if (response.ok) {
        alert("Recipes imported successfully!");
        getRecipes();
      } else {
        alert("Failed to import recipes.");
      }
    })
    .catch((error) => alert("Error: " + error.message));
});

document.getElementById("killAllButton").addEventListener("click", function () {
  if (confirm("Are you sure you want to delete all recipes?")) {
    fetch("api/killall", { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          alert("All recipes deleted successfully!");
          getRecipes();
        } else {
          alert("Failed to delete recipes.");
        }
      })
      .catch((error) => alert("Error: " + error.message));
  }
});

document.addEventListener("click", handleClicks);

const addForm = document.querySelector("#addForm");
addForm.addEventListener("submit", addRecipe);

getRecipes();
