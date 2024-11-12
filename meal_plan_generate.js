const OPENAI_API_KEY = 'proj-uUVFjkaqfD2p2swV2NI0dCShNo_XDlShuU4T_GvWBb1dbF4nV3JkC5wfK_q2VUrEKjCuMsS-HnT3BlbkFJ5mtgpPWLW0c93oYDBrWiqz5RxG6EzPPoFrEG5jjZKz3_XElqJ5EiAwO741Q8MrwtwusiLAufQA';  // Replace with your actual API key

async function generateMealPlan() {
    const calories = document.getElementById('calories').value || '2000';
    const dietType = document.getElementById('dietType').value;
    const dietPreferences = document.getElementById('dietPreferences').value;

    // API prompt creation
    const prompt = `Generate a meal plan with approximately ${calories} calories for a ${dietType} diet. Dietary preferences: ${dietPreferences}. Include breakfast, lunch, dinner, and snacks if needed.`;

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "text-davinci-003",  // or try "gpt-3.5-turbo"
                prompt: prompt,
                max_tokens: 200,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const mealPlan = data.choices[0].text;

        // Display the generated meal plan
        document.getElementById('nutrition-values').innerText = mealPlan;
    } catch (error) {
        console.error('Error generating meal plan:', error);
        document.getElementById('nutrition-values').innerText = 'An error occurred. Please try again.';
    }
}

// To keep data persistent on page refresh using Local Storage
window.addEventListener('load', () => {
    const storedCalories = localStorage.getItem('calories');
    const storedDietType = localStorage.getItem('dietType');
    const storedPreferences = localStorage.getItem('dietPreferences');

    if (storedCalories) document.getElementById('calories').value = storedCalories;
    if (storedDietType) document.getElementById('dietType').value = storedDietType;
    if (storedPreferences) document.getElementById('dietPreferences').value = storedPreferences;
});

// Store data when changes are made
document.getElementById('calories').addEventListener('input', (e) => {
    localStorage.setItem('calories', e.target.value);
});

document.getElementById('dietType').addEventListener('change', (e) => {
    localStorage.setItem('dietType', e.target.value);
});

document.getElementById('dietPreferences').addEventListener('change', (e) => {
    localStorage.setItem('dietPreferences', e.target.value);
});
