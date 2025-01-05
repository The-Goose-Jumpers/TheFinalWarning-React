import React, { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

function Rankings() {
  const [rankings, setRankings] = useState([]);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsFadingIn(false);
    }, 1500); // Match the duration of the fade-in animation

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
        <h2 className="rankings-title">Top 10 Rankings</h2>
        <div className={`rankings-list ${isFadingOut ? "fade-out" : ""}`}>
          {rankings.map((entry, index) => (
              <div className="rankings-rank" key={index}>
                {index + 1}. {entry.name}: {entry.score} ({entry.date})
              </div>
          ))}
        </div>
        {isFadingOut && <div className="fade-out-overlay"></div>}
        {isFadingIn && <div className="fade-in-overlay"></div>}
      </div>
  );
}

export default Rankings;
