from flask import Flask, request, render_template, jsonify
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
import numpy as np
from flask_cors import CORS

# Initialize the Flask app and enable CORS
app = Flask(__name__)
CORS(app)
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # Limit uploads to 50MB

# Load the saved models
cnn_image = load_model('./models/model.h5')  # Image classification model
cnn_infra = load_model('./models/infrastructure_damage_model.h5')  # Infrastructure damage model

# Define class labels and additional information for image classification
class_labels_image = {
    0: 'Damaged Infrastructure',
    1: 'Fire Disaster',
    2: 'Human Damage',
    3: 'Land Disaster',
    4: 'Water Disaster'
}

class_info_image = {
    "Damaged Infrastructure": "Damaged infrastructure during and after a disaster can create conditions of further vulnerability for people, as it may reduce access to certain resources or incomegenerating activities, making them less resilient to new and emerging risks.\n\n"
                              "Impact:\n"
                              " Reduces access to resources and incomegenerating activities, increasing vulnerability.\n"
                              " Construction sites are at higher risk due to the lack of disasterproof structures.\n\n"
                              "Precautions & Points to Remember:\n"
                              " Avoid moving water, regardless of depth or speed.\n"
                              " Do not drive through flooded roads.\n"
                              " Leave your home/building if you hear unusual noises.\n"
                              " Stay away from power lines and report fallen ones to the electric company.\n"
                              " Identify geographic risks and create an emergency plan.\n"
                              " Train team members on disaster response procedures.",

    "Fire Disaster": "Fire disasters can cause significant human damage, including injuries and loss of life.\n\n"
                     "Before a Fire Disaster:\n"
                     " Keep the workplace tidy and remove combustible waste regularly.\n"
                     " Keep ignition sources away from flammable materials.\n"
                     " Prepare an emergency plan with a written evacuation procedure.\n"
                     " Train employees and conduct fire drills at least twice a year.\n\n"
                     "During a Fire Disaster:\n"
                     " Focus on getting out quickly—do not try to save objects.\n"
                     " Never use an elevator; take the stairs.\n"
                     " Stay low to the ground and cover your nose/mouth to avoid smoke inhalation.\n"
                     " Wear protective clothing and close doors/windows to block smoke.\n\n"
                     "After a Fire Disaster:\n"
                     " Call emergency services for medical help.\n"
                     " Contact disaster relief services for temporary housing, food, and medicine.\n"
                     " Check with the fire department before reentering your residence.\n"
                     " Do not attempt to reconnect utilities yourself.",

    "Human Damage": "Represents areas where human life is affected due to a disaster.",

    "Land Disaster": "Land disasters, such as landslides, can cause significant damage to both property and human life.\n\n"
                     "Before a Land Disaster:\n"
                     " Assess soil conditions before construction in landslideprone areas.\n"
                     " Avoid building on steep slopes, drainage ways, or erosionprone zones.\n"
                     " Construct embankments and retaining walls.\n"
                     " Fit flexible gas pipes to prevent leakage.\n"
                     " Get insurance covering landsliderelated damages.\n"
                     " Prepare an emergency supply kit and stay updated with emergency alerts.\n\n"
                     "During a Land Disaster:\n"
                     " Evacuate early if in a landslideprone area.\n"
                     " Watch for unusual ground cracking or rolling stones.\n"
                     " Monitor water streams for sudden color changes or rising water levels.\n"
                     " Stay out of debris paths and watch for roadblocks.\n\n"
                     "After a Land Disaster:\n"
                     " Free the affected person’s head first.\n"
                     " Remove snow and water from their mouth/nose.\n"
                     " Dry them and wrap them in warm clothes/blankets.\n"
                     " Perform CPR or cardiac massage if necessary.\n"
                     " Seek medical help immediately.",

    "Water Disaster": "Water disasters, such as floods, can cause significant damage to both property and human life.\n\n"
                      "Before a Water Disaster:\n"
                      " Know evacuation zones and routes in advance.\n"
                      " Prepare an emergency bag with essentials.\n"
                      " Monitor local media for flood warnings.\n"
                      " Evacuate immediately if officials issue an order.\n\n"
                      "During a Water Disaster:\n"
                      " Stay calm—do not panic.\n"
                      " Avoid moving water, no matter the depth.\n"
                      " Never drive through flooded roads—cars can be swept away.\n"
                      " Follow all safety advisories on road conditions.\n"
                      " Wear a life jacket if working near floodwaters.\n\n"
                      "After a Water Disaster:\n"
                      " Use only safe drinking water—boil or treat water before use.\n"
                      " Avoid contaminated water for any household needs.\n"
                      " Keep surroundings clean with disinfectants.\n"
                      " Cover drain holes to prevent sewage backflow.\n"
                      " Clear debris from the premises and wait for official safety clearance before going outside."
}


