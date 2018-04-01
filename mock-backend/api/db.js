module.exports = {
  flow: {
    get: {
      items: [
        {
          key: "1",
          games: [
            {
              key: "123",
              title: "Clans of Caledonia",
              thumbnail: {
                url:
                  "http://192.168.0.4:3000/static/covers/clansofcaledonia.png",
              },
            },
          ],
          images: [
            {
              url: "http://192.168.0.4:3000/static/photos/IMG_2669.jpg",
            },
          ],
          location: {
            name: "Alphaspel",
          },
          likes: {
            count: 14,
            hasLiked: true,
          },
          players: [
            {
              key: "111",
              name: "Martin",
              isFollowing: true,
              accountId: 1,
              score: 112,
              rank: 2,
              comment: "Det är så fint! Jag gillar ostarna 🧀",
              ratings: [{ game: "123", currentRating: 4.5, previousRating: 4 }],
            },
            {
              key: "112",
              name: "Micke",
              isFollowing: true,
              avatar: {
                url: "http://192.168.0.4:3000/static/avatars/frdh.jpg",
              },
              accountId: 2,
              score: 17,
              rank: 5,
              ratings: [{ game: "123", currentRating: 4, previousRating: 5 }],
            },
            {
              key: "113",
              name: "Magnus",
              avatar: {
                url: "http://192.168.0.4:3000/static/avatars/frdh.jpg",
              },
              accountId: 3,
              isFollowing: true,
              score: 123,
              rank: 1,
              comment: "Woo! Seger!",
            },
            {
              key: "114",
              name: "Annika",
              avatar: {
                url: "http://192.168.0.4:3000/static/avatars/frdh.jpg",
              },
              accountId: 4,
              isFollowing: true,
              score: 112,
              rank: 2,
              ratings: [{ game: "123", currentRating: 4 }],
            },
            {
              key: "115",
              name: "Nina",
              avatar: {
                url: "http://192.168.0.4:3000/static/avatars/frdh.jpg",
              },
              accountId: 5,
              isFollowing: false,
              score: 27,
              rank: 4,
              ratings: [{ game: "123", currentRating: 4 }],
            },
            {
              key: "116",
              name: "Player 6",
              score: 14,
              rank: 56,
            },
            {
              key: "117",
              name: "Player 7",
              score: 2,
              rank: 7,
            },
          ],
        },
      ],
    },
  },
}
