import styled, { keyframes } from 'styled-components';

export const AppContainer = styled.div`
    text-align: center;
    margin: 2rem;
    font-family: 'Arial', sans-serif;
`;

export const Header = styled.h1`
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #ff5f6d;
`;

export const Section = styled.div`
    margin: 2rem 0;
    padding: 1.5rem;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #f5f5f5;
`;

export const SectionHeader = styled.h2`
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: #009688;
`;

export const BidSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
`;

export const BidInput = styled.input`
    width: 100%;
    max-width: 300px;
    padding: 1rem;
    border: none;
    border-radius: 10px;
    background-color: #ffffff;
    font-size: 1rem;
`;

export const AnimatedBidButton = styled.button`
    background-color: #ff5f6d;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 1rem 2rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #e34f5a;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
    &.bid-button {
        margin-top: 1rem;
    }
`;

const RainbowAnimation = keyframes`
    0% { transform: translateX(-50%) rotate(0deg); }
    100% { transform: translateX(-50%) rotate(360deg); }
`;

export const AnimatedRainbowCircle = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    background-image: linear-gradient(45deg, #ff5f6d, #ffbe0b, #00d084, #3f51b5, #9c27b0);
    border-radius: 50%;
    animation: ${RainbowAnimation} 10s linear infinite;
`;