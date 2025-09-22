import React from 'react';
import styled from 'styled-components';

const WebsiteFooterContainer = styled.footer`
  background: #2c3e50;
  color: white;
  padding: 40px 0 20px 0;
  margin-top: 60px;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterTopCompact = styled.div`
  border-bottom: 1px solid #34495e;
  padding-bottom: 20px;
  margin-bottom: 30px;
`;

const CompanyInfoLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;
  font-size: 14px;
  line-height: 1.6;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const FooterLogo = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #3498db;
  margin: 0;
`;

const Divider = styled.span`
  color: #7f8c8d;
  font-weight: 300;
`;

const FooterBottomCompact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const FooterLinksCompact = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const LinkGroup = styled.div`
  h5 {
    font-size: 16px;
    font-weight: 600;
    color: #ecf0f1;
    margin: 0 0 15px 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 8px;
  }

  a {
    color: #bdc3c7;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;

    &:hover {
      color: #3498db;
    }

    &.important-link {
      color: #e74c3c;
      font-weight: 500;
    }
  }
`;

const FooterCopyright = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 30px;
  padding-top: 20px;
  border-top: 1px solid #34495e;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const CopyrightLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Copyright = styled.p`
  font-size: 14px;
  color: #95a5a6;
  margin: 0;
`;

const Certifications = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const CertBadge = styled.span`
  background: #27ae60;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

const CopyrightRight = styled.div`
  flex: 1;
  max-width: 500px;
`;

const Disclaimer = styled.p`
  font-size: 12px;
  color: #95a5a6;
  line-height: 1.5;
  margin: 0;
`;

const WebsiteFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <WebsiteFooterContainer>
      <FooterContainer>
        {/* 상단 섹션 - 모든 회사정보를 1줄에 나열 */}
        <FooterTopCompact>
          <CompanyInfoLine>
            <FooterLogo>여행대로</FooterLogo>
            <Divider>|</Divider>
            <span>📞 1588-1234</span>
            <Divider>|</Divider>
            <span>📧 support@tripdalro.com</span>
            <Divider>|</Divider>
            <span>상호: (주)여행대로</span>
            <Divider>|</Divider>
            <span>대표: 김여행</span>
            <Divider>|</Divider>
            <span>사업자등록번호: 123-45-67890</span>
            <Divider>|</Divider>
            <span>📍 서울특별시 강남구 테헤란로 123, 여행대로빌딩 5층</span>
          </CompanyInfoLine>
        </FooterTopCompact>

        {/* 하단 섹션 - 링크들과 저작권 */}
        <FooterBottomCompact>
          <FooterLinksCompact>
            <LinkGroup>
              <h5>고객지원</h5>
              <ul>
                <li><a href="/faq">자주묻는질문</a></li>
                <li><a href="/notice">공지사항</a></li>
                <li><a href="/contact">문의하기</a></li>
                <li><a href="/guide">이용가이드</a></li>
              </ul>
            </LinkGroup>

            <LinkGroup>
              <h5>정책</h5>
              <ul>
                <li><a href="/terms" className="important-link">이용약관</a></li>
                <li><a href="/privacy" className="important-link">개인정보처리방침</a></li>
                <li><a href="/location">위치기반서비스약관</a></li>
                <li><a href="/refund">취소/환불정책</a></li>
              </ul>
            </LinkGroup>

            <LinkGroup>
              <h5>소셜미디어</h5>
              <ul>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📷 Instagram</a></li>
                <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">📘 Facebook</a></li>
                <li><a href="https://blog.naver.com" target="_blank" rel="noopener noreferrer">📝 Blog</a></li>
                <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">📺 YouTube</a></li>
              </ul>
            </LinkGroup>
          </FooterLinksCompact>

          <FooterCopyright>
            <CopyrightLeft>
              <Copyright>© {currentYear} 여행대로. All rights reserved.</Copyright>
              <Certifications>
                <CertBadge>✓ 관광사업자 등록</CertBadge>
                <CertBadge>✓ 개인정보보호 인증</CertBadge>
              </Certifications>
            </CopyrightLeft>
            <CopyrightRight>
              <Disclaimer>
                여행대로는 통신판매중개자로서 통신판매의 당사자가 아니며, 상품의 예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게 있습니다.
              </Disclaimer>
            </CopyrightRight>
          </FooterCopyright>
        </FooterBottomCompact>
      </FooterContainer>
    </WebsiteFooterContainer>
  );
};

export default WebsiteFooter;
