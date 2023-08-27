import React, { useState, useEffect } from 'react';
//import './App.css';
import contract from './AuctionContract';
import { ethers } from 'ethers';
import {
  AppContainer,
  Header,
  Section,
  SectionHeader,
  BidSection,
  BidInput,
  AnimatedBidButton,
  AnimatedRainbowCircle,
} from './styled';

function App() {
    const [auctioneer, setAuctioneer] = useState('');
    const [endTime, setEndTime] = useState('');
    const [highestBidder, setHighestBidder] = useState('');
    const [highestBid, setHighestBid] = useState('');
    const [bidAmount, setBidAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const auctioneer = await contract.auctioneer();
            setAuctioneer(auctioneer);

            const endTime = new Date((await contract.auctionEndTime()) * 1000);
            setEndTime(endTime.toString());

            const highestBidder = await contract.highestBidder();
            setHighestBidder(highestBidder);

            const highestBid = await contract.highestBid();
            setHighestBid(ethers.utils.formatEther(highestBid));
        }

        fetchData();
    }, []);

    const placeBid = async () => {
        if (!bidAmount) {
            alert('Please enter a bid amount.');
            return;
        }

        setIsLoading(true);

        try {
            const tx = await contract.placeBid({
                value: ethers.utils.parseEther(bidAmount)
            });
            await tx.wait();

            // Update highest bidder and highest bid
            const newHighestBidder = await contract.highestBidder();
            setHighestBidder(newHighestBidder);

            const newHighestBid = await contract.highestBid();
            setHighestBid(ethers.utils.formatEther(newHighestBid));

            alert('Bid placed successfully!');
        } catch (error) {
            console.error('Error placing bid:', error.message);
            alert('Error placing bid.');
        }

        setIsLoading(false);
    };


    return (
      <AppContainer>
          <Header>Auction Time!</Header>
          <Section>
              <SectionHeader>Auction Details</SectionHeader>
              <p>Auctioneer: {auctioneer}</p>
              <p>Auction End Time: {endTime}</p>
              <p>Highest Bidder: {highestBidder}</p>
              <p>Highest Bid: {highestBid} ETH</p>
          </Section>

          <Section>
              <SectionHeader>Place Your Bid</SectionHeader>
              <BidSection>
                  <BidInput
                      type="number"
                      placeholder="Bid Amount in ETH"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                  />
                  <AnimatedBidButton
                      onClick={placeBid}
                      disabled={isLoading}
                  >
                      {isLoading ? 'Placing Bid...' : 'Place Bid'}
                  </AnimatedBidButton>
              </BidSection>
          </Section>
      </AppContainer>
  );
}

export default App;