'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Photos', [
      // {
      //   roomId: 1,
      //   link: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/224649820.jpg?k=58de74c6b2148aee4a37855f9ce6bbf707ccbda98e3177b61ad5327bf7e02b16&o=&hp=1",
      // },
      // {
      //   roomId: 1,
      
      //   link: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/224649190.jpg?k=dc1294ecc7124da125448d617e2e34b76cfaf13cc16d2145e8ea57a97d9f0e16&o=&hp=1',
      // },
      // {
      //   roomId: 1,
      
      //   link: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/224653362.jpg?k=63f0066d20638063df1aa70996c3ba232965b26e618b710f5f4203e5f87893a3&o=&hp=1',
      // },
      // {
      //   roomId: 1,
      
      //   link: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/224649908.jpg?k=c243adcc4b510cbf1b6a7afbe7b5b7edd47e96846c556352fb4ccecfb04f4499&o=&hp=1',
      // },
      // {
      //   roomId: 1,
      
      //   link: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/224493332.jpg?k=b3258377fea204fd64f52cffb456ae7d0dc1ed652d9d33da785866d2c1342a65&o=&hp=1',
      // },
      // {
      //   roomId: 2,
      //   link: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/224653225.jpg?k=263fd4d3aa959e3786202e44e6c57c32426621230260f28f2cd5dd79310b6ea5&o=&hp=1',
      // },
      // {
      //   roomId: 2,
      
      //   link: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/224651702.jpg?k=adc4a0080fc6b92a4ec0652c3e3b10fed5526dae01b5eaea7dfa85df0b934515&o=&hp=1',
      // },
      // {
      //   roomId: 2,
      
      //   link: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/261035047.jpg?k=05d59141792c8571c3532037ca515b5b71eeff15d77a21285ad93dccaa542192&o=&hp=1',
      // },
      // {
      //   roomId: 2,
      
      //   link: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/261339325.jpg?k=8148f66ef78a7f95ea0116b08bf49f4ba3df7cf0b775155e4997ee2231d6f80e&o=&hp=1'
      // },
      // {
      //   roomId: 2,
      
      //   link: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/224649463.jpg?k=25ccfd86c4014e68830a9f0c777deebe6ee573f3cd941386fd63aea8e45e6bb5&o=&hp=1'
      // },
      // {
      //   roomId: 3,
      //   link: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/280860707.jpg?k=0aa0e5e5d851c915be6d3d56440fbcbbc67585eb304a7338639248616de7a265&o=&hp=1'
      // },
      // {
      //   roomId: 3,
      
      //   link: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/280860872.jpg?k=2f625342c93fd3e9a009859a8334fa290aa5ac42094f52d9fa9e9f18f6c23da8&o=&hp=1'
      // },
      // {
      //   roomId: 3,
      
      //   link: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/280860869.jpg?k=f1e98450e1c109a78399a11b62f105dad5a730bdc49379cf038c689773aceee5&o=&hp=1'
      // },
      // {
      //   roomId: 3,
      
      //   link: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/280860708.jpg?k=44d90cfd6d64d4e60ea164082c0ab2f909271b727749ebcaad5e6a34328f46e9&o=&hp=1'
      // },
      // {
      //   roomId: 3,
      
      //   link: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/280860706.jpg?k=37dad21afeefef55e57f2e46e5400ec7df862af4cc7ad3d5847743071923fcd5&o=&hp=1'
      // },
      // {
      //   roomId: 4,
      //   link: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/298924699.jpg?k=153c73743a0f2ab6e2bf796dc00eb626b705093068e19771f28668d02c81c042&o=&hp=1'
      // },
      // {
      //   roomId: 4,
      
      //   link: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/298924683.jpg?k=dcb5b437c58d64b405b2d345a89709f142dffaac01e9ee43a443a52d87bcad05&o=&hp=1'
      // },
      // {
      //   roomId: 4,
      
      //   link: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/298924689.jpg?k=866a4fddab495f1b5c73d9a4883e6a718bb3eb1094d98a572997522b38b5ef42&o=&hp=1'
      // },
      // {
      //   roomId: 4,
      
      //   link: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/298924711.jpg?k=d7c58b08c0c56c9ae2495c42327c9d580288feb3a6dcefcd1d1491853d069c07&o=&hp=1'
      // },
      // {
      //   roomId: 4,
      
      //   link: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/298924714.jpg?k=0cf82a84515fda9a157a5d68751760bc7e8fd95ab66f827c61377c739ae4bfa2&o=&hp=1'
      // },
      
    ],{});
  },

   async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      await queryInterface.bulkDelete('Photos', null, {});
  }
};
