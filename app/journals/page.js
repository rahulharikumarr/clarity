"use client";

import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function JournalsPage() {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null); // ID of the journal being edited
  const [editContent, setEditContent] = useState(""); // Content for editing

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setError("Please log in to view your journals.");
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "journals"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const fetchedJournals = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJournals(fetchedJournals);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching journals:", err);
        setError("Failed to fetch your journals. Please try again later.");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (id, content) => {
    setEditing(id);
    setEditContent(content);
  };

  const saveEdit = async (id) => {
    try {
      const journalRef = doc(db, "journals", id);
      await updateDoc(journalRef, { content: editContent });
      setJournals((prev) =>
        prev.map((journal) =>
          journal.id === id ? { ...journal, content: editContent } : journal
        )
      );
      setEditing(null);
      setEditContent("");
    } catch (err) {
      console.error("Error updating journal:", err);
      setError("Failed to update the journal entry.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const journalRef = doc(db, "journals", id);
      await deleteDoc(journalRef);
      setJournals((prev) => prev.filter((journal) => journal.id !== id)); //keeps all the elements except the current one being deleted in the actual database.
    } catch (err) {
      console.error("Error deleting journal:", err);
      setError("Failed to delete the journal entry.");
    }
  };

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Your Journal Entries
      </h1>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {journals.length === 0 ? (
          <p className="text-center text-gray-600">No journal entries found.</p>
        ) : (
          <ul className="space-y-4">
            {journals.map((journal) => (
              <li
                key={journal.id}
                className="p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition"
              >
                {editing === journal.id ? (
                  <div>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={3}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    ></textarea>
                    <div className="flex items-center justify-end mt-2">
                      <button
                        onClick={() => saveEdit(journal.id)}
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditing(null)}
                        className="ml-2 px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-800">{journal.content}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(journal.timestamp.seconds * 1000).toLocaleString()}
                    </p>
                    <div className="flex items-center justify-end mt-2">
                      <button
                        onClick={() => handleEdit(journal.id, journal.content)}
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(journal.id)}
                        className="ml-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
