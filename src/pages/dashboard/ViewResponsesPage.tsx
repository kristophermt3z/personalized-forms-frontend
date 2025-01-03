import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRepliesByForm } from "../../services/replyService";
import "./styles/ViewResponsesPage.css";

interface Reply {
  _id: string;
  userId: { name: string; email: string };
  createdAt: string;
}

const ViewResponsesPage: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReplies = async () => {
      try {
        const token = localStorage.getItem("token") || "";
        const response = await fetchRepliesByForm(formId || "", token);
        setReplies(response.data);
      } catch (error) {
        console.error("Error fetching replies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadReplies();
  }, [formId]);

  if (loading) return <div className="view-responses-loading">Loading responses...</div>;

  return (
    <div className="view-responses-container">
      <h1>Responses for Form</h1>
      <table className="view-responses-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date Submitted</th>
            <th>View Answer</th>
          </tr>
        </thead>
        <tbody>
          {replies.length > 0 ? (
            replies.map((reply) => (
              <tr key={reply._id}>
                <td className="name-cell" data-name={reply.userId.name}>
                  {reply.userId.name}
                </td>
                <td className="email-cell" data-email={reply.userId.email}>
                  {reply.userId.email}
                </td>
                <td>{new Date(reply.createdAt).toLocaleString()}</td>
                <td>
                  <button className="view-answer-btn" aria-label="View Answer">
                    🔍
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No responses found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewResponsesPage;
