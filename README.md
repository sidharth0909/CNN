Disaster Management System

Overview

The Disaster Management System is a comprehensive application designed to aid in disaster preparedness, response, and recovery efforts. It integrates advanced machine learning models for image classification, real-time data analysis, and resource allocation, providing a robust platform for managing crises effectively.

Key Features

Image Classification: Utilizes Convolutional Neural Networks (CNNs) to classify disaster images (e.g., damaged buildings) with 94% accuracy.

Real-time Data Analysis: Processes and analyzes data from various sources (e.g., social media, sensors) to assess disaster impact and prioritize response actions.

Resource Allocation: Optimizes resource deployment based on predictive analytics and real-time demands.

Chatbot Integration: Provides a responsive chatbot for real-time updates, FAQs, and emergency assistance.

Twitter Scraping: Gathers and analyzes tweets to gauge public sentiment and enhance situational awareness.

Functional Components

1. Classification

CNN Model: Trained to classify images into categories (e.g., damaged vs. undamaged buildings).

2. Response Management

Real-time Analysis: Monitors incoming data streams to assess the severity and scope of disasters.

Resource Optimization: Allocates resources (e.g., personnel, equipment) based on predictive models and current needs.

3. Education and Awareness

Chatbot: Offers real-time information, emergency contacts, and FAQs to the public.

Twitter Integration: Analyzes tweets for sentiment analysis and public feedback.

Installation and Setup

Prerequisites

Python 3.x

Virtual environment (optional but recommended)

Setup

Clone the repository:

git clone https://github.com/yourusername/disaster-management-system.git
cd disaster-management-system

Install dependencies:

pip install -r requirements.txt

Run the application:

# Example command to run the CNN model
python classification/cnn_model.py

Additional Notes

Data Privacy: Ensure compliance with data protection regulations when handling sensitive information.

Scalability: Consider scaling models and resources for handling larger disasters or increased data volumes.

Contributing: Contributions are welcome! Fork the repository, make your changes, and submit a pull request.

License

This project is licensed under the MIT License - see the LICENSE file for details.

Contact

For questions or collaborations, please contact Sidharth Saholiya at your-email@example.com.

To start type -> npm run dev
for python file -> python file.py



twitter api -> https://developer.x.com/en/portal/dashboard
5001 port for twitter
5000 port for classification
