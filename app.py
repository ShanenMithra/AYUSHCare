from flask import Flask, render_template, request
import json

app = Flask(__name__)

# Disease-Symptom Mapping (This should include all the diseases and their symptoms)
disease_symptoms = {
    "Common Cold": ["runny nose", "sneezing", "sore throat", "mild cough", "congestion", "low-grade fever"],
    "Cough": ["persistent coughing", "chest tightness", "mucus production", "sore throat"],
    "Fever": ["elevated body temperature", "chills", "sweating", "fatigue", "headaches"],
    "Migraine": ["severe headache", "nausea", "sensitivity to light", "blurred vision"],
    "Asthma": ["shortness of breath", "wheezing", "coughing", "chest tightness", "difficulty breathing"],
    "Arthritis": ["joint pain", "swelling", "stiffness", "reduced range of motion"],
    "Hypertension": ["headaches", "dizziness", "shortness of breath", "nosebleeds"],
    "Diabetes": ["frequent urination", "excessive thirst", "fatigue", "blurred vision", "slow-healing sores"],
    "Psoriasis": ["red, scaly patches on skin", "itching", "dry skin", "cracks that may bleed"],
    "Obesity": ["excessive body fat", "difficulty losing weight", "shortness of breath", "fatigue"],
    "Indigestion": ["bloating", "nausea", "belching", "abdominal discomfort", "acid reflux"],
    "Insomnia": ["difficulty falling asleep", "waking up frequently during the night", "daytime fatigue"],
    "Depression and Anxiety": ["persistent sadness", "irritability", "lack of interest", "restlessness", "fatigue", "trouble concentrating"],
    "Acid Reflux": ["heartburn", "chest pain", "regurgitation of food or acid", "sore throat"],
    "Eczema": ["red, itchy patches of skin", "dryness", "inflammation", "cracking"],
    "Osteoarthritis": ["joint pain", "stiffness", "swelling", "decreased flexibility in joints"],
    "Menstrual Disorders": ["irregular periods", "painful periods", "heavy bleeding", "missed periods"],
    "Urinary Tract Infections (UTIs)": ["painful urination", "frequent urge to urinate", "cloudy or strong-smelling urine", "lower abdominal pain"],
    "Sinusitis": ["nasal congestion", "facial pain", "pressure around eyes", "postnasal drip"],
    "Chronic Fatigue Syndrome": ["persistent fatigue", "trouble sleeping", "muscle and joint pain", "headaches", "difficulty concentrating"],
}

# Helper function to match symptoms with diseases and score them
def get_disease_prediction(selected_symptoms):
    disease_scores = {}

    # Iterate through all diseases and calculate match score
    for disease, symptoms in disease_symptoms.items():
        match_count = len(set(selected_symptoms).intersection(symptoms))
        disease_scores[disease] = match_count

    # Sort diseases by score (high to low)
    sorted_diseases = sorted(disease_scores.items(), key=lambda x: x[1], reverse=True)

    # If the highest score is 0, return "No disease found matching the symptoms"
    if sorted_diseases[0][1] == 0:
        return "No disease found matching the symptoms."

    # Return the disease with the highest match score
    return sorted_diseases[0]

@app.route("/", methods=["GET", "POST"])
def index():
    predicted_disease = None
    if request.method == "POST":
        selected_symptoms = request.form.getlist("symptoms")
        predicted_disease = get_disease_prediction(selected_symptoms)

    return render_template("index.html", predicted_disease=predicted_disease)

if __name__== "__main__":
    app.run(debug=True, host='127.0.0.1', port=5001)