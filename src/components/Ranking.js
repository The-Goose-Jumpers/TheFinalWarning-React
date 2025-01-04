import React, { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

function Rankings() {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const rankingsRef = collection(db, "rankings");
        const q = query(rankingsRef, orderBy("score", "desc"), limit(10));
        const querySnapshot = await getDocs(q);

        const fetchedRankings = [];
        querySnapshot.forEach((doc) => {
          fetchedRankings.push(doc.data());
        });

        setRankings(fetchedRankings);
      } catch (error) {
        console.error("Error fetching rankings:", error);
      }
    };

    fetchRankings();
  }, []);

  return (
    <div className="rankings">
      <h2>Top 10 Rankings</h2>
      <ul>
        {rankings.map((entry, index) => (
          <li key={index}>
            {index + 1}. {entry.name}: {entry.score} ({entry.date})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rankings;
