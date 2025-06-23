'use client'

import { useState, useEffect } from 'react';
import { ReplyForm } from "./CommentForm";
import Button from "@/app/components/ui/Button";


// 서버에서 댓글 가져오는 함수
async function getComments(boardId) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`${apiUrl}comment/board/${boardId}`, {cache: "no-store"});
        const data = await res.json();
        
        if(!res.ok) {
            throw new Error("댓글을 불러올 수 없습니다");
        }
        return data;
    } catch (e) {
        throw new Error("서버에서 댓글을 불러올 수 없습니다.");
    }
}

// 댓글 삭제
async function deleteComment(commentId) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        await fetch(`${apiUrl}comment/delete/${commentId}`, {
            method: 'DELETE'
        });
    } catch (e) {
       
    }
}

// 일반 댓글만 찾기 (parentId가 null인 댓글들)
function findParentComments(allComments) {
    return allComments.filter(comment => comment.parentId === null);
}

// 특정 댓글의 모든 답글들 찾기 (parentId가 해당 댓글ID인 것들)
function findAllReplies(allComments, parentCommentId) {
    return allComments.filter(comment => comment.parentId === parentCommentId);
}

// 댓글 보여주는 컴포넌트 (일반댓글이든 대댓글이든 똑같이)
function CommentItem({ comment, boardId, onCommentAdded, onCommentDeleted, allComments }) {
    
    async function handleDelete() {
        await deleteComment(comment.commentId);
        onCommentDeleted();
    }

    return (
        <div>
            {comment.parentId && (
                <p>→ {comment.parentId} 의 답글입니다</p>
            )}
            <p>댓글ID: {comment.commentId}</p>
            <p>작성자: {comment.name}</p>
            <p>내용: {comment.content}</p>
            
            <Button 
                onClick={handleDelete}
                text="삭제"
            />
            <br/>
            
            <ReplyForm 
                boardId={boardId} 
                parentCommentId={comment.commentId} 
                onCommentAdded={onCommentAdded}
            />
            
            {/* 이 댓글의 답글들 보여주기 */}
            {findAllReplies(allComments, comment.commentId).map((reply) => (
                <CommentItem
                    key={reply.commentId}
                    comment={reply}
                    boardId={boardId}
                    onCommentAdded={onCommentAdded}
                    onCommentDeleted={onCommentDeleted}
                    allComments={allComments}
                />
            ))}
        </div>
    );
}

// 댓글 목록 컴포넌트
export default function CommentList({ boardId, onCommentAdded, refreshKey }) {
    const [allComments, setAllComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 댓글 데이터 불러오기
    const loadComments = async () => {
        try {
            setLoading(true);
            setError(null);
            const comments = await getComments(boardId);
            setAllComments(comments);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // 댓글이 삭제되었을 때 호출되는 함수
    const handleCommentDeleted = () => {
        loadComments(); // 댓글 목록 새로고침
    };

    // 페이지 로드될 때와 refreshKey 바뀔 때 댓글 불러오기
    useEffect(() => {
        loadComments();
    }, [boardId, refreshKey]);

    // 일반 댓글들만 가져오기 
    const parentComments = findParentComments(allComments);

    return (
        <div>
            <h3>댓글 목록</h3>
            <p>총 {allComments.length}개의 댓글</p>
            <br/>

            <div>
                {parentComments.map((parentComment) => (
                    <div key={parentComment.commentId}>
                        <CommentItem
                            comment={parentComment}
                            boardId={boardId}
                            onCommentAdded={onCommentAdded}
                            onCommentDeleted={handleCommentDeleted}
                            allComments={allComments}
                        />
                        <br/>
                    </div>
                ))}
            </div>

            {allComments.length === 0 && (
                <p>아직 댓글이 없습니다.</p>
            )}
        </div>
    );
} 