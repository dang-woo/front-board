'use client'

import { useState } from 'react';
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";


// 댓글을 서버에 저장하는 함수
async function saveComment(commentData) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`${apiUrl}comment/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData)
        });
        
        if (!res.ok) {
            throw new Error("댓글 저장에 실패했습니다");
        }
        return await res.json();
    } catch (e) {
        throw new Error("댓글을 저장할 수 없습니다.");
    }
}

// 일반 댓글 작성 폼
export function CommentForm({ boardId, onCommentAdded }) {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        
        const commentData = {
            boardId: parseInt(boardId),
            content: content,
            name: name,
            parentId: null
        };
        
        await saveComment(commentData);
        setName('');
        setContent('');
        
        if (onCommentAdded) {
            onCommentAdded();
        }
    }

    return (
        <div>
            <h4>댓글 작성</h4>
            <form onSubmit={handleSubmit}>
                <div>
                    <Input 
                        type="text" 
                        placeholder="작성자 이름" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required 
                    />
                </div>
                <br/>
                <div>
                    <textarea 
                        placeholder="댓글 내용을 입력하세요" 
                        rows="3" 
                        cols="50"
                        className="px-2 py-1 border w-80 rounded text-slate-950"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <br/>
                <Button 
                    type="submit" 
                    text="댓글 작성" 
                />
            </form>
            <br/>
        </div>
    );
}

// 대댓글 작성 폼
export function ReplyForm({ boardId, parentCommentId, onCommentAdded }) {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [showForm, setShowForm] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        
        const commentData = {
            boardId: parseInt(boardId),
            content: content,
            name: name,
            parentId: parentCommentId
        };
        
        await saveComment(commentData);
        setName('');
        setContent('');
        setShowForm(false);
        
        if (onCommentAdded) {
            onCommentAdded();
        }
    }

    return (
        <div>
            {showForm === false && (
                <Button 
                    onClick={() => setShowForm(true)}
                    text="답글 달기"
                />
            )}
            
            {showForm === true && (
                <div>
                    <h5 className="text-sm">대댓글 작성</h5>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Input 
                                type="text" 
                                placeholder="작성자 이름" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required 
                            />
                        </div>
                        <br/>
                        <div>
                            <textarea 
                                placeholder="대댓글 내용을 입력하세요" 
                                rows="2" 
                                cols="40"
                                className="px-2 py-1 border w-80 rounded text-slate-950"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </div>
                        <br/>
                        <Button 
                            type="submit" 
                            text="대댓글 작성" 
                        />
                    </form>
                    <br/>
                </div>
            )}
        </div>
    );
} 