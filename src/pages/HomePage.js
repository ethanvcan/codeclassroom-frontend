import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <img src="/logo.png" alt="Logo" className="home-logo" />
        <h1 className="home-title">CodingCampus</h1>
        <div className="home-buttons">
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-text">
          <h2>Empower the next generation of coders</h2>
          <p>CodingCampus lets teachers assign coding problems and students solve, run, and submit code — all in one platform. </p>
        </div>
        <img src="/image2.jpg" alt="Kid Coding" className="hero-image-placeholder" />
      </section>

      <section className="features-section">
        <h2>Why CodingCampus?</h2>
        <div className="features-grid">
          <div className="feature-card fade-in">
            <h3>Live Code Editor &#128187;</h3>
            <p>Write, run, and debug code directly in the browser with real-time feedback.</p>
          </div>
          <div className="feature-card fade-in delay-1">
            <h3>Instant Feedback ✍</h3>
            <p>Run test cases and get output comparisons instantly to improve learning.</p>
          </div>
          <div className="feature-card fade-in delay-2">
            <h3>Easy Classroom Management 👩🏻‍🏫</h3>
            <p>Teachers can create classrooms, assignments, and track submissions effortlessly.</p>
          </div>
        </div>
      </section>

      <section className="instructions-section">
        <h2>How It Works</h2>
        <div className="instructions-grid">
          <div className="instruction-card">
            <h3>For Students 👨‍🎓</h3>
            <ul>
              <li>Join a class using a classroom code from your teacher.</li>
              <li>View a list of assignments within the class.</li>
              <li>Write your solution using the built-in code editor.</li>
              <li>Run your code to check the output.</li>
              <li>Submit only when your code passes the expected output.</li>
            </ul>
          </div>
          <div className="instruction-card">
            <h3>For Teachers 👩‍🏫</h3>
            <ul>
              <li>Create multiple classrooms for different courses.</li>
              <li>Add assignments to each classroom.</li>
              <li>View each student’s code submissions by assignment.</li>
              <li>Remove students or delete assignments as needed.</li>
            </ul>
          </div>
        </div>
      </section>


      <section className="footer-section">
        <p>&copy; {new Date().getFullYear()} CodingCampus. Built for students and teachers.</p>
      </section>
    </div>
  );
};

export default HomePage;
