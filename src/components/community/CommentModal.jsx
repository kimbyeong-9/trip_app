import React from 'react';
import styled from 'styled-components';

const CommentModal = ({
  isOpen,
  onClose,
  comments,
  newComment,
  setNewComment,
  onSubmitComment
}) => {
  if (!isOpen) return null;

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmitComment();
    }
  };

  return (
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>댓글</ModalTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>

        <CommentList>
          {comments.map(comment => (
            <Comment key={comment.id}>
              <CommentAuthor>{comment.author}</CommentAuthor>
              <CommentText>{comment.text}</CommentText>
            </Comment>
          ))}
        </CommentList>

        <CommentInput>
          <CommentTextarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
            onKeyPress={handleKeyPress}
          />
          <CommentSubmitButton
            onClick={onSubmitComment}
            disabled={!newComment.trim()}
          >
            등록
          </CommentSubmitButton>
        </CommentInput>
      </ModalContainer>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
`;

const ModalContainer = styled.div`
  background: white;
  max-width: 500px;
  width: 100%;
  border-radius: 20px;
  padding: 30px;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6c757d;
  cursor: pointer;

  &:hover {
    color: #495057;
  }
`;

const CommentList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const Comment = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const CommentAuthor = styled.div`
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
  margin-bottom: 5px;
`;

const CommentText = styled.div`
  color: #495057;
  font-size: 14px;
  line-height: 1.4;
`;

const CommentInput = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-end;
`;

const CommentTextarea = styled.textarea`
  flex: 1;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 14px;
  resize: none;
  min-height: 40px;
  max-height: 100px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const CommentSubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export default CommentModal;
