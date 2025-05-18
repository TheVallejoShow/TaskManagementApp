const firestoreTimestampToDate = (timestamp) => {
  if (!timestamp) return null;
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  return date.toLocaleDateString();
};

export default firestoreTimestampToDate;