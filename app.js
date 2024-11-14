// app.js

document.getElementById('generateBtn').addEventListener('click', generateBusinessNames);

function generateBusinessNames() {
  const businessIdea = document.getElementById('businessIdea').value.trim();
  const industry = document.getElementById('industry').value.trim();

  // Validation to ensure that input fields are filled
  if (!businessIdea || !industry) {
    alert("Please provide both your business idea and industry.");
    return;
  }

  // Split the business idea into words (e.g., split on spaces or commas)
  const ideaWords = businessIdea.split(/[\s,]+/).map(word => word.trim()).filter(Boolean);

  // Generate business names
  const nameList = document.getElementById('nameList');
  nameList.innerHTML = ''; // Clear any previous names

  const generatedNames = generateNames(industry, ideaWords);

  // Display the generated names
  generatedNames.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    nameList.appendChild(li);
  });
}

function generateNames(industry, ideaWords) {
  const suffixes = ["Tech", "Solutions", "Co.", "Group", "Labs", "Studios", "Works", "Ventures", "Creative", "Innovations"];
  const nameList = [];

  // Generate combinations of user ideas and random suffixes
  for (let i = 0; i < 10; i++) {
    const randomIdea = ideaWords[Math.floor(Math.random() * ideaWords.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    const name = `${industry} ${randomIdea} ${randomSuffix}`;
    nameList.push(name);
  }

  return nameList;
}