# Define class labels and additional information for the infrastructure model
class_labels_infra = {
    0: 'Not Damaged',
    1: 'Damaged'
}

class_info_infra = {
    'Not Damaged': 'Your image assessment indicates that the building is structurally sound. There are no visible signs of damage or deterioration, ensuring the integrity of the structure is intact.\n Regular maintenance is advisable to keep the building in optimal condition. If you have any concerns or wish to conduct further inspections, feel free to reach out. Thank you for using our service',
    
    'Damaged': 'The assessment has revealed that the building has sustained damage, which may require immediate attention. It is essential to conduct a thorough inspection to evaluate the extent of the damage and necessary repairs. \n We recommend consulting a qualified professional to ensure safety and prevent further issues. Your safety is our priority, and we encourage you to take appropriate action based on this assessment. Thank you for trusting us with your evaluation!'
}

# Home page route
@app.route('/')
def home():
    return render_template('index.html')

# Helper function for image preprocessing
def preprocess_image(file, target_size):
    img = Image.open(file).resize(target_size)  # Resize the image
    img_array = image.img_to_array(img)  # Convert to array
    img_array = np.expand_dims(img_array, axis=0) / 255.0  # Normalize and add batch dim
    return img_array

# Route for image prediction
@app.route('/predict_image', methods=['POST'], endpoint='predict_image')
def predict_image():
    try:
        file = request.files['image']
        img_array = preprocess_image(file, (64, 64))

        # Make predictions using the image model
        prediction = cnn_image.predict(img_array)
        predicted_class = np.argmax(prediction)
        predicted_label = class_labels_image.get(predicted_class, 'Unknown')

        result = {
            'class': predicted_label,
            'info': class_info_image.get(predicted_label, 'No additional information available.')
        }

        print("Image Prediction Result:", result)
        return jsonify(result)  # Return JSON response

    except Exception as e:
        print("Error:", e)
        return str(e), 400  # Return error as response

# Route for infrastructure prediction
# Ensure correct preprocessing for the infrastructure model
@app.route('/predict_infra', methods=['POST'], endpoint='predict_infra')
def predict_infra():
    try:
        # Load and preprocess the image
        file = request.files['infrastructure_image']
        img = Image.open(file)

        # Resize to model's expected input size (150x150)
        img = img.resize((150, 150))  # Change to the model's expected size

        # Convert to array and normalize
        img_array = image.img_to_array(img) / 255.0  # Normalize pixel values

        # Add batch dimension
        img_array = np.expand_dims(img_array, axis=0)  # Shape: (1, 150, 150, 3)

        # Debug: Check the shape before prediction
        print(f"Processed Image Shape: {img_array.shape}")

        # Make prediction
        prediction = cnn_infra.predict(img_array)[0][0]  # Get the prediction score
        print(f"Prediction Score: {prediction}")

        # Use a tuned threshold based on observations
        predicted_label = 'Not Damaged' if prediction > 0.5 else 'Damaged'

        result = {
            'damage_class': predicted_label,
            'damage_info': class_info_infra.get(predicted_label, 'No additional information available.')
        }

        print("Infrastructure Prediction Result:", result)
        return jsonify(result)

    except Exception as e:
        print("Error:", e)
        return str(e), 400



# Run the app
if __name__ == '__main__':
    app.run(debug=True)
