'use client'

import { useState } from 'react';
import { CommentForm } from './CommentForm';
import CommentList from './CommentList';

// 댓글 컴포넌트
export default function Comment({ boardId }) {


    const [refreshKey, setRefreshKey] = useState(0);

    // 댓글이 추가되었을 때 호출되는 함수
    const handleCommentAdded = () => {
        setRefreshKey(prev => prev + 1); // 키를 변경하여 CommentList 재렌더링
    };

    return (
        <div>
            {/* 댓글 작성 */}
            <CommentForm boardId={boardId} onCommentAdded={handleCommentAdded} />

            {/* 댓글 목록 */}
            <CommentList 
                boardId={boardId} 
                onCommentAdded={handleCommentAdded}
                refreshKey={refreshKey}
            />
        </div>
    );
}
