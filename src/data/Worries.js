function Worries({ playerTraits }) {
    return (
        <div className="worries">
            <div className="worries-title">Worries:</div>
            <div className="worries-list">
                {playerTraits.hasPets && (
                    <div className="worries-item">
                        You have pets!
                    </div>
                )}
                {playerTraits.hasElderyNeighbors && (
                    <div className="worries-item">
                        You seem to have elderly neighbors that helped you in the past.
                    </div>
                )}
                {playerTraits.hasFamilyMemberCantEvacuate && (
                    <div className="worries-item">
                        You have a family member who can't evacuate!
                    </div>
                )}
                {playerTraits.hasExpensiveItems && (
                    <div className="worries-item">
                        You have expensive belongings that seem to be very special to you.
                    </div>
                )}
                {!playerTraits.hasChildren &&
                    !playerTraits.hasPets &&
                    !playerTraits.hasElderyNeighbors &&
                    !playerTraits.hasFamilyMemberCantEvacuate &&
                    !playerTraits.hasExpensiveItems && (
                        <div className="worries-item">
                            You seem to be worry-free! You don't have responsibilities
                            for another living being or belongings!
                        </div>
                    )}
            </div>
        </div>
    );
}

export default Worries;