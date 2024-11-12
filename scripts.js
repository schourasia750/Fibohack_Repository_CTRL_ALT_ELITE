// Replace with your actual OpenAI API key (only use on server side for security)
const openAI_API_KEY = "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";

// Function to generate a personalized meal plan using OpenAI API
async function generateMealPlan() {
    const mealPlanResult = document.getElementById("mealPlanResult");
    const prompt = "Generate a healthy meal plan for a day, including breakfast, lunch, dinner, and snacks.";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${openAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",  // Use the correct model
                messages: [{ role: "user", content: prompt }], // Format for the chat-based API
                max_tokens: 150,
                temperature: 0.7
            })
        });

        const data = await response.json();
        const aiResponse = data.choices[0].text.trim();

        // Display the AI-generated meal plan
        mealPlanResult.innerHTML = `<h3>AI-Generated Meal Plan:</h3><p>${aiResponse.replace(/\n/g, '<br>')}</p>`;
    } catch (error) {
        console.error("Error generating meal plan:", error);
        mealPlanResult.innerHTML = "<p>Sorry, there was an error generating your meal plan. Please try again later.</p>";
    }
}

// Event listener for the "Generate Meal Plan" button
document.getElementById("generateMealPlanButton").addEventListener("click", generateMealPlan);

// BMI Calculator with AI-based health advice
async function calculateBMI() {
    const height = parseFloat(document.getElementById("height").value) / 100; // Convert to meters
    const weight = parseFloat(document.getElementById("weight").value);
    const bmiResult = document.getElementById("bmiResult");

    if (!height || !weight) {
        bmiResult.textContent = "Please enter both height and weight.";
        return;
    }

    const bmi = (weight / (height * height)).toFixed(2);
    let healthAdvice;

    try {
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${openAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: `Provide health advice for BMI of ${bmi}.`,
                max_tokens: 100,
                temperature: 0.7
            })
        });

        const data = await response.json();
        healthAdvice = data.choices[0].text.trim();

    } catch (error) {
        console.error("Error generating health advice:", error);
        healthAdvice = "Sorry, there was an error generating your health advice. Please try again later.";
    }

    bmiResult.innerHTML = `<h3>Your BMI: ${bmi}</h3><p>${healthAdvice}</p>`;
}

// Generate custom plan based on diet type with AI insights
async function generateCustomPlan() {
    const dietType = document.getElementById("diet").value;
    const mealPlanResult = document.getElementById("mealPlanResult");
    const prompt = `Generate a custom meal plan for a ${dietType} diet.`;

    try {
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${openAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 150,
                temperature: 0.7
            })
        });

        const data = await response.json();
        const aiResponse = data.choices[0].text.trim();

        // Display the AI-generated custom meal plan
        mealPlanResult.innerHTML = `<h3>${dietType.charAt(0).toUpperCase() + dietType.slice(1)} Plan:</h3><p>${aiResponse.replace(/\n/g, '<br>')}</p>`;
    } catch (error) {
        console.error("Error generating custom meal plan:", error);
        mealPlanResult.innerHTML = "<p>Sorry, there was an error generating your custom meal plan. Please try again later.</p>";
    }
}
