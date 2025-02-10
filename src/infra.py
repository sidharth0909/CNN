# from flask import Flask, request, render_template
# import tensorflow as tf
# from tensorflow.keras.models import load_model
# from tensorflow.keras.preprocessing import image
# from PIL import Image
# import numpy as np
# from flask_cors import CORS


# app = Flask(__name__)
# CORS(app)
# app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024
# # Load the saved model
# infra = load_model('./infra.keras')

# # Define class labels
# class_labels = {
#     0: 'Damaged Infrastructure',
#     1: 'Undamaged Infrastructure'
# }

# # Define additional information about the predicted class
# class_info = {
#     "Damaged Infrastructure": "Damaged infrastructure during and after a disaster can create conditions of further vulnerability for people, as it may reduce access to certain resources or income-generating activities, making them less resilient to new and emerging risks¹. For instance, construction sites are at higher risk than regular commercial properties during disaster times for a number of reasons.",
    
#     'Undamaged Infrastructure': 'This class represents areas where there has been no damage to infrastructure during a disaster.'
# }

# # Define a route for the home page
# @app.route('/')
# def home():
#     return render_template('index.html')

# # Define a route for prediction
# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         # Get the image file from the request
#         file = request.files['image']

#         # Open the image using Pillow (PIL)
#         img = Image.open(file)
#         img = img.resize((64, 64))  # Resize to the model's input size
#         img_array = image.img_to_array(img)
#         img_array = np.expand_dims(img_array, axis=0)
#         img_array = img_array / 255

#         # Make a prediction
#         prediction = infra.predict(img_array)
#         predicted_class = np.argmax(prediction)
#         predicted_label = class_labels.get(predicted_class, 'Unknown')

#         # Add the information to the result dictionary
#         result = {
#             'class': predicted_label,
#             'info': class_info.get(predicted_label, 'No additional information available.')
#         }

#         # Print the result in the terminal
#         print("Prediction Result:", result)

#         return result

#     except Exception as e:
#         # Print the error in the terminal
#         print("Error:", e)

#         return str(e)

# if __name__ == '__main__':
#     app.run(debug=True)




