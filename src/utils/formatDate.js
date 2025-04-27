const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate(); // Firestore Timestamp를 JS Date로 변환
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작해서 +1 필요
    const day = date.getDate();
    return `${year}.${month}.${day}`;
  }

export default formatDate;