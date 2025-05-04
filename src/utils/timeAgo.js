const timeAgo = (uploadTime) => {
    const now = new Date();
    const createdAt = new Date(uploadTime.seconds * 1000);
    const diffMs = now - createdAt; // 밀리초 차이
    const diffSec = Math.floor(diffMs / 1000); // 초 차이
    const diffMin = Math.floor(diffSec / 60); // 분 차이
    const diffHour = Math.floor(diffMin / 60); // 시간 차이
    const diffDay = Math.floor(diffHour / 24); // 일 차이

    if (diffSec < 60) {
        return '방금 전';
    } else if (diffMin < 60) {
        return `${diffMin}분 전`;
    } else if (diffHour < 24) {
        return `${diffHour}시간 전`;
    } else {
        return `${diffDay}일 전`;
    }
}

export default timeAgo;