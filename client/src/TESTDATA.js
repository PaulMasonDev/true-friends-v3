const TESTDATA = {
  userData: {
    username: 'TestUser',
    friends: [
      { id: 1,
        name: 'John Smith',
        occasions: [
          {
            id: 1,
            occasion: 'birthday',
            date: '10/26/1981',
            items: ['xbox', 'lawnmower', 'televsion',]
          },
          {
            id: 2,
            occasion: 'anniversary',
            date: '07/15/2018',
            items: ['watch', 'cruise', 'vacation']
          }
        ]
      },
      { id: 2,
        name: 'Sally Johnson',
        occasions: [
          {
            id: 1,
            occasion: 'Christening',
            date: '12/28/1984',
            items: ['necklace', 'chair', 'dress',]
          },
          {
            id:2,
            occasion: 'pumpkin anniversary',
            date: '07/15/2018',
            items: ['flowers', 'cruise', 'vacation']
          }
        ]
      },
      { id: 3,
        name: 'George Robinson',
        occasions: [
          {
            id: 1,
            occasion: 'birthday',
            date: '12/28/1984',
            items: ['necklace', 'chair', 'dress',]
          },
          {
            id: 2,
            occasion: 'anniversary',
            date: '07/15/2018',
            items: ['flowers', 'cruise', 'vacation']
          }
        ]
      }
    ],
  },
  displayData: {}
}

export default TESTDATA;