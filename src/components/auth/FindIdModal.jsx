import React from 'react';
import styled from 'styled-components';

const FindIdModal = ({
  isOpen,
  name,
  phone,
  isLoading,
  isSuccess,
  error,
  foundEmail,
  onNameChange,
  onPhoneChange,
  onSubmit,
  onClose
}) => {
  if (!isOpen) return null;

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/[^\d]/g, '');

    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    } else {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    onPhoneChange(formattedValue);
  };

  return (
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalContainer>
        {!isSuccess ? (
          <>
            <ModalHeader>
              <ModalTitle>아이디 찾기</ModalTitle>
              <ModalSubtitle>
                가입 시 입력하신 이름과 전화번호를 입력하시면<br />
                아이디(이메일)를 찾아드립니다.
              </ModalSubtitle>
            </ModalHeader>

            <ModalForm onSubmit={onSubmit}>
              {error && <ModalErrorMessage>{error}</ModalErrorMessage>}

              <ModalInputGroup>
                <ModalLabel htmlFor="findIdName">이름</ModalLabel>
                <ModalInput
                  type="text"
                  id="findIdName"
                  value={name}
                  onChange={(e) => onNameChange(e.target.value)}
                  placeholder="이름을 입력하세요"
                  required
                  disabled={isLoading}
                  className={error && error.includes('이름') ? 'error' : ''}
                />
              </ModalInputGroup>

              <ModalInputGroup>
                <ModalLabel htmlFor="findIdPhone">전화번호</ModalLabel>
                <ModalInput
                  type="tel"
                  id="findIdPhone"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="010-1234-5678"
                  required
                  disabled={isLoading}
                  className={error && error.includes('전화번호') ? 'error' : ''}
                  maxLength={13}
                />
              </ModalInputGroup>

              <ModalButtons>
                <ModalButton type="button" onClick={onClose} disabled={isLoading}>
                  취소
                </ModalButton>
                <ModalButton type="submit" primary disabled={isLoading}>
                  {isLoading ? (
                    <LoadingSpinner>
                      <span className="spinner"></span>
                      검색 중...
                    </LoadingSpinner>
                  ) : (
                    '아이디 찾기'
                  )}
                </ModalButton>
              </ModalButtons>
            </ModalForm>
          </>
        ) : (
          <SuccessContainer>
            <SuccessTitle>아이디를 찾았습니다</SuccessTitle>
            <SuccessMessage>
              회원님의 아이디(이메일)는<br />
              <strong>{foundEmail}</strong> 입니다.
            </SuccessMessage>
            <SuccessNote>
              로그인 페이지에서 해당 이메일로 로그인하세요.
            </SuccessNote>
            <ModalButtons>
              <ModalButton primary onClick={onClose}>
                확인
              </ModalButton>
            </ModalButtons>
          </SuccessContainer>
        )}
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 10px 0;
`;

const ModalSubtitle = styled.p`
  color: #6c757d;
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ModalInputGroup = styled.div`
  text-align: left;
`;

const ModalLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 600;
  font-size: 14px;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #adb5bd;
  }

  &.error {
    border-color: #dc3545;
  }
`;

const ModalErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  border: 1px solid #fcc;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  ${props => props.primary ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  ` : `
    background: white;
    color: #6c757d;
    border: 2px solid #e9ecef;

    &:hover {
      background: #f8f9fa;
      color: #495057;
    }
  `}
`;

const LoadingSpinner = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SuccessContainer = styled.div`
  text-align: center;
`;

const SuccessTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
`;

const SuccessMessage = styled.p`
  color: #6c757d;
  margin-bottom: 15px;
  font-size: 16px;
  line-height: 1.6;

  strong {
    color: #2c3e50;
    font-weight: 600;
  }
`;

const SuccessNote = styled.p`
  color: #6c757d;
  font-size: 14px;
  margin-bottom: 30px;
`;

export default FindIdModal;
