import React from "react";
import "../Ready.css";

const HeatwavesReady = () => {
  return (
    <div className="mt-28 app-container">
      <header>
        <h1>Heatwave Response Plan</h1>
      </header>

      <section className="section">
        <h2>Immediate Safety Measures:</h2>
        <ul>
          <li>Stay indoors during peak heat hours and avoid direct sunlight.</li>
          <li>Drink plenty of water to stay hydrated.</li>
        </ul>
      </section>

      <section className="section-ready">
        <h2>Cooling Centers and Hydration:</h2>
        <ul>
          <li>Identify and set up cooling centers for vulnerable populations.</li>
          <li>Distribute water and electrolytes to prevent dehydration.</li>
        </ul>
      </section>

      <section className="section-ready">
        <h2>Public Awareness:</h2>
        <ul>
          <li>Broadcast heatwave warnings through TV, radio, and social media.</li>
          <li>Educate communities on recognizing heat-related illnesses.</li>
        </ul>
      </section>

      <section className="section-ready">
        <h2>Health and Medical Preparedness:</h2>
        <ul>
          <li>Train healthcare workers to handle heatstroke and dehydration cases.</li>
          <li>Ensure hospitals and clinics are equipped with cooling systems.</li>
        </ul>
      </section>

      <section className="section-ready">
        <h2>Infrastructure Resilience:</h2>
        <ul>
          <li>Use heat-resistant building materials to reduce indoor temperatures.</li>
          <li>Increase green spaces and tree cover to mitigate urban heat islands.</li>
        </ul>
      </section>

      <section className="section-ready">
        <h2>Power and Water Supply Management:</h2>
        <ul>
          <li>Ensure power grids can handle increased demand for air conditioning.</li>
          <li>Manage water supply to prevent shortages during prolonged heatwaves.</li>
        </ul>
      </section>

      <section className="section-ready">
        <h2>Community Support and Assistance:</h2>
        <ul>
          <li>Check on elderly and vulnerable individuals regularly.</li>
          <li>Provide emergency cooling kits for those without air conditioning.</li>
        </ul>
      </section>

      <section className="section-ready">
        <h2>Long-Term Climate Adaptation:</h2>
        <ul>
          <li>Develop heatwave action plans for cities and rural areas.</li>
          <li>Invest in climate-resilient infrastructure and policies.</li>
        </ul>
      </section>
    </div>
  );
};

export default HeatwavesReady;
