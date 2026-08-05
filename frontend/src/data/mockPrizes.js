export const mockPrizes = [
  {
    id: 1,
    rank: 1,
    name: '스마트 워치',
    value: '200K',
    quantity: 1,
    minScore: 80,
    maxScore: 100,
    color: '#FFD700' // Gold
  },
  {
    id: 2,
    rank: 2,
    name: 'USB 외장하드',
    value: '60K',
    quantity: 2,
    minScore: 65,
    maxScore: 79,
    color: '#C0C0C0' // Silver
  },
  {
    id: 3,
    rank: 3,
    name: '편의점 상품권',
    value: '50K',
    quantity: 5,
    minScore: 50,
    maxScore: 64,
    color: '#CD7F32' // Bronze
  },
  {
    id: 4,
    rank: 4,
    name: '무선 이어폰',
    value: '80K',
    quantity: 3,
    minScore: 35,
    maxScore: 49,
    color: '#87CEEB' // Sky Blue
  },
  {
    id: 5,
    rank: 5,
    name: '스타벅스 카드',
    value: '10K',
    quantity: 10,
    minScore: 0,
    maxScore: 34,
    color: '#00704A' // Starbucks Green
  }
];

export const getPrizeByScore = (score) => {
  return mockPrizes.find(prize => score >= prize.minScore && score <= prize.maxScore);
};

export const getRankingColor = (rank) => {
  const colors = {
    1: '#FFD700',    // Gold
    2: '#C0C0C0',    // Silver
    3: '#CD7F32',    // Bronze
    4: '#87CEEB',    // Sky Blue
    5: '#00704A'     // Green
  };
  return colors[rank] || '#999999';
};
