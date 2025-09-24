import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';

// Styled Components
const UserProfilePage = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding-top: 70px;
  padding-bottom: 20px;

  @media (max-width: 1024px) {
    padding-bottom: 100px;
  }
`;

const UserProfileContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

const ProfileContent = styled.div`
  display: grid;
  gap: 30px;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
`;

const ProfileMain = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 32px;
  justify-content: center;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 30px;
  }

  @media (max-width: 480px) {
    gap: 20px;
  }
`;

const ProfileLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const ProfileRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 1024px) {
    width: 100%;
    text-align: center;
    align-items: center;
  }
`;


const ProfileAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: 2px solid #e9ecef;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: white;
  font-weight: 600;
  font-size: 36px;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    border: none;
    box-shadow: none;
  }
`;

const ProfileName = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 16px 0;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const ProfileBio = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: #5a6c7d;
  margin: 0 0 20px 0;
  max-width: 500px;

  @media (max-width: 1024px) {
    max-width: 100%;
    text-align: center;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ProfileMetaInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const ProfileLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6c757d;
  font-size: 15px;
  padding: 6px 12px;
  background: #f8f9fa;
  border-radius: 20px;
  border: 1px solid #e9ecef;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 4px 8px;
  }
`;

const ProfileJoinDate = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6c757d;
  font-size: 15px;
  padding: 6px 12px;
  background: #f8f9fa;
  border-radius: 20px;
  border: 1px solid #e9ecef;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 4px 8px;
  }
`;

const LocationIcon = styled.span`
  font-size: 16px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const JoinIcon = styled.span`
  font-size: 16px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ProfileStats = styled.div`
  display: flex;
  gap: 180px;
  padding: 24px 0;
  border-top: 2px solid #f8f9fa;
  border-bottom: 2px solid #f8f9fa;
  margin-bottom: 32px;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 60px;
    justify-content: center;
  }

  @media (max-width: 480px) {
    gap: 40px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const StatItem = styled.div`
  text-align: center;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  transition: all 0.3s ease;

  &:hover {
    ${props => props.clickable && `
      transform: translateY(-2px);
      color: #667eea;
    `}
  }
`;

const StatNumber = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 4px;

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const StatLabel = styled.div`
  font-size: 15px;
  color: #6c757d;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const CouponSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;
  color: white;
  text-align: center;
`;

const CouponSectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 10px 0;
`;

const CouponCount = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const CouponSectionDescription = styled.p`
  font-size: 14px;
  opacity: 0.9;
  margin: 0;
`;

const FollowModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
`;

const FollowModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  max-width: 400px;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    max-width: 90vw;
    padding: 20px;
    max-height: 85vh;
  }
`;

const FollowModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f8f9fa;
`;

const FollowModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
`;

const FollowModalClose = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6c757d;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #495057;
  }
`;

const FollowList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
  flex: 1;
  padding-right: 5px;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

const FollowItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 12px;
  background: #f8f9fa;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
  }
`;

const FollowAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

const FollowInfo = styled.div`
  flex: 1;
`;

const FollowName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 2px;
`;

const FollowUsername = styled.div`
  font-size: 14px;
  color: #6c757d;
`;

const CouponModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
`;

const CouponModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    max-width: 90vw;
    padding: 20px;
    max-height: 85vh;
  }
`;

const CouponList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
  flex: 1;
  padding-right: 5px;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

const CouponCard = styled.div`
  border: 2px solid #e9ecef;
  border-radius: 15px;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.1);
  }
`;

const CouponHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const CouponTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
`;

const CouponDiscount = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
`;

const CouponDescription = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 8px 0;
  line-height: 1.4;
`;

const CouponFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #e9ecef;
`;

const CouponCode = styled.span`
  font-family: 'Courier New', monospace;
  background: #f8f9fa;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  color: #495057;
  border: 1px solid #e9ecef;
`;

const CouponExpiry = styled.span`
  font-size: 12px;
  color: #dc3545;
  font-weight: 500;
`;

const CouponMinAmount = styled.span`
  font-size: 12px;
  color: #6c757d;
  margin-top: 5px;
  display: block;
`;

const ProfileActions = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`;


const ProfileSections = styled.div`
  display: grid;
  gap: 30px;
`;

const InterestsSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
`;

const RecentTripsSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
`;

const SectionTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #f8f9fa;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const InterestTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const InterestTag = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid #cce7ff;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
`;

const TripCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const TripCard = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #fafbfc;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    background: white;
  }
`;

const TripImage = styled.img`
  width: 100px;
  height: 75px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const TripInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const TripTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 6px 0;
  line-height: 1.3;
`;

const TripMeta = styled.p`
  color: #6c757d;
  font-weight: 500;
  margin: 0;
  font-size: 14px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #6c757d;
  font-size: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px dashed #dee2e6;
`;

const TripManageButtons = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${TripCard}:hover & {
    opacity: 1;
  }
`;

const ManageButton = styled.button`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  &.edit {
    background: #28a745;
    color: white;
  }

  &.delete {
    background: #dc3545;
    color: white;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }
`;

const NotFound = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
`;

const NotFoundTitle = styled.h2`
  font-size: 24px;
  margin: 0 0 15px 0;
`;

const NotFoundMessage = styled.p`
  font-size: 16px;
  margin: 0 0 30px 0;
`;

const NotFoundButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }
`;

const ProfileEditButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin: 16px auto 0;
  display: block;
  width: 150px;
  transition: all 0.3s ease;

  &:hover {
    background: #0056b3;
    transform: translateY(-1px);
  }
`;

// 마이페이지용 스타일 컴포넌트들
const MyPageSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
  margin-bottom: 30px;
`;

const PointsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 20px;
`;

const PointsLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PointsLabel = styled.span`
  font-size: 14px;
  opacity: 0.9;
`;

const PointsValue = styled.span`
  font-size: 24px;
  font-weight: 700;
`;

const MemberLevel = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
`;

const PointsUseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: #495057;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`;

const BookingCard = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  border: 1px solid #e9ecef;
`;

const BookingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const HotelName = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
`;

const Status = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => props.status === '예약완료' ? '#d4edda' : '#d1ecf1'};
  color: ${props => props.status === '예약완료' ? '#155724' : '#0c5460'};
`;

const BookingDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DetailLabel = styled.span`
  font-size: 12px;
  color: #6c757d;
  font-weight: 500;
`;

const DetailValue = styled.span`
  font-size: 14px;
  color: #2c3e50;
  font-weight: 600;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  &.primary {
    background: #007bff;
    color: white;
  }

  &.secondary {
    background: #6c757d;
    color: white;
  }

  &:hover {
    transform: translateY(-1px);
  }
`;

const FavoriteCard = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 12px;
  border: 1px solid #e9ecef;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const FavoriteImage = styled.img`
  width: 80px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
`;

const FavoriteInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FavoriteName = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 4px 0;
`;

const FavoriteLocation = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0 0 4px 0;
`;

const FavoritePrice = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #007bff;
`;

const InterestedTripCard = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 12px;
  border: 1px solid #e9ecef;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const InterestedTripImage = styled.img`
  width: 80px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
`;

const InterestedTripInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InterestedTripTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 4px 0;
`;

const InterestedTripMeta = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0;
`;

const TripAuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #e9ecef;
`;

const TripAuthorAvatar = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TripAuthorName = styled.span`
  font-size: 12px;
  color: #6c757d;
  font-weight: 500;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin: 20px 0;
`;

const FollowButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }

  &.following {
    background: #e9ecef;
    color: #6c757d;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 12px 24px;
  }
`;

const MessageButton = styled.button`
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 12px 24px;
  }
`;

const UserPostsSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
`;

const PostsSectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 20px 0;
  text-align: center;
`;

const PostTabs = styled.div`
  display: flex;
  border-bottom: 2px solid #f8f9fa;
  margin-bottom: 20px;
`;

const PostTab = styled.button`
  flex: 1;
  padding: 15px 20px;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  color: #6c757d;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;

  &.active {
    color: #667eea;
    border-bottom-color: #667eea;
  }

  &:hover {
    color: #667eea;
  }
`;

const PostsList = styled.div`
  display: grid;
  gap: 16px;
`;

const PostCard = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
    transform: translateY(-2px);
  }
`;

const PostTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 8px 0;
`;

const PostMeta = styled.div`
  font-size: 14px;
  color: #6c757d;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserProfile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [showFollowerModal, setShowFollowerModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [savedSchedules, setSavedSchedules] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activePostTab, setActivePostTab] = useState('companion');

  // 저장된 일정 로드
  useEffect(() => {
    const loadSavedSchedules = () => {
      const saved = JSON.parse(localStorage.getItem('savedSchedules') || '[]');
      setSavedSchedules(saved);
    };
    loadSavedSchedules();
  }, []);

  // 현재 로그인한 사용자 정보 가져오기
  const getCurrentUser = () => {
    const loginData = localStorage.getItem('loginData') || sessionStorage.getItem('loginData');
    if (loginData) {
      return JSON.parse(loginData);
    }
    return null;
  };

  const currentUser = getCurrentUser();

  // 내가 올린 동행모집 가져오기
  const getMyCompanionPosts = () => {
    const storedPosts = JSON.parse(localStorage.getItem('companionPosts')) || [];
    const userName = currentUser?.user?.name;
    if (!userName) return [];
    return storedPosts.filter(post => post.author === userName);
  };

  // 내가 올린 여행일정 가져오기
  const getMyTravelSchedules = () => {
    const storedSchedules = JSON.parse(localStorage.getItem('travelSchedules')) || [];
    const userName = currentUser?.user?.name;
    if (!userName) return [];
    return storedSchedules.filter(schedule => schedule.author === userName);
  };

  // 동행모집 삭제 함수
  const deleteCompanionPost = (postId) => {
    if (window.confirm('정말로 이 동행모집을 삭제하시겠습니까?')) {
      const storedPosts = JSON.parse(localStorage.getItem('companionPosts')) || [];
      const updatedPosts = storedPosts.filter(post => post.id !== postId);
      localStorage.setItem('companionPosts', JSON.stringify(updatedPosts));
      window.location.reload(); // 페이지 새로고침으로 목록 업데이트
    }
  };

  // 여행일정 삭제 함수
  const deleteTravelSchedule = (scheduleId) => {
    if (window.confirm('정말로 이 여행일정을 삭제하시겠습니까?')) {
      const storedSchedules = JSON.parse(localStorage.getItem('travelSchedules')) || [];
      const updatedSchedules = storedSchedules.filter(schedule => schedule.id !== scheduleId);
      localStorage.setItem('travelSchedules', JSON.stringify(updatedSchedules));
      window.location.reload(); // 페이지 새로고침으로 목록 업데이트
    }
  };

  // 동행모집 수정 함수
  const editCompanionPost = (postId) => {
    navigate(`/companion/edit/${postId}`);
  };

  // 여행일정 수정 함수
  const editTravelSchedule = (scheduleId) => {
    navigate(`/travel-schedule/edit/${scheduleId}`);
  };

  // 새 동행모집 추가
  const addNewCompanionPost = () => {
    navigate('/companion/create');
  };

  // 새 여행일정 추가
  const addNewTravelSchedule = () => {
    navigate('/travel-schedule/create');
  };

  // 팔로워/팔로잉 리스트 핸들러
  const handleFollowerClick = () => {
    setShowFollowerModal(true);
  };

  const handleFollowingClick = () => {
    setShowFollowingModal(true);
  };

  const handleCouponClick = () => {
    setShowCouponModal(true);
  };

  // 팔로워 데이터 생성 (실제 숫자에 맞춰서)
  const generateFollowers = (count) => {
    const followers = [];
    const names = ['바다러버', '여행매니아', '등산러버', '맛집탐험가', '사진작가', '카페러버', '드라이브매니아', '캠핑러버', '백패커', '로드트립러', '제주도민', '부산갈매기', '서울토박이', '강원도아재', '전라도할매', '경상도청년', '충청도미식가', '수도권러버', '해외여행러', '국내여행러', '인생여행러', '여행계획러', '자유여행러', '패키지러버', '고급여행러', '배낭여행러', '가족여행러', '커플여행러', '솔로여행러', '동호회러버'];

    for (let i = 0; i < count; i++) {
      const nameIndex = i % names.length;
      const name = i < names.length ? names[nameIndex] : `${names[nameIndex]}${Math.floor(i / names.length) + 1}`;
      followers.push({
        id: i + 1,
        name: name,
        username: `user_${i + 1}`,
        avatar: name.charAt(0)
      });
    }
    return followers;
  };

  const generateFollowing = (count) => {
    const following = [];
    const names = ['여행러버', '산악인', '맛집헌터', '카페러버', '해변러버', '도시탐험가', '문화애호가', '역사덕후', '자연주의자', '모험가', '휴양러버', '액티비티러버', '포토그래퍼', '블로거', '인플루언서', '가이드', '플래너', '백패커프로', '럭셔리러버', '버짓러버'];

    for (let i = 0; i < count; i++) {
      const nameIndex = i % names.length;
      const name = i < names.length ? names[nameIndex] : `${names[nameIndex]}${Math.floor(i / names.length) + 1}`;
      following.push({
        id: i + 1,
        name: name,
        username: `following_${i + 1}`,
        avatar: name.charAt(0)
      });
    }
    return following;
  };

  // Mock followers and following will be generated after user is defined

  // 쿠폰 목 데이터
  const mockCoupons = [
    {
      id: 1,
      title: '숙박 할인 쿠폰',
      discount: '20% 할인',
      description: '전국 호텔 및 펜션 예약 시 사용 가능',
      expiryDate: '2024-12-31',
      minAmount: '50,000원 이상',
      code: 'HOTEL20'
    },
    {
      id: 2,
      title: '여행용품 할인 쿠폰',
      discount: '15% 할인',
      description: '캐리어, 백팩 등 여행용품 구매 시 사용',
      expiryDate: '2024-11-30',
      minAmount: '30,000원 이상',
      code: 'TRAVEL15'
    },
    {
      id: 3,
      title: '액티비티 체험 쿠폰',
      discount: '10,000원 할인',
      description: '패러글라이딩, 다이빙 등 액티비티 예약 시',
      expiryDate: '2024-10-31',
      minAmount: '100,000원 이상',
      code: 'ACTIVITY10K'
    }
  ];

  // 마이페이지용 데이터 (본인 프로필일 때만 사용)
  const myPageData = {
    points: 15000,
    memberLevel: '골드',
    bookings: [
      {
        id: 1,
        hotel: '제주 오션뷰 리조트',
        room: '스탠다드 오션뷰',
        checkIn: '2024-03-15',
        checkOut: '2024-03-17',
        status: '예약완료',
        amount: 252000,
        bookingDate: '2024-02-20'
      },
      {
        id: 2,
        hotel: '부산 해운대 호텔',
        room: '디럭스 시티뷰',
        checkIn: '2024-02-10',
        checkOut: '2024-02-12',
        status: '이용완료',
        amount: 190000,
        bookingDate: '2024-01-25'
      }
    ],
    favorites: [
      {
        id: 1,
        name: '서울 명동 비즈니스 호텔',
        location: '서울 중구 명동',
        rating: 4.3,
        price: 85000,
        image: 'https://via.placeholder.com/200x150'
      },
      {
        id: 2,
        name: '강릉 바다뷰 펜션',
        location: '강원도 강릉시',
        rating: 4.6,
        price: 120000,
        image: 'https://via.placeholder.com/200x150'
      }
    ],
    interestedTrips: [
      {
        id: 1,
        title: '제주여행 갈사람~ ✈️',
        region: '제주',
        date: '2025-10-11~2025-10-14',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
        author: {
          name: '제주매니아',
          profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b1d1?w=100&h=100&fit=crop&crop=face'
        }
      },
      {
        id: 2,
        title: '서해안 드라이브 🚗',
        region: '충남',
        date: '2025-10-15~2025-10-16',
        image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=300&h=200&fit=crop',
        author: {
          name: '서해안드라이버',
          profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
        }
      }
    ]
  };

  // 유저 프로필 데이터 (실제로는 API에서 가져올 데이터)
  const userProfileData = {
    '여행러버': {
      name: '여행러버',
      bio: '제주도의 모든 매력을 사랑하는 여행자입니다. 성산일출봉에서 바라본 일몰의 감동을 나누고 싶어요.',
      location: '제주도',
      joinDate: '2024년 1월',
      totalTrips: 15,
      followers: 234,
      following: 156,
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      interests: ['자연', '일몰', '바다', '사진', '제주도'],
      recentTrips: [
        {
          id: 1,
          title: '제주도 성산일출봉 일몰 투어',
          region: '제주',
          date: '2024-01-15~2024-01-17',
          image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop'
        }
      ]
    },
    '산악인': {
      name: '산악인',
      bio: '산을 사랑하는 등반가입니다. 겨울 설악산의 아름다운 설경을 보며 느끼는 성취감이 최고예요.',
      location: '강원도',
      joinDate: '2023년 11월',
      totalTrips: 22,
      followers: 156,
      following: 89,
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      interests: ['등산', '겨울여행', '설악산', '자연', '모험'],
      recentTrips: [
        {
          id: 2,
          title: '설악산 겨울 등반',
          region: '강원',
          date: '2024-01-12~2024-01-14',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop'
        }
      ]
    },
    '맛집헌터': {
      name: '맛집헌터',
      bio: '전국의 숨은 맛집을 찾아다니는 미식가입니다. 부산 자갈치시장의 신선한 회는 정말 최고였어요!',
      location: '부산',
      joinDate: '2023년 8월',
      totalTrips: 18,
      followers: 198,
      following: 112,
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      interests: ['맛집', '해산물', '시장', '미식투어', '부산'],
      recentTrips: [
        {
          id: 3,
          title: '부산 자갈치시장 맛집 투어',
          region: '부산',
          date: '2024-01-10~2024-01-12',
          image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&h=200&fit=crop'
        }
      ]
    },
    'user': {
      name: '사용자',
      bio: '여행을 사랑하는 사용자입니다. 새로운 곳을 탐험하고 좋은 사람들과 만나는 것을 좋아해요.',
      location: '서울',
      joinDate: '2024년 3월',
      totalTrips: 5,
      followers: 234,
      following: 156,
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      interests: ['여행', '사진', '맛집', '문화'],
      recentTrips: [
        {
          id: 4,
          title: '서울 맛집 투어 🍜',
          region: '서울',
          date: '2025-10-20~2025-10-21',
          image: 'https://images.unsplash.com/photo-1549693578-d683be217e58?w=300&h=200&fit=crop'
        }
      ]
    }
  };

  // 현재 사용자의 프로필 데이터 가져오기
  let user = userProfileData[username];

  // 본인 프로필인 경우 실제 저장된 데이터 사용
  if (username === 'user' && currentUser?.user) {
    user = {
      ...userProfileData['user'],
      name: currentUser.user.name || userProfileData['user'].name,
      bio: currentUser.user.bio || userProfileData['user'].bio,
      location: currentUser.user.location || userProfileData['user'].location,
      interests: currentUser.user.interests || userProfileData['user'].interests,
      profileImage: currentUser.user.profileImage || userProfileData['user'].profileImage,
      email: currentUser.user.email || userProfileData['user'].email,
      phone: currentUser.user.phone || userProfileData['user'].phone
    };
  }

  if (!user) {
    user = userProfileData['user'];
  }

  if (!user) {
    return (
      <UserProfilePage>
        <Navigation />
        <NotFound>
          <NotFoundTitle>사용자를 찾을 수 없습니다.</NotFoundTitle>
          <NotFoundMessage>요청하신 사용자가 존재하지 않습니다.</NotFoundMessage>
          <NotFoundButton onClick={() => navigate(-1)}>뒤로가기</NotFoundButton>
        </NotFound>
      </UserProfilePage>
    );
  }

  // Generate mock followers and following data after user is defined
  const mockFollowers = generateFollowers(user?.followers || 234);
  const mockFollowing = generateFollowing(user?.following || 156);

  return (
    <UserProfilePage>
      <Navigation />

      <UserProfileContainer>
        <ProfileContent>
          <ProfileCard>
            <ProfileMain>
              <ProfileLeft>
                <ProfileAvatar>
                  {user.profileImage ? (
                    <img src={user.profileImage} alt={user.name} />
                  ) : (
                    (user.name || 'U').charAt(0)
                  )}
                </ProfileAvatar>

                {/* 프로필 편집하기 버튼을 프로필 사진 밑에 배치 */}
                {username === 'user' && (
                  <ProfileEditButton onClick={() => navigate('/profile-edit')}>
                    프로필 편집하기
                  </ProfileEditButton>
                )}
              </ProfileLeft>

              <ProfileRight>
                {/* 이름과 한줄소개를 더 아래로 배치 */}
                <div style={{marginTop: '40px'}}>
                  <ProfileName>
                    {username === 'user' ? '마이페이지' : (user.name || '이름 없음')}
                  </ProfileName>
                  <ProfileBio style={{margin: '12px 0 0 0', paddingTop: '55px'}}>{user.bio || '소개가 없습니다.'}</ProfileBio>
                </div>
              </ProfileRight>
            </ProfileMain>

            {/* 지역과 가입일 정보 - 가로 기준 정중앙 배치 */}
            <div style={{display: 'flex', justifyContent: 'center', gap: '16px', margin: '20px 0', flexWrap: 'wrap'}}>
              <ProfileLocation>
                <LocationIcon>📍</LocationIcon>
                <span>{user.location || '위치 정보 없음'}</span>
              </ProfileLocation>
              <ProfileJoinDate>
                <JoinIcon>📅</JoinIcon>
                <span>{user.joinDate || '가입일 정보 없음'} 가입</span>
              </ProfileJoinDate>
            </div>

            {/* 키워드 섹션 - 가로 기준 정중앙 배치 */}
            <div style={{display: 'flex', justifyContent: 'center', margin: '20px 0'}}>
              <InterestTags>
                {(user.interests || []).map((interest, index) => (
                  <InterestTag key={index}>{interest}</InterestTag>
                ))}
              </InterestTags>
            </div>

            <ProfileStats>
              <StatItem>
                <StatNumber>{user.totalTrips || 0}</StatNumber>
                <StatLabel>여행</StatLabel>
              </StatItem>
              <StatItem clickable onClick={handleFollowerClick}>
                <StatNumber>{user.followers || 0}</StatNumber>
                <StatLabel>팔로워</StatLabel>
              </StatItem>
              <StatItem clickable onClick={handleFollowingClick}>
                <StatNumber>{user.following || 0}</StatNumber>
                <StatLabel>팔로잉</StatLabel>
              </StatItem>
            </ProfileStats>

            {/* 다른 사용자일 때는 팔로우/메시지 버튼, 본인일 때는 쿠폰 섹션 */}
            {username !== 'user' ? (
              <ActionButtonsContainer>
                <FollowButton
                  className={isFollowing ? 'following' : ''}
                  onClick={() => {
                    setIsFollowing(!isFollowing);
                    alert(isFollowing ? '팔로우를 취소했습니다.' : '팔로우했습니다.');
                  }}
                >
                  {isFollowing ? '✓ 팔로잉' : '+ 팔로우'}
                </FollowButton>
                <MessageButton onClick={() => alert('메시지 기능 준비 중입니다.')}>
                  메시지
                </MessageButton>
              </ActionButtonsContainer>
            ) : (
              <CouponSection onClick={handleCouponClick} style={{cursor: 'pointer'}}>
                <CouponSectionTitle>보유 쿠폰</CouponSectionTitle>
                <CouponCount>3장</CouponCount>
                <CouponSectionDescription>사용 가능한 할인 쿠폰이 있습니다</CouponSectionDescription>
              </CouponSection>
            )}
          </ProfileCard>

          <ProfileSections>
            {/* 본인 프로필일 때만 마이페이지 기능 표시 */}
            {username === 'user' && (
              <>
                {/* 포인트 정보 */}
                <MyPageSection>
                  <SectionTitle>포인트 정보</SectionTitle>
                  <PointsInfo>
                    <PointsLeft>
                      <PointsLabel>보유 포인트</PointsLabel>
                      <PointsValue>{myPageData.points.toLocaleString()}P</PointsValue>
                    </PointsLeft>
                    <PointsUseButton onClick={() => alert('포인트 사용 기능 준비 중입니다.')}>
                      사용
                    </PointsUseButton>
                  </PointsInfo>
                </MyPageSection>



                {/* 관심 일정 */}
                <MyPageSection>
                  <SectionTitle>관심 일정</SectionTitle>
                  {savedSchedules.length > 0 ? (
                    savedSchedules.map(trip => (
                    <InterestedTripCard key={trip.id} onClick={() => navigate(`/travel-schedule/${trip.id}`)}>
                      <InterestedTripImage src={trip.image} alt={trip.title} />
                      <InterestedTripInfo>
                        <InterestedTripTitle>{trip.title}</InterestedTripTitle>
                        <InterestedTripMeta>{trip.region} • {trip.date}</InterestedTripMeta>
                        {trip.author && (
                          <TripAuthorInfo>
                            <TripAuthorAvatar>
                              <img src={trip.author.profileImage} alt={trip.author.name} />
                            </TripAuthorAvatar>
                            <TripAuthorName>{trip.author.name}</TripAuthorName>
                          </TripAuthorInfo>
                        )}
                      </InterestedTripInfo>
                    </InterestedTripCard>
                    ))
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6c757d' }}>
                      <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
                      <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                        저장된 관심 일정이 없습니다
                      </div>
                      <div style={{ fontSize: '14px' }}>
                        마음에 드는 일정을 저장해보세요!
                      </div>
                    </div>
                  )}
                </MyPageSection>
              </>
            )}

            {/* 일반 프로필 정보 */}

            {/* 내가 올린 게시물들 */}
            {username === 'user' && (
              <>
                {/* 내가 올린 동행모집 */}
                <RecentTripsSection>
                  <SectionHeader>
                    <SectionTitle>내가 올린 동행모집</SectionTitle>
                    <AddButton onClick={addNewCompanionPost}>
                      <span>+</span>
                      새 동행모집 등록
                    </AddButton>
                  </SectionHeader>
                  <TripCards>
                    {getMyCompanionPosts().length > 0 ? (
                      getMyCompanionPosts().map((post) => (
                        <TripCard key={post.id}>
                          <TripImage
                            src={post.image}
                            alt={post.title}
                            onClick={() => navigate(`/companion/${post.id}`)}
                            style={{cursor: 'pointer'}}
                          />
                          <TripInfo onClick={() => navigate(`/companion/${post.id}`)} style={{cursor: 'pointer'}}>
                            <TripTitle>{post.title}</TripTitle>
                            <TripMeta>{post.region} • {post.date}</TripMeta>
                          </TripInfo>
                          <TripManageButtons>
                            <ManageButton
                              className="edit"
                              onClick={(e) => {
                                e.stopPropagation();
                                editCompanionPost(post.id);
                              }}
                            >
                              수정
                            </ManageButton>
                            <ManageButton
                              className="delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteCompanionPost(post.id);
                              }}
                            >
                              삭제
                            </ManageButton>
                          </TripManageButtons>
                        </TripCard>
                      ))
                    ) : (
                      <EmptyMessage>아직 올린 동행모집이 없습니다.</EmptyMessage>
                    )}
                  </TripCards>
                </RecentTripsSection>

                {/* 내가 올린 여행일정 */}
                <RecentTripsSection>
                  <SectionHeader>
                    <SectionTitle>내가 올린 여행일정</SectionTitle>
                    <AddButton onClick={addNewTravelSchedule}>
                      <span>+</span>
                      새 여행일정 등록
                    </AddButton>
                  </SectionHeader>
                  <TripCards>
                    {getMyTravelSchedules().length > 0 ? (
                      getMyTravelSchedules().map((schedule) => (
                        <TripCard key={schedule.id}>
                          <TripImage
                            src={schedule.image}
                            alt={schedule.title}
                            onClick={() => navigate(`/travel-schedule/${schedule.id}`)}
                            style={{cursor: 'pointer'}}
                          />
                          <TripInfo onClick={() => navigate(`/travel-schedule/${schedule.id}`)} style={{cursor: 'pointer'}}>
                            <TripTitle>{schedule.title}</TripTitle>
                            <TripMeta>{schedule.region} • {schedule.date}</TripMeta>
                          </TripInfo>
                          <TripManageButtons>
                            <ManageButton
                              className="edit"
                              onClick={(e) => {
                                e.stopPropagation();
                                editTravelSchedule(schedule.id);
                              }}
                            >
                              수정
                            </ManageButton>
                            <ManageButton
                              className="delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteTravelSchedule(schedule.id);
                              }}
                            >
                              삭제
                            </ManageButton>
                          </TripManageButtons>
                        </TripCard>
                      ))
                    ) : (
                      <EmptyMessage>아직 올린 여행일정이 없습니다.</EmptyMessage>
                    )}
                  </TripCards>
                </RecentTripsSection>
              </>
            )}

            {/* 다른 사용자 프로필일 때 해당 유저의 게시물들 */}
            {username !== 'user' && (
              <UserPostsSection>
                <PostsSectionTitle>{user.name}님의 게시물</PostsSectionTitle>
                <PostTabs>
                  <PostTab
                    className={activePostTab === 'companion' ? 'active' : ''}
                    onClick={() => setActivePostTab('companion')}
                  >
                    동행모집
                  </PostTab>
                  <PostTab
                    className={activePostTab === 'schedule' ? 'active' : ''}
                    onClick={() => setActivePostTab('schedule')}
                  >
                    여행일정
                  </PostTab>
                </PostTabs>
                <PostsList>
                  {activePostTab === 'companion' ? (
                    // Mock companion posts - in real app would fetch by user
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6c757d' }}>
                      <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤝</div>
                      <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                        등록된 동행모집이 없습니다
                      </div>
                      <div style={{ fontSize: '14px' }}>
                        아직 동행모집 게시물이 없습니다.
                      </div>
                    </div>
                  ) : (
                    // Mock travel schedules - in real app would fetch by user
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6c757d' }}>
                      <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
                      <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                        등록된 여행일정이 없습니다
                      </div>
                      <div style={{ fontSize: '14px' }}>
                        아직 여행일정 게시물이 없습니다.
                      </div>
                    </div>
                  )}
                </PostsList>
              </UserPostsSection>
            )}
          </ProfileSections>
        </ProfileContent>
      </UserProfileContainer>

      {/* 팔로워 모달 */}
      {showFollowerModal && (
        <FollowModal onClick={(e) => e.target === e.currentTarget && setShowFollowerModal(false)}>
          <FollowModalContainer>
            <FollowModalHeader>
              <FollowModalTitle>팔로워</FollowModalTitle>
              <FollowModalClose onClick={() => setShowFollowerModal(false)}>×</FollowModalClose>
            </FollowModalHeader>
            <FollowList>
              {mockFollowers.map(follower => (
                <FollowItem key={follower.id}>
                  <FollowAvatar>{follower.avatar}</FollowAvatar>
                  <FollowInfo>
                    <FollowName>{follower.name}</FollowName>
                    <FollowUsername>@{follower.username}</FollowUsername>
                  </FollowInfo>
                </FollowItem>
              ))}
            </FollowList>
          </FollowModalContainer>
        </FollowModal>
      )}

      {/* 팔로잉 모달 */}
      {showFollowingModal && (
        <FollowModal onClick={(e) => e.target === e.currentTarget && setShowFollowingModal(false)}>
          <FollowModalContainer>
            <FollowModalHeader>
              <FollowModalTitle>팔로잉</FollowModalTitle>
              <FollowModalClose onClick={() => setShowFollowingModal(false)}>×</FollowModalClose>
            </FollowModalHeader>
            <FollowList>
              {mockFollowing.map(following => (
                <FollowItem key={following.id}>
                  <FollowAvatar>{following.avatar}</FollowAvatar>
                  <FollowInfo>
                    <FollowName>{following.name}</FollowName>
                    <FollowUsername>@{following.username}</FollowUsername>
                  </FollowInfo>
                </FollowItem>
              ))}
            </FollowList>
          </FollowModalContainer>
        </FollowModal>
      )}

      {/* 쿠폰 모달 */}
      {showCouponModal && (
        <CouponModal onClick={(e) => e.target === e.currentTarget && setShowCouponModal(false)}>
          <CouponModalContainer>
            <FollowModalHeader>
              <FollowModalTitle>쿠폰함</FollowModalTitle>
              <FollowModalClose onClick={() => setShowCouponModal(false)}>×</FollowModalClose>
            </FollowModalHeader>
            <CouponList>
              {mockCoupons.map(coupon => (
                <CouponCard key={coupon.id}>
                  <CouponHeader>
                    <CouponTitle>{coupon.title}</CouponTitle>
                    <CouponDiscount>{coupon.discount}</CouponDiscount>
                  </CouponHeader>
                  <CouponDescription>{coupon.description}</CouponDescription>
                  <CouponMinAmount>{coupon.minAmount}</CouponMinAmount>
                  <CouponFooter>
                    <CouponCode>{coupon.code}</CouponCode>
                    <CouponExpiry>{coupon.expiryDate}까지</CouponExpiry>
                  </CouponFooter>
                </CouponCard>
              ))}
            </CouponList>
          </CouponModalContainer>
        </CouponModal>
      )}
    </UserProfilePage>
  );
};

export default UserProfile;
