import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TeacherSubmissionsPage.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TeacherSubmissionsPage = () => {
  const { id } = useParams(); // assignmentId
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get(`https://codeclassroom-backend.onrender.com/submissions/by-assignment/${id}`);
        setSubmissions(res.data);
      } catch (err) {
        console.error('Error fetching submissions:', err);
      }
    };

    fetchSubmissions();
  }, [id]);

  const handleGradeChange = (index, field, value) => {
    const updated = [...submissions];
    updated[index].grade = {
      ...updated[index].grade,
      [field]: value
    };
    setSubmissions(updated);
  };

  const handleSubmitGrade = async (submissionId, grade, index) => {
    try {
      await axios.patch(`https://codeclassroom-backend.onrender.com/submissions/${submissionId}/grade`, grade);
      toast.success('Grade saved!');
    } catch (err) {
      console.error('Error saving grade:', err);
      toast.success('Failed to save grade.');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="submissions-container">
      <ToastContainer />
      <div className="dashboard-header">
        <img src="/logo.png" alt="Logo" className="dashboard-logo" />
        <h1 className="dashboard-title">CodingCampus</h1>
      </div>
      <div className="back-button-container">
        <button className="back-button" onClick={handleBack}>← Back to Classroom</button>
      </div>
      <div className="submissions-content">
        <h2 className="submissions-title">Submissions</h2>
        {submissions.length === 0 ? (
          <p className="empty-text">No submissions yet.</p>
        ) : (
          submissions.map((s, idx) => (
            <div key={s._id} className="submission-card">
              <strong>{s.student?.username || 'Unknown Student'}</strong>
              <pre className="submission-code">{s.code}</pre>
              <p><b>Output:</b> {s.output || '(no output)'}</p>

              <div className="grading-controls">
                <label>
                  <input
                    type="checkbox"
                    checked={s.grade?.status === 'correct'}
                    onChange={() =>
                      handleGradeChange(idx, 'status', s.grade?.status === 'correct' ? 'none' : 'correct')
                    }
                  />
                  ✅ Correct
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={s.grade?.status === 'incorrect'}
                    onChange={() =>
                      handleGradeChange(idx, 'status', s.grade?.status === 'incorrect' ? 'none' : 'incorrect')
                    }
                  />
                  ❌ Try Again Please
                </label>
              </div>
              <div className="grade-actions">
                <textarea
                placeholder="Leave feedback here..."
                value={s.grade?.feedback || ''}
                onChange={(e) => handleGradeChange(idx, 'feedback', e.target.value)}
                className="feedback-box"
              />

                <button
                  className="submit-grade-button"
                  onClick={() =>
                    handleSubmitGrade(s._id, {
                      status: s.grade?.status || 'none',
                      feedback: s.grade?.feedback || ''
                    }, idx)
                  }
                >
                  Submit Grade
                </button></div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeacherSubmissionsPage;
